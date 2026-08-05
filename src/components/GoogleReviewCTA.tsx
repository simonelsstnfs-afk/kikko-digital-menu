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
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-zinc-900 to-zinc-950 border border-[#C2410C]/40 shadow-[0_0_20px_rgba(194,65,12,0.15)] ring-1 ring-white/5">
              <div className="flex items-center gap-1 text-[#FBBC05]">
                <span className="font-bold text-white text-base mr-1">4.7</span>
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
                <div className="relative w-4 h-4">
                  <Star className="w-4 h-4 text-zinc-700 fill-zinc-700 absolute inset-0" />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '75%' }}>
                    <Star className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                  </div>
                </div>
              </div>
              <div className="w-px h-5 bg-zinc-700"></div>
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">+365 {t('googleCTAReviews')}</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-serif font-medium text-white tracking-tight leading-normal">
              {t('googleCTAHeading').split(/(experiencia|experience|esperienza)/i).map((part, i) => 
                /(experiencia|experience|esperienza)/i.test(part) ? (
                  <span key={i} className="relative inline-block whitespace-nowrap uppercase pb-1 mx-1">
                    {part}
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-[4px] rounded-full opacity-90"
                      style={{ background: 'linear-gradient(to right, #009246 33.3%, #ffffff 33.3%, #ffffff 66.6%, #ce2b37 66.6%)' }}
                    />
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h3>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
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
