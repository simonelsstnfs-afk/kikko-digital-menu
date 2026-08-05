import { useState, useEffect, useRef } from 'react';
import { menuData } from '../data';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { MenuItem } from '../types';

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
            // Centrar el tab activo en la barra de navegación en móviles
            const container = scrollContainerRef.current;
            const activeTab = document.getElementById(`tab-${entry.target.id}`);
            if (container && activeTab) {
              const scrollLeft = activeTab.offsetLeft - container.clientWidth / 2 + activeTab.clientWidth / 2;
              container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
          }
        });
      },
      // El margen superior compensa el navbar fijo + la propia barra sticky
      { rootMargin: '-220px 0px -60% 0px' }
    );

    menuData.forEach((category) => {
      const el = document.getElementById(category.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="carta" className="pt-2 pb-12 md:pb-24 bg-[#141A0F] relative scroll-mt-32">
      
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-32">
        {menuData.map((category, idx) => {
          const isEven = idx % 2 === 0;
          
          // Group items by subcategory
          const groupedItems = category.items.reduce((acc, item) => {
            const sub = item.subcategory || 'default';
            if (!acc[sub]) acc[sub] = [];
            acc[sub].push(item);
            return acc;
          }, {} as Record<string, MenuItem[]>);
          
          return (
            <div key={category.id} className="scroll-mt-64 relative" id={category.id}>
              
              <div className={`relative z-10 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-16 items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl`}>
                
                {/* Menu Items */}
                <div className={`w-full ${category.categoryImage ? 'md:w-1/2' : 'max-w-3xl mx-auto'}`}>
                  <div className={`mb-10 ${!category.categoryImage ? 'text-center' : ''}`}>
                    <h4 className="font-serif text-4xl text-white font-bold tracking-tight">
                      {t(category.titleKey)}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-12">
                    {Object.entries(groupedItems).map(([sub, items]) => (
                      <div key={sub} className="flex flex-col gap-8">
                        {sub !== 'default' && (
                          <h6 className="font-serif text-2xl text-zinc-400 font-medium border-b border-zinc-800/60 pb-2">
                            {sub}
                          </h6>
                        )}
                        <div className="flex flex-col gap-8">
                          {items.map((item, itemIdx) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{ duration: 0.4, delay: itemIdx * 0.05 }}
                              className="group flex flex-col gap-2"
                            >
                              <div className="flex justify-between items-baseline gap-4">
                                <h5 className="font-serif text-xl text-white font-medium">
                                  {item.name}
                                </h5>
                                <div className="flex-1 border-b border-zinc-700/50 border-dashed relative top-[-6px]"></div>
                                <span className="text-zinc-200 font-semibold whitespace-nowrap text-lg">
                                  {item.price.toFixed(2)} €
                                </span>
                              </div>
                              {item.description[language as keyof typeof item.description] && (
                                <p className={`text-zinc-400 text-sm leading-relaxed ${!category.categoryImage ? 'max-w-full' : 'max-w-[90%]'}`}>
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

                {/* Faded Category Image */}
                {category.categoryImage && (
                  <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className="relative w-full aspect-[3/4] max-w-md rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/10 group">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${category.categoryImage})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
