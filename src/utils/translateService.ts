/**
 * Servicio de traducción automática para platos e ingredientes (Español -> Inglés, Italiano)
 */

export async function translateText(text: string, targetLang: 'en' | 'it'): Promise<string | null> {
  if (!text || !text.trim()) return '';

  const cleanText = text.trim();

  // 1. Proveedor Principal: Google Translate Client5
  // Compatible al 100% con navegadores web (CORS *, sin bloqueos 429 por origen web)
  try {
    const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=es&tl=${targetLang}&q=${encodeURIComponent(cleanText)}`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const translated = data.map((s: any) => String(s)).join(' ').trim();
        if (translated) {
          return translated;
        }
      } else if (typeof data === 'string' && data.trim()) {
        return data.trim();
      }
    }
  } catch (err) {
    console.warn(`Error con proveedor principal (clients5) para ${targetLang}:`, err);
  }

  // 2. Proveedor Secundario: Google Translate gtx
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encodeURIComponent(cleanText)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map((part: any) => part[0]).filter(Boolean).join('');
        if (translated && translated.trim()) {
          return translated.trim();
        }
      }
    }
  } catch (err) {
    console.warn(`Error con proveedor secundario (gtx) para ${targetLang}:`, err);
  }

  // 3. Proveedor Terciario: MyMemory con timeout defensivo
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=es|${targetLang}`;
    const res = await fetch(fallbackUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText && data.responseData.translatedText.trim()) {
        return data.responseData.translatedText.trim();
      }
    }
  } catch (err) {
    console.warn(`Error con proveedor terciario (MyMemory) para ${targetLang}:`, err);
  }

  // Si fallan todos los servicios de traducción, retornar null para evitar sobreescribir con texto en español
  return null;
}

export interface AutoTranslationResult {
  success: boolean;
  name: { es: string; en: string; it: string };
  description: { es: string; en: string; it: string };
}

export async function autoTranslateProduct(
  nameEs: string,
  descEs: string
): Promise<AutoTranslationResult> {
  const [nameEn, nameIt, descEn, descIt] = await Promise.all([
    translateText(nameEs, 'en'),
    translateText(nameEs, 'it'),
    descEs.trim() ? translateText(descEs, 'en') : Promise.resolve(''),
    descEs.trim() ? translateText(descEs, 'it') : Promise.resolve('')
  ]);

  const hasNameEn = Boolean(nameEn && nameEn.trim());
  const hasNameIt = Boolean(nameIt && nameIt.trim());

  return {
    success: hasNameEn || hasNameIt,
    name: {
      es: nameEs.trim(),
      en: nameEn || '',
      it: nameIt || ''
    },
    description: {
      es: descEs.trim(),
      en: descEn || '',
      it: descIt || ''
    }
  };
}
