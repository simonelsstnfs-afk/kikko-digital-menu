import { Star, MessageSquare } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const GOOGLE_MAPS_REVIEW_URL = "https://maps.app.goo.gl/kikkoPizzeriaTenerife";

export default function GoogleReviewCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto my-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-[#2A1810] to-zinc-900 border border-[#C2410C]/20 p-8 md:p-12 shadow-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Glow & Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#C2410C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>Google My Business</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {t('googleCTAHeading')}
          </h3>

          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            {t('googleCTASub')}
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          <a
            href={GOOGLE_MAPS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>{t('googleCTABtn')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
