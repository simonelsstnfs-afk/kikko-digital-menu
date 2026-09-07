import React, { useState, useEffect } from 'react';
import { MenuItem } from '../../types';
import { X, Save, AlertCircle, Sparkles, Loader2, Check } from 'lucide-react';
import { autoTranslateProduct } from '../../utils/translateService';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<MenuItem, 'id'>) => void;
  initialProduct?: MenuItem | null;
  categoryTitle: string;
  isDrinkCategory?: boolean;
}

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
  categoryTitle,
  isDrinkCategory = false
}: ProductModalProps) {
  const [nameEs, setNameEs] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameIt, setNameIt] = useState('');

  const [descEs, setDescEs] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descIt, setDescIt] = useState('');

  const [price, setPrice] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState('');

  const [isTranslating, setIsTranslating] = useState(false);
  const [translationDone, setTranslationDone] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      if (typeof initialProduct.name === 'string') {
        setNameEs(initialProduct.name);
        setNameEn('');
        setNameIt('');
      } else {
        setNameEs(initialProduct.name.es || '');
        setNameEn(initialProduct.name.en || '');
        setNameIt(initialProduct.name.it || '');
      }

      setDescEs(initialProduct.description?.es || '');
      setDescEn(initialProduct.description?.en || '');
      setDescIt(initialProduct.description?.it || '');

      setPrice(initialProduct.price !== undefined ? initialProduct.price.toString() : '');
      setSubcategory(initialProduct.subcategory || '');
      setAvailable(initialProduct.available !== false);
    } else {
      setNameEs('');
      setNameEn('');
      setNameIt('');
      setDescEs('');
      setDescEn('');
      setDescIt('');
      setPrice('');
      setSubcategory('');
      setAvailable(true);
    }
    setError('');
    setTranslationDone(false);
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  // Acción manual de auto-traducción
  const handleAutoTranslate = async () => {
    if (!nameEs.trim()) {
      setError('Escribe primero el nombre en español para poder traducirlo.');
      return;
    }
    setIsTranslating(true);
    setError('');
    try {
      const res = await autoTranslateProduct(nameEs, descEs);
      setNameEn(res.name.en);
      setNameIt(res.name.it);
      if (descEs.trim()) {
        setDescEn(res.description.en);
        setDescIt(res.description.it);
      }
      setTranslationDone(true);
      setTimeout(() => setTranslationDone(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Error al generar la traducción automática. Inténtalo de nuevo.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEs.trim()) {
      setError('El nombre en español es obligatorio.');
      return;
    }
    const numPrice = parseFloat(price.replace(',', '.'));
    if (isNaN(numPrice) || numPrice < 0) {
      setError('Introduce un precio numérico válido (ej. 12.50).');
      return;
    }

    let finalNameEn = nameEn.trim();
    let finalNameIt = nameIt.trim();
    let finalDescEn = descEn.trim();
    let finalDescIt = descIt.trim();

    // Traducción automática al vuelo si el usuario dejó vacíos inglés o italiano
    if (!finalNameEn || !finalNameIt || (descEs.trim() && (!finalDescEn || !finalDescIt))) {
      setIsTranslating(true);
      try {
        const auto = await autoTranslateProduct(nameEs, descEs);
        if (!finalNameEn) finalNameEn = auto.name.en;
        if (!finalNameIt) finalNameIt = auto.name.it;
        if (!finalDescEn && descEs.trim()) finalDescEn = auto.description.en;
        if (!finalDescIt && descEs.trim()) finalDescIt = auto.description.it;
      } catch (err) {
        console.warn('Error auto-traduciendo al guardar:', err);
      } finally {
        setIsTranslating(false);
      }
    }

    const nameObj = {
      es: nameEs.trim(),
      en: finalNameEn || nameEs.trim(),
      it: finalNameIt || nameEs.trim()
    };

    const descObj = {
      es: descEs.trim(),
      en: finalDescEn || descEs.trim(),
      it: finalDescIt || descEs.trim()
    };

    onSave({
      name: nameObj,
      description: descObj,
      price: numPrice,
      subcategory: subcategory.trim() || undefined,
      available
    });
    onClose();
  };

  const drinkPresets = ['Refrescos', 'Cervezas', 'Vinos', 'Cócteles', 'Cafés', 'Amaros'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[92dvh] flex flex-col bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header Fijo */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-zinc-800 bg-zinc-950/80 shrink-0">
          <div className="min-w-0 pr-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C2410C] block">
              {categoryTitle}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white truncate">
              {initialProduct ? 'Editar Plato / Producto' : 'Añadir Nuevo Plato'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario con Scroll Interno */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs sm:text-sm text-red-400 bg-red-950/40 border border-red-800/50 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Banner informativo de traducción automática */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#141A0F] border border-[#C2410C]/40 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Traducción automática activa:</strong> escribe en español y traduce con un clic o al guardar.
              </span>
            </div>
            <button
              type="button"
              disabled={isTranslating || !nameEs.trim()}
              onClick={handleAutoTranslate}
              className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                translationDone
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-800 hover:bg-[#C2410C] text-white disabled:opacity-40 disabled:hover:bg-zinc-800'
              }`}
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Traduciendo...</span>
                </>
              ) : translationDone ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Traducido!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Auto-traducir ahora</span>
                </>
              )}
            </button>
          </div>

          {/* Nombre */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Nombre del Producto <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div>
                <span className="block text-xs text-zinc-400 mb-1">Español (ES) *</span>
                <input
                  type="text"
                  required
                  placeholder="Ej. Pizza Burrata"
                  value={nameEs}
                  onChange={(e) => setNameEs(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#C2410C] transition-colors"
                />
              </div>
              <div>
                <span className="block text-xs text-zinc-400 mb-1">Inglés (EN)</span>
                <input
                  type="text"
                  placeholder="Auto al guardar o clic"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#C2410C] transition-colors"
                />
              </div>
              <div>
                <span className="block text-xs text-zinc-400 mb-1">Italiano (IT)</span>
                <input
                  type="text"
                  placeholder="Auto al guardar o clic"
                  value={nameIt}
                  onChange={(e) => setNameIt(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#C2410C] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Precio y Disponibilidad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-zinc-200 mb-1">
                Precio (€) <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ej. 12.50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 pr-8 text-base sm:text-sm bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#C2410C] transition-colors font-mono"
                />
                <span className="absolute right-3 top-2 text-sm text-zinc-500 font-bold">€</span>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-zinc-200 mb-1">
                Estado / Disponibilidad
              </label>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setAvailable(!available)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer shrink-0 ${
                    available ? 'bg-emerald-600' : 'bg-zinc-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      available ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-xs sm:text-sm font-medium ${available ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  {available ? 'Disponible en Carta' : 'Agotado Temporalmente'}
                </span>
              </div>
            </div>
          </div>

          {/* Subcategoría (útil para Bebidas o agrupaciones) */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-zinc-200 mb-1">
              Subcategoría (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej. Refrescos, Cervezas, Vinos, Especialidades..."
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#C2410C] transition-colors"
            />
            {isDrinkCategory && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {drinkPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSubcategory(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Descripción / Ingredientes */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Descripción e Ingredientes (Opcional)
            </label>
            <div>
              <span className="block text-xs text-zinc-400 mb-1">Español (ES)</span>
              <textarea
                rows={2}
                placeholder="Ej. Tomate cherry confitado, albahaca fresca, mozzarella di bufala y aceite de oliva virgen extra..."
                value={descEs}
                onChange={(e) => setDescEs(e.target.value)}
                className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#C2410C] transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div>
                <span className="block text-xs text-zinc-400 mb-1">Inglés (EN)</span>
                <textarea
                  rows={2}
                  placeholder="Auto al guardar o clic"
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#C2410C] transition-colors"
                />
              </div>
              <div>
                <span className="block text-xs text-zinc-400 mb-1">Italiano (IT)</span>
                <textarea
                  rows={2}
                  placeholder="Auto al guardar o clic"
                  value={descIt}
                  onChange={(e) => setDescIt(e.target.value)}
                  className="w-full px-3 py-2 text-base sm:text-sm bg-zinc-950 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#C2410C] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-4 border-t border-zinc-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer text-center"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isTranslating}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#C2410C] hover:bg-orange-700 disabled:opacity-50 rounded-xl shadow-lg hover:shadow-orange-950/50 transition-all cursor-pointer text-center"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Traduciendo y Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{initialProduct ? 'Guardar Cambios' : 'Añadir Producto'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
