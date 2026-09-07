import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuCategory, MenuItem, PromoPillConfig } from '../types';
import { menuData as initialMenuData } from '../data';

interface MenuDataContextType {
  categories: MenuCategory[];
  promoPill: PromoPillConfig;
  updatePrice: (categoryId: string, itemId: string, newPrice: number) => void;
  addProduct: (categoryId: string, item: Omit<MenuItem, 'id'>) => void;
  updateProduct: (categoryId: string, itemId: string, updated: Partial<MenuItem>) => void;
  deleteProduct: (categoryId: string, itemId: string) => void;
  toggleItemAvailable: (categoryId: string, itemId: string) => void;
  updatePromoPill: (config: Partial<PromoPillConfig>) => void;
  resetToDefaults: () => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => boolean;
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

  // Guardar en localStorage ante cambios
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories to localStorage:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROMO_PILL, JSON.stringify(promoPill));
    } catch (e) {
      console.error('Error saving promo pill to localStorage:', e);
    }
  }, [promoPill]);

  // Modificar precio rápido
  const updatePrice = (categoryId: string, itemId: string, newPrice: number) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.map(item =>
            item.id === itemId ? { ...item, price: Number(newPrice) } : item
          )
        };
      })
    );
  };

  // Añadir nuevo producto
  const addProduct = (categoryId: string, itemData: Omit<MenuItem, 'id'>) => {
    const newId = `${categoryId.slice(0, 2)}_${Date.now()}`;
    const newItem: MenuItem = {
      ...itemData,
      id: newId,
      available: itemData.available ?? true
    };

    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: [newItem, ...cat.items]
        };
      })
    );
  };

  // Modificar producto existente
  const updateProduct = (categoryId: string, itemId: string, updated: Partial<MenuItem>) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.map(item => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              ...updated,
              id: item.id
            };
          })
        };
      })
    );
  };

  // Eliminar producto
  const deleteProduct = (categoryId: string, itemId: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.filter(item => item.id !== itemId)
        };
      })
    );
  };

  // Alternar disponibilidad (Agotado / Disponible)
  const toggleItemAvailable = (categoryId: string, itemId: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          items: cat.items.map(item =>
            item.id === itemId ? { ...item, available: item.available === false ? true : false } : item
          )
        };
      })
    );
  };

  // Actualizar píldora de novedad
  const updatePromoPill = (config: Partial<PromoPillConfig>) => {
    setPromoPill(prev => ({
      ...prev,
      ...config
    }));
  };

  // Restablecer valores de fábrica
  const resetToDefaults = () => {
    const factoryCategories = JSON.parse(JSON.stringify(initialMenuData));
    setCategories(factoryCategories);
    setPromoPill(defaultPromoPill);
    localStorage.removeItem(STORAGE_KEY_CATEGORIES);
    localStorage.removeItem(STORAGE_KEY_PROMO_PILL);
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
        updatePrice,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleItemAvailable,
        updatePromoPill,
        resetToDefaults,
        exportBackup,
        importBackup
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
