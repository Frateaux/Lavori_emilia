import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // base: './' permette a GitHub Pages di caricare gli asset (CSS e JS)
  // con percorsi relativi anche se il sito risiede in una sottocartella /nome-repo/
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
