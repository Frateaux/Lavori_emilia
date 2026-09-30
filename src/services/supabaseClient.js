import { createClient } from '@supabase/supabase-js';

const STORAGE_KEYS = {
  URL: 'emilia_supabase_url',
  ANON_KEY: 'emilia_supabase_anon_key',
};

export function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const localUrl = localStorage.getItem(STORAGE_KEYS.URL);
  const localKey = localStorage.getItem(STORAGE_KEYS.ANON_KEY);

  const url = localUrl || envUrl || '';
  const anonKey = localKey || envKey || '';

  return { url, anonKey, isConfigured: Boolean(url && anonKey) };
}

export function saveSupabaseCredentials(url, anonKey) {
  if (url && anonKey) {
    localStorage.setItem(STORAGE_KEYS.URL, url.trim());
    localStorage.setItem(STORAGE_KEYS.ANON_KEY, anonKey.trim());
  } else {
    localStorage.removeItem(STORAGE_KEYS.URL);
    localStorage.removeItem(STORAGE_KEYS.ANON_KEY);
  }
}

let cachedClient = null;
let lastUrl = null;
let lastKey = null;

export function getSupabaseClient() {
  const { url, anonKey, isConfigured } = getSupabaseCredentials();

  if (!isConfigured) return null;

  if (cachedClient && lastUrl === url && lastKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey);
    lastUrl = url;
    lastKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Errore inizializzazione client Supabase:', err);
    return null;
  }
}

export async function testSupabaseConnection(url, anonKey) {
  try {
    const testClient = createClient(url, anonKey);
    const { data, error } = await testClient.from('creazioni').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      // Se la tabella non esiste ancora, proviamo comunque che la connessione auth sia valida
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Connessione a Supabase riuscita!' };
  } catch (err) {
    return { success: false, message: err.message || 'Errore di connessione' };
  }
}
