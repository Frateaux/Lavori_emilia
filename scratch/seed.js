import { createClient } from '@supabase/supabase-js';
import { initialCreations } from '../src/data/initialCreations.js';

const SUPABASE_URL = 'https://xtfywqmlakryfvuroxol.supabase.co';
const SUPABASE_KEY = 'sb_publishable_v7qW_RvIfsC3YzeD7ttEvA_STnDrbic';

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  console.log('Seeding initial creations into Supabase...');
  const { data, error } = await client
    .from('creazioni')
    .upsert(initialCreations, { onConflict: 'id' })
    .select();

  if (error) {
    console.error('Error seeding creations:', error);
  } else {
    console.log(`Success! Seeded ${data.length} items into Supabase creazioni table.`);
  }
}

main();
