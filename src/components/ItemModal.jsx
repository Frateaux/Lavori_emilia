import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  MessageCircle,
  Mail,
  Ruler,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Compass,
  Move,
} from 'lucide-react';

export default function ItemModal({ item, onClose, onInquire }) {
  const [isZoomedFull, setIsZoomedFull] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2); // Ingrandimento (da 1x a 4x)

  // Coordinate normalizzate del centro della visuale [0, 1]
  // 0.5 = centro perfetto dell'immagine
  const [position, setPosition] = useState({ u: 0.5, v: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);

  const containerRef = useRef(null);
  const minimapRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, u: 0.5, v: 0.5 });
  const isMinimapDraggingRef = useRef(false);

  // Limiti e clamp
  const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);

  // Reset dello stato quando cambia l'elemento o si esce
  useEffect(() => {
    setIsZoomedFull(false);
    setZoomLevel(2);
    setPosition({ u: 0.5, v: 0.5 });
  }, [item]);

  // Gestione tastiera
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomedFull) {
          setIsZoomedFull(false);
          setZoomLevel(2);
          setPosition({ u: 0.5, v: 0.5 });
        } else {
          onClose();
        }
      }
      // Frecce direzionali per spostarsi
      if (isZoomedFull) {
        const step = 0.05;
        if (e.key === 'ArrowRight') {
          setPosition((p) => ({ ...p, u: clamp(p.u + step) }));
        } else if (e.key === 'ArrowLeft') {
          setPosition((p) => ({ ...p, u: clamp(p.u - step) }));
        } else if (e.key === 'ArrowDown') {
          setPosition((p) => ({ ...p, v: clamp(p.v + step) }));
        } else if (e.key === 'ArrowUp') {
          setPosition((p) => ({ ...p, v: clamp(p.v - step) }));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomedFull, onClose]);

  if (!item) return null;

  // Modifica zoom
  const updateZoom = (newZoom) => {
    const targetZoom = Math.min(Math.max(newZoom, 1), 4.5);
    setZoomLevel(targetZoom);
  };

  // Inizio trascinamento immagine principale
  const handlePointerDown = (e) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      u: position.u,
      v: position.v,
    };
  };

  // Movimento trascinamento immagine principale
  const handlePointerMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const spanX = rect.width * (zoomLevel - 1);
    const spanY = rect.height * (zoomLevel - 1);

    if (spanX > 0 && spanY > 0) {
      const newU = dragStartRef.current.u - dx / spanX;
      const newV = dragStartRef.current.v - dy / spanY;
      setPosition({
        u: clamp(newU, 0, 1),
        v: clamp(newV, 0, 1),
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    isMinimapDraggingRef.current = false;
  };

  // Calcolo per il rettangolo mirino (viewfinder) sulla minimappa
  const boxWidthPercent = Math.min(100, (1 / zoomLevel) * 100);
  const boxHeightPercent = Math.min(100, (1 / zoomLevel) * 100);
  const boxLeftPercent = position.u * (100 - boxWidthPercent);
  const boxTopPercent = position.v * (100 - boxHeightPercent);

  // Click o Drag sulla Mappa (Minimap) per spostarsi istantaneamente
  const handleMinimapInteraction = (e) => {
    if (!minimapRef.current) return;
    const rect = minimapRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const maxLeftPx = rect.width * (1 - boxWidthPercent / 100);
    const maxTopPx = rect.height * (1 - boxHeightPercent / 100);

    const targetLeftPx = clickX - (rect.width * boxWidthPercent / 100) / 2;
    const targetTopPx = clickY - (rect.height * boxHeightPercent / 100) / 2;

    const targetU = maxLeftPx > 0 ? clamp(targetLeftPx / maxLeftPx, 0, 1) : 0.5;
    const targetV = maxTopPx > 0 ? clamp(targetTopPx / maxTopPx, 0, 1) : 0.5;

    setPosition({
      u: targetU,
      v: targetV,
    });
  };

  // Traslazione dell'immagine principale in percentuale
  const translateX = -(position.u - 0.5) * (zoomLevel - 1) * 100;
  const translateY = -(position.v - 0.5) * (zoomLevel - 1) * 100;

  return (
    <>
      {/* 1. MODALITÀ ULTRA-ZOOM CON MINIMAPPA NAVIGATORE */}
      {isZoomedFull && (
        <div
          className="fixed inset-0 z-70 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onPointerUp={handlePointerUp}
        >
          {/* Top Bar Zoom Controls */}
          <div
            className="flex items-center justify-between text-white z-20 bg-stone-900/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-stone-700/60 max-w-2xl mx-auto w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                {item.category === 'Uncinetto' ? '🧶 Uncinetto' : '🪡 Ricamo'}
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-xs text-stone-200 font-medium truncate max-w-[140px] sm:max-w-xs">
                {item.title}
              </span>
            </div>

            {/* Controlli Zoom & Reset */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => updateZoom(zoomLevel - 0.5)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-stone-300 hover:text-white"
                title="Riduci ingrandimento"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-amber-300 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                type="button"
                onClick={() => updateZoom(zoomLevel + 0.5)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-stone-300 hover:text-white"
                title="Aumenta ingrandimento"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setPosition({ u: 0.5, v: 0.5 });
                }}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-stone-300 hover:text-white"
                title="Ripristina visuale 100%"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowMinimap(!showMinimap)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  showMinimap ? 'bg-amber-400/20 text-amber-300' : 'text-stone-400 hover:text-white'
                }`}
                title="Mostra/Nascondi Mappa di navigazione"
              >
                <Compass className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsZoomedFull(false);
                  setZoomLevel(2);
                  setPosition({ u: 0.5, v: 0.5 });
                }}
                className="ml-2 p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors cursor-pointer text-white"
                title="Chiudi ingrandimento"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Image Viewport con Trascinamento Libero */}
          <div
            ref={containerRef}
            className={`flex-1 relative overflow-hidden flex items-center justify-center my-3 select-none touch-none ${
              zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
            style={{ touchAction: 'none' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onWheel={(e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.3 : 0.3;
              updateZoom(zoomLevel + delta);
            }}
          >
            <div
              className="relative max-h-[82vh] max-w-[92vw] will-change-transform"
              style={{
                transform: `translate(${translateX}%, ${translateY}%) scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                draggable={false}
                className="max-h-[82vh] max-w-[92vw] object-contain rounded-xl shadow-2xl pointer-events-none"
              />
            </div>
          </div>

          {/* 📍 LA MINIMAPPA NAVIGATORE (Mostra esattamente dove ti trovi nell'opera) */}
          {showMinimap && (
            <div
              className="absolute bottom-6 right-6 z-30 bg-stone-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-stone-700/80 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-1.5 px-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
                  <Compass className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Mappa Orientamento</span>
                </div>
                <span className="text-[10px] text-stone-400">Clicca per spostarti</span>
              </div>

              {/* Thumbnail Container: aderisce esattamente alle proporzioni dell'opera */}
              <div
                ref={minimapRef}
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => {
                  isMinimapDraggingRef.current = true;
                  handleMinimapInteraction(e);
                }}
                onPointerMove={(e) => {
                  if (isMinimapDraggingRef.current) {
                    handleMinimapInteraction(e);
                  }
                }}
                className="relative w-fit h-fit max-w-[180px] max-h-[140px] rounded-xl overflow-hidden border border-stone-600 bg-stone-950 cursor-crosshair group shadow-inner mx-auto"
              >
                <img
                  src={item.imageUrl}
                  alt="Mappa miniatura"
                  draggable={false}
                  className="max-w-[180px] max-h-[140px] w-auto h-auto object-contain block opacity-85 group-hover:opacity-100 transition-opacity pointer-events-none select-none"
                />

                {/* Rettangolo Mirino (Viewfinder Box): Mostra esattamente la sezione visibile */}
                <div
                  className="absolute border-2 border-amber-400 bg-amber-400/30 shadow-xs pointer-events-none"
                  style={{
                    width: `${boxWidthPercent}%`,
                    height: `${boxHeightPercent}%`,
                    left: `${boxLeftPercent}%`,
                    top: `${boxTopPercent}%`,
                    transition: isDragging ? 'none' : 'all 0.1s ease-out',
                  }}
                >
                  <div className="absolute inset-0 border border-white/60" />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Bar Hint */}
          <div className="text-center text-xs text-stone-400 z-10 flex items-center justify-center gap-2">
            <Move className="w-3.5 h-3.5 text-stone-500" />
            <span>Trascina con il mouse o con il dito per esplorare • Clicca sulla mappa in basso a destra per saltare da un punto all'altro</span>
          </div>
        </div>
      )}

      {/* 2. MODALE PRINCIPALE DETTAGLI LAVORO */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[92vh] animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md flex items-center justify-center transition-colors cursor-pointer border border-stone-200"
            aria-label="Chiudi finestra"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Big Photo Container con pulsante Zoom massimo */}
          <div className="md:w-7/12 bg-stone-100 relative min-h-[350px] md:min-h-[520px] flex items-center justify-center overflow-hidden group">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover max-h-[48vh] md:max-h-[92vh] group-hover:scale-102 transition-transform duration-500"
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

            {/* Pulsante Ingrandisci Trame a Schermo Intero con Minimappa */}
            <button
              type="button"
              onClick={() => {
                setIsZoomedFull(true);
                setZoomLevel(2.2);
                setPosition({ u: 0.5, v: 0.5 });
              }}
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-2 bg-stone-900/90 hover:bg-stone-900 text-white rounded-full text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
              title="Apri a schermo intero con zoom massimo e mappa di navigazione"
            >
              <Maximize2 className="w-4 h-4 text-rose-300" />
              <span>Ingrandisci Dettagli Trame</span>
            </button>
          </div>

          {/* Right: Details & Contact Action */}
          <div className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                  Creazione Artigianale Fatta a Mano
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mt-1">
                  {item.title}
                </h2>
              </div>

              <p className="text-sm text-stone-600 font-light leading-relaxed whitespace-pre-line">
                {item.description || 'Pezzo unico artigianale realizzato a mano.'}
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
                Ti interessa questo lavoro o vorresti una variante su misura?
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
    </>
  );
}
