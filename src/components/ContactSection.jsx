import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  HeartHandshake,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  EMILIA_EMAIL,
  EMILIA_PHONE_DISPLAY,
  getGmailComposeUrl,
  getOutlookComposeUrl,
  getMailtoUrl,
  getWhatsAppUrl,
} from '../utils/emailLinks';

export default function ContactSection({ selectedInquiryItem }) {
  const [formData, setFormData] = useState({
    nome: '',
    recapito: '',
    tipoRichiesta: 'Informazioni Generali',
    messaggio: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Aggiorna messaggio se selezionato un lavoro specifico dal catalogo
  useEffect(() => {
    if (selectedInquiryItem) {
      setFormData((prev) => ({
        ...prev,
        tipoRichiesta: `Creazione: ${selectedInquiryItem.title}`,
        messaggio: `Buongiorno Emilia, sono interessato/a al lavoro "${selectedInquiryItem.title}" (${selectedInquiryItem.category}). Vorrei sapere disponibilità, tempi di realizzazione e maggiori dettagli.`,
      }));
    }
  }, [selectedInquiryItem]);

  const fullEmailBody = `Nome: ${formData.nome || 'Non specificato'}
Recapito di contatto: ${formData.recapito || 'Non specificato'}
Oggetto: ${formData.tipoRichiesta}

Messaggio:
${formData.messaggio}`;

  const emailSubject = `Richiesta da sito web - ${formData.tipoRichiesta}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Tentativo automatico di apertura Gmail se disponibile o notifica opzioni
    // Non forziamo un redirect cieco che potrebbe bloccarsi
  };

  const handleCopyText = () => {
    const copyContent = `Destinatario: ${EMILIA_EMAIL}\nOggetto: ${emailSubject}\n\n${fullEmailBody}`;
    navigator.clipboard.writeText(copyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contatti" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Mettiti in Contatto</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
            Parla con Emilia
          </h2>
          <p className="text-stone-600 font-light text-base leading-relaxed">
            Ogni creazione nasce da un dialogo. Desideri un corredo per neonato, una coperta speciale o personalizzare un ricamo? Contatta direttamente Emilia per raccontare la tua idea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Direct Contacts Card (Emilia's Official Contacts) */}
          <div className="lg:col-span-5 space-y-6 bg-white p-8 rounded-3xl border border-stone-200/90 shadow-sm">
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Recapiti Diretti
            </h3>
            
            <p className="text-xs text-stone-500 leading-relaxed">
              Puoi contattare direttamente Emilia per qualsiasi domanda, preventivo o richiesta su misura:
            </p>

            <div className="space-y-3 pt-2">
              {/* Telefono & Chiamata */}
              <a
                href="tel:+393408585052"
                className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 hover:bg-rose-50/60 border border-stone-200/70 hover:border-rose-300 transition-all duration-200 group block"
              >
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-800 shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-stone-500">
                    Telefono / Chiamate
                  </span>
                  <span className="text-sm font-semibold text-stone-900 group-hover:text-rose-900 transition-colors">
                    {EMILIA_PHONE_DISPLAY}
                  </span>
                  <span className="block text-[11px] text-stone-500 mt-0.5">
                    Tocca per chiamare subito
                  </span>
                </div>
              </a>

              {/* WhatsApp Diretto */}
              <a
                href={getWhatsAppUrl('+393408585052', 'Buongiorno Emilia, ti contatto dal tuo sito web per informazioni sui tuoi lavori...')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/80 hover:border-emerald-300 transition-all duration-200 group block"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-emerald-800">
                    WhatsApp Diretto
                  </span>
                  <span className="text-sm font-semibold text-emerald-950">
                    {EMILIA_PHONE_DISPLAY}
                  </span>
                  <span className="block text-[11px] text-emerald-700 mt-0.5">
                    Avvia chat WhatsApp immediata
                  </span>
                </div>
              </a>

              {/* Gmail Web Compose Diretto */}
              <a
                href={getGmailComposeUrl(
                  EMILIA_EMAIL,
                  'Richiesta informazioni dal sito',
                  'Buongiorno Emilia, ti scrivo dal tuo sito web per chiederti informazioni su una creazione...'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-red-50/70 hover:bg-red-100/70 border border-red-200/80 hover:border-red-300 transition-all duration-200 group block"
              >
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-red-800">
                    Email (Apri con Gmail)
                  </span>
                  <span className="text-sm font-semibold text-stone-900 group-hover:text-red-900 transition-colors break-all">
                    {EMILIA_EMAIL}
                  </span>
                  <span className="block text-[11px] text-red-700 mt-0.5">
                    Apre direttamente la schermata di Gmail sul Web
                  </span>
                </div>
              </a>

              {/* Nota acquisti */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-amber-900 text-xs leading-relaxed">
                <p className="font-semibold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  Pezzi Unici su Misura
                </p>
                Il sito è una vetrina per mostrare i lavori di Emilia. Non effettua pagamenti automatici: ogni creazione viene concordata e personalizzata con cura.
              </div>
            </div>
          </div>

          {/* Interactive Contact Form & Multi-Channel Dispatcher */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-sm">
            <h3 className="font-serif text-2xl font-medium text-stone-900 mb-2">
              Invia un Messaggio
            </h3>
            <p className="text-xs text-stone-500 mb-6 font-light">
              Compila il modulo con i tuoi dati: potrai scegliere se inviarlo direttamente con **Gmail Web**, **WhatsApp** o tramite la tua app di posta preferita.
            </p>

            {submitted ? (
              /* Success / Choice Screen */
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl text-stone-900 font-medium">
                    Messaggio Pronto per l'Invio!
                  </h4>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Scegli come preferisci trasmettere la richiesta a <strong>Emilia</strong>:
                  </p>
                </div>

                {/* Dispatch Options */}
                <div className="space-y-3 pt-2">
                  
                  {/* Opzione 1: Gmail Web (diretto, perfetto per browser) */}
                  <a
                    href={getGmailComposeUrl(EMILIA_EMAIL, emailSubject, fullEmailBody)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-white" />
                      <div className="text-left">
                        <span className="block">Invia con Gmail Web</span>
                        <span className="block text-[11px] text-red-100 font-normal">
                          Apre subito Gmail in una nuova scheda con testo già compilato
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>

                  {/* Opzione 2: WhatsApp (immediato e preferito per mobile e PC) */}
                  <a
                    href={getWhatsAppUrl('+393408585052', `${emailSubject}\n\n${fullEmailBody}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-white" />
                      <div className="text-left">
                        <span className="block">Invia su WhatsApp ad Emilia</span>
                        <span className="block text-[11px] text-emerald-100 font-normal">
                          Chat diretta con il numero +39 340 858 5052
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>

                  {/* Opzione 3: Outlook / Hotmail Web */}
                  <a
                    href={getOutlookComposeUrl(EMILIA_EMAIL, emailSubject, fullEmailBody)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-medium text-xs sm:text-sm shadow-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-sky-200" />
                      <span>Invia con Outlook / Hotmail Web</span>
                    </div>
                    <ExternalLink className="w-4 h-4 shrink-0 text-sky-200" />
                  </a>

                  {/* Opzione 4: Client locale di sistema (Mailto) */}
                  <a
                    href={getMailtoUrl(EMILIA_EMAIL, emailSubject, fullEmailBody)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-medium text-xs sm:text-sm shadow-2xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-stone-600" />
                      <span>Apri app di posta del computer/smartphone (Mailto)</span>
                    </div>
                    <ExternalLink className="w-4 h-4 shrink-0 text-stone-400" />
                  </a>

                  {/* Opzione 5: Copia testo negli appunti */}
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">
                          Testo e indirizzo copiati negli appunti!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-stone-500" />
                        <span>Copia testo del messaggio e indirizzo email</span>
                      </>
                    )}
                  </button>

                </div>

                <div className="pt-2 text-center border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Modifica il messaggio o compila un'altra richiesta</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Il tuo Nome *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Es. Maria Rossi"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800/30 focus:border-rose-800 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Il tuo Telefono o la tua Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Es. 333 1234567 oppure nome@email.com"
                    value={formData.recapito}
                    onChange={(e) => setFormData({ ...formData, recapito: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800/30 focus:border-rose-800 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Oggetto della Richiesta
                  </label>
                  <input
                    type="text"
                    value={formData.tipoRichiesta}
                    onChange={(e) => setFormData({ ...formData, tipoRichiesta: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800/30 focus:border-rose-800 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Messaggio o dettagli del lavoro desiderato *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descrivi cosa desideri: misure, colori, disegno preferito o per quale occasione..."
                    value={formData.messaggio}
                    onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800/30 focus:border-rose-800 text-stone-800 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Procedi all'Invio del Messaggio</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
