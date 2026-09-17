import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { MenuCategory, MenuItem, PromoPillConfig, ScheduleConfig, defaultScheduleConfig } from '../types';
import { menuData as initialMenuData } from '../data';
import { detectAllergensFromText } from '../allergens';
import {
  fetchMenuFromSheets,
  sendMenuToSheets,
  sendPinUpdateToSheets,
  getStoredSheetsUrl,
  saveStoredSheetsUrl
} from '../services/googleSheetsService';
import { CacheService } from '../services/cacheService';

export function ensureAllergensInCategories(cats: MenuCategory[]): MenuCategory[] {
  return cats.map(cat => ({
    ...cat,
    items: cat.items.map(item => {
      if (item.allergens && Array.isArray(item.allergens) && item.allergens.length > 0) {
        return item;
      }
      const detected = detectAllergensFromText(item.name, item.description, cat.id);
      return {
        ...item,
        allergens: detected
      };
    })
  }));
}

export type SyncStatus = 'idle' | 'syncing' | 'saved' | 'error';

interface MenuDataContextType {
  categories: MenuCategory[];
  promoPill: PromoPillConfig;
  schedule: ScheduleConfig;
  updateSchedule: (config: ScheduleConfig) => Promise<{ success: boolean; error?: string }>;
  syncStatus: SyncStatus;
  lastSyncedAt: Date | null;
  sheetsUrl: string;
  setSheetsUrl: (url: string) => void;
  syncWithSheets: () => Promise<boolean>;
  pushToSheets: () => Promise<boolean>;
  updatePrice: (categoryId: string, itemId: string, newPrice: number) => void;
  addProduct: (categoryId: string, item: Omit<MenuItem, 'id'>) => void;
  updateProduct: (categoryId: string, itemId: string, updated: Partial<MenuItem>) => void;
  deleteProduct: (categoryId: string, itemId: string) => void;
  toggleItemAvailable: (categoryId: string, itemId: string) => void;
  updatePromoPill: (config: Partial<PromoPillConfig>) => Promise<{ success: boolean; error?: string }>;
  resetToDefaults: () => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => boolean | Promise<boolean>;
  reorderItems: (categoryId: string, newItems: MenuItem[]) => void;
  isSandboxMode: boolean;
  toggleSandboxMode: () => void;
  exitSandboxMode: () => void;
  adminPin: string;
  updateAdminPin: (newPin: string) => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
}

const defaultPromoPill: PromoPillConfig = {
  active: true,
  type: 'booking',
  tag: { es: 'RESERVAS', en: 'BOOKINGS', it: 'PRENOTAZIONI' },
  title: { es: 'Reserva tu mesa en Kikko', en: 'Book your table at Kikko', it: 'Prenota il tuo tavolo da Kikko' },
  description: {
    es: 'Atención directa con nuestro equipo de sala por WhatsApp para reservas de hoy o próximos días.',
    en: 'Direct contact with our team via WhatsApp for bookings today or upcoming dates.',
    it: 'Contatto diretto con il nostro staff via WhatsApp per prenotare oggi o nei prossimi giorni.'
  },
  targetType: 'reservation'
};

const MenuDataContext = createContext<MenuDataContextType | undefined>(undefined);

export function MenuDataProvider({ children }: { children: ReactNode }) {
  const initialCache = useRef(CacheService.getLocalMenu()).current;

  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    if (initialCache?.data?.categories && initialCache.data.categories.length > 0) {
      return ensureAllergensInCategories(initialCache.data.categories);
    }
    return ensureAllergensInCategories(JSON.parse(JSON.stringify(initialMenuData)));
  });

  const [promoPill, setPromoPill] = useState<PromoPillConfig>(() => {
    return initialCache?.data?.promoPill || defaultPromoPill;
  });

  const [schedule, setSchedule] = useState<ScheduleConfig>(() => {
    return initialCache?.data?.schedule || defaultScheduleConfig;
  });

  const [adminPin, setAdminPin] = useState<string>(() => {
    return initialCache?.data?.pinAdmin || 'kikko2026';
  });

  const [, setCurrentVersion] = useState<number>(() => {
    return initialCache?.version || 0;
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(() => !initialCache);
  const [sheetsUrl, setSheetsUrlState] = useState<string>(() => getStoredSheetsUrl());
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Modo Sandbox
  const [isSandboxMode, setIsSandboxMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('kikko_sandbox_mode') === 'true';
  });

  const sandboxRealBackupRef = useRef<{ categories: MenuCategory[]; promoPill: PromoPillConfig; schedule: ScheduleConfig } | null>(null);

  const toggleSandboxMode = () => {
    if (!isSandboxMode) {
      sandboxRealBackupRef.current = {
        categories: JSON.parse(JSON.stringify(categories)),
        promoPill: JSON.parse(JSON.stringify(promoPill)),
        schedule: JSON.parse(JSON.stringify(schedule))
      };
      try {
        sessionStorage.setItem('kikko_sandbox_backup', JSON.stringify(sandboxRealBackupRef.current));
        sessionStorage.setItem('kikko_sandbox_mode', 'true');
      } catch (e) {}
      setIsSandboxMode(true);
    } else {
      exitSandboxMode();
    }
  };

  const exitSandboxMode = () => {
    try {
      let savedBackup = sandboxRealBackupRef.current;
      if (!savedBackup && typeof window !== 'undefined') {
        const stored = sessionStorage.getItem('kikko_sandbox_backup');
        if (stored) savedBackup = JSON.parse(stored);
      }
      if (savedBackup) {
        setCategories(savedBackup.categories);
        setPromoPill(savedBackup.promoPill);
        if (savedBackup.schedule) {
          setSchedule(savedBackup.schedule);
        }
      } else if (sheetsUrl) {
        fetchMenuFromSheets(sheetsUrl).then(remote => {
          if (remote?.categories?.length) {
            setCategories(remote.categories);
            if (remote.promoPill) setPromoPill(remote.promoPill);
            if (remote.pinAdmin) setAdminPin(remote.pinAdmin);
            if (remote.schedule && Array.isArray(remote.schedule.items)) {
              setSchedule(remote.schedule);
            }
          }
        });
      }
      sessionStorage.removeItem('kikko_sandbox_mode');
      sessionStorage.removeItem('kikko_sandbox_backup');
    } catch (e) {
      console.warn('Error restaurando estado al salir de sandbox:', e);
    }
    setIsSandboxMode(false);
  };

  const latestDataRef = useRef({ categories, promoPill, adminPin, schedule });
  useEffect(() => {
    latestDataRef.current = { categories, promoPill, adminPin, schedule };
  }, [categories, promoPill, adminPin, schedule]);

  const setSheetsUrl = (url: string) => {
    setSheetsUrlState(url);
    saveStoredSheetsUrl(url);
  };

  // Carga inicial y revalidación SWR
  const loadDataFromServer = async (url: string, background = false) => {
    if (!background) setIsLoading(true);
    try {
      const remoteData = await fetchMenuFromSheets(url);
      if (remoteData && remoteData.categories?.length) {
        const remoteVersion = remoteData.version || (remoteData.updatedAt ? new Date(remoteData.updatedAt).getTime() : Date.now());

        const newCats = ensureAllergensInCategories(remoteData.categories);
        const newPill = remoteData.promoPill || defaultPromoPill;
        const newPin = remoteData.pinAdmin || 'kikko2026';
        const newSchedule = (remoteData.schedule && Array.isArray(remoteData.schedule.items) && remoteData.schedule.items.length > 0)
          ? remoteData.schedule
          : defaultScheduleConfig;

        setCategories(newCats);
        if (remoteData.promoPill) setPromoPill(newPill);
        if (remoteData.pinAdmin) setAdminPin(newPin);
        if (remoteData.schedule) setSchedule(newSchedule);

        setCurrentVersion(remoteVersion);

        // Guardar en la bóveda de caché inteligente
        CacheService.setLocalMenu({
          categories: newCats,
          promoPill: newPill,
          schedule: newSchedule,
          pinAdmin: newPin
        }, remoteVersion);

        setLastSyncedAt(new Date());
        setSyncStatus('saved');
        return true;
      }
      if (!background) setSyncStatus('error');
      return false;
    } catch (err) {
      console.warn('No se pudo sincronizar desde Google Sheets:', err);
      if (!background) setSyncStatus('error');
      return false;
    } finally {
      if (!background) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!sheetsUrl) {
      setIsLoading(false);
      return;
    }
    // Si ya teníamos caché local válida, revalidar en segundo plano para no mostrar spinner
    const hasCache = initialCache !== null;
    loadDataFromServer(sheetsUrl, hasCache);
  }, [sheetsUrl]);

  // Revalidar en segundo plano al volver a la pestaña, reanudar de BFCache o recuperar conexión
  useEffect(() => {
    if (!sheetsUrl || isSandboxMode) return;

    const handleRevalidate = () => {
      loadDataFromServer(sheetsUrl, true);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      // Revalidar de inmediato si Safari/Chrome restauró la página desde BFCache
      if (event.persisted) {
        handleRevalidate();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleRevalidate();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleRevalidate);
    window.addEventListener('online', handleRevalidate);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleRevalidate);
      window.removeEventListener('online', handleRevalidate);
    };
  }, [sheetsUrl, isSandboxMode]);

  const syncWithSheets = async (): Promise<boolean> => {
    if (!sheetsUrl) return false;
    setSyncStatus('syncing');
    return await loadDataFromServer(sheetsUrl, false);
  };

  const pushToSheets = async (): Promise<boolean> => {
    if (!sheetsUrl) return false;
    if (isSandboxMode) return true;
    setSyncStatus('syncing');
    try {
      const res = await sendMenuToSheets(
        latestDataRef.current.categories,
        latestDataRef.current.promoPill,
        latestDataRef.current.adminPin,
        sheetsUrl,
        latestDataRef.current.schedule
      );
      if (res.success) {
        const newVer = Date.now();
        setCurrentVersion(newVer);
        CacheService.setLocalMenu({
          categories: latestDataRef.current.categories,
          promoPill: latestDataRef.current.promoPill,
          schedule: latestDataRef.current.schedule,
          pinAdmin: latestDataRef.current.adminPin
        }, newVer);
        setSyncStatus('saved');
        setLastSyncedAt(new Date());
        return true;
      }
      setSyncStatus('error');
      return false;
    } catch (e) {
      setSyncStatus('error');
      return false;
    }
  };

  // Helper para persistencia Transaccional: actualiza remoto y luego local
  const executePessimisticUpdate = async (newCats: MenuCategory[], newPill: PromoPillConfig) => {
    if (!sheetsUrl || isSandboxMode) {
      setCategories(newCats);
      setPromoPill(newPill);
      return { success: true };
    }
    setSyncStatus('syncing');
    try {
      const res = await sendMenuToSheets(newCats, newPill, latestDataRef.current.adminPin, sheetsUrl, schedule);
      if (res.success) {
        setCategories(newCats);
        setPromoPill(newPill);
        const newVer = Date.now();
        setCurrentVersion(newVer);
        CacheService.setLocalMenu({
          categories: newCats,
          promoPill: newPill,
          schedule,
          pinAdmin: latestDataRef.current.adminPin
        }, newVer);
        setSyncStatus('saved');
        setLastSyncedAt(new Date());
        return { success: true };
      } else {
        setSyncStatus('error');
        return { success: false, error: res.error };
      }
    } catch (e: any) {
      setSyncStatus('error');
      return { success: false, error: e.message };
    }
  };

  const updatePrice = async (categoryId: string, itemId: string, newPrice: number) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item =>
          item.id === itemId ? { ...item, price: Number(newPrice) } : item
        )
      };
    });
    await executePessimisticUpdate(updated, promoPill);
  };

  const addProduct = async (categoryId: string, itemData: Omit<MenuItem, 'id'>) => {
    const newId = `${categoryId.slice(0, 2)}_${Date.now()}`;
    const newItem: MenuItem = { ...itemData, id: newId, available: itemData.available ?? true };
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return { ...cat, items: [newItem, ...cat.items] };
    });
    await executePessimisticUpdate(updated, promoPill);
  };

  const updateProduct = async (categoryId: string, itemId: string, itemUpdates: Partial<MenuItem>) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, ...itemUpdates, id: item.id } : item)
      };
    });
    await executePessimisticUpdate(updated, promoPill);
  };

  const deleteProduct = async (categoryId: string, itemId: string) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return { ...cat, items: cat.items.filter(item => item.id !== itemId) };
    });
    await executePessimisticUpdate(updated, promoPill);
  };

  const toggleItemAvailable = async (categoryId: string, itemId: string) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item =>
          item.id === itemId ? { ...item, available: item.available === false ? true : false } : item
        )
      };
    });
    await executePessimisticUpdate(updated, promoPill);
  };

  const updatePromoPill = async (config: Partial<PromoPillConfig>): Promise<{ success: boolean; error?: string }> => {
    const updatedPill: PromoPillConfig = { ...promoPill, ...config };
    return await executePessimisticUpdate(categories, updatedPill);
  };

  const reorderItems = async (categoryId: string, newItems: MenuItem[]) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return { ...cat, items: newItems };
    });
    await executePessimisticUpdate(updated, promoPill);
  };

  const updateSchedule = async (newSchedule: ScheduleConfig): Promise<{ success: boolean; error?: string }> => {
    if (isSandboxMode) {
      setSchedule(newSchedule);
      return { success: true };
    }
    setSchedule(newSchedule);

    setSyncStatus('syncing');
    try {
      const updatedCategories = categories.map((cat, idx) => {
        if (idx === 0) return { ...cat, schedule: newSchedule };
        return cat;
      });
      setCategories(updatedCategories);

      const result = await sendMenuToSheets(updatedCategories, promoPill, adminPin, sheetsUrl, newSchedule);
      if (!result.success) {
        setSyncStatus('error');
        return { success: false, error: result.error || 'Error al sincronizar horarios con Google Sheets' };
      }

      const newVer = Date.now();
      setCurrentVersion(newVer);
      CacheService.setLocalMenu({
        categories: updatedCategories,
        promoPill,
        schedule: newSchedule,
        pinAdmin: adminPin
      }, newVer);

      setSyncStatus('saved');
      setLastSyncedAt(new Date());
      return { success: true };
    } catch (e: any) {
      setSyncStatus('error');
      return { success: false, error: e.message || 'Error de conexión al sincronizar horarios' };
    }
  };

  const resetToDefaults = async () => {
    const factoryCategories = ensureAllergensInCategories(JSON.parse(JSON.stringify(initialMenuData)));
    await executePessimisticUpdate(factoryCategories, defaultPromoPill);
  };

  const exportBackup = (): string => {
    const data = { version: '1.0', exportedAt: new Date().toISOString(), promoPill, categories, schedule };
    return JSON.stringify(data, null, 2);
  };

  const importBackup = async (jsonString: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.categories)) {
        if (parsed.schedule && Array.isArray(parsed.schedule.items)) {
          setSchedule(parsed.schedule);
        }
        const sanitizedCats = ensureAllergensInCategories(parsed.categories);
        const res = await executePessimisticUpdate(sanitizedCats, parsed.promoPill || promoPill);
        return res.success;
      }
      return false;
    } catch (e) {
      console.error('Error parsing backup JSON:', e);
      return false;
    }
  };

  const updateAdminPin = async (newPin: string): Promise<{ success: boolean; error?: string }> => {
    if (!sheetsUrl || isSandboxMode) {
      setAdminPin(newPin);
      return { success: true };
    }
    setSyncStatus('syncing');
    try {
      const res = await sendPinUpdateToSheets(newPin, sheetsUrl);
      if (res.success) {
        setAdminPin(newPin);
        setSyncStatus('saved');
        setLastSyncedAt(new Date());
        return { success: true };
      } else {
        setSyncStatus('error');
        return { success: false, error: res.error || 'Error al guardar PIN en Google Sheets' };
      }
    } catch (e: any) {
      setSyncStatus('error');
      return { success: false, error: e.message };
    }
  };

  return (
    <MenuDataContext.Provider
      value={{
        categories,
        promoPill,
        schedule,
        updateSchedule,
        syncStatus,
        lastSyncedAt,
        sheetsUrl,
        setSheetsUrl,
        syncWithSheets,
        pushToSheets,
        updatePrice,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleItemAvailable,
        updatePromoPill,
        resetToDefaults,
        exportBackup,
        importBackup,
        isSandboxMode,
        toggleSandboxMode,
        exitSandboxMode,
        reorderItems,
        adminPin,
        updateAdminPin,
        isLoading
      }}
    >
      {children}
    </MenuDataContext.Provider>
  );
}

export function useMenuData() {
  const context = useContext(MenuDataContext);
  if (!context) {
    throw new Error('useMenuData must be used within a MenuDataProvider');
  }
  return context;
}
