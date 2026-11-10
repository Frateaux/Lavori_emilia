import React from 'react';
import { Feather, Scissors, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function CraftsmanshipSection() {
  return (
    <section id="materiali" className="py-20 md:py-28 bg-[#F5F1E8] border-t border-stone-200/80 relative overflow-hidden">
      {/* Texture decorativa sottile */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#292524_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intestazione */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-stone-200/80 text-stone-700 text-xs font-semibold uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-800" />
            <span>Materiali Nobili & Filosofia</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            L'Arte del Gesto e la Nobiltà dei Filati
          </h2>
          
          <p className="text-stone-600 font-light text-base sm:text-lg leading-relaxed">
            Un'opera artigianale nasce prima ancora del primo punto: vive nella selezione rigorosa delle fibre naturali e nella devozione al celebre <strong className="font-medium text-stone-800">"retro perfetto"</strong>, dove la maestria si nasconde dove nessuno guarda.
          </p>
        </div>

        {/* 3 Colonne Artigianalità */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Filati */}
          <div className="bg-white/85 backdrop-blur-xs p-8 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200/70 shadow-2xs">
                <Feather className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">
                Cotone di Scozia & Lino Puro
              </h3>
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Utilizzo esclusivo di filati a fibra lunga mercerizzata (titolo 8, 12, 16 e 25) che garantiscono riflessi serici, resistenza eccezionale ai lavaggi e una freschezza tattile ineguagliabile.
              </p>
            </div>

            <ul className="mt-6 pt-6 border-t border-stone-100 space-y-2.5 text-xs text-stone-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0" />
                <span>100% Fibre botaniche e naturali</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0" />
                <span>Colorazioni stabili e inalterabili nel tempo</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Il Retro Perfetto */}
          <div className="bg-white/85 backdrop-blur-xs p-8 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/40 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-13 h-13 rounded-2xl bg-rose-50 text-rose-900 flex items-center justify-center border border-rose-200/70 shadow-2xs">
                <Scissors className="w-6 h-6 text-rose-800" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">
                La Regola del "Retro Perfetto"
              </h3>
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Nella grande tradizione del ricamo d'arte, il rovescio di un capo deve essere pulito e ordinato quanto il dritto. Nessun nodo visibile, nessuna gugliata lasciata al caso: un rigore che distingue il vero artigianato.
              </p>
            </div>

            <ul className="mt-6 pt-6 border-t border-stone-100 space-y-2.5 text-xs text-stone-700 font-medium relative z-10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0" />
                <span>Nessun filo tirato o nodo apparente</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0" />
                <span>Tensione omogenea su ogni punto</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Opere Destinate a Durare */}
          <div className="bg-white/85 backdrop-blur-xs p-8 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-13 h-13 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center border border-stone-300/70 shadow-2xs">
                <HeartHandshake className="w-6 h-6 text-stone-800" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">
                Eredità di Famiglia & Su Misura
              </h3>
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Ogni centrino, tovaglia, bomboniera o corredo è pensato per essere tramandato di generazione in generazione. È possibile concordare dimensioni, motivi cifrati e schemi ad hoc per ogni evento.
              </p>
            </div>

            <ul className="mt-6 pt-6 border-t border-stone-100 space-y-2.5 text-xs text-stone-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0" />
                <span>Monogrammi & Cifre personalizzate</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-700 shrink-0" />
                <span>Consulenza diretta e senza intermediari</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
