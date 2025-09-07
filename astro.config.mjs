import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import './polyfills.js'; // si es necesario para algo

export default defineConfig({
  site: 'https://artilate.com',
  adapter: netlify(),
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
