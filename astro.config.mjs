import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import './polyfills.js'; // si es necesario para algo

export default defineConfig({
  site: 'https://artilate.com',
  adapter: cloudflare({
    mode: 'worker', // Asegúrate de tener esta opción o una configuración similar
    // entryPoint: './src/entry-worker.js', // Podrías necesitar definir un punto de entrada
  }),
  output: 'server',
  integrations: [
    react(),
  ],
  vite: {
    define: {
      // Para Alpine.js si lo usas
      'process.env': process.env
    }
  }
});
