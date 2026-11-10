import React, { useState, useMemo } from 'react';
import { Search, Eye, MessageCircle, Sparkles, Filter, Clock, Images } from 'lucide-react';
import { getItemMainImage, getItemImages } from '../utils/imageGalleryHelper';

export default function Gallery({ creations, onSelectItem, onInquireItem, onOpenAdmin }) {
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [searchQuery, setSearchQuery] = useState('');

  // Categorie ricche ed editoriali
  const categoryFilters = [
    { id: 'Tutti', label: 'Tutte le Opere', icon: '✨' },
    { id: 'Centrini & Trine', label: 'Centrini & Trine', icon: '🧶', match: ['Centrini', 'Trine', 'Uncinetto', 'Pizzi'] },
    { id: 'Ricami Floreali', label: 'Ricami Floreali', icon: '🌸', match: ['Floreali', 'Ricamo', 'Fiori', 'Botanica'] },
    { id: 'Bomboniere & Ricorrenze', label: 'Bomboniere & Ricorrenze', icon: '🎀', match: ['Bomboniere', 'Ricorrenze', 'Battesimo', 'Matrimonio'] },
    { id: 'Lavori su Misura', label: 'Lavori su Misura', icon: '🪡', match: ['Su Misura', 'Cifre', 'Personalizzato', 'Corredo'] },
  ];

  // Conteggi per categoria dinamica
  const counts = useMemo(() => {
    const res = { Tutti: creations.length };
    categoryFilters.slice(1).forEach((cat) => {
      res[cat.id] = creations.filter((item) => {
        const catStr = (item.category || '').toLowerCase();
        const titleStr = (item.title || '').toLowerCase();
        const descStr = (item.description || '').toLowerCase();
        return cat.match.some((m) =>
          catStr.includes(m.toLowerCase()) ||
          titleStr.includes(m.toLowerCase()) ||
          descStr.includes(m.toLowerCase())
        );
      }).length;
    });
    return res;
  }, [creations]);

  // Filtra gli elementi
  const filteredCreations = useMemo(() => {
    return creations.filter((item) => {
      let matchCategory = true;
      if (activeCategory !== 'Tutti') {
        const filterDef = categoryFilters.find((c) => c.id === activeCategory);
        if (filterDef) {
          const catStr = (item.category || '').toLowerCase();
          const titleStr = (item.title || '').toLowerCase();
          const descStr = (item.description || '').toLowerCase();
          matchCategory = filterDef.match.some((m) =>
            catStr.includes(m.toLowerCase()) ||
            titleStr.includes(m.toLowerCase()) ||
            descStr.includes(m.toLowerCase())
          );
        }
      }

      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materials?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [creations, activeCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 text-stone-700 text-xs font-semibold uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-800" />
            <span>Showcase & Galleria d'Opere</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            Le Creazioni di Pregio
          </h2>
          
          <p className="text-stone-600 font-light text-base sm:text-lg leading-relaxed">
            Una raccolta vivente di trine, ricami ad arte e pizzi su misura. Clicca su ciascun manufatto per ingrandire la trama e osservare da vicino la densità di ogni punto.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 mb-12 pb-6 border-b border-stone-200/80">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
            {categoryFilters.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = counts[cat.id] ?? 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm scale-102'
                      : 'bg-white/80 backdrop-blur-xs text-stone-600 hover:bg-white hover:text-stone-900 border border-stone-200/80'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cerca opera, lino, filet, cotone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-300/80 rounded-full focus:outline-hidden focus:ring-2 focus:ring-rose-800/30 focus:border-rose-800 text-stone-800 placeholder:text-stone-400 transition-all shadow-2xs"
            />
          </div>

        </div>

        {/* Gallery Grid (Asymmetric card layout with micro-interactions) */}
        {filteredCreations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreations.map((item, idx) => {
              // Simula tempo stimato o tecnica per valorizzare l'artigianalità
              const isEmbroidery = (item.category || '').toLowerCase().includes('ricamo');
              const estimatedTechnique = item.materials?.includes('Lino') ? 'Punto Pieno & Erba' : isEmbroidery ? 'Ricamo a mano libera' : 'Punto Filet / Pizzo d\'Irlanda';
              
              const imagesCount = getItemImages(item).length;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-1.5"
                >
                  {/* Image Container with Micro-interaction */}
                  <div
                    onClick={() => onSelectItem(item)}
                    className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={getItemMainImage(item)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Hover Tint Overlay */}
                    <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/25 transition-colors duration-400 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 bg-white/95 backdrop-blur-md text-stone-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-rose-800" />
                        <span>Esamina Dettagli & Trame</span>
                      </span>
                    </div>

                    {/* Floating Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 pointer-events-none">
                      <span
                        className={`text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-xs ${
                          item.category === 'Uncinetto'
                            ? 'bg-amber-100/95 text-amber-900 border border-amber-300/60'
                            : 'bg-rose-100/95 text-rose-900 border border-rose-300/60'
                        }`}
                      >
                        {item.category === 'Uncinetto' ? '🧶 Uncinetto' : '🪡 Ricamo'}
                      </span>
                      {item.featured && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-stone-900/95 text-white backdrop-blur-md shadow-xs">
                          ★ Selezione Atelier
                        </span>
                      )}
                    </div>

                    {/* Badge Indicatore Foto Multiple */}
                    {imagesCount > 1 && (
                      <div className="absolute bottom-3 right-3 bg-stone-950/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-md pointer-events-none">
                        <Images className="w-3.5 h-3.5 text-rose-300" />
                        <span>{imagesCount} foto</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Tecnica indicativa */}
                      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1.5">
                        <Clock className="w-3 h-3 text-rose-700" />
                        <span>{estimatedTechnique}</span>
                      </div>

                      <h3
                        onClick={() => onSelectItem(item)}
                        className="font-serif text-2xl font-normal text-stone-900 group-hover:text-rose-950 transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.title}
                      </h3>
                      
                      <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Materials & dimensions */}
                    <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 space-y-1">
                      {item.materials && (
                        <p className="line-clamp-1">
                          <strong className="text-stone-700 font-medium">Filato:</strong> {item.materials}
                        </p>
                      )}
                      {item.dimensions && (
                        <p className="line-clamp-1">
                          <strong className="text-stone-700 font-medium">Misure:</strong> {item.dimensions}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1.5 py-2 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-rose-800" />
                        <span>Vedi Opera</span>
                      </button>
                      
                      <button
                        onClick={() => onInquireItem(item)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-900 bg-rose-50 hover:bg-rose-100 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-rose-700" />
                        <span>Richiedi info</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-dashed border-stone-300 max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-800 mx-auto flex items-center justify-center">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-stone-800">
              Nessun pezzo trovato
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Nessuna creazione corrisponde a "{searchQuery}" nella sezione selezionata.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Tutti');
                }}
                className="px-5 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-full cursor-pointer transition-colors"
              >
                Visualizza tutte le creazioni
              </button>
            </div>
          </div>
        )}

        {/* Bottom invitation for Emilia */}
        <div className="mt-16 text-center">
          <p className="text-xs text-stone-500 mb-2 font-light">
            Sei Emilia? Puoi arricchire il catalogo o aggiornare le descrizioni dal tuo pannello riservato:
          </p>
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 text-xs font-semibold text-rose-900 hover:text-stone-950 underline underline-offset-4 cursor-pointer transition-colors"
          >
            <span>+ Accedi a Spazio Emilia per aggiungere o modificare opere</span>
          </button>
        </div>

      </div>
    </section>
  );
}
