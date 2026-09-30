import React from 'react';
import { Heart, Sparkles, Clock, Compass } from 'lucide-react';

export default function StorySection() {
  return (
    <section id="storia" className="py-20 bg-[#F4F0E8] border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"
                  alt="Mani al lavoro con ago e filati artigianali"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quote Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white p-5 rounded-2xl shadow-xl border border-stone-200/90 max-w-[280px]">
                <Heart className="w-5 h-5 text-rose-700 fill-rose-100 mb-2" />
                <p className="font-serif italic text-stone-800 text-sm leading-snug">
                  "Nel ricamo e nell'uncinetto non c'è fretta: c'è solo il tempo giusto per rendere eterna una cosa bella."
                </p>
                <span className="block mt-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  — Emilia
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story Text */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 text-rose-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-800" />
              <span>La Storia & La Filosofia</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
              Creare a mano significa mettere un pezzetto di anima in ogni filo.
            </h2>

            <div className="space-y-4 text-stone-600 font-light text-base sm:text-lg leading-relaxed">
              <p>
                La passione di <strong className="font-semibold text-stone-800">Emilia</strong> per l'ago e l'uncinetto affonda le radici in una tradizione antica, fatta di pomeriggi trascorsi a osservare gesti precisi, intrecci lenti e la magia di veder nascere motivi floreali da una semplice matassa di cotone o lino.
              </p>
              <p>
                Oggi quell'eredità si trasforma in un catalogo contemporaneo: dai classici centrini a punto filet e coperte a punto nocciolina, fino alle borse estive moderne in Granny Square e ai raffinati corredini personalizzati con cifre ricamate.
              </p>
              <p>
                Nessuna macchina industriale può replicare il calore, la texture e la delicatezza di un manufatto creato su misura con dedizione e rispetto dei tempi lenti dell'artigianato vero.
              </p>
            </div>

            {/* Core Values */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center gap-2.5 text-rose-900 font-serif font-medium text-lg mb-1">
                  <Clock className="w-5 h-5 text-rose-700" />
                  <span>Slow Craft</span>
                </div>
                <p className="text-xs text-stone-600">
                  Ogni pezzo richiede ore di concentrazione e cura sartoriale per durare una vita intera.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center gap-2.5 text-rose-900 font-serif font-medium text-lg mb-1">
                  <Compass className="w-5 h-5 text-rose-700" />
                  <span>Su Misura</span>
                </div>
                <p className="text-xs text-stone-600">
                  Possibilità di personalizzare colori, iniziali ricamate, forme e dimensioni secondo i tuoi desideri.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
