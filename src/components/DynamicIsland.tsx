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
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

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
          glowColor: 'rgba(239, 68, 68, 0.4)',
          borderColor: 'border-red-500/60',
          badgeBg: 'bg-red-950/70 border-red-800/80 text-red-300',
          pingColor: 'bg-red-500',
          defaultTag: t('dynamicIsland2x1')
        };
      case 'discount':
        return {
          icon: <Tag className="w-3.5 h-3.5 text-emerald-400" />,
          glowColor: 'rgba(16, 185, 129, 0.4)',
          borderColor: 'border-emerald-500/60',
          badgeBg: 'bg-emerald-950/70 border-emerald-800/80 text-emerald-300',
          pingColor: 'bg-emerald-500',
          defaultTag: t('dynamicIslandDiscount')
        };
      case 'special_event':
        return {
          icon: <Calendar className="w-3.5 h-3.5 text-purple-400" />,
          glowColor: 'rgba(168, 85, 247, 0.4)',
          borderColor: 'border-purple-500/60',
          badgeBg: 'bg-purple-950/70 border-purple-800/80 text-purple-300',
          pingColor: 'bg-purple-500',
          defaultTag: t('dynamicIslandEvent')
        };
      case 'dish':
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
          glowColor: 'rgba(245, 158, 11, 0.4)',
          borderColor: 'border-[#C2410C]/60',
          badgeBg: 'bg-amber-950/70 border-amber-800/80 text-amber-300',
          pingColor: 'bg-amber-500',
          defaultTag: t('dynamicIslandChef')
        };
    }
  };

  const visuals = getPresetVisuals(promoType);

  // Microinteracción al hacer scroll: minimizar presencia si el usuario scrollea rápido hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current + 25 && currentScrollY > 150) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY.current - 15) {
        setIsScrollingDown(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className={`fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-center px-3.5 pointer-events-none transition-all duration-300 ${
        isScrollingDown && !isExpanded ? 'translate-y-6 opacity-40 hover:opacity-100 hover:translate-y-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="pointer-events-auto max-w-lg w-full flex justify-center">
        <AnimatePresence initial={false} mode="wait">
          {!isExpanded ? (
            /* --- ESTADO COMPACTO: Dynamic Island Pill --- */
            <motion.button
              key="compact-pill"
              layoutId="dynamic-island-container"
              type="button"
              onClick={() => setIsExpanded(true)}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className={`group relative flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-zinc-950/85 backdrop-blur-2xl border ${visuals.borderColor} shadow-[0_10px_35px_-5px_rgba(0,0,0,0.85)] hover:shadow-[0_12px_40px_-4px_${visuals.glowColor}] transition-all duration-300 cursor-pointer active:scale-95`}
              style={{
                boxShadow: `0 10px 30px -5px rgba(0,0,0,0.9), 0 0 20px ${visuals.glowColor}`
              }}
              aria-label="Abrir detalle de la promoción"
            >
              {/* Radar Ping pulsante */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${visuals.pingColor} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${visuals.pingColor}`} />
              </span>

              {/* Tag / Etiqueta */}
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white px-2 py-0.5 rounded-md bg-white/10 border border-white/10 whitespace-nowrap">
                {tagText}
              </span>

              {/* Título de la Promoción */}
              <span className="font-sans text-xs sm:text-sm font-semibold text-zinc-100 truncate max-w-[140px] sm:max-w-[220px]">
                {titleText}
              </span>

              {/* Precio o Indicador de Oferta */}
              {originalPrice !== null && price !== null && (
                <div className="flex items-center gap-1 shrink-0 text-xs font-bold">
                  <span className="line-through text-zinc-400 text-[10px] sm:text-xs">
                    {originalPrice.toFixed(2)}€
                  </span>
                  <span className="text-emerald-400 font-extrabold text-xs sm:text-sm">
                    {price.toFixed(2)}€
                  </span>
                </div>
              )}

              {originalPrice === null && price !== null && (
                <span className="text-amber-400 font-extrabold text-xs sm:text-sm shrink-0">
                  {price.toFixed(2)}€
                </span>
              )}

              {/* Icono de chevron para invitar a expandir */}
              <div className="w-5 h-5 rounded-full bg-white/5 group-hover:bg-white/15 flex items-center justify-center shrink-0 text-zinc-400 group-hover:text-white transition-colors">
                <ChevronUp className="w-3 h-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </div>
            </motion.button>
          ) : (
            /* --- ESTADO EXPANDIDO: Gourmet Card --- */
            <motion.div
              key="expanded-card"
              layoutId="dynamic-island-container"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 27 }}
              className={`relative w-full max-w-sm sm:max-w-md p-5 sm:p-6 rounded-3xl bg-zinc-950/95 backdrop-blur-3xl border ${visuals.borderColor} shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col gap-4 text-left`}
              style={{
                boxShadow: `0 20px 50px rgba(0,0,0,0.95), 0 0 35px ${visuals.glowColor}`
              }}
            >
              {/* Cabecera de la tarjeta: Badge + Botón Cerrar */}
              <div className="flex items-center justify-between gap-3">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${visuals.badgeBg}`}>
                  {visuals.icon}
                  <span className="uppercase tracking-wider text-[11px]">{tagText}</span>
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
                <h3 className="font-serif text-xl sm:text-2xl text-white font-bold tracking-tight leading-snug">
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
                <div className="flex items-baseline gap-2.5 pt-1">
                  {originalPrice !== null && (
                    <span className="text-zinc-500 line-through text-sm sm:text-base font-medium">
                      Antes {originalPrice.toFixed(2)}€
                    </span>
                  )}
                  {price !== null && (
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-sans tracking-tight">
                      {price.toFixed(2)}€
                    </span>
                  )}
                  {promoType === 'promo_2x1' && (
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest px-2 py-0.5 rounded bg-red-950/60 border border-red-800/50">
                      2x1 Especial
                    </span>
                  )}
                </div>
              )}

              {/* Botón de Autonavegación directa al plato o sección */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNavigate}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#C2410C] to-amber-600 hover:from-[#d9480f] hover:to-amber-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#C2410C]/30 hover:shadow-[#C2410C]/50 transition-all duration-200 cursor-pointer active:scale-[0.98]"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
