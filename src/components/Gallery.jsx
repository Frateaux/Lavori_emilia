import React, { useState, useMemo } from 'react';
import { Search, Eye, MessageCircle, Sparkles, Filter } from 'lucide-react';

export default function Gallery({ creations, onSelectItem, onInquireItem, onOpenAdmin }) {
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [searchQuery, setSearchQuery] = useState('');

  // Conteggi per categoria
  const counts = useMemo(() => {
    const total = creations.length;
    const uncinetto = creations.filter((c) => c.category === 'Uncinetto').length;
    const ricamo = creations.filter((c) => c.category === 'Ricamo').length;
    return { total, uncinetto, ricamo };
  }, [creations]);

  // Filtra gli elementi
  const filteredCreations = useMemo(() => {
    return creations.filter((item) => {
      const matchCategory =
        activeCategory === 'Tutti' || item.category === activeCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materials?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [creations, activeCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-700" />
            <span>Esposizione & Portfolio</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
            Il Catalogo delle Creazioni
          </h2>
          
          <p className="text-stone-600 font-light text-base leading-relaxed">
            Ogni pezzo è unico, realizzato a mano con tempo e precisione. Esplora le opere suddivise tra <strong className="font-medium text-stone-800">Uncinetto</strong> e <strong className="font-medium text-stone-800">Ricamo</strong> oppure cerca un materiale o una forma particolare.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('Tutti')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeCategory === 'Tutti'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <span>Tutte le Creazioni</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeCategory === 'Tutti' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {counts.total}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('Uncinetto')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeCategory === 'Uncinetto'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <span>🧶 Uncinetto</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeCategory === 'Uncinetto' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {counts.uncinetto}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('Ricamo')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeCategory === 'Ricamo'
                  ? 'bg-rose-900 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              <span>🪡 Ricamo</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeCategory === 'Ricamo' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
              }`}>
                {counts.ricamo}
              </span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cerca per titolo, lino, filo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-rose-800/30 focus:border-rose-800 text-stone-800 placeholder:text-stone-400 transition-all"
            />
          </div>

        </div>

        {/* Gallery Grid */}
        {filteredCreations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreations.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Image Container */}
                <div
                  onClick={() => onSelectItem(item)}
                  className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ingrandisci</span>
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs ${
                        item.category === 'Uncinetto'
                          ? 'bg-amber-100/95 text-amber-900 border border-amber-300/60'
                          : 'bg-rose-100/95 text-rose-900 border border-rose-300/60'
                      }`}
                    >
                      {item.category === 'Uncinetto' ? '🧶 Uncinetto' : '🪡 Ricamo'}
                    </span>
                    {item.featured && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-900/90 text-white backdrop-blur-md">
                        ★ Vetrina
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => onSelectItem(item)}
                      className="font-serif text-xl font-medium text-stone-900 group-hover:text-rose-900 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.title}
                    </h3>
                    
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Materials & dimensions */}
                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
                    {item.materials && (
                      <p className="line-clamp-1">
                        <strong className="text-stone-700">Materiali:</strong> {item.materials}
                      </p>
                    )}
                    {item.dimensions && (
                      <p className="line-clamp-1">
                        <strong className="text-stone-700">Misure:</strong> {item.dimensions}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-1 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 py-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Vedi dettagli</span>
                    </button>
                    
                    <button
                      onClick={() => onInquireItem(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Richiedi info</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-stone-300 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-800 mx-auto flex items-center justify-center">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-800">
              Nessun lavoro trovato
            </h3>
            <p className="text-xs text-stone-500">
              Non ci sono creazioni che corrispondono a "{searchQuery}" nella categoria {activeCategory}.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Tutti');
                }}
                className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-full cursor-pointer"
              >
                Mostra tutti i lavori
              </button>
            </div>
          </div>
        )}

        {/* Bottom invitation for Emilia */}
        <div className="mt-14 text-center">
          <p className="text-xs text-stone-500 mb-2">
            Sei Emilia? Puoi aggiungere nuovi lavori o scattare foto in tempo reale:
          </p>
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 text-xs font-semibold text-rose-800 hover:text-rose-950 underline underline-offset-4 cursor-pointer"
          >
            <span>+ Aggiungi una nuova creazione al catalogo</span>
          </button>
        </div>

      </div>
    </section>
  );
}
