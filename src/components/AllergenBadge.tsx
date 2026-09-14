import React, { useState, useRef, useEffect } from 'react';
import { getAllergen } from '../allergens';
import { useLanguage } from '../LanguageContext';

interface AllergenBadgeProps {
  key?: React.Key;
  allergenId: string;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export default function AllergenBadge({
  allergenId,
  size = 'md',
  showTooltip = true
}: AllergenBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { language } = useLanguage();
  const allergen = getAllergen(allergenId);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  if (!allergen) return null;

  const name = allergen.name[language as keyof typeof allergen.name] || allergen.name.es;

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6 sm:w-7 sm:h-7',
    lg: 'w-9 h-9'
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-label={`Alérgeno: ${name}`}
        className={`relative rounded-full transition-transform duration-200 active:scale-90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500/50 flex-shrink-0 cursor-pointer ${sizeClasses[size]}`}
      >
        <img
          src={allergen.iconUrl}
          alt={name}
          className="w-full h-full object-contain rounded-full shadow-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          loading="lazy"
        />
      </button>

      {showTooltip && isOpen && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="bg-zinc-950/95 text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-500/30 shadow-2xl backdrop-blur-md whitespace-nowrap flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: allergen.color }}
            />
            <span>{name}</span>
          </div>
          <div className="w-2 h-2 bg-zinc-950 border-r border-b border-amber-500/30 rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </div>
  );
}
