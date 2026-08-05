import { menuData } from '../data';
import { motion } from 'motion/react';

export default function MenuSection() {
  return (
    <section id="carta" className="py-24 bg-[var(--color-kikko-dark)] relative overflow-hidden">
      
      {/* Sticky Category Navigation */}
      <div className="sticky top-20 z-40 bg-[var(--color-kikko-dark)]/80 backdrop-blur-xl py-4 mb-16 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start md:justify-center overflow-x-auto gap-8 no-scrollbar scroll-smooth">
            {menuData.map((category) => (
              <li key={category.id} className="shrink-0">
                <a
                  href={`#${category.id}`}
                  className="text-zinc-500 hover:text-white uppercase tracking-widest text-xs font-semibold transition-colors whitespace-nowrap px-2"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {menuData.map((category, idx) => {
          const isEven = idx % 2 === 0;
          
          return (
            <div key={category.id} className="scroll-mt-40 relative" id={category.id}>
              
              <div className={`relative z-10 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Menu Items */}
                <div className={`w-full ${category.categoryImage ? 'md:w-1/2' : 'max-w-3xl mx-auto'}`}>
                  <div className={`mb-10 ${!category.categoryImage ? 'text-center' : ''}`}>
                    <h4 className="font-serif text-4xl text-white font-bold tracking-tight">
                      {category.title}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-8">
                    {category.items.map((item, itemIdx) => (
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
                          <div className="flex-1 border-b border-zinc-800/60 border-dashed relative top-[-6px]"></div>
                          <span className="text-zinc-300 font-semibold whitespace-nowrap text-lg">
                            {item.price.toFixed(2)} €
                          </span>
                        </div>
                        <p className={`text-zinc-400 text-sm leading-relaxed ${!category.categoryImage ? 'max-w-full' : 'max-w-[90%]'}`}>
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Faded Category Image */}
                {category.categoryImage && (
                  <div className="w-full md:w-1/2 flex justify-center lg:justify-end">
                    <div className="relative w-full aspect-square max-w-lg">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${category.categoryImage})`,
                          maskImage: isEven 
                            ? 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                            : 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                          WebkitMaskImage: isEven 
                            ? 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                            : 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                        }}
                      />
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
