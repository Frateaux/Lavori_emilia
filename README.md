# 🌸 Emilia — Creazioni Artigianali | Ricamo & Uncinetto

Sito web moderno, elegante e d'effetto sviluppato su misura per **Emilia**, ideato per esporre e catalogare i suoi manufatti artigianali d'eccellenza (lavori all'uncinetto e ricami fatti a mano) e mostrarli con orgoglio ai potenziali clienti.

---

## 🌸 Artigiana & Titolare
* **Nome:** **Emilia Rao**
* **Email:** [emliarao10@gmail.com](mailto:emliarao10@gmail.com)
* **Telefono & WhatsApp:** [+39 340 858 5052](tel:+393408585052) • [Chatta con Emilia su WhatsApp](https://wa.me/393408585052)

---

## 👨‍💻 Sviluppatore del Progetto
* **Sviluppo & Design:** **Beniamino Boiano**
* **Email:** [beniamino.boiano@gmail.com](mailto:beniamino.boiano@gmail.com)
* **Telefono:** [329 315 4460](tel:3293154460)
* **WhatsApp:** [Chatta con Beniamino](https://wa.me/393293154460)

---

## ✨ Caratteristiche Principali del Sito

1. **Vetrina e Catalogo d'Autore:**
   - Filtro istantaneo per categoria (**Uncinetto** 🧶 e **Ricamo** 🪡).
   - Ricerca testuale per materiali, dimensioni e parole chiave.
   - Lightbox a schermo intero con zoom foto in alta risoluzione per ammirare ogni singolo punto e trama.

2. **Spazio Riservato Emilia (Area Gestione / Caricamento Lavori):**
   - Accessibile direttamente dal pulsante lucchetto **"Spazio Emilia"** in alto.
   - Protetto da codice PIN semplice (predefinito: `1234`).
   - **Upload da Fotocamera:** pulsante dedicato che attiva direttamente la fotocamera dello smartphone (`capture="environment"`) per scattare la foto al lavoro appena completato.
   - **Upload da File / Galleria:** per selezionare foto già presenti sul dispositivo.
   - **Ottimizzatore e Compressore integrato:** riduce automaticamente foto pesanti (es. da 15MB a ~180KB) in tempo reale direttamente nel browser prima del salvataggio, garantendo massima velocità e risparmio di spazio.

3. **Lead Generation & Contatti:**
   - Pulsanti di richiesta precompilati per **WhatsApp** ed **Email** con il titolo dell'opera già inserito nel messaggio.
   - Scheda contatti con placeholder chiari ed eleganti per i recapiti diretti di Emilia (telefono ed email).
   - Nessun carrello e-commerce: il sito privilegia la relazione umana e la personalizzazione tipica dell'artigianato su misura.

4. **Architettura Cloud & Storage:**
   - **Pronto subito all'uso:** funziona immediatamente anche in locale o offline memorizzando le creazioni nel browser.
   - **Integrazione Cloud Supabase:** include lo script SQL `supabase_setup.sql` pronto per essere eseguito su [Supabase](https://supabase.com). Nel pannello "Spazio Emilia" è presente una scheda **"Cloud & Supabase"** per inserire l'URL e la chiave in pochi secondi senza ricompilare il codice.

---

## 🚀 Come Avviare il Sito in Locale

```bash
# Avvia il server di sviluppo locale
npm run dev

# Per creare la versione definitiva di produzione
npm run build
```

Il sito è accessibile su: `http://localhost:5173/`

---

## 🗄️ Configurazione Cloud Supabase (Opzionale)

1. Crea un account o progetto gratuito su [supabase.com](https://supabase.com).
2. Apri la sezione **SQL Editor** e incolla il contenuto del file `supabase_setup.sql`.
3. Vai nelle impostazioni del progetto Supabase (API) e copia **Project URL** e **anon public key**.
4. Apri il sito nel browser, clicca su **"Spazio Emilia"** (PIN: `1234`), vai nella scheda **"Cloud & Supabase"**, incolla le credenziali e clicca su **"Testa & Salva Connessione Cloud"**.
