import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMenuData } from '../context/MenuDataContext';
import { useLanguage } from '../LanguageContext';
import { PromoType } from '../types';
import {
  Sparkles,
  Flame,
  Tag,
  Calendar,
  ChevronUp,
  X,
  ArrowRight,
  UtensilsCrossed
} from 'lucide-react';

export default function DynamicIsland() {
  const { promoPill, categories } = useMenuData();
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Si la píldora está desactivada en /admin, no renderizar
  if (promoPill.active === false) {
    return null;
  }

  // Helper para resolver textos localizados según el idioma seleccionado
  const getLocalized = (val: any, fallback = ''): string => {
    if (!val) return fallback;
    if (typeof val === 'string') return val;
    return val[language] || val['es'] || val['en'] || fallback;
  };

  const promoType: PromoType = promoPill.type || 'dish';
  const tagText = getLocalized(promoPill.tag, t('newPromoTag'));
  const titleText = getLocalized(promoPill.title, t('newPromoTitle'));
  const descText = getLocalized(promoPill.description, '');
  const price = promoPill.price !== undefined && promoPill.price !== '' ? Number(promoPill.price) : null;
  const originalPrice = promoPill.originalPrice !== undefined && promoPill.originalPrice !== '' ? Number(promoPill.originalPrice) : null;

  // Icono y temática según el Preset
  const getPresetVisuals = (type: PromoType) => {
    switch (type) {
      case 'promo_2x1':
        return {
          icon: <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />,
          glowColor: 'rgba(239, 68, 68, 0.45)',
          borderColor: 'border-red-500/70',
          metallicClass: 'metallic-border-promo_2x1',
          badgeBg: 'bg-red-950/70 border-red-800/80 text-red-300',
          pingColor: 'bg-red-500',
          defaultTag: t('dynamicIsland2x1')
        };
      case 'discount':
        return {
          icon: <Tag className="w-3.5 h-3.5 text-emerald-400" />,
          glowColor: 'rgba(16, 185, 129, 0.45)',
          borderColor: 'border-emerald-500/70',
          metallicClass: 'metallic-border-discount',
          badgeBg: 'bg-emerald-950/70 border-emerald-800/80 text-emerald-300',
          pingColor: 'bg-emerald-500',
          defaultTag: t('dynamicIslandDiscount')
        };
      case 'special_event':
        return {
          icon: <Calendar className="w-3.5 h-3.5 text-purple-400" />,
          glowColor: 'rgba(168, 85, 247, 0.45)',
          borderColor: 'border-purple-500/70',
          metallicClass: 'metallic-border-event',
          badgeBg: 'bg-purple-950/70 border-purple-800/80 text-purple-300',
          pingColor: 'bg-purple-500',
          defaultTag: t('dynamicIslandEvent')
        };
      case 'dish':
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
          glowColor: 'rgba(245, 158, 11, 0.45)',
          borderColor: 'border-amber-500/70',
          metallicClass: 'metallic-border-dish',
          badgeBg: 'bg-amber-950/70 border-amber-800/80 text-amber-300',
          pingColor: 'bg-amber-500',
          defaultTag: t('dynamicIslandChef')
        };
    }
  };

  const visuals = getPresetVisuals(promoType);


  // Cerrar tarjeta al pulsar fuera o pulsar tecla Escape
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  // Autonavegación inteligente con scroll guiado y halo de luz
  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);

    const targetType = promoPill.targetType || (promoPill.targetItemId ? 'dish' : 'category');
    const targetCategory = promoPill.targetCategory;
    const targetItemId = promoPill.targetItemId;

    // Si se especificó un plato concreto
    if (targetType === 'dish' && targetItemId) {
      // 1. Averiguar a qué categoría pertenece el plato si no viene especificada
      let resolvedCategory = targetCategory;
      if (!resolvedCategory) {
        for (const cat of categories) {
          if (cat.items.some(it => it.id === targetItemId)) {
            resolvedCategory = cat.id;
            break;
          }
        }
      }

      if (resolvedCategory) {
        window.dispatchEvent(new CustomEvent('select-category', { detail: resolvedCategory }));
      }

      // 2. Esperar al render o scroll de categoría y enfocar el plato
      setTimeout(() => {
        const dishEl = document.getElementById(`dish-${targetItemId}`);
        if (dishEl) {
          dishEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          dishEl.classList.remove('dish-highlighted');
          // Forzar re-trigger de la animación
          void dishEl.offsetWidth;
          dishEl.classList.add('dish-highlighted');

          setTimeout(() => {
            dishEl.classList.remove('dish-highlighted');
          }, 2900);
        } else if (resolvedCategory) {
          // Fallback a la categoría si el plato aún no estuviera en DOM
          const catEl = document.getElementById(resolvedCategory);
          if (catEl) catEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 180);
      return;
    }

    // Si apunta a una categoría general
    if (targetCategory && targetCategory !== 'none') {
      window.dispatchEvent(new CustomEvent('select-category', { detail: targetCategory }));
      setTimeout(() => {
        const catEl = document.getElementById(targetCategory);
        if (catEl) {
          catEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-center px-3.5 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-lg w-full flex justify-center">
        <AnimatePresence initial={false} mode="wait">
          {!isExpanded ? (
            /* --- ESTADO COMPACTO: Dynamic Island Atelier Gourmet con Medallón Kikko --- */
            <motion.button
              key="compact-pill"
              layoutId="dynamic-island-container"
              type="button"
              onClick={() => setIsExpanded(true)}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="group relative select-none cursor-pointer max-w-sm w-auto active:scale-95 transition-transform"
              aria-label="Abrir detalle de la promoción"
            >
              <div
                className="italian-flag-border"
                style={{
                  boxShadow: '0 14px 40px rgba(0,0,0,0.98), 0 0 20px rgba(0,146,70,0.3)'
                }}
              >
                <div className="metallic-inner rounded-full px-2.5 sm:px-3 py-2 flex items-center gap-2.5 sm:gap-3 bg-[#141A0F]">
                  {/* Sello / Medallón Pop-Art B&W con Borde Blanco Puro Minimalista */}
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white shadow-sm bg-[#141A0F] shrink-0">
                    <img
                      src="/kikko-mascot-face.png"
                      alt="Kikko Pizzeria"
                      className="w-full h-full object-cover scale-110"
                      loading="eager"
                    />
                  </div>

                  {/* Textos con Estilo Editorial */}
                  <div className="flex flex-col text-left pr-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">
                        {tagText}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                      <span className="text-[9px] text-zinc-400 uppercase tracking-wider">
                        {t('dynamicIslandChef') || 'Hoy'}
                      </span>
                    </div>
                    <span className="font-serif italic text-xs sm:text-sm text-white font-bold tracking-tight truncate max-w-[130px] sm:max-w-[190px]">
                      {titleText}
                    </span>
                  </div>

                  {/* Placa Biselada de Precios */}
                  {(originalPrice !== null || price !== null) && (
                    <div className="pl-2 border-l border-amber-900/60 flex flex-col items-end shrink-0">
                      {originalPrice !== null && (
                        <span className="text-[9px] text-zinc-400 line-through">
                          {originalPrice.toFixed(2)}€
                        </span>
                      )}
                      {price !== null && (
                        <span className="text-xs sm:text-sm font-black text-amber-400 font-sans tracking-tight">
                          {price.toFixed(2)}€
                        </span>
                      )}
                    </div>
                  )}

                  {/* Flecha / Indicador para invitar a expandir */}
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-xs transition-colors">
                    <ChevronUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </motion.button>
          ) : (
            /* --- ESTADO EXPANDIDO: Gourmet Card Atelier con Bandera de Italia --- */
            <motion.div
              key="expanded-card"
              layoutId="dynamic-island-container"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 27 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl italian-flag-card-border text-left"
              style={{
                boxShadow: '0 25px 60px rgba(0,0,0,0.98), 0 0 35px rgba(0,146,70,0.35)'
              }}
            >
              <div className="metallic-inner rounded-[22px] p-5 sm:p-6 bg-[#141A0F] flex flex-col gap-4">
                {/* Cabecera de la tarjeta: Medallón B&W de Kikko con Borde Blanco + Badge + Botón Cerrar */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-[#141A0F] shrink-0">
                      <img
                        src="/kikko-mascot-face.png"
                        alt="Kikko Pizzeria"
                        className="w-full h-full object-cover scale-110"
                      />
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${visuals.badgeBg}`}>
                      {visuals.icon}
                      <span className="uppercase tracking-wider text-[11px]">{tagText}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    className="p-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60 transition-colors cursor-pointer"
                    aria-label="Cerrar promoción"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Título & Descripción */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif italic text-xl sm:text-2xl text-white font-bold tracking-tight leading-snug">
                    {titleText}
                  </h3>
                  {descText && (
                    <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {descText}
                    </p>
                  )}
                </div>

                {/* Precios y Condiciones */}
                {(price !== null || originalPrice !== null) && (
                  <div className="flex items-baseline gap-2.5 pt-1 border-t border-zinc-800/80">
                    {originalPrice !== null && (
                      <span className="text-zinc-500 line-through text-sm sm:text-base font-medium">
                        Antes {originalPrice.toFixed(2)}€
                      </span>
                    )}
                    {price !== null && (
                      <span className="text-2xl sm:text-3xl font-black text-amber-400 font-sans tracking-tight">
                        {price.toFixed(2)}€
                      </span>
                    )}
                    {promoType === 'promo_2x1' && (
                      <span className="text-xs font-bold text-red-400 uppercase tracking-widest px-2 py-0.5 rounded bg-red-950/60 border border-red-800/50 ml-auto">
                        2x1 Especial
                      </span>
                    )}
                    {originalPrice !== null && price !== null && originalPrice > price && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 ml-auto">
                        Ahorras {(originalPrice - price).toFixed(2)}€
                      </span>
                    )}
                  </div>
                )}

                {/* Botón de Autonavegación directa al plato o sección */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleNavigate}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:brightness-110 text-zinc-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>{t('dynamicIslandViewDish')}</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="px-3.5 py-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-xs border border-zinc-800 transition-colors cursor-pointer"
                  >
                    {t('dynamicIslandClose')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
