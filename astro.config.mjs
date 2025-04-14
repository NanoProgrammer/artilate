// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import './polyfills.js'; // Importa el polyfill
import clientRouter from '@astrojs/client-router';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://artilate.com',
  adapter: cloudflare(),
  output: 'server',

  vite: {plugins: [tailwindcss()],
  },

  integrations: [react(), clientRouter()],
  experimental: {
    viewTransitions: true,
  },
});