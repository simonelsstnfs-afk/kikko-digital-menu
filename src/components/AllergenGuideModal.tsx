import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Info } from 'lucide-react';
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
  disclaimer: {
    es: 'En Kikko nos tomamos muy en serio tu salud. Aunque aplicamos estrictos protocolos de higiene y separación de ingredientes, en nuestra cocina se manipulan harinas y otros alérgenos, por lo que no podemos garantizar la ausencia total de trazas por contaminación cruzada. Si tienes alguna alergia o intolerancia severa, por favor informa a nuestro equipo de sala antes de ordenar.',
    en: 'At Kikko, your health is our priority. Although we follow strict hygiene and ingredient segregation protocols, flour and other allergens are handled in our kitchen, so we cannot guarantee the complete absence of cross-contamination traces. If you have a severe allergy or intolerance, please notify our staff before ordering.',
    it: 'Da Kikko prendiamo la tua salute molto sul serio. Sebbene applichiamo rigorosi protocolli di igiene e separazione degli ingredienti, nella nostra cucina vengono manipolate farine e altri allergeni, pertanto non possiamo garantire la totale assenza di tracce da contaminazione crociata. In caso di allergia o intolleranza grave, informa il nostro staff prima di ordinare.'
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0f140d] border border-amber-500/20 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                    {modalTexts.title[langKey]}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    {modalTexts.subtitle[langKey]}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-white/10 focus:outline-none"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-amber-500/5 border-b border-amber-500/15 flex items-start gap-3.5">
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans">
                {modalTexts.disclaimer[langKey]}
              </p>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-230px)] custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {ALLERGENS.map((allergen) => {
                  const name = allergen.name[langKey];
                  const desc = allergen.description[langKey];

                  return (
                    <div
                      key={allergen.id}
                      className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-500/30 rounded-2xl p-4 transition-all duration-200 flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex-shrink-0 rounded-full bg-black/40 p-1 border border-white/10 group-hover:scale-105 transition-transform">
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
            </div>

            <div className="p-4 sm:p-6 border-t border-white/10 bg-white/[0.02] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95"
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
