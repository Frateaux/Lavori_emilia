-- ============================================================
-- SUPABASE SCHEMA SETUP PER IL CATALOGO DI EMILIA
-- Creato per: Beniamino Boiano (beniamino.boiano@gmail.com)
-- ============================================================

-- 1. Tabella delle creazioni (Uncinetto e Ricamo)
CREATE TABLE IF NOT EXISTS public.creazioni (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Uncinetto', 'Ricamo')),
    description TEXT,
    materials TEXT,
    dimensions TEXT,
    "imageUrl" TEXT,
    featured BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Abilita Row Level Security
ALTER TABLE public.creazioni ENABLE ROW LEVEL SECURITY;

-- Chiunque può visualizzare il catalogo (lettura pubblica)
CREATE POLICY "Creazioni visibili a tutti"
ON public.creazioni FOR SELECT
USING (true);

-- Permetti inserimento, modifica ed eliminazione
CREATE POLICY "Inserimento creazioni"
ON public.creazioni FOR INSERT
WITH CHECK (true);

CREATE POLICY "Modifica creazioni"
ON public.creazioni FOR UPDATE
USING (true);

CREATE POLICY "Eliminazione creazioni"
ON public.creazioni FOR DELETE
USING (true);

-- 2. Creazione del Bucket Storage per le immagini (se non già creato da UI)
INSERT INTO storage.buckets (id, name, public)
VALUES ('creazioni', 'creazioni', true)
ON CONFLICT (id) DO NOTHING;

-- Policy di lettura pubblica per le foto nello storage
CREATE POLICY "Foto visibili a tutti"
ON storage.objects FOR SELECT
USING (bucket_id = 'creazioni');

-- Policy di upload foto
CREATE POLICY "Upload foto creazioni"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'creazioni');

CREATE POLICY "Eliminazione foto creazioni"
ON storage.objects FOR DELETE
USING (bucket_id = 'creazioni');
