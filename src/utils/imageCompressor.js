/**
 * Comprime e ridimensiona un'immagine scattata da fotocamera o caricata da file
 * per ottimizzare velocità di caricamento, spazio cloud e nitidezza.
 */
export async function compressImage(file, maxWidth = 1600, maxHeight = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calcola proporzioni mantenendo l'aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Impossibile ottenere il contesto 2D del canvas'));
          return;
        }

        // Migliore qualità di campionamento
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Converti in dataURL e in Blob
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Errore durante la compressione'));
              return;
            }
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            resolve({
              file: compressedFile,
              dataUrl,
              originalSizeKb: Math.round(file.size / 1024),
              compressedSizeKb: Math.round(compressedFile.size / 1024),
              width,
              height,
            });
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
