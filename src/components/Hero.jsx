import React from 'react';
import { ArrowDown, Sparkles, Scissors, Feather, Heart, Eye } from 'lucide-react';
import { getItemMainImage } from '../utils/imageGalleryHelper';

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
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32 min-h-[92vh] flex items-center">
      {/* Background delicate atmospheric gradient washes */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-100/35 rounded-full blur-3xl pointer-events-none -z-20" />
      <div className="absolute top-1/3 right-5 w-[450px] h-[450px] bg-amber-100/35 rounded-full blur-3xl pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Story & Headline (Editorial typography & atelier aura) */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Pill badge with fine border */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/90 text-stone-800 text-xs font-semibold uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-800" />
              <span>Atelier Artigianale d'Alta Manifattura</span>
            </div>

            {/* Main title with Playfair Display editorial serif */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-stone-900 leading-[1.12]">
              L'arte del <span className="italic font-normal text-rose-950">filo</span>,<br className="hidden sm:inline" />
              punto dopo punto.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Benvenuti nell'atelier digitale di <strong className="font-semibold text-stone-800">Emilia</strong>. Creazioni d'autore all'uncinetto, merletti e ricami a mano intrisi di pazienza, filati nobili e il fascino senza tempo della tradizione italiana.
            </p>

            {/* Quality Badges */}
            <div className="pt-1 flex flex-wrap justify-center lg:justify-start gap-3 text-xs font-medium text-stone-600">
              <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200/70 shadow-2xs">
                <Feather className="w-4 h-4 text-rose-800" />
                <span>Puro Lino & Filo di Scozia</span>
              </div>
              <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200/70 shadow-2xs">
                <Scissors className="w-4 h-4 text-rose-800" />
                <span>Pezzi Unici & Su Misura</span>
              </div>
              <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200/70 shadow-2xs">
                <Heart className="w-4 h-4 text-rose-800" />
                <span>Retro Perfetto & Cura Sartoriale</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <span>Esplora le Creazioni</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              
              <button
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-stone-800 bg-white/90 hover:bg-stone-50 rounded-full border border-stone-300/80 transition-all duration-200 shadow-xs cursor-pointer backdrop-blur-xs"
              >
                <span>Richiedi un'Opera</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Composition / Dynamic Featured Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main photo card (Dynamic latest featured creation) */}
              <div
                onClick={() => onSelectItem && featuredItem && onSelectItem(featuredItem)}
                className={`relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-4/5 transform hover:-rotate-1 transition-all duration-500 group ${
                  featuredItem ? 'cursor-pointer' : ''
                }`}
                title={featuredItem ? `Clicca per scoprire i dettagli di: ${main.title}` : ''}
              >
                <img
                  src={getItemMainImage(main)}
                  alt={main.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent group-hover:from-stone-950/90 transition-colors" />

                {/* Hover zoom badge */}
                {featuredItem && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-xs text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-rose-800" />
                    <span>Esamina Trame</span>
                  </div>
                )}

                {/* Details caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 bg-rose-700 text-white rounded-md text-[10px] font-bold uppercase tracking-widest shadow-xs">
                      ★ In Evidenza
                    </span>
                    <span className="text-xs font-medium text-stone-200">
                      {main.category === 'Uncinetto' ? '🧶 Uncinetto d\'Autore' : '🪡 Ricamo Fine'}
                    </span>
                  </div>
                  
                  <p className="font-serif text-2xl font-normal leading-snug line-clamp-1 group-hover:text-rose-200 transition-colors">
                    {main.title}
                  </p>
                  
                  <p className="text-xs text-stone-300 font-light mt-1.5 line-clamp-1">
                    {main.materials || main.dimensions || main.description || 'Pezzo unico artigianale fatto a mano'}
                  </p>
                </div>
              </div>

              {/* Secondary floating card */}
              <div
                onClick={() => onSelectItem && secondaryItem && onSelectItem(secondaryItem)}
                className={`absolute -bottom-6 -left-6 z-20 hidden sm:block p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-stone-200/90 max-w-[240px] ${
                  secondaryItem ? 'cursor-pointer hover:border-rose-300 transition-all hover:scale-102' : ''
                }`}
                title={secondaryItem ? `Vedi dettagli: ${secondary.title}` : ''}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getItemMainImage(secondary)}
                    alt={secondary.title}
                    className="w-13 h-13 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div>
                    <span className="block text-[10px] font-semibold text-rose-800 uppercase tracking-wider">
                      {secondary.category === 'Uncinetto' ? '🧶 Uncinetto' : '🪡 Ricamo'}
                    </span>
                    <span className="text-xs text-stone-800 font-medium line-clamp-1">
                      {secondary.title}
                    </span>
                    <span className="text-[10px] text-stone-500 font-light block">
                      Trama rifinita a mano
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative signature badge */}
              <div className="absolute -top-5 -right-5 z-20 w-24 h-24 rounded-full border border-dashed border-rose-300 bg-rose-50/95 backdrop-blur-xs flex flex-col items-center justify-center text-center p-2 shadow-sm rotate-6 hover:rotate-12 transition-transform duration-300">
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-900">100%</span>
                <span className="text-[9px] font-medium text-stone-600 leading-tight">Fatto a mano con amore</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
