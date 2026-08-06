import { MapPin, Instagram, Facebook, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

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
                <a href="tel:611873391" className="hover:text-white transition-colors">611 87 33 91</a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">{t('footerHours')}</h4>
            <ul className="space-y-4 text-base text-zinc-400 inline-block text-left md:w-full w-full max-w-[280px] md:max-w-none">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-[#C2410C] shrink-0" />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full gap-4">
                    <span>{t('footerWeek')}</span>
                    <span className="text-white text-right">12:30 - 21:30</span>
                  </div>
                </div>
              </li>
            </ul>
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
          <div className="flex space-x-6">
            <span className="flex items-center gap-1">{t('footerBuilt')} Kikko</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
