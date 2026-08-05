import { useState, useEffect, useRef } from 'react';
import { menuData } from '../data';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { MenuItem } from '../types';

const categorySubtitles: Record<string, string> = {
  entrantes: 'Para Empezar Bien',
  pizzas: 'Masa Madre Italiana',
  pastas: 'Recetas Tradicionales',
  risottos: 'Cremosos y Auténticos',
  segundos: 'Carnes de Primera',
  hamburguesas: 'Sabor Irresistible',
  postres: 'El Dulce Final',
  bebidas: 'Para Acompañar'
};

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>(menuData[0].id);
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const { t, language } = useLanguage();

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

    menuData.forEach((category) => {
      const el = document.getElementById(category.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="carta" className="pt-2 bg-[#141A0F] relative scroll-mt-32">
      
      {/* Sticky Category Navigation */}
      <div className="sticky top-[104px] sm:top-[108px] z-40 py-1 border-b border-zinc-900" style={{ backgroundColor: 'rgba(20, 26, 15, 0.98)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
          <ul ref={scrollContainerRef} className="flex items-center justify-start md:justify-center overflow-x-auto gap-2 no-scrollbar scroll-smooth">
            {menuData.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <li key={category.id} id={`tab-${category.id}`} className="relative shrink-0">
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
        {menuData.map((category) => {
          
          // Group items by subcategory
          const groupedItems = category.items.reduce((acc, item) => {
            const sub = item.subcategory || 'default';
            if (!acc[sub]) acc[sub] = [];
            acc[sub].push(item);
            return acc;
          }, {} as Record<string, MenuItem[]>);
          
          return (
            <div 
              key={category.id} 
              className="scroll-mt-32 relative py-20 sm:py-32" 
              id={category.id}
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
                style={{ backgroundImage: `url(${category.categoryImage})` }}
              />
              {/* Overlay oscuro sin blur para asegurar legibilidad de textos blancos, 
                  dejando la imagen 100% visible entre tarjetas */}
              <div className="absolute inset-0 bg-black/60 z-0" />
              {/* Desenfoque en los bordes para transición suave (mismo estilo que los platos pero con máscara de degradado) */}
              <div className="absolute inset-x-0 top-0 h-40 sm:h-64 backdrop-blur-xl bg-gradient-to-b from-black/90 to-transparent [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] z-0 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-40 sm:h-64 backdrop-blur-xl bg-gradient-to-t from-black/90 to-transparent [mask-image:linear-gradient(to_top,black_0%,transparent_100%)] z-0 pointer-events-none" />
              
              <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Títulos */}
                <div className="text-center mb-16">
                  <motion.h4 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-5xl md:text-7xl text-white font-bold tracking-tight mb-2"
                  >
                    {t(category.titleKey)}
                  </motion.h4>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="block font-serif italic text-2xl md:text-3xl text-amber-500"
                  >
                    {categorySubtitles[category.id] || 'Selección Premium'}
                  </motion.span>
                </div>

                {/* Platos */}
                <div className="flex flex-col gap-12">
                  {Object.entries(groupedItems).map(([sub, items]) => (
                    <div key={sub} className="flex flex-col gap-4">
                      {sub !== 'default' && (
                        <h6 className="font-serif text-3xl text-zinc-300 font-medium border-b border-zinc-700/50 pb-2 mb-4 text-center md:text-left">
                          {sub}
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
                                {item.name}
                              </h5>
                              <div className="flex-shrink-0 px-3 py-1 rounded-full border border-white/40 bg-white/5 backdrop-blur-sm">
                                <span className="font-sans text-white font-bold whitespace-nowrap text-[0.95rem] md:text-base">
                                  {item.price.toFixed(2)} €
                                </span>
                              </div>
                            </div>
                            
                            {item.description[language as keyof typeof item.description] && (
                              <p className="font-sans text-sm md:text-[0.9rem] text-zinc-400 font-normal leading-relaxed mt-3 w-full md:max-w-[85%]">
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
    </section>
  );
}
