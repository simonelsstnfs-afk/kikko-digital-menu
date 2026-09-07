/**
 * Servicio de traducción automática para platos e ingredientes (Español -> Inglés, Italiano)
 */

export async function translateText(text: string, targetLang: 'en' | 'it'): Promise<string> {
  if (!text || !text.trim()) return '';

  const cleanText = text.trim();

  // 1. Intentar con Google Translate gtx
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
    console.warn(`Error con servicio principal de traducción (${targetLang}):`, err);
  }

  // 2. Fallback con MyMemory API
  try {
    const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=es|${targetLang}`;
    const res = await fetch(fallbackUrl);
    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText.trim();
      }
    }
  } catch (err) {
    console.warn(`Error con servicio secundario de traducción (${targetLang}):`, err);
  }

  // Si ambos fallan (ej. sin conexión), retornar texto original
  return cleanText;
}

export interface AutoTranslationResult {
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
    descEs ? translateText(descEs, 'en') : Promise.resolve(''),
    descEs ? translateText(descEs, 'it') : Promise.resolve('')
  ]);

  return {
    name: {
      es: nameEs.trim(),
      en: nameEn || nameEs.trim(),
      it: nameIt || nameEs.trim()
    },
    description: {
      es: descEs.trim(),
      en: descEn || descEs.trim(),
      it: descIt || descEs.trim()
    }
  };
}
