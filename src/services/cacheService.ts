import { MenuCategory, PromoPillConfig, ScheduleConfig } from '../types';

export const MENU_CACHE_VAULT_KEY = 'kikko_menu_vault_v2';
export const CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 días como fallback offline

export interface CachedMenuData {
  categories: MenuCategory[];
  promoPill?: PromoPillConfig;
  schedule?: ScheduleConfig;
  pinAdmin?: string;
}

export interface CachedMenuVault {
  version: number;
  timestamp: number;
  data: CachedMenuData;
}

export const CacheService = {
  /**
   * Obtiene la copia local de la carta si existe y es válida.
   */
  getLocalMenu(): CachedMenuVault | null {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      const raw = localStorage.getItem(MENU_CACHE_VAULT_KEY);
      if (!raw) return null;

      const parsed: CachedMenuVault = JSON.parse(raw);
      if (!parsed || typeof parsed.version !== 'number' || !parsed.data) {
        return null;
      }

      // Validar que categories sea un array no vacío
      if (!Array.isArray(parsed.data.categories) || parsed.data.categories.length === 0) {
        return null;
      }

      return parsed;
    } catch (e) {
      console.warn('[CacheService] Error leyendo caché local:', e);
      return null;
    }
  },

  /**
   * Persiste la carta en caché local con su versión y fecha.
   */
  setLocalMenu(data: CachedMenuData, remoteVersion?: number): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      if (!data || !Array.isArray(data.categories) || data.categories.length === 0) return;

      const vault: CachedMenuVault = {
        version: remoteVersion || Date.now(),
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(MENU_CACHE_VAULT_KEY, JSON.stringify(vault));
    } catch (e) {
      console.warn('[CacheService] Error al guardar caché local o cuota excedida:', e);
    }
  },

  /**
   * Elimina claves huérfanas de versiones anteriores.
   */
  purgeLegacyStorage(): void {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const legacyKeys = [
        'kikko_persisted_schedule',
        'kikko_menu_data',
        'kikko_categories',
        'kikko_promo_pill',
        'kikko_menu_cache',
        'kikko_cart'
      ];
      legacyKeys.forEach(k => {
        try {
          localStorage.removeItem(k);
        } catch (err) {}
      });
    } catch (e) {}
  }
};
