-- ============================================================
-- SUPABASE SCHEMA SETUP PER IL CATALOGO DI EMILIA
-- Script pronto all'uso: esegui tutto il contenuto in blocco
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

-- Rimuovi policy precedenti se già presenti
DROP POLICY IF EXISTS "Creazioni visibili a tutti" ON public.creazioni;
DROP POLICY IF EXISTS "Inserimento creazioni" ON public.creazioni;
DROP POLICY IF EXISTS "Modifica creazioni" ON public.creazioni;
DROP POLICY IF EXISTS "Eliminazione creazioni" ON public.creazioni;

-- Regole di accesso per la tabella
CREATE POLICY "Creazioni visibili a tutti" ON public.creazioni FOR SELECT USING (true);
CREATE POLICY "Inserimento creazioni" ON public.creazioni FOR INSERT WITH CHECK (true);
CREATE POLICY "Modifica creazioni" ON public.creazioni FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Eliminazione creazioni" ON public.creazioni FOR DELETE USING (true);

-- 2. Bucket Storage per le immagini
INSERT INTO storage.buckets (id, name, public)
VALUES ('creazioni', 'creazioni', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Rimuovi policy storage precedenti se già presenti
DROP POLICY IF EXISTS "Foto visibili a tutti" ON storage.objects;
DROP POLICY IF EXISTS "Upload foto creazioni" ON storage.objects;
DROP POLICY IF EXISTS "Eliminazione foto creazioni" ON storage.objects;

-- Regole di accesso per le foto nello storage
CREATE POLICY "Foto visibili a tutti" ON storage.objects FOR SELECT USING (bucket_id = 'creazioni');
CREATE POLICY "Upload foto creazioni" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'creazioni');
CREATE POLICY "Eliminazione foto creazioni" ON storage.objects FOR DELETE USING (bucket_id = 'creazioni');
