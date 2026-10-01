import React, { useState } from 'react';
import { Sparkles, Lock, Menu, X, Heart } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-rose-100 flex items-center justify-center text-rose-800 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-rose-700 animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 block leading-tight">
                Emilia
              </span>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                Ricamo & Uncinetto
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => scrollTo('storia')}
              className="hover:text-rose-800 transition-colors py-1 cursor-pointer"
            >
              La Mia Storia
            </button>
            <button
              onClick={() => scrollTo('catalogo')}
              className="hover:text-rose-800 transition-colors py-1 cursor-pointer"
            >
              Catalogo Lavori
            </button>
            <button
              onClick={() => scrollTo('contatti')}
              className="hover:text-rose-800 transition-colors py-1 cursor-pointer"
            >
              Contatti
            </button>
          </nav>

          {/* Right Action: Admin Access */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-rose-50 hover:text-rose-800 rounded-full border border-stone-200/80 transition-all duration-200 shadow-xs cursor-pointer"
              title="Area riservata ad Emilia per caricare nuove foto"
            >
              <Lock className="w-3.5 h-3.5 text-stone-500" />
              <span>Spazio Emilia</span>
            </button>
            <button
              onClick={() => scrollTo('contatti')}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Richiedi Creazione</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-stone-600 hover:text-rose-800 bg-stone-100 rounded-full cursor-pointer"
              title="Spazio Emilia"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 rounded-lg cursor-pointer"
              aria-label="Apri menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => scrollTo('storia')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-stone-800 font-medium hover:bg-stone-100 cursor-pointer"
          >
            La Mia Storia
          </button>
          <button
            onClick={() => scrollTo('catalogo')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-stone-800 font-medium hover:bg-stone-100 cursor-pointer"
          >
            Catalogo Lavori
          </button>
          <button
            onClick={() => scrollTo('contatti')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-stone-800 font-medium hover:bg-stone-100 cursor-pointer"
          >
            Contatti
          </button>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-stone-800 bg-stone-100 rounded-full border border-stone-300 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-stone-500" />
              <span>Spazio Emilia (Gestione Lavori)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
