import React from 'react';
import { ArrowDown, Sparkles, Scissors, Feather, Heart, Eye } from 'lucide-react';

export default function Hero({
  featuredItem,
  secondaryItem,
  onSelectItem,
  onExploreClick,
  onContactClick,
}) {
  // Immagine principale di fallback se non ci sono elementi
  const fallbackMain = {
    title: "Centrino d'Autore all'Uncinetto",
    category: 'Uncinetto',
    materials: 'Filo di Scozia écru ad altissima densità',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop',
  };

  const fallbackSecondary = {
    title: 'Punto Pieno su Lino',
    category: 'Ricamo',
    imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=300&auto=format&fit=crop',
  };

  const main = featuredItem || fallbackMain;
  const secondary = secondaryItem || fallbackSecondary;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background delicate decorative circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Story & Headline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-semibold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atelier Artigianale Fatto a Mano</span>
            </div>

            {/* Main title with Playfair Display serif */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.15]">
              L'arte del <span className="italic font-normal text-rose-900">ricamo</span> e dell'<span className="italic font-normal text-rose-900">uncinetto</span>, punto dopo punto.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Benvenuti nella galleria personale di <strong className="font-semibold text-stone-800">Emilia</strong>. Un catalogo vivo di creazioni esclusive, corredi raffinati e pezzi unici lavorati con la pazienza e l'amore della tradizione artigianale.
            </p>

            {/* Quality Badges */}
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-medium text-stone-600">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200/60 shadow-xs">
                <Feather className="w-4 h-4 text-rose-700" />
                <span>Lino & Cotone di Pregio</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200/60 shadow-xs">
                <Scissors className="w-4 h-4 text-rose-700" />
                <span>Pezzi Unici & Personalizzabili</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200/60 shadow-xs">
                <Heart className="w-4 h-4 text-rose-700" />
                <span>Cura Minuziosa nei Dettagli</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <span>Sfoglia il Catalogo</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              
              <button
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-800 bg-white hover:bg-rose-50/60 rounded-full border border-stone-300/80 transition-all duration-200 shadow-xs cursor-pointer"
              >
                <span>Contatta Emilia</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Composition / Dynamic Featured Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main photo card (Dynamic latest featured creation) */}
              <div
                onClick={() => onSelectItem && featuredItem && onSelectItem(featuredItem)}
                className={`relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/5 transform hover:-rotate-1 transition-all duration-500 group ${
                  featuredItem ? 'cursor-pointer' : ''
                }`}
                title={featuredItem ? `Clicca per vedere i dettagli di: ${main.title}` : ''}
              >
                <img
                  src={main.imageUrl}
                  alt={main.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent group-hover:from-stone-950/90 transition-colors" />

                {/* Hover zoom badge */}
                {featuredItem && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Dettagli</span>
                  </div>
                )}

                {/* Details caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-block px-2.5 py-0.5 bg-rose-500/90 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider">
                      ★ In Evidenza
                    </span>
                    <span className="text-[11px] font-semibold text-stone-200">
                      {main.category === 'Uncinetto' ? '🧶 Uncinetto' : '🪡 Ricamo'}
                    </span>
                  </div>
                  
                  <p className="font-serif text-xl font-medium leading-snug line-clamp-1 group-hover:text-rose-200 transition-colors">
                    {main.title}
                  </p>
                  
                  <p className="text-xs text-stone-300 font-light mt-1 line-clamp-1">
                    {main.materials || main.dimensions || main.description || 'Pezzo unico fatto a mano'}
                  </p>
                </div>
              </div>

              {/* Secondary floating card */}
              <div
                onClick={() => onSelectItem && secondaryItem && onSelectItem(secondaryItem)}
                className={`absolute -bottom-6 -left-6 z-20 hidden sm:block p-3.5 rounded-xl bg-white shadow-xl border border-stone-200/80 max-w-[230px] animate-bounce-subtle ${
                  secondaryItem ? 'cursor-pointer hover:border-rose-300' : ''
                }`}
                title={secondaryItem ? `Vedi dettagli: ${secondary.title}` : ''}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={secondary.imageUrl}
                    alt={secondary.title}
                    className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div>
                    <span className="block text-[10px] font-semibold text-rose-900 uppercase tracking-wider">
                      {secondary.category === 'Uncinetto' ? '🧶 Uncinetto' : '🪡 Ricamo'}
                    </span>
                    <span className="text-xs text-stone-800 font-medium line-clamp-1">
                      {secondary.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative stamp element */}
              <div className="absolute -top-4 -right-4 z-20 w-24 h-24 rounded-full border border-dashed border-rose-300 bg-rose-50/95 backdrop-blur-xs flex flex-col items-center justify-center text-center p-2 shadow-sm rotate-12">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-800">100%</span>
                <span className="text-[9px] font-medium text-stone-600 leading-tight">Fatto a mano con amore</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
