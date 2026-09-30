import React, { useState, useRef } from 'react';
import {
  X,
  Camera,
  Upload,
  Lock,
  PlusCircle,
  Trash2,
  Check,
  Cloud,
  Database,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Layers,
  KeyRound,
  ExternalLink,
  Star,
} from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';
import {
  getSupabaseCredentials,
  saveSupabaseCredentials,
  testSupabaseConnection,
} from '../services/supabaseClient';

export default function AdminModal({
  isOpen,
  onClose,
  creations,
  onAddCreation,
  onDeleteCreation,
  onToggleFeatured,
  onResetDemo,
}) {
  // Autenticazione con PIN
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('emilia_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Tab interna: 'nuovo', 'gestione', 'cloud'
  const [activeTab, setActiveTab] = useState('nuovo');

  // Form Nuovo Lavoro
  const [formData, setFormData] = useState({
    title: '',
    category: 'Uncinetto',
    description: '',
    materials: '',
    dimensions: '',
    featured: false,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageStats, setImageStats] = useState(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Input file nascosti per Fotocamera e Galleria
  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Cloud Config state
  const creds = getSupabaseCredentials();
  const [cloudUrl, setCloudUrl] = useState(creds.url);
  const [cloudKey, setCloudKey] = useState(creds.anonKey);
  const [cloudTesting, setCloudTesting] = useState(false);
  const [cloudStatus, setCloudStatus] = useState(null);

  if (!isOpen) return null;

  // Gestione Login PIN
  const handlePinSubmit = (e) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('emilia_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('PIN non corretto. Riprova (il PIN di default è 1234)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('emilia_admin_auth');
    setPinInput('');
  };

  // Elaborazione immagine da file o fotocamera
  const handleImageSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      setFeedbackMsg('Ottimizzazione immagine in corso...');
      
      const compressed = await compressImage(file);
      setSelectedFile(compressed.file);
      setImagePreview(compressed.dataUrl);
      setImageStats({
        orig: compressed.originalSizeKb,
        comp: compressed.compressedSizeKb,
        dimensions: `${compressed.width}x${compressed.height}px`,
      });
      setFeedbackMsg('');
    } catch (err) {
      console.error(err);
      alert('Errore durante l\'elaborazione della foto. Riprova.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Invio nuovo lavoro
  const handleSubmitNewCreation = async (e) => {
    e.preventDefault();

    if (!imagePreview) {
      alert('Per favore seleziona o scatta una foto del lavoro prima di pubblicare.');
      return;
    }

    if (!formData.title.trim()) {
      alert('Inserisci un titolo per la creazione.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddCreation({
        ...formData,
        imageFile: selectedFile,
        imageDataUrl: imagePreview,
      });

      // Reset form
      setFormData({
        title: '',
        category: 'Uncinetto',
        description: '',
        materials: '',
        dimensions: '',
        featured: false,
      });
      setSelectedFile(null);
      setImagePreview(null);
      setImageStats(null);
      setFeedbackMsg('Creazione aggiunta con successo al catalogo!');
      setTimeout(() => setFeedbackMsg(''), 4000);
      setActiveTab('gestione');
    } catch (err) {
      console.error(err);
      alert('Errore durante il salvataggio. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Test e salvataggio configurazione Cloud
  const handleSaveCloudConfig = async (e) => {
    e.preventDefault();
    setCloudTesting(true);
    setCloudStatus(null);

    const test = await testSupabaseConnection(cloudUrl, cloudKey);
    setCloudTesting(false);
    if (test.success) {
      saveSupabaseCredentials(cloudUrl, cloudKey);
      setCloudStatus({ type: 'success', text: 'Supabase collegato con successo!' });
    } else {
      setCloudStatus({
        type: 'error',
        text: `Errore: ${test.message}. Controlla URL e Key o usa lo storage locale.`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-800">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                Spazio Emilia — Gestione Lavori
              </h2>
              <span className="text-[11px] text-stone-500">
                Pannello rapido per caricare e organizzare il catalogo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-[11px] text-stone-500 hover:text-stone-800 underline mr-2 cursor-pointer"
              >
                Disconnetti
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center border border-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isAuthenticated ? (
            /* Schermata di Accesso PIN */
            <div className="max-w-sm mx-auto text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 mx-auto flex items-center justify-center text-rose-800 shadow-inner">
                <KeyRound className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium text-stone-900">
                  Accesso Riservato
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Inserisci il codice di accesso per gestire le tue creazioni.
                </p>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    maxLength={8}
                    placeholder="Codice PIN (default: 1234)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-center text-xl tracking-widest px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800 font-mono text-stone-800"
                    autoFocus
                  />
                  {pinError && (
                    <p className="text-xs text-rose-600 mt-2 font-medium">
                      {pinError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Accedi allo Spazio Emilia
                </button>
              </form>

              <p className="text-[11px] text-stone-400">
                Suggerimento per test: il codice predefinito è <strong>1234</strong>
              </p>
            </div>
          ) : (
            /* Pannello Autenticato */
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-stone-200 pb-3 gap-2">
                <button
                  onClick={() => setActiveTab('nuovo')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'nuovo'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Nuova Creazione</span>
                </button>

                <button
                  onClick={() => setActiveTab('gestione')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'gestione'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Lavori Attuali ({creations.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('cloud')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'cloud'
                      ? 'bg-rose-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  <span>Cloud & Supabase</span>
                </button>
              </div>

              {feedbackMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{feedbackMsg}</span>
                </div>
              )}

              {/* TAB 1: NUOVA CREAZIONE (Fotocamera o File) */}
              {activeTab === 'nuovo' && (
                <form onSubmit={handleSubmitNewCreation} className="space-y-6">
                  
                  {/* Photo Upload Area */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Foto del Lavoro *
                    </label>

                    {/* Dual Action Buttons: Fotocamera diretta vs File/Galleria */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      
                      {/* Tasto 1: Scatta con fotocamera */}
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex items-center justify-center gap-2.5 p-3.5 bg-rose-50 hover:bg-rose-100/80 border-2 border-dashed border-rose-300 rounded-2xl text-rose-900 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
                      >
                        <Camera className="w-5 h-5 text-rose-700" />
                        <span>Scatta con Fotocamera</span>
                      </button>

                      {/* Tasto 2: Scegli da Galleria / File */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2.5 p-3.5 bg-stone-50 hover:bg-stone-100 border-2 border-dashed border-stone-300 rounded-2xl text-stone-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
                      >
                        <Upload className="w-5 h-5 text-stone-600" />
                        <span>Scegli da Galleria / File</span>
                      </button>

                    </div>

                    {/* Hidden input elements */}
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageSelected}
                      className="hidden"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelected}
                      className="hidden"
                    />

                    {/* Image Preview & Stats */}
                    {isProcessingImage && (
                      <div className="p-4 bg-stone-100 rounded-2xl text-center text-xs text-stone-600 animate-pulse">
                        Elaborazione e ottimizzazione foto in corso...
                      </div>
                    )}

                    {imagePreview && !isProcessingImage && (
                      <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 p-2 flex flex-col sm:flex-row items-center gap-4">
                        <img
                          src={imagePreview}
                          alt="Anteprima"
                          className="w-32 h-32 object-cover rounded-xl border border-stone-200"
                        />
                        <div className="space-y-1 text-xs text-stone-600">
                          <p className="font-semibold text-stone-900 text-sm">
                            Foto pronta per la pubblicazione
                          </p>
                          {imageStats && (
                            <p className="text-[11px] text-stone-500">
                              Dimensione: {imageStats.dimensions} • Ottimizzata: {imageStats.comp} KB (da {imageStats.orig} KB)
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setSelectedFile(null);
                              setImageStats(null);
                            }}
                            className="text-xs text-rose-700 hover:text-rose-900 underline pt-1 cursor-pointer"
                          >
                            Rimuovi o cambia foto
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Titolo Lavoro *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Es. Copertina Neonato Punto Nocciolina"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800 text-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Categoria *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, category: 'Uncinetto' })}
                          className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                            formData.category === 'Uncinetto'
                              ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                              : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          🧶 Uncinetto
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, category: 'Ricamo' })}
                          className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                            formData.category === 'Ricamo'
                              ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                              : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          🪡 Ricamo
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Descrizione / Note Artigianali
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Descrivi il punto utilizzato, la tecnica o la storia di questo manufatto..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800 text-stone-800 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Filati & Materiali (opzionale)
                      </label>
                      <input
                        type="text"
                        placeholder="Es. Puro lino grezzo, filo di Scozia n.16"
                        value={formData.materials}
                        onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800 text-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Dimensioni (opzionale)
                      </label>
                      <input
                        type="text"
                        placeholder="Es. Diametro 40 cm, 80x120 cm"
                        value={formData.dimensions}
                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-800 text-stone-800"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featuredCheck"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-rose-800 rounded border-stone-300 focus:ring-rose-800"
                    />
                    <label htmlFor="featuredCheck" className="text-xs text-stone-700 font-medium cursor-pointer">
                      Metti in evidenza questo lavoro come pezzo speciale in vetrina
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || isProcessingImage}
                      className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Pubblicazione in corso...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-rose-300" />
                          <span>Pubblica Lavoro nel Catalogo</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

              {/* TAB 2: GESTIONE LAVORI ESISTENTI */}
              {activeTab === 'gestione' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-stone-500">
                      Tutti i lavori attualmente visibili nel catalogo ({creations.length}):
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Vuoi ripristinare le creazioni d\'esempio iniziali?')) {
                          onResetDemo();
                          setFeedbackMsg('Catalogo ripristinato ai dati iniziali.');
                        }
                      }}
                      className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                    >
                      Ripristina esempi iniziali
                    </button>
                  </div>

                  <div className="divide-y divide-stone-100 max-h-[50vh] overflow-y-auto">
                    {creations.map((item) => (
                      <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-14 h-14 object-cover rounded-xl border border-stone-200"
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
                              {item.title}
                            </h4>
                            <span
                              className={`inline-block text-[10px] font-semibold px-2 py-0.2 rounded-full mt-1 ${
                                item.category === 'Uncinetto'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-rose-100 text-rose-900'
                              }`}
                            >
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => onToggleFeatured && onToggleFeatured(item.id)}
                            className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                              item.featured
                                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                                : 'bg-stone-100 text-stone-500 hover:text-amber-700 hover:bg-amber-50'
                            }`}
                            title={
                              item.featured
                                ? 'In copertina in alto (Tocca per togliere)'
                                : 'Metti come copertina in alto'
                            }
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                item.featured ? 'fill-amber-500 text-amber-600' : 'text-stone-400'
                              }`}
                            />
                            <span className="hidden sm:inline text-[11px]">
                              {item.featured ? 'In Copertina' : 'Metti in Copertina'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Eliminare definitivamente "${item.title}"?`)) {
                                onDeleteCreation(item.id);
                              }
                            }}
                            className="p-2 text-stone-400 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Elimina lavoro"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CLOUD CONFIG (Supabase) */}
              {activeTab === 'cloud' && (
                <div className="space-y-6">
                  <div className="p-4 bg-rose-50/70 border border-rose-200/80 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-rose-950 font-serif font-medium">
                      <Cloud className="w-5 h-5 text-rose-800" />
                      <span>Configurazione Database & Storage Cloud (Supabase)</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      Questa sezione permette a <strong>Beniamino Boiano</strong> di connettere il catalogo a un progetto Supabase gratuito. Una volta inserite le chiavi, tutte le foto e i lavori caricati da Emilia saranno salvati per sempre nel cloud e sincronizzati in tempo reale.
                    </p>
                  </div>

                  <form onSubmit={handleSaveCloudConfig} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Supabase Project URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://xyzcompany.supabase.co"
                        value={cloudUrl}
                        onChange={(e) => setCloudUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-rose-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Supabase Anon / Public Key
                      </label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        value={cloudKey}
                        onChange={(e) => setCloudKey(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-rose-800"
                      />
                    </div>

                    {cloudStatus && (
                      <div
                        className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                          cloudStatus.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {cloudStatus.type === 'success' ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>{cloudStatus.text}</span>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={cloudTesting}
                        className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {cloudTesting ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Database className="w-3.5 h-3.5" />
                        )}
                        <span>Testa & Salva Connessione Cloud</span>
                      </button>

                      {creds.isConfigured && (
                        <button
                          type="button"
                          onClick={() => {
                            saveSupabaseCredentials('', '');
                            setCloudUrl('');
                            setCloudKey('');
                            setCloudStatus({ type: 'success', text: 'Tornato a storage locale.' });
                          }}
                          className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Disconnetti Cloud
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Schema instructions */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
                    <p className="font-semibold text-stone-800">
                      Istruzioni per Beniamino (Setup Supabase rapido):
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-stone-600 text-[11px]">
                      <li>Crea un progetto gratuito su <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-rose-800 underline">supabase.com</a>.</li>
                      <li>Vai su <strong>SQL Editor</strong> ed esegui lo script già pronto <code>supabase_setup.sql</code> presente nella cartella del progetto.</li>
                      <li>Copia l'URL del progetto e la Anon Key e incollali qui sopra.</li>
                    </ol>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
