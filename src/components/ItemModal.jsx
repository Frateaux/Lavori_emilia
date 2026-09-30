import React, { useEffect } from 'react';
import { X, Sparkles, MessageCircle, Mail, Calendar, Ruler, Layers } from 'lucide-react';

export default function ItemModal({ item, onClose, onInquire }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Chiudi finestra"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Big Photo Container */}
        <div className="md:w-1/2 bg-stone-100 relative min-h-[300px] md:min-h-full flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover max-h-[45vh] md:max-h-[90vh]"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-xs ${
                item.category === 'Uncinetto'
                  ? 'bg-amber-100/95 text-amber-900 border border-amber-300'
                  : 'bg-rose-100/95 text-rose-900 border border-rose-300'
              }`}
            >
              {item.category === 'Uncinetto' ? '🧶 Uncinetto' : '🪡 Ricamo'}
            </span>
          </div>
        </div>

        {/* Right: Details & Contact Action */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                Creazione Artigianale
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
                {item.title}
              </h2>
            </div>

            <p className="text-sm text-stone-600 font-light leading-relaxed whitespace-pre-line">
              {item.description}
            </p>

            {/* Tech specs */}
            <div className="pt-4 border-t border-stone-200/80 space-y-2.5 text-xs text-stone-600">
              {item.materials && (
                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-rose-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">Filati & Materiali:</span>{' '}
                    <span>{item.materials}</span>
                  </div>
                </div>
              )}

              {item.dimensions && (
                <div className="flex items-start gap-2.5">
                  <Ruler className="w-4 h-4 text-rose-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">Dimensioni:</span>{' '}
                    <span>{item.dimensions}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-rose-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">Lavorazione:</span>{' '}
                  <span>100% manuale, pezzo originale unico</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="mt-8 pt-6 border-t border-stone-200 space-y-3">
            <p className="text-xs text-stone-500 text-center font-medium">
              Ti interessa questo lavoro o ne vorresti uno simile su misura?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  onClose();
                  onInquire(item, 'whatsapp');
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chiedi su WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onInquire(item, 'gmail');
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Invia con Gmail</span>
              </button>
            </div>

            <div className="text-center pt-1">
              <button
                onClick={() => {
                  onClose();
                  onInquire(item, 'form');
                }}
                className="text-[11px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
              >
                Oppure apri il modulo contatti sul sito (per Outlook, app o copia testo)
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
