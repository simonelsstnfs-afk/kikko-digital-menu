import { MenuCategory, PromoPillConfig } from '../types';

export const GOOGLE_SHEETS_URL_STORAGE_KEY = 'kikko_google_sheets_url_v1';
export const DEFAULT_GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwg8LkEU_r4YU610af0mnzwV2jsnZZTfo0Z4bZKWsuxdayPubJGjArqcjdei-Ydi7j5/exec';

export function getStoredSheetsUrl(): string {
  try {
    const fromStorage = localStorage.getItem(GOOGLE_SHEETS_URL_STORAGE_KEY);
    if (fromStorage && fromStorage.trim()) {
      return fromStorage.trim();
    }
  } catch (e) {
    console.error('Error reading sheets URL from localStorage:', e);
  }
  const envUrl = (import.meta as any).env?.VITE_GOOGLE_SHEETS_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.trim();
  }
  return DEFAULT_GOOGLE_SHEETS_URL;
}

export function saveStoredSheetsUrl(url: string): void {
  try {
    localStorage.setItem(GOOGLE_SHEETS_URL_STORAGE_KEY, url.trim());
  } catch (e) {
    console.error('Error saving sheets URL to localStorage:', e);
  }
}

export interface SheetsResponse {
  categories: MenuCategory[];
  promoPill?: PromoPillConfig;
  pinAdmin?: string;
}

export async function fetchMenuFromSheets(customUrl?: string): Promise<SheetsResponse | null> {
  const url = customUrl || getStoredSheetsUrl();
  if (!url) return null;

  try {
    const separator = url.includes('?') ? '&' : '?';
    const freshUrl = `${url}${separator}_t=${Date.now()}`;

    const response = await fetch(freshUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.warn(`Google Sheets respondió con status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data && Array.isArray(data.categories) && data.categories.length > 0) {
      return {
        categories: data.categories,
        promoPill: data.promoPill,
        pinAdmin: data.pinAdmin
      };
    }
    return null;
  } catch (error) {
    console.warn('Error al obtener datos de Google Sheets:', error);
    return null;
  }
}

export async function sendMenuToSheets(
  categories: MenuCategory[],
  promoPill: PromoPillConfig,
  pinAdmin?: string,
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
        categories,
        promoPill,
        pinAdmin,
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
