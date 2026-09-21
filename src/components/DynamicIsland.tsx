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
import { GOOGLE_MAPS_REVIEW_URL } from '../products';
import { trackEvent } from '../utils/analytics';

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 175.216 175.552" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ffffff" d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"/>
    <path fill="#25D366" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"/>
    <path fill="#ffffff" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"/>
  </svg>
);

export default function DynamicIsland() {
  const { promoPill, categories } = useMenuData();
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar scroll para colapsar la píldora en el botón Kikko con bocadillo al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Texto ultra-compacto para el bocadillo de charla al scroll (ej. "RESEÑANOS", "RESERVAR", "2x1", "Novedad")
  const getShortBubbleText = () => {
    const raw = (tagText || '').trim();
    if (/reseña|review|recensioni|5\s*★/i.test(raw) || promoType === 'google_review') return t('dynamicIslandGoogleReviewBubble') || 'RESEÑANOS';
    if (/reserva|booking|prenota/i.test(raw) || promoType === 'booking') return t('dynamicIslandBookingBubble') || 'RESERVAR';
    if (/2\s*x\s*1/i.test(raw) || promoType === 'promo_2x1') return '2x1';
    if (/novedad/i.test(raw) || promoType === 'promo_new') return 'Novedad';
    if (/sugerencia|chef/i.test(raw) || promoType === 'dish_suggestion') return t('dynamicIslandChef') || 'Sugerencia';
    if (/evento/i.test(raw) || promoType === 'event') return t('dynamicIslandEvent') || 'Evento';
    if (/oferta|rebaja/i.test(raw) || promoType === 'discount') return 'Oferta';
    return raw.length > 10 ? raw.slice(0, 9) + '…' : raw || 'Novedad';
  };
  const shortBubbleText = getShortBubbleText();

  // Icono y temática según el Preset
  const getPresetVisuals = (type: PromoType) => {
    switch (type) {
      case 'google_review':
        return {
          icon: <GoogleIcon className="w-3.5 h-3.5 shrink-0" />,
          glowColor: 'rgba(255, 255, 255, 0.35)',
          borderColor: 'border-white/40',
          metallicClass: 'metallic-border-google_review',
          badgeBg: 'bg-zinc-900/90 border-white/20 text-white',
          pingColor: 'bg-white',
          defaultTag: t('dynamicIslandGoogleReviewTag') || 'RESEÑAS',
          btnText: t('dynamicIslandGoogleReviewBtn') || 'Valorar en Google (5★)',
          btnGradient: 'from-white via-zinc-100 to-zinc-200 text-zinc-950 shadow-white/20 hover:bg-zinc-100',
          btnIcon: <GoogleIcon className="w-4 h-4 shrink-0" />,
          bubbleIcon: <GoogleIcon className="w-3.5 h-3.5 shrink-0" />,
          bubbleTextColor: 'text-white'
        };
      case 'booking':
        return {
          icon: <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />,
          glowColor: 'rgba(16, 185, 129, 0.45)',
          borderColor: 'border-emerald-500/70',
          metallicClass: 'metallic-border-booking',
          badgeBg: 'bg-zinc-900/90 border-emerald-500/40 text-white',
          pingColor: 'bg-emerald-500',
          defaultTag: t('dynamicIslandBookingTag') || 'RESERVAS',
          btnText: t('dynamicIslandBookingBtn') || 'Reservar Mesa en WhatsApp',
          btnGradient: 'from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 text-white shadow-lg border border-emerald-400/30',
          btnIcon: <WhatsAppIcon className="w-4 h-4 shrink-0" />,
          bubbleIcon: <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />,
          bubbleTextColor: 'text-white'
        };
      case 'promo_2x1':
        return {
          icon: <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />,
          glowColor: 'rgba(239, 68, 68, 0.45)',
          borderColor: 'border-red-500/70',
          metallicClass: 'metallic-border-promo_2x1',
          badgeBg: 'bg-red-950/70 border-red-800/80 text-red-300',
          pingColor: 'bg-red-500',
          defaultTag: t('dynamicIsland2x1'),
          btnText: t('dynamicIslandGoToDish') || 'Ir al plato en la carta',
          btnGradient: 'from-amber-500 via-amber-600 to-amber-700 text-zinc-950 shadow-amber-500/20'
        };
      case 'discount':
        return {
          icon: <Tag className="w-3.5 h-3.5 text-emerald-400" />,
          glowColor: 'rgba(16, 185, 129, 0.45)',
          borderColor: 'border-emerald-500/70',
          metallicClass: 'metallic-border-discount',
          badgeBg: 'bg-emerald-950/70 border-emerald-800/80 text-emerald-300',
          pingColor: 'bg-emerald-500',
          defaultTag: t('dynamicIslandDiscount'),
          btnText: t('dynamicIslandGoToDish') || 'Ir al plato en la carta',
          btnGradient: 'from-amber-500 via-amber-600 to-amber-700 text-zinc-950 shadow-amber-500/20'
        };
      case 'special_event':
        return {
          icon: <Calendar className="w-3.5 h-3.5 text-purple-400" />,
          glowColor: 'rgba(168, 85, 247, 0.45)',
          borderColor: 'border-purple-500/70',
          metallicClass: 'metallic-border-event',
          badgeBg: 'bg-purple-950/70 border-purple-800/80 text-purple-300',
          pingColor: 'bg-purple-500',
          defaultTag: t('dynamicIslandEvent'),
          btnText: t('dynamicIslandGoToDish') || 'Ir al plato en la carta',
          btnGradient: 'from-amber-500 via-amber-600 to-amber-700 text-zinc-950 shadow-amber-500/20'
        };
      case 'dish':
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
          glowColor: 'rgba(245, 158, 11, 0.45)',
          borderColor: 'border-amber-500/70',
          metallicClass: 'metallic-border-dish',
          badgeBg: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
          pingColor: 'bg-amber-500',
          defaultTag: t('dynamicIslandChef'),
          btnText: t('dynamicIslandGoToDish') || 'Ir al plato en la carta',
          btnGradient: 'from-amber-500 via-amber-600 to-amber-700 text-zinc-950 shadow-amber-500/20'
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

    // Tracking analítica fidedigna en Umami
    trackEvent('dynamic_island_action', {
      tipo: promoType,
      boton: visuals.btnText || 'Ir al plato en la carta'
    });

    const targetType = promoPill.targetType || (promoPill.targetItemId ? 'dish' : 'category');
    const targetCategory = promoPill.targetCategory;
    const targetItemId = promoPill.targetItemId;

    // Si es acción de Reseñas de Google
    if (promoType === 'google_review' || targetType === 'google_review') {
      trackEvent('google_review_clicked', { source: 'dynamic_island' });
      window.open(GOOGLE_MAPS_REVIEW_URL, '_blank', 'noopener,noreferrer');
      const reviewEl = document.getElementById('resenas');
      if (reviewEl) {
        reviewEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Si es acción de Reserva de mesa
    if (promoType === 'booking' || targetType === 'reservation') {
      const reservaEl = document.getElementById('reservas');
      if (reservaEl) {
        reservaEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        reservaEl.classList.remove('dish-highlighted');
        void reservaEl.offsetWidth;
        reservaEl.classList.add('dish-highlighted');
        setTimeout(() => {
          reservaEl.classList.remove('dish-highlighted');
        }, 2900);
      }
      return;
    }

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
    <div ref={containerRef} className="pointer-events-none">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* --- ESTADO EXPANDIDO: Gourmet Card Atelier Centrada --- */
          <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-center px-3.5 pointer-events-none">
            <motion.div
              key="expanded-card"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 27 }}
              className="pointer-events-auto relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden p-[2.5px] text-left"
              style={{
                boxShadow: '0 25px 60px rgba(0,0,0,0.98), 0 0 35px rgba(255,255,255,0.15)'
              }}
            >
              {/* Borde animado de luz blanca líquida (CSS Puro a 9s) */}
              <div className="white-border-card-spinner" aria-hidden="true" />

              <div className="relative z-10 rounded-[22px] p-5 sm:p-6 bg-[#141A0F] space-y-4">
                {/* Cabecera de la tarjeta: Medallón de Kikko + Badge + Botón Cerrar */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-[#141A0F] shrink-0">
                      <img
                        src="/kikko-mascot-face.png"
                        alt="Kikko Pizzeria"
                        className="w-full h-full object-cover scale-110"
                        loading="eager"
                      />
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${visuals.badgeBg}`}>
                      {visuals.icon}
                      <span className="uppercase tracking-wider text-[11px] font-black">{tagText}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                    }}
                    className="p-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Cerrar promoción"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Título & Descripción */}
                <div>
                  <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {titleText}
                  </h3>
                  {descText && (
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                      {descText}
                    </p>
                  )}
                </div>

                {/* Precios y Ahorro */}
                {(price !== null || originalPrice !== null) && (
                  <div className="flex items-baseline gap-2.5 pt-1 border-t border-zinc-800">
                    {originalPrice !== null && (
                      <span className="text-zinc-500 line-through text-xs font-sans">
                        {originalPrice.toFixed(2)}€
                      </span>
                    )}
                    {price !== null && (
                      <span className="text-2xl sm:text-3xl font-black text-amber-400 font-sans tracking-tight">
                        {price.toFixed(2)}€
                      </span>
                    )}
                    {promoType === 'promo_2x1' ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-red-950 text-red-400 border border-red-800/60 ml-auto">
                        2x1 Especial
                      </span>
                    ) : originalPrice !== null && price !== null && originalPrice > price ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800/60 ml-auto">
                        Ahorras {(originalPrice - price).toFixed(2)}€
                      </span>
                    ) : null}
                  </div>
                )}

                {/* Botón único de Acción a ancho completo */}
                <button
                  type="button"
                  onClick={handleNavigate}
                  className={`w-full py-3 rounded-2xl bg-gradient-to-r ${visuals.btnGradient || 'from-amber-500 via-amber-600 to-amber-700 text-zinc-950 shadow-amber-500/20'} font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer`}
                >
                  {visuals.btnIcon}
                  <span>{visuals.btnText || t('dynamicIslandGoToDish') || 'Ir al plato en la carta'}</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        ) : isScrolled ? (
          /* --- ESTADO AL SCROLL: Botón Kikko Flotante + Bocadillo de Conversación Compacto --- */
          <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 pointer-events-none">
            <motion.button
              key="scrolled-kikko-btn"
              type="button"
              onClick={() => {
                setIsExpanded(true);
                trackEvent('dynamic_island_opened', { tipo: promoType, vista: 'scrolled' });
              }}
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
              className="pointer-events-auto group flex flex-col items-end gap-1 cursor-pointer select-none active:scale-95 transition-transform"
              aria-label="Abrir promoción"
            >
              {/* Bocadillo de diálogo cómic ultra-compacto y ligero */}
              <div className="relative bg-[#141A0F] border border-white/25 text-white rounded-xl px-2.5 py-1 shadow-xl flex items-center gap-1.5">
                {visuals.bubbleIcon}
                <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${visuals.bubbleTextColor || 'text-amber-400'}`}>
                  {shortBubbleText}
                </span>
                <span className="text-[9px] text-zinc-400">↗</span>
                <div className="speech-tail-bottom" />
              </div>

              {/* Botón Circular con Avatar Kikko y Borde de Luz Blanca */}
              <div
                className="relative p-[2.5px] rounded-full overflow-hidden"
                style={{
                  boxShadow: '0 12px 30px rgba(0,0,0,0.95), 0 0 15px rgba(255,255,255,0.2)'
                }}
              >
                <div className="white-border-avatar-spinner" aria-hidden="true" />
                <div className="relative z-10 w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#141A0F] flex items-center justify-center">
                  <img
                    src="/kikko-mascot-face.png"
                    alt="Kikko Pizzeria"
                    className="w-full h-full object-cover scale-110"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.button>
          </div>
        ) : (
          /* --- ESTADO INICIAL (TOP): Píldora Completa Atelier Gourmet --- */
          <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-center px-3.5 pointer-events-none">
            <div className="pointer-events-auto max-w-lg w-full flex justify-center">
              <motion.button
                key="initial-pill"
                type="button"
                onClick={() => {
                  setIsExpanded(true);
                  trackEvent('dynamic_island_opened', { tipo: promoType, vista: 'top' });
                }}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="group relative select-none cursor-pointer max-w-sm w-auto active:scale-95 transition-transform"
                aria-label="Abrir detalle de la promoción"
              >
                <div
                  className="relative p-[2.5px] rounded-full overflow-hidden"
                  style={{
                    boxShadow: '0 14px 40px rgba(0,0,0,0.98), 0 0 20px rgba(255,255,255,0.15)'
                  }}
                >
                  {/* Borde animado de luz blanca líquida (CSS Puro a 7s) */}
                  <div className="white-border-spinner" aria-hidden="true" />

                  <div className="relative z-10 rounded-full px-2.5 sm:px-3 py-2 flex items-center gap-2.5 sm:gap-3 bg-[#141A0F]">
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
                      {promoType === 'google_review' ? (
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/20 bg-zinc-900/90 text-white shadow-sm">
                            <GoogleIcon className="w-3 h-3 shrink-0" />
                            <span className="text-[9.5px] font-black uppercase tracking-wider text-white">
                              {tagText}
                            </span>
                          </div>
                          <span className="text-[9.5px] text-zinc-400 font-medium">Google 4.7★</span>
                        </div>
                      ) : promoType === 'booking' ? (
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/40 bg-zinc-900/90 text-white shadow-sm">
                            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                            <span className="text-[9.5px] font-black uppercase tracking-wider text-white">
                              {tagText}
                            </span>
                          </div>
                          <span className="text-[9.5px] text-emerald-400/90 font-medium">WhatsApp Inmediato</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">
                            {tagText}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-amber-500/60" />
                          <span className="text-[9px] text-zinc-400 uppercase tracking-wider">
                            {t('dynamicIslandChef') || 'Hoy'}
                          </span>
                        </div>
                      )}
                      <span className="font-serif italic text-xs sm:text-sm text-white font-bold tracking-tight truncate max-w-[140px] sm:max-w-[200px] mt-0.5">
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
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs transition-colors ml-1 ${
                      promoType === 'google_review' || promoType === 'booking'
                        ? 'bg-white/10 group-hover:bg-white/25 text-white border border-white/20'
                        : 'bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-400'
                    }`}>
                      <ChevronUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
