import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import StorySection from './components/StorySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ItemModal from './components/ItemModal';
import AdminModal from './components/AdminModal';
import {
  fetchCreations,
  createCreation,
  updateCreation,
  deleteCreation,
  toggleFeaturedCreation,
  resetToInitial,
} from './services/itemsService';
import { initialCreations } from './data/initialCreations';

export default function App() {
  const [creations, setCreations] = useState(initialCreations);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inquiryItem, setInquiryItem] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Caricamento creazioni
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchCreations();
        if (res.items && res.items.length > 0) {
          setCreations(res.items);
        }
      } catch (err) {
        console.error('Errore nel caricamento dei dati:', err);
      }
    }
    loadData();
  }, []);

  // Gestione aggiunta nuova creazione da Spazio Emilia
  const handleAddCreation = async (itemData) => {
    const res = await createCreation(itemData);
    if (res.success && res.item) {
      setCreations((prev) => [res.item, ...prev]);
    }
    return res;
  };

  // Gestione eliminazione creazione
  const handleDeleteCreation = async (id) => {
    await deleteCreation(id);
    setCreations((prev) => prev.filter((item) => item.id !== id));
  };

  // Gestione modifica creazione esistente
  const handleUpdateCreation = async (id, updatedFields) => {
    const res = await updateCreation(id, updatedFields);
    if (res.success && res.item) {
      setCreations((prev) =>
        prev.map((item) => (item.id === id ? res.item : item))
      );
    }
    return res;
  };

  // Ripristino dati d'esempio
  const handleResetDemo = () => {
    const defaultData = resetToInitial();
    setCreations(defaultData);
  };

  // Alterna stato "in evidenza"
  const handleToggleFeatured = async (id) => {
    const res = await toggleFeaturedCreation(id);
    if (res.success) {
      setCreations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, featured: !item.featured } : item
        )
      );
    }
  };

  // L'ultimo lavoro contrassegnato come "in evidenza" (featured), oppure il primo lavoro disponibile
  const featuredCreations = creations.filter((c) => c.featured);
  const latestFeatured =
    featuredCreations.length > 0 ? featuredCreations[0] : (creations[0] || null);
  const secondaryFeatured =
    featuredCreations.length > 1
      ? featuredCreations[1]
      : (creations.find((c) => c.id !== latestFeatured?.id) || null);

  // Click su "Richiedi Info" da card o modal
  const handleInquire = (item, channel = 'form') => {
    if (channel === 'whatsapp') {
      const msg = `Buongiorno Emilia, ho visto sul tuo sito il lavoro "${item.title}" (${item.category}) e vorrei maggiori informazioni sulla disponibilità o realizzazione su misura.`;
      window.open(`https://wa.me/393408585052?text=${encodeURIComponent(msg)}`, '_blank');
      return;
    }

    if (channel === 'gmail') {
      const subject = `Informazioni Creazione: ${item.title}`;
      const body = `Buongiorno Emilia,\n\nSono interessato/a al tuo lavoro "${item.title}" (${item.category}).\nVorrei ricevere informazioni su tempi, dimensioni e dettagli.\n\nGrazie!`;
      const params = new URLSearchParams({
        view: 'cm',
        fs: '1',
        to: 'emliarao10@gmail.com',
        su: subject,
        body: body,
      });
      window.open(`https://mail.google.com/mail/?${params.toString()}`, '_blank');
      return;
    }

    // Scroll al form di contatto e precompilazione
    setInquiryItem(item);
    const contactElem = document.getElementById('contatti');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800">
      
      {/* Top Navbar */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* 1. Hero Section (Mostra dinamicamente l'ultima foto messa in evidenza) */}
        <Hero
          featuredItem={latestFeatured}
          secondaryItem={secondaryFeatured}
          onSelectItem={(item) => setSelectedItem(item)}
          onExploreClick={() => {
            const el = document.getElementById('catalogo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => {
            const el = document.getElementById('contatti');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Story & Biography Section (All'inizio: introduce Emilia e la sua passione) */}
        <StorySection />

        {/* 3. Catalog & Gallery Section (Il portfolio delle opere) */}
        <Gallery
          creations={creations}
          onSelectItem={(item) => setSelectedItem(item)}
          onInquireItem={(item) => handleInquire(item, 'form')}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 4. Contact Section for Emilia */}
        <ContactSection selectedInquiryItem={inquiryItem} />

      </main>

      {/* Prominent Footer with Developer Credits (Beniamino Boiano) */}
      <Footer />

      {/* Modal Dettagli Lavoro (Lightbox con Ultra-Zoom Trame) */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onInquire={(item, channel) => handleInquire(item, channel)}
      />

      {/* Modal Amministrazione Spazio Emilia (Upload Fotocamera / Modifica Didascalie) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        creations={creations}
        onAddCreation={handleAddCreation}
        onDeleteCreation={handleDeleteCreation}
        onToggleFeatured={handleToggleFeatured}
        onUpdateCreation={handleUpdateCreation}
        onResetDemo={handleResetDemo}
      />

    </div>
  );
}
