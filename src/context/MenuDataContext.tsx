import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { MenuCategory, MenuItem, PromoPillConfig } from '../types';
import { menuData as initialMenuData } from '../data';
import {
  fetchMenuFromSheets,
  sendMenuToSheets,
  getStoredSheetsUrl,
  saveStoredSheetsUrl
} from '../services/googleSheetsService';

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
  updatePromoPill: (config: Partial<PromoPillConfig>) => void;
  resetToDefaults: () => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => boolean;
  reorderItems: (categoryId: string, newItems: MenuItem[]) => void;
  isSandboxMode: boolean;
  toggleSandboxMode: () => void;
  exitSandboxMode: () => void;
}

const defaultPromoPill: PromoPillConfig = {
  active: true,
  tag: { es: 'Novedad', en: 'New', it: 'Novità' },
  title: { es: 'Risottos Auténticos', en: 'Authentic Risottos', it: 'Risotti Autentici' },
  targetCategory: 'risottos'
};

const STORAGE_KEY_CATEGORIES = 'kikko_menu_categories_v1';
const STORAGE_KEY_PROMO_PILL = 'kikko_menu_promo_pill_v1';

const MenuDataContext = createContext<MenuDataContextType | undefined>(undefined);

export function MenuDataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading categories from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(initialMenuData));
  });

  const [promoPill, setPromoPill] = useState<PromoPillConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROMO_PILL);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading promo pill from localStorage:', e);
    }
    return defaultPromoPill;
  });

  const [sheetsUrl, setSheetsUrlState] = useState<string>(() => getStoredSheetsUrl());
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Modo Sandbox / Pruebas (aísla cambios en sesión sin alterar producción)
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

  // Referencia a estado actual para evitar condiciones de carrera en sincronización
  const latestDataRef = useRef({ categories, promoPill });
  useEffect(() => {
    latestDataRef.current = { categories, promoPill };
  }, [categories, promoPill]);

  const setSheetsUrl = (url: string) => {
    setSheetsUrlState(url);
    saveStoredSheetsUrl(url);
  };

  // 1. Guardar en localStorage de inmediato ante cualquier cambio (si no está en sandbox)
  useEffect(() => {
    if (isSandboxMode) return;
    try {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories to localStorage:', e);
    }
  }, [categories, isSandboxMode]);

  useEffect(() => {
    if (isSandboxMode) return;
    try {
      localStorage.setItem(STORAGE_KEY_PROMO_PILL, JSON.stringify(promoPill));
    } catch (e) {
      console.error('Error saving promo pill to localStorage:', e);
    }
  }, [promoPill, isSandboxMode]);

  // 2. Al arrancar la app, intentar descargar datos frescos desde Google Sheets en segundo plano
  useEffect(() => {
    if (!sheetsUrl) return;

    let isMounted = true;
    (async () => {
      try {
        const remoteData = await fetchMenuFromSheets(sheetsUrl);
        if (isMounted && remoteData && remoteData.categories?.length) {
          setCategories(remoteData.categories);
          if (remoteData.promoPill) {
            setPromoPill(remoteData.promoPill);
          }
          setLastSyncedAt(new Date());
          setSyncStatus('saved');
        }
      } catch (err) {
        console.warn('No se pudo sincronizar inicialmente desde Google Sheets:', err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [sheetsUrl]);

  // Función para forzar sincronización manual (descargar de Sheets)
  const syncWithSheets = async (): Promise<boolean> => {
    if (!sheetsUrl) return false;
    setSyncStatus('syncing');
    try {
      const remoteData = await fetchMenuFromSheets(sheetsUrl);
      if (remoteData && remoteData.categories?.length) {
        setCategories(remoteData.categories);
        if (remoteData.promoPill) {
          setPromoPill(remoteData.promoPill);
        }
        setLastSyncedAt(new Date());
        setSyncStatus('saved');
        return true;
      }
      setSyncStatus('error');
      return false;
    } catch (e) {
      setSyncStatus('error');
      return false;
    }
  };

  // Función para subir datos a Sheets
  const pushToSheets = async (): Promise<boolean> => {
    if (!sheetsUrl) return false;
    if (isSandboxMode) {
      console.info('Modo Sandbox activo: pushToSheets simulado con éxito (sin alterar Google Sheets).');
      return true;
    }
    setSyncStatus('syncing');
    try {
      const res = await sendMenuToSheets(
        latestDataRef.current.categories,
        latestDataRef.current.promoPill,
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

  // Helper para auto-guardar en Google Sheets tras una acción CRUD si hay URL configurada
  const triggerAutoSaveToSheets = (newCats: MenuCategory[], newPill: PromoPillConfig) => {
    if (!sheetsUrl || isSandboxMode) return;
    setSyncStatus('syncing');
    sendMenuToSheets(newCats, newPill, sheetsUrl)
      .then((res) => {
        if (res.success) {
          setSyncStatus('saved');
          setLastSyncedAt(new Date());
        } else {
          setSyncStatus('error');
        }
      })
      .catch(() => {
        setSyncStatus('error');
      });
  };

  // Modificar precio rápido
  const updatePrice = (categoryId: string, itemId: string, newPrice: number) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item =>
          item.id === itemId ? { ...item, price: Number(newPrice) } : item
        )
      };
    });
    setCategories(updated);
    triggerAutoSaveToSheets(updated, promoPill);
  };

  // Añadir nuevo producto
  const addProduct = (categoryId: string, itemData: Omit<MenuItem, 'id'>) => {
    const newId = `${categoryId.slice(0, 2)}_${Date.now()}`;
    const newItem: MenuItem = {
      ...itemData,
      id: newId,
      available: itemData.available ?? true
    };

    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: [newItem, ...cat.items]
      };
    });
    setCategories(updated);
    triggerAutoSaveToSheets(updated, promoPill);
  };

  // Modificar producto existente
  const updateProduct = (categoryId: string, itemId: string, itemUpdates: Partial<MenuItem>) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => {
          if (item.id !== itemId) return item;
          return {
            ...item,
            ...itemUpdates,
            id: item.id
          };
        })
      };
    });
    setCategories(updated);
    triggerAutoSaveToSheets(updated, promoPill);
  };

  // Eliminar producto
  const deleteProduct = (categoryId: string, itemId: string) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.filter(item => item.id !== itemId)
      };
    });
    setCategories(updated);
    triggerAutoSaveToSheets(updated, promoPill);
  };

  // Alternar disponibilidad (Agotado / Disponible)
  const toggleItemAvailable = (categoryId: string, itemId: string) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item =>
          item.id === itemId ? { ...item, available: item.available === false ? true : false } : item
        )
      };
    });
    setCategories(updated);
    triggerAutoSaveToSheets(updated, promoPill);
  };

  // Actualizar píldora de novedad
  const updatePromoPill = (config: Partial<PromoPillConfig>) => {
    const updatedPill = {
      ...promoPill,
      ...config
    };
    setPromoPill(updatedPill);
    triggerAutoSaveToSheets(categories, updatedPill);
  };

  // Reordenar productos dentro de una categoría
  const reorderItems = (categoryId: string, newItems: MenuItem[]) => {
    const updated = categories.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: newItems
      };
    });
    setCategories(updated);
    triggerAutoSaveToSheets(updated, promoPill);
  };

  // Restablecer valores de fábrica
  const resetToDefaults = () => {
    const factoryCategories = JSON.parse(JSON.stringify(initialMenuData));
    setCategories(factoryCategories);
    setPromoPill(defaultPromoPill);
    localStorage.removeItem(STORAGE_KEY_CATEGORIES);
    localStorage.removeItem(STORAGE_KEY_PROMO_PILL);
    triggerAutoSaveToSheets(factoryCategories, defaultPromoPill);
  };

  // Exportar backup
  const exportBackup = (): string => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      promoPill,
      categories
    };
    return JSON.stringify(data, null, 2);
  };

  // Importar backup
  const importBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.categories)) {
        setCategories(parsed.categories);
        if (parsed.promoPill) {
          setPromoPill(parsed.promoPill);
        }
        triggerAutoSaveToSheets(parsed.categories, parsed.promoPill || promoPill);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error parsing backup JSON:', e);
      return false;
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
        reorderItems
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
