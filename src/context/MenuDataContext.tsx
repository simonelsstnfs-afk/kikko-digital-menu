import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { MenuCategory, MenuItem, PromoPillConfig } from '../types';
import { menuData as initialMenuData } from '../data';
import { detectAllergensFromText } from '../allergens';
import {
  fetchMenuFromSheets,
  sendMenuToSheets,
  sendPinUpdateToSheets,
  getStoredSheetsUrl,
  saveStoredSheetsUrl
} from '../services/googleSheetsService';

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
  const [categories, setCategories] = useState<MenuCategory[]>(ensureAllergensInCategories(JSON.parse(JSON.stringify(initialMenuData))));
  const [promoPill, setPromoPill] = useState<PromoPillConfig>(defaultPromoPill);
  const [adminPin, setAdminPin] = useState<string>('kikko2026');
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sheetsUrl, setSheetsUrlState] = useState<string>(() => getStoredSheetsUrl());
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Modo Sandbox
  const [isSandboxMode, setIsSandboxMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('kikko_sandbox_mode') === 'true';
  });

  const sandboxRealBackupRef = useRef<{ categories: MenuCategory[]; promoPill: PromoPillConfig } | null>(null);

  const toggleSandboxMode = () => {
    if (!isSandboxMode) {
      sandboxRealBackupRef.current = {
        categories: JSON.parse(JSON.stringify(categories)),
        promoPill: JSON.parse(JSON.stringify(promoPill))
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
      } else if (sheetsUrl) {
        fetchMenuFromSheets(sheetsUrl).then(remote => {
          if (remote?.categories?.length) {
            setCategories(remote.categories);
            if (remote.promoPill) setPromoPill(remote.promoPill);
            if (remote.pinAdmin) setAdminPin(remote.pinAdmin);
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

  const latestDataRef = useRef({ categories, promoPill, adminPin });
  useEffect(() => {
    latestDataRef.current = { categories, promoPill, adminPin };
  }, [categories, promoPill, adminPin]);

  const setSheetsUrl = (url: string) => {
    setSheetsUrlState(url);
    saveStoredSheetsUrl(url);
  };

  // Carga inicial y revalidación fuerte (NO usamos localStorage)
  const loadDataFromServer = async (url: string, background = false) => {
    if (!background) setIsLoading(true);
    try {
      const remoteData = await fetchMenuFromSheets(url);
      if (remoteData && remoteData.categories?.length) {
        setCategories(ensureAllergensInCategories(remoteData.categories));
        if (remoteData.promoPill) setPromoPill(remoteData.promoPill);
        if (remoteData.pinAdmin) setAdminPin(remoteData.pinAdmin);
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
    loadDataFromServer(sheetsUrl, false);
  }, [sheetsUrl]);

  // Revalidar en segundo plano al volver a la pestaña
  useEffect(() => {
    if (!sheetsUrl || isSandboxMode) return;
    const handleRevalidate = () => {
      if (document.visibilityState === 'visible') {
        loadDataFromServer(sheetsUrl, true);
      }
    };
    document.addEventListener('visibilitychange', handleRevalidate);
    window.addEventListener('focus', handleRevalidate);
    return () => {
      document.removeEventListener('visibilitychange', handleRevalidate);
      window.removeEventListener('focus', handleRevalidate);
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
        sheetsUrl
      );
      if (res.success) {
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
      const res = await sendMenuToSheets(newCats, newPill, latestDataRef.current.adminPin, sheetsUrl);
      if (res.success) {
        setCategories(newCats);
        setPromoPill(newPill);
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

  const resetToDefaults = async () => {
    const factoryCategories = ensureAllergensInCategories(JSON.parse(JSON.stringify(initialMenuData)));
    await executePessimisticUpdate(factoryCategories, defaultPromoPill);
  };

  const exportBackup = (): string => {
    const data = { version: '1.0', exportedAt: new Date().toISOString(), promoPill, categories };
    return JSON.stringify(data, null, 2);
  };

  const importBackup = async (jsonString: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.categories)) {
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
