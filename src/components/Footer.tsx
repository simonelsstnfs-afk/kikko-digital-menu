import { MapPin, Instagram, Phone, Clock, Lock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useMenuData } from '../context/MenuDataContext';
import { defaultScheduleConfig } from '../types';
import { trackEvent } from '../utils/analytics';

export default function Footer() {
  const { t, language } = useLanguage();
  const { schedule } = useMenuData();

  const scheduleItems = schedule?.items && schedule.items.length > 0 ? schedule.items : defaultScheduleConfig.items;

  return (
    <footer id="footer" className="bg-zinc-950 text-zinc-400 pt-20 pb-24 lg:pb-32 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 mb-16">

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">{t('footerContact')}</h4>
            <ul className="space-y-4 text-base text-zinc-400 inline-block text-left md:w-full">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-[#C2410C]" />
                <span>C. los Ángeles, 48, 38683<br/>Puerto de Santiago, Santa Cruz de Tenerife</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C2410C]" />
                <a 
                  href="tel:611873391" 
                  onClick={() => trackEvent('phone_call_clicked', { phone: '611873391' })}
                  className="hover:text-white transition-colors"
                >
                  611 87 33 91
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">{t('footerHours')}</h4>
            <div className="inline-flex items-start gap-3 text-left w-full max-w-sm md:max-w-none">
              <Clock className="w-5 h-5 mt-0.5 text-[#C2410C] shrink-0" />
              <div className="flex flex-col gap-2.5 w-full">
                {scheduleItems.map((item) => {
                  const daysText = (item.days && (item.days[language as 'es' | 'en' | 'it'] || item.days.es)) || t('footerWeek');
                  return (
                    <div key={item.id} className="flex justify-between items-center w-full gap-3 text-sm sm:text-base border-b border-zinc-900/60 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-zinc-300 font-medium">{daysText}</span>
                      {item.isClosed ? (
                        <span className="text-rose-400 font-semibold text-xs tracking-wider uppercase bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/50">
                          {language === 'en' ? 'Closed' : language === 'it' ? 'Chiuso' : 'Cerrado'}
                        </span>
                      ) : (
                        <span className="text-white text-right font-medium whitespace-nowrap">{item.hours}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-6">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-2">{t('footerFollow')}</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/kikko.es" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 hover:border-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider uppercase text-zinc-600">
          <p>&copy; {new Date().getFullYear()} {t('footerRights')}</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1">{t('footerBuilt')} Kikko</span>
            <span className="text-zinc-800">•</span>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/admin');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1 normal-case text-[11px] opacity-50 hover:opacity-100 cursor-pointer"
              title="Panel de Administración"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
