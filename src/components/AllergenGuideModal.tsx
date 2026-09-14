import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { ALLERGENS } from '../allergens';
import { useLanguage } from '../LanguageContext';

interface AllergenGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalTexts = {
  title: {
    es: 'Guía Oficial de Alérgenos',
    en: 'Official Allergen Guide',
    it: 'Guida Ufficiale agli Allergeni'
  },
  subtitle: {
    es: 'Reglamento (UE) Nº 1169/2011',
    en: 'EU Regulation No. 1169/2011',
    it: 'Regolamento (UE) N. 1169/2011'
  },
  disclaimerCompact: {
    es: 'En nuestra cocina se manipulan harinas y otros ingredientes con posibles trazas. Si tienes alguna alergia o intolerancia severa, por favor informa a nuestro equipo de sala antes de ordenar.',
    en: 'Flour and other ingredients are handled in our kitchen with possible cross-contamination traces. If you have a severe allergy or intolerance, please notify our staff before ordering.',
    it: 'Nella nostra cucina si manipolano farine e altri ingredienti con possibili tracce. In caso di allergia o intolleranza grave, informa il personale prima di ordinare.'
  },
  disclaimerFull: {
    es: 'En Kikko nos tomamos muy en serio tu salud. Aunque aplicamos estrictos protocolos de higiene y separación de ingredientes, en nuestra cocina se manipulan harinas y otros alérgenos, por lo que no podemos garantizar la ausencia total de trazas por contaminación cruzada. Si tienes alguna alergia o intolerancia severa, por favor informa a nuestro equipo de sala antes de ordenar.',
    en: 'At Kikko, your health is our priority. Although we follow strict hygiene and ingredient segregation protocols, flour and other allergens are handled in our kitchen, so we cannot guarantee the complete absence of cross-contamination traces. If you have a severe allergy or intolerance, please notify our staff before ordering.',
    it: 'Da Kikko prendiamo la tua salute molto sul serio. Sebbene applichiamo rigorosi protocolli di igiene e separazione degli ingredienti, nella nostra cucina vengono manipolate farine e altri allergeni, pertanto non possiamo garantire la totale assenza di tracce da contaminazione crociata. In caso di allergia o intolleranza grave, informa il nostro staff prima di ordinare.'
  },
  readMore: {
    es: 'Ver aviso completo',
    en: 'Read full notice',
    it: 'Leggi avviso completo'
  },
  readLess: {
    es: 'Menos detalle',
    en: 'Show less',
    it: 'Meno dettagli'
  },
  close: {
    es: 'Cerrar Guía',
    en: 'Close Guide',
    it: 'Chiudi Guida'
  }
};

export default function AllergenGuideModal({ isOpen, onClose }: AllergenGuideModalProps) {
  const { language } = useLanguage();
  const langKey = (language as 'es' | 'en' | 'it') || 'es';
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[92vh] sm:h-auto sm:max-h-[88vh] flex flex-col bg-[#0f140d] border border-amber-500/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Cabecera Fija y Compacta */}
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-5 border-b border-white/10 bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-xl font-serif font-bold text-white tracking-wide leading-snug">
                    {modalTexts.title[langKey]}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 font-sans">
                    {modalTexts.subtitle[langKey]}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-white/10 focus:outline-none cursor-pointer shrink-0"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Contenido Scrolleable (El disclaimer vive adentro y hace scroll con la lista) */}
            <div className="p-3.5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar space-y-3.5 sm:space-y-5">
              {/* Disclaimer Compacto / Desplegable dentro del scroll */}
              <div className="p-3 sm:p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl sm:rounded-2xl text-amber-200/90 font-sans">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm leading-relaxed text-amber-200">
                      {isDisclaimerExpanded 
                        ? modalTexts.disclaimerFull[langKey] 
                        : modalTexts.disclaimerCompact[langKey]}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] sm:text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer transition-colors"
                    >
                      <span>{isDisclaimerExpanded ? modalTexts.readLess[langKey] : modalTexts.readMore[langKey]}</span>
                      {isDisclaimerExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid de los 14 Alérgenos Oficiales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                {ALLERGENS.map((allergen) => {
                  const name = allergen.name[langKey];
                  const desc = allergen.description[langKey];

                  return (
                    <div
                      key={allergen.id}
                      className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-200 flex flex-col gap-2 sm:gap-2.5"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-full bg-black/40 p-1 border border-white/10 group-hover:scale-105 transition-transform">
                          <img
                            src={allergen.iconUrl}
                            alt={name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                              #{allergen.number}
                            </span>
                            <h4 className="text-sm sm:text-base font-sans font-bold text-white truncate">
                              {name}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300/80 font-sans leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Botón de cerrar al final del contenido en móvil */}
              <div className="pt-2 pb-4 flex justify-center sm:hidden">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-amber-500 active:bg-amber-400 text-black font-bold text-sm shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
                >
                  {modalTexts.close[langKey]}
                </button>
              </div>
            </div>

            {/* Footer Solo para Desktop (evita perder espacio vertical fijo en móvil) */}
            <div className="hidden sm:flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02] shrink-0">
              <span className="text-xs text-zinc-400 font-sans">
                14 alérgenos de declaración obligatoria según normativa europea
              </span>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                {modalTexts.close[langKey]}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
