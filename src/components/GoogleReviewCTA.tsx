import { Star, MessageSquare } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const GOOGLE_MAPS_REVIEW_URL = "https://maps.app.goo.gl/kikkoPizzeriaTenerife";

export default function GoogleReviewCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-zinc-900/50 rounded-3xl p-8 md:p-12 shadow-2xl border border-zinc-800 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          
          {/* Subtle glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C2410C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 max-w-xl relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800">
              <div className="flex items-center gap-1 text-[#C2410C]">
                <span className="font-bold text-white text-sm mr-1">4.7</span>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i === 4 ? 'fill-[#C2410C]/30 text-[#C2410C]/30' : 'fill-current'}`} />
                ))}
              </div>
              <div className="w-px h-4 bg-zinc-800"></div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">+365 {t('googleCTAReviews')}</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-serif font-medium text-white tracking-tight">
              {t('googleCTAHeading')}
            </h3>

            <p className="text-zinc-400 text-base leading-relaxed">
              {t('googleCTASub')}
            </p>
          </div>

          <div className="relative z-10 w-full md:w-auto flex-shrink-0">
            <a
              href={GOOGLE_MAPS_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-white text-zinc-950 text-sm uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-colors focus:ring-2 focus:ring-white/50"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t('googleCTABtn')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
