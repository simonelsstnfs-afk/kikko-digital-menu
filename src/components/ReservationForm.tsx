import { Calendar, Clock, Users, User, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function ReservationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    persons: '',
    name: '',
    phone: '',
    email: ''
  });
  
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseMsg = t('bookTableMsg');
    
    const whatsappMessage = `${baseMsg}

*Detalles de la Reserva:*
📅 Fecha: ${formData.date}
⏰ Hora: ${formData.time}
👥 Personas: ${formData.persons}

*Datos de contacto:*
👤 Nombre: ${formData.name}
📱 Teléfono: ${formData.phone}
✉️ Email: ${formData.email}`;

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
        name: '',
        phone: '',
        email: ''
      });
    }, 5000);
  };

  return (
    <section id="reservas" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900/40 via-zinc-950 to-zinc-950 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-zinc-500 font-medium tracking-[0.3em] uppercase text-xs mb-4">
            {t('resSubtitle')}
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl text-white font-medium mb-6">
            {t('resTitle')}
          </h3>
          <p className="text-zinc-400 max-w-xl mx-auto text-base">
            {t('resDesc')}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <option value="22:00" className="bg-zinc-900">22:00</option>
                  </select>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-zinc-800/50">
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
                    <Phone className="w-4 h-4 text-zinc-500" /> {t('resPhone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-white focus:border-white transition-colors outline-none text-zinc-300 placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-4 h-4 text-zinc-500" /> {t('resEmail')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="juan@ejemplo.com"
                    className="w-full px-4 py-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-white focus:border-white transition-colors outline-none text-zinc-300 placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-zinc-950 text-sm uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-colors focus:ring-2 focus:ring-white/50"
                >
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
