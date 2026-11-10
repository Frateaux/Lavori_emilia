/**
 * Utility per estrarre la lista di tutte le immagini associate a una creazione
 * Supporta sia URL singoli che JSON serializzati o array images
 */
export function getItemImages(item) {
  if (!item) return [];

  // 1. Se ha un array esplicito images
  if (Array.isArray(item.images) && item.images.length > 0) {
    return item.images.filter(Boolean);
  }

  // 2. Se imageUrl contiene un JSON serializzato (es. { main: '...', gallery: [...] })
  if (typeof item.imageUrl === 'string') {
    const trimmed = item.imageUrl.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed.gallery) && parsed.gallery.length > 0) {
          return parsed.gallery.filter(Boolean);
        }
        if (parsed.main) {
          return [parsed.main];
        }
      } catch {
        // Non è JSON, procedi come stringa singola
      }
    } else if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(Boolean);
        }
      } catch {
        // Non è JSON
      }
    }

    if (trimmed.length > 0) {
      return [trimmed];
    }
  }

  return [];
}

/**
 * Ritorna l'immagine di copertina primaria di un elemento
 */
export function getItemMainImage(item, fallback = '') {
  const images = getItemImages(item);
  return images.length > 0 ? images[0] : (item?.imageUrl || fallback);
}

/**
 * Codifica una lista di immagini in un valore adatto per il salvataggio
 * Se c'è solo un'immagine salva la stringa normale; se sono multiple salva il JSON
 */
export function encodeItemImages(imageList) {
  const cleanList = (imageList || []).filter(Boolean);
  if (cleanList.length <= 1) {
    return cleanList[0] || '';
  }
  return JSON.stringify({
    main: cleanList[0],
    gallery: cleanList,
  });
}
