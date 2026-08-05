import { MapPin, Instagram, Facebook, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="bg-zinc-950 text-zinc-400 pt-20 pb-24 lg:pb-32 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 mb-16">

          <div>
            <h4 className="text-white font-medium text-xs tracking-widest uppercase mb-6">{t('footerContact')}</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#C2410C]" />
                <span>C. los Ángeles, 48, 38683<br/>Puerto de Santiago, Santa Cruz de Tenerife</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C2410C]" />
                <a href="tel:611873391" className="hover:text-white transition-colors">611 87 33 91</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-xs tracking-widest uppercase mb-6">{t('footerHours')}</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-[#C2410C]" />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <span>{t('footerWeek')}</span>
                    <span className="text-white">12:30 - 21:30</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-zinc-800" />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <span>{t('footerThursday')}</span>
                    <span className="text-zinc-600">{t('footerClosed')}</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-[#C2410C]" />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <span>{t('footerWeekend')}</span>
                    <span className="text-white">12:30 - 21:30</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-medium text-xs tracking-widest uppercase mb-6">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/kikkopizzeria" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 hover:border-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/kikkopizzeria" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 hover:border-white transition-colors">
                <Facebook className="w-4 h-4" />
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
