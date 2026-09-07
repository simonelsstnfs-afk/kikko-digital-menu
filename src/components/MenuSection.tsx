import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { useMenuData } from '../context/MenuDataContext';
import { MenuItem } from '../types';

const categorySubtitles: Record<string, Record<string, string>> = {
  entrantes: { es: 'Para Empezar Bien', en: 'To Start Well', it: 'Per Iniziare Bene' },
  pizzas: { es: 'Masa Madre Italiana', en: 'Italian Sourdough', it: 'Lievito Madre Italiano' },
  pastas: { es: 'Recetas Tradicionales', en: 'Traditional Recipes', it: 'Ricette Tradizionali' },
  risottos: { es: 'Cremosos y Auténticos', en: 'Creamy & Authentic', it: 'Cremosi e Autentici' },
  segundos: { es: 'Carnes de Primera', en: 'Premium Meats', it: 'Carni di Prima Scelta' },
  hamburguesas: { es: 'Sabor Irresistible', en: 'Irresistible Flavor', it: 'Sapore Irresistibile' },
  postres: { es: 'El Dulce Final', en: 'The Sweet Ending', it: 'Il Dolce Finale' },
  bebidas: { es: 'Para Acompañar', en: 'To go with', it: 'Per Accompagnare' }
};

const subcategoryTranslations: Record<string, Record<string, string>> = {
  'Refrescos': { es: 'Refrescos', en: 'Soft Drinks', it: 'Bibite' },
  'Cervezas': { es: 'Cervezas', en: 'Beers', it: 'Birre' },
  'Vinos': { es: 'Vinos', en: 'Wines', it: 'Vini' },
  'Cócteles': { es: 'Cócteles', en: 'Cocktails', it: 'Cocktail' },
  'Cafés': { es: 'Cafés', en: 'Coffees', it: 'Caffè' },
  'Amaros': { es: 'Amaros', en: 'Spirits & Liqueurs', it: 'Amari e Liquori' }
};

export default function MenuSection() {
  const { categories } = useMenuData();
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || 'entrantes');
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (categories.length > 0 && !categories.some(c => c.id === activeCategory)) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
            const container = scrollContainerRef.current;
            const activeTab = document.getElementById(`tab-${entry.target.id}`);
            if (container && activeTab) {
              const scrollLeft = activeTab.offsetLeft - container.clientWidth / 2 + activeTab.clientWidth / 2;
              container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
          }
        });
      },
      { rootMargin: '-220px 0px -60% 0px' }
    );

    categories.forEach((category) => {
      const el = document.getElementById(category.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const categoryId = customEvent.detail;
      const el = document.getElementById(categoryId);
      if (el) {
        const yOffset = -220; 
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    
    window.addEventListener('select-category', handleSelectCategory);
    return () => window.removeEventListener('select-category', handleSelectCategory);
  }, []);

  return (
    <section id="carta" className="bg-transparent relative scroll-mt-32">
      
      {/* Global backgrounds for MenuSection (Optimized for Mobile GPU using Sticky) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 bg-[#141A0F]"></div>
          {categories.map((category) => (
            <div
              key={`bg-${category.id}`}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
              style={{
                backgroundImage: `url(${category.categoryImage})`,
                opacity: activeCategory === category.id ? 1 : 0,
                willChange: 'opacity'
              }}
            />
          ))}
          <div className="absolute inset-0 bg-[#141A0F]/25 backdrop-blur-[2px]"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Sticky Category Navigation */}
      <div className="sticky top-[104px] sm:top-[108px] z-40 py-1 border-b border-zinc-900" style={{ backgroundColor: 'rgba(20, 26, 15, 0.98)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="max-w-6xl mx-auto relative">
          {/* Fade-out lateral para indicar scroll en móvil */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#141A0F] to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#141A0F] to-transparent z-10 pointer-events-none md:hidden" />
          <ul ref={scrollContainerRef} role="tablist" aria-label="Categorías del menú" className="flex items-center justify-start md:justify-center overflow-x-auto gap-2 no-scrollbar scroll-smooth px-2 sm:px-6 lg:px-8">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <li key={category.id} id={`tab-${category.id}`} role="tab" aria-selected={activeCategory === category.id} className="relative shrink-0">
                  <a
                    href={`#${category.id}`}
                    className={`block px-4 py-3 uppercase tracking-widest text-sm md:text-base font-semibold transition-colors whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {t(category.titleKey)}
                  </a>
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-[3px] rounded-t-sm"
                      style={{ background: 'linear-gradient(to right, #009246 33.3%, #ffffff 33.3%, #ffffff 66.6%, #ce2b37 66.6%)' }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-col">
        {categories.map((category) => {
          
          // Group items by subcategory (filtrando platos no disponibles)
          const visibleItems = category.items.filter(item => item.available !== false);
          const groupedItems = visibleItems.reduce((acc, item) => {
            const sub = item.subcategory || 'default';
            if (!acc[sub]) acc[sub] = [];
            acc[sub].push(item);
            return acc;
          }, {} as Record<string, MenuItem[]>);
          
          return (
            <div 
              key={category.id} 
              className="scroll-mt-[220px] relative py-20 sm:py-32" 
              id={category.id}
            >
              <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Títulos */}
                <div className="text-center mb-16 flex flex-col items-center">
                  <motion.h4 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-5xl md:text-7xl text-white font-bold tracking-tight relative z-10"
                  >
                    {t(category.titleKey)}
                  </motion.h4>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="block font-cursive text-4xl md:text-5xl text-amber-500 -mt-2 md:-mt-4 relative z-20"
                  >
                    {categorySubtitles[category.id] 
                      ? categorySubtitles[category.id][language as keyof typeof categorySubtitles[string]] || categorySubtitles[category.id]['es'] 
                      : 'Selección Premium'}
                  </motion.span>
                </div>

                {/* Platos */}
                <div className="flex flex-col gap-12">
                  {Object.entries(groupedItems).map(([sub, items]: [string, MenuItem[]]) => (
                    <div key={sub} className="flex flex-col gap-4">
                      {sub !== 'default' && (
                        <h6 className="font-serif text-3xl text-zinc-300 font-medium border-b border-zinc-700/50 pb-2 mb-4 text-center md:text-left">
                          {subcategoryTranslations[sub] 
                            ? subcategoryTranslations[sub][language as keyof typeof subcategoryTranslations[string]] || subcategoryTranslations[sub]['es']
                            : sub}
                        </h6>
                      )}
                      
                      <div className="flex flex-col gap-4">
                        {items.map((item, itemIdx) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: itemIdx * 0.05 }}
                            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-8 hover:bg-white/[0.05] transition-colors"
                          >
                            <div className="flex justify-between items-start sm:items-center gap-4 w-full">
                              <h5 className="font-sans text-[1.1rem] md:text-xl text-white font-bold tracking-wide flex-shrink max-w-[75%] leading-tight">
                                {typeof item.name === 'string' ? item.name : item.name[language as keyof typeof item.name] || (item.name as any)['es']}
                              </h5>
                              <div className="flex-shrink-0 px-3 py-1 rounded-full border border-white/60 bg-white/10 backdrop-blur-sm">
                                <span className="font-sans text-white font-bold whitespace-nowrap text-[0.95rem] md:text-base">
                                  {item.price.toFixed(2)} €
                                </span>
                              </div>
                            </div>
                            
                            {item.description[language as keyof typeof item.description] && (
                              <p className="font-sans text-[0.95rem] md:text-base text-white font-normal leading-relaxed mt-3 w-full md:max-w-[85%]">
                                {item.description[language as keyof typeof item.description]}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
