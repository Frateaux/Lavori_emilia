import { getSupabaseClient } from './supabaseClient';
import { initialCreations } from '../data/initialCreations';

const LOCAL_STORAGE_KEY = 'emilia_creazioni_catalog_v1';

// Inizializza i dati locali con quelli di default se vuoti
function getLocalItems() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCreations));
      return initialCreations;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Errore lettura da localStorage', e);
    return initialCreations;
  }
}

function saveLocalItems(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Errore salvataggio su localStorage', e);
  }
}

/**
 * Recupera tutte le creazioni ordinate per data decrescente
 */
export async function fetchCreations() {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('creazioni')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.warn('Errore lettura da Supabase, uso fallback locale:', error);
        return { items: getLocalItems(), source: 'local_fallback', error: error.message };
      }

      if (data && data.length > 0) {
        return { items: data, source: 'cloud' };
      } else {
        // Se la tabella cloud è vuota, carica i dati locali
        return { items: getLocalItems(), source: 'local' };
      }
    } catch (err) {
      console.warn('Eccezione Supabase:', err);
      return { items: getLocalItems(), source: 'local_fallback' };
    }
  }

  // Nessuna configurazione cloud: usa lo storage locale
  return { items: getLocalItems(), source: 'local' };
}

/**
 * Salva una nuova creazione
 */
export async function createCreation({
  title,
  category,
  description,
  materials,
  dimensions,
  featured = false,
  imageFile,
  imageDataUrl,
}) {
  const supabase = getSupabaseClient();
  const id = 'cr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const createdAt = new Date().toISOString();

  let finalImageUrl = imageDataUrl;

  // Se Supabase è attivo ed è stato fornito un file, carichiamo su Supabase Storage
  if (supabase && imageFile) {
    try {
      const fileExt = imageFile.name.split('.').pop() || 'jpg';
      const fileName = `${id}.${fileExt}`;
      const filePath = fileName;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('creazioni')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('creazioni')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          finalImageUrl = publicUrlData.publicUrl;
        }
      } else {
        console.warn('Upload storage fallito, salvo dataUrl come fallback:', uploadError);
      }
    } catch (storageErr) {
      console.warn('Errore storage:', storageErr);
    }
  }

  const newItem = {
    id,
    title,
    category,
    description,
    materials: materials || 'Fatto a mano con cura',
    dimensions: dimensions || 'Dimensioni personalizzabili',
    imageUrl: finalImageUrl,
    featured: Boolean(featured),
    createdAt,
  };

  // Se Supabase è connesso, inserisci nel DB
  if (supabase) {
    try {
      const { data, error } = await supabase.from('creazioni').insert([newItem]).select();
      if (!error && data && data.length > 0) {
        // Aggiorna anche la cache locale
        const current = getLocalItems();
        saveLocalItems([newItem, ...current]);
        return { success: true, item: data[0], source: 'cloud' };
      }
    } catch (dbErr) {
      console.warn('Salvataggio DB Supabase fallito, procedo in locale:', dbErr);
    }
  }

  // Salvataggio locale
  const current = getLocalItems();
  const updated = [newItem, ...current];
  saveLocalItems(updated);
  return { success: true, item: newItem, source: 'local' };
}

/**
 * Elimina una creazione
 */
export async function deleteCreation(id) {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      await supabase.from('creazioni').delete().eq('id', id);
    } catch (e) {
      console.warn('Errore cancellazione Supabase:', e);
    }
  }

  const current = getLocalItems();
  const updated = current.filter((item) => item.id !== id);
  saveLocalItems(updated);
  return { success: true };
}

/**
 * Modifica i dati di una creazione esistente (titolo, categoria, descrizione, materiali, misure)
 */
export async function updateCreation(id, updatedFields) {
  const current = getLocalItems();
  let updatedItem = null;
  const updated = current.map((item) => {
    if (item.id === id) {
      updatedItem = { ...item, ...updatedFields };
      return updatedItem;
    }
    return item;
  });
  saveLocalItems(updated);

  const supabase = getSupabaseClient();
  if (supabase && updatedItem) {
    try {
      const { data, error } = await supabase
        .from('creazioni')
        .update({
          title: updatedItem.title,
          category: updatedItem.category,
          description: updatedItem.description,
          materials: updatedItem.materials,
          dimensions: updatedItem.dimensions,
          featured: updatedItem.featured,
          ...(updatedFields.imageUrl ? { imageUrl: updatedItem.imageUrl } : {}),
        })
        .eq('id', id)
        .select();

      if (!error && data && data.length > 0) {
        return { success: true, item: data[0] };
      }
    } catch (e) {
      console.warn('Errore aggiornamento Supabase:', e);
    }
  }

  return { success: true, item: updatedItem };
}

/**
 * Alterna lo stato "In evidenza" (Vetrina / Copertina) di una creazione
 */
export async function toggleFeaturedCreation(id) {
  const current = getLocalItems();
  let newFeatured = false;
  const updated = current.map((item) => {
    if (item.id === id) {
      newFeatured = !item.featured;
      return { ...item, featured: newFeatured };
    }
    return item;
  });
  saveLocalItems(updated);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('creazioni').update({ featured: newFeatured }).eq('id', id);
    } catch (e) {
      console.warn('Errore aggiornamento featured su Supabase:', e);
    }
  }

  return { success: true, newFeatured };
}

/**
 * Ripristina i dati d'esempio iniziali
 */
export function resetToInitial() {
  saveLocalItems(initialCreations);
  return initialCreations;
}
