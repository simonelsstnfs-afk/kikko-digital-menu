import { MapPin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-zinc-950 text-zinc-400 pt-20 pb-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Kikko" className="h-12 w-auto object-contain brightness-0 invert" />
              <span className="hidden font-serif text-2xl font-bold text-white tracking-widest uppercase">Kikko</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              La auténtica experiencia de la pizza napolitana, con diseño y sabor vanguardista.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium text-xs tracking-widest uppercase mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li>Calle KIKKO, 123</li>
              <li>Madrid, 28001, España</li>
              <li>+34 912 345 678</li>
              <li>hola@kikko.es</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-xs tracking-widest uppercase mb-6">Horario</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex justify-between">
                <span>Lunes - Jueves</span>
                <span>13:00 - 23:00</span>
              </li>
              <li className="flex justify-between text-white">
                <span>Viernes - Sábado</span>
                <span>13:00 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span>13:00 - 23:00</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-medium text-xs tracking-widest uppercase mb-6">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 hover:border-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 hover:border-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-4">
              {/* Google Maps Review Link */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-900 border border-zinc-800 text-white font-medium text-xs uppercase tracking-widest rounded-xl hover:bg-white hover:text-zinc-950 transition-colors w-full justify-center"
              >
                <MapPin className="w-4 h-4" />
                Reseña en Google
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider uppercase text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Kikko Restaurante Pizzeria. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
