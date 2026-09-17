import { MenuCategory, PromoPillConfig, ScheduleConfig } from '../types';

export const GOOGLE_SHEETS_URL_STORAGE_KEY = 'kikko_google_sheets_url_v1';
export const DEFAULT_GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwg8LkEU_r4YU610af0mnzwV2jsnZZTfo0Z4bZKWsuxdayPubJGjArqcjdei-Ydi7j5/exec';

export function getStoredSheetsUrl(): string {
  try {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const fromStorage = localStorage.getItem(GOOGLE_SHEETS_URL_STORAGE_KEY);
      if (fromStorage && fromStorage.trim()) {
        return fromStorage.trim();
      }
    }
  } catch (e) {
    // Silencioso en entornos que no soportan localStorage
  }
  const envUrl = (typeof import.meta !== 'undefined' && (import.meta as any).env) ? (import.meta as any).env?.VITE_GOOGLE_SHEETS_URL : undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim();
  }
  return DEFAULT_GOOGLE_SHEETS_URL;
}

export function saveStoredSheetsUrl(url: string): void {
  try {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.setItem(GOOGLE_SHEETS_URL_STORAGE_KEY, url.trim());
    }
  } catch (e) {
    // Silencioso en entornos que no soportan localStorage
  }
}

export interface SheetsResponse {
  categories: MenuCategory[];
  promoPill?: PromoPillConfig;
  pinAdmin?: string;
  schedule?: ScheduleConfig;
}

export async function fetchMenuFromSheets(customUrl?: string, retries = 1): Promise<SheetsResponse | null> {
  const url = customUrl || getStoredSheetsUrl();
  if (!url) return null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const separator = url.includes('?') ? '&' : '?';
      const freshUrl = `${url}${separator}_t=${Date.now()}`;

      const response = await fetch(freshUrl, {
        method: 'GET',
        redirect: 'follow',
        cache: 'no-store'
      });

      if (!response.ok) {
        console.warn(`Google Sheets respondió con status: ${response.status} (intento ${attempt + 1}/${retries + 1})`);
        if (attempt < retries) {
          await new Promise(res => setTimeout(res, 1500));
          continue;
        }
        return null;
      }

      const data = await response.json();
      if (data && Array.isArray(data.categories) && data.categories.length > 0) {
        return {
          categories: data.categories,
          promoPill: data.promoPill,
          pinAdmin: data.pinAdmin,
          schedule: data.schedule
        };
      }
      return null;
    } catch (error) {
      console.warn(`Error al obtener datos de Google Sheets (intento ${attempt + 1}/${retries + 1}):`, error);
      if (attempt < retries) {
        await new Promise(res => setTimeout(res, 1500));
        continue;
      }
      return null;
    }
  }
  return null;
}

export async function sendMenuToSheets(
  categories: MenuCategory[],
  promoPill: PromoPillConfig,
  pinAdmin?: string,
  customUrl?: string,
  schedule?: ScheduleConfig
): Promise<{ success: boolean; error?: string }> {
  const url = customUrl || getStoredSheetsUrl();
  if (!url) {
    return { success: false, error: 'No hay URL de Google Sheets configurada.' };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      cache: 'no-store',
      body: JSON.stringify({
        categories,
        promoPill,
        pinAdmin,
        schedule,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      return { success: false, error: `Error HTTP ${response.status}` };
    }

    const result = await response.json();
    if (result && result.success) {
      return { success: true };
    }
    return { success: false, error: result?.error || 'Respuesta inválida de Google Sheets' };
  } catch (error: any) {
    console.error('Error al enviar a Google Sheets:', error);
    return { success: false, error: error.message || 'Error de conexión' };
  }
}

export async function sendPinUpdateToSheets(
  pinAdmin: string,
  customUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const url = customUrl || getStoredSheetsUrl();
  if (!url) {
    return { success: false, error: 'No hay URL de Google Sheets configurada.' };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      cache: 'no-store',
      body: JSON.stringify({
        action: 'updatePin',
        pinAdmin: pinAdmin,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      return { success: false, error: `Error HTTP ${response.status}` };
    }

    const result = await response.json();
    if (result && result.success) {
      return { success: true };
    }
    return { success: false, error: result?.error || 'Error al actualizar PIN' };
  } catch (error: any) {
    console.error('Error al actualizar PIN:', error);
    return { success: false, error: error.message || 'Error de conexión' };
  }
}
