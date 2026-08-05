import { Calendar, Clock, Users, User, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function ReservationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    persons: '',
    name: ''
  });
  
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderDescription = () => {
    const desc = t('resDesc');
    const parts = desc.split('WhatsApp');
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}<span className="text-[#25D366] font-semibold tracking-wider">WhatsApp</span>{parts[1]}
        </>
      );
    }
    return desc;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseMsg = t('bookTableMsg');
    
    const whatsappMessage = `${baseMsg}

*Detalles de la Reserva:*
👤 Nombre: ${formData.name}
👥 Personas: ${formData.persons}
📅 Fecha: ${formData.date}
⏰ Hora: ${formData.time}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/34611873391?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        date: '',
        time: '',
        persons: '',
        name: ''
      });
    }, 5000);
  };

  return (
    <section id="reservas" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900/40 via-zinc-950 to-zinc-950 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-xl backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#C2410C] animate-pulse"></span>
            {t('resSubtitle')}
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-white font-medium mb-6 tracking-tight">
            {t('resTitle')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#C2410C] to-transparent mx-auto mb-8 opacity-50"></div>
          <p className="text-zinc-400 max-w-xl mx-auto text-base leading-relaxed">
            {renderDescription()}
          </p>
        </div>

        <div className="bg-zinc-900/50 rounded-3xl p-8 md:p-12 shadow-2xl border border-zinc-800 backdrop-blur-sm">
          {isSubmitted ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-6 border border-white/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-serif text-2xl font-medium text-white mb-3">{t('resSuccess')}</h4>
              <p className="text-zinc-400">{t('resSuccessSub')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4 text-zinc-500" /> {t('resName')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('resNamePl')}
                    className="w-full px-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-white focus:border-white transition-colors outline-none text-zinc-300 placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-4 h-4 text-zinc-500" /> {t('resPersons')}
                  </label>
                  <select
                    name="persons"
                    value={formData.persons}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-white focus:border-white transition-colors outline-none text-zinc-300 appearance-none"
                  >
                    <option value="" className="bg-zinc-900">{t('resQty')}</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="bg-zinc-900">{num} {num === 1 ? t('resPerson') : t('resPeople')}</option>
                    ))}
                    <option value="9+" className="bg-zinc-900">{t('resMore8')}</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-500" /> {t('resDate')}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-white focus:border-white transition-colors outline-none text-zinc-300 placeholder:text-zinc-600 color-scheme-dark"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-500" /> {t('resTime')}
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-white focus:border-white transition-colors outline-none text-zinc-300 appearance-none"
                  >
                    <option value="" className="bg-zinc-900">{t('resSelectTime')}</option>
                    <option value="13:00" className="bg-zinc-900">13:00</option>
                    <option value="13:30" className="bg-zinc-900">13:30</option>
                    <option value="14:00" className="bg-zinc-900">14:00</option>
                    <option value="14:30" className="bg-zinc-900">14:30</option>
                    <option value="20:00" className="bg-zinc-900">20:00</option>
                    <option value="20:30" className="bg-zinc-900">20:30</option>
                    <option value="21:00" className="bg-zinc-900">21:00</option>
                    <option value="21:30" className="bg-zinc-900">21:30</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-zinc-950 text-sm uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-colors focus:ring-2 focus:ring-white/50 flex items-center justify-center gap-3"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366]" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.571c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('resConfirmBtn')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
