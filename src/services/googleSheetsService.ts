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
  // Fallback a variable de entorno de Vite si existe
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
}

/**
 * Descarga los datos más recientes desde Google Sheets
 */
export async function fetchMenuFromSheets(customUrl?: string): Promise<SheetsResponse | null> {
  const url = customUrl || getStoredSheetsUrl();
  if (!url) return null;

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`Google Sheets respondió con status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data && Array.isArray(data.categories) && data.categories.length > 0) {
      return {
        categories: data.categories,
        promoPill: data.promoPill
      };
    }
    return null;
  } catch (error) {
    console.warn('Error al obtener datos de Google Sheets:', error);
    return null;
  }
}

/**
 * Guarda y sincroniza los cambios hacia Google Sheets
 */
export async function sendMenuToSheets(
  categories: MenuCategory[],
  promoPill: PromoPillConfig,
  customUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const url = customUrl || getStoredSheetsUrl();
  if (!url) {
    return { success: false, error: 'No hay URL de Google Sheets configurada.' };
  }

  try {
    // text/plain previene el preflight OPTIONS de CORS que suele fallar en Apps Script
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        categories,
        promoPill,
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
