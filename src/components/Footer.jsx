import React from 'react';
import { Mail, Phone, Code, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top footer row: Emilia info & Developer Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Emilia Atelier Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-900/60 text-rose-300 flex items-center justify-center font-serif text-lg font-bold border border-rose-800/80">
                E
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Emilia — Atelier Artigianale
              </span>
            </div>
            
            <p className="text-stone-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
              Catalogo ed esposizione di creazioni fatte a mano: l'eccellenza dell'uncinetto e la delicatezza del ricamo tradizionale italiano.
            </p>

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-stone-300">
              <a
                href="tel:+393408585052"
                className="hover:text-rose-300 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span>+39 340 858 5052</span>
              </a>
              <span className="hidden sm:inline text-stone-600">•</span>
              <a
                href="mailto:emliarao10@gmail.com"
                className="hover:text-rose-300 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>emliarao10@gmail.com</span>
              </a>
            </div>

            <div className="text-xs text-stone-500 pt-2">
              <span>© {currentYear} Emilia Creazioni Artigianali. Tutti i diritti riservati.</span>
            </div>
          </div>

          {/* Developer Spotlight Card (Beniamino Boiano) */}
          <div className="md:col-span-6">
            <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700/80 shadow-lg relative overflow-hidden group hover:border-rose-900/60 transition-all duration-300">
              
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-medium">
                  <Code className="w-3.5 h-3.5" />
                  <span>Sviluppo & Design del Sito</span>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">Web Developer</span>
              </div>

              <h4 className="text-lg font-bold text-white tracking-wide">
                Beniamino Boiano
              </h4>
              <p className="text-xs text-stone-400 mt-1 mb-4 font-light">
                Progettazione e realizzazione tecnica del portale digitale e del sistema di gestione catalogo.
              </p>

              {/* Contact Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                
                {/* Email link */}
                <a
                  href="mailto:beniamino.boiano@gmail.com"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-stone-700/60 transition-colors"
                >
                  <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="truncate">beniamino.boiano@gmail.com</span>
                </a>

                {/* Phone link */}
                <a
                  href="tel:3293154460"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-stone-700/60 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>329 315 4460</span>
                </a>

              </div>

              {/* WhatsApp direct link */}
              <div className="mt-3">
                <a
                  href="https://wa.me/393293154460?text=Ciao%20Beniamino,%20ho%20visto%20il%20sito%20realizzato%20per%20Emilia..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contatta lo sviluppatore su WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom subtle bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>Creato con cura per valorizzare il lavoro artigianale.</p>
          <div className="flex items-center gap-2">
            <span>Realizzato da</span>
            <span className="font-semibold text-stone-300">Beniamino Boiano</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
