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
      { rootMargin: '-220px 0px -60% 0px' }
    );

    menuData.forEach((category) => {
      const el = document.getElementById(category.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="carta" className="pt-2 pb-12 md:pb-32 bg-[#141A0F] relative scroll-mt-32 overflow-hidden">
      
      {/* Elementos decorativos de fondo para darle más creatividad */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[30%] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[40%] bg-amber-700/10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      {/* Sticky Category Navigation */}
      <div className="sticky top-[104px] sm:top-[108px] z-40 py-1 border-b border-zinc-900/50" style={{ backgroundColor: 'rgba(20, 26, 15, 0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <ul ref={scrollContainerRef} className="flex items-center justify-start md:justify-center overflow-x-auto gap-1 sm:gap-4 no-scrollbar scroll-smooth px-2">
            {menuData.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <li key={category.id} id={`tab-${category.id}`} className="relative shrink-0">
                  <a
                    href={`#${category.id}`}
                    className={`block px-4 py-3 uppercase tracking-[0.2em] text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                      isActive ? 'text-white scale-105' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {t(category.titleKey)}
                  </a>
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-[2px] rounded-t-sm"
                      style={{ background: 'linear-gradient(to right, #009246 33.3%, #ffffff 33.3%, #ffffff 66.6%, #ce2b37 66.6%)' }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-24 md:space-y-40">
        {menuData.map((category, idx) => {
          const isEven = idx % 2 === 0;
          
          const groupedItems = category.items.reduce((acc, item) => {
            const sub = item.subcategory || 'default';
            if (!acc[sub]) acc[sub] = [];
            acc[sub].push(item);
            return acc;
          }, {} as Record<string, MenuItem[]>);
          
          return (
            <div key={category.id} className="scroll-mt-64 relative" id={category.id}>
              
              <div className={`relative z-10 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-2xl`}>
                
                {/* Categoría Header & Items */}
                <div className={`w-full ${category.categoryImage ? 'md:w-7/12' : 'max-w-4xl mx-auto'} relative z-20`}>
                  
                  {/* Título Creativo de la Sección */}
                  <div className={`mb-12 ${!category.categoryImage ? 'text-center' : 'text-center md:text-left'} relative`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h4 className="font-sans text-5xl md:text-7xl text-white font-black tracking-tighter uppercase opacity-90 drop-shadow-lg">
                        {t(category.titleKey)}
                      </h4>
                      {/* Subtítulo decorativo en fuente serif cursiva para contrastar */}
                      <span className="block font-serif italic text-xl md:text-3xl text-[#009246] mt-[-10px] md:mt-[-15px] ml-2 md:ml-4 opacity-90">
                        Selezione
                      </span>
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-14">
                    {Object.entries(groupedItems).map(([sub, items]) => (
                      <div key={sub} className="flex flex-col gap-8">
                        {sub !== 'default' && (
                          <div className="flex items-center gap-4">
                            <h6 className="font-serif italic text-2xl text-amber-500/90 font-medium tracking-wide">
                              {sub}
                            </h6>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
                          </div>
                        )}
                        <div className="flex flex-col gap-6">
                          {items.map((item, itemIdx) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{ duration: 0.5, delay: itemIdx * 0.05 }}
                              className="group flex flex-col gap-1 w-full"
                            >
                              <div className="flex justify-between items-end gap-3 sm:gap-6 w-full">
                                <h5 className="font-sans text-[1.1rem] sm:text-xl text-zinc-100 font-bold uppercase tracking-wide leading-none pb-1">
                                  {item.name}
                                </h5>
                                <div className="flex-1 border-b-[2px] border-zinc-700/40 border-dotted mb-2"></div>
                                <span className="font-sans text-white font-bold text-lg sm:text-xl leading-none pb-1">
                                  {item.price.toFixed(2)}
                                </span>
                              </div>
                              {item.description[language as keyof typeof item.description] && (
                                <p className={`font-sans text-[0.65rem] sm:text-xs font-semibold text-zinc-500 uppercase tracking-[0.15em] leading-relaxed mt-1 ${!category.categoryImage ? 'max-w-full' : 'max-w-[90%]'}`}>
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

                {/* Imagen Flotante Creativa */}
                {category.categoryImage && (
                  <div className="w-full md:w-5/12 flex justify-center items-center relative z-10 mt-10 md:mt-0">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, rotate: isEven ? -5 : 5 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: isEven ? 3 : -3 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className={`relative w-[85%] max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[8px] border-white/5 ${isEven ? 'md:translate-x-12' : 'md:-translate-x-12'}`}
                    >
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${category.categoryImage})`,
                        }}
                      />
                      {/* Overlay sutil para integrar con el fondo oscuro */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#141A0F]/60 via-transparent to-transparent"></div>
                    </motion.div>
                    
                    {/* Elementos decorativos flotantes detrás de la imagen */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-[-10%] right-[-10%] text-6xl opacity-10 blur-[2px] pointer-events-none"
                    >
                      ✦
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="absolute bottom-[-5%] left-[-5%] text-8xl opacity-5 blur-[4px] pointer-events-none"
                    >
                      ✺
                    </motion.div>
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
