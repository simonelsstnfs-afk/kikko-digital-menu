import { Star } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const GOOGLE_MAPS_REVIEW_URL = "https://maps.app.goo.gl/kikkoPizzeriaTenerife";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

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
              <GoogleIcon className="w-5 h-5" />
              <span>{t('googleCTABtn')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
