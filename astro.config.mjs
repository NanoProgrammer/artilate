// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://artilate.com',
  adapter: cloudflare(),
  output: 'server',

  vite: {
    // Incluye todos los archivos en src/assets
    assetsInclude: ['src/assets/**/*.jpg'],

    plugins: [tailwindcss()],
  },

  integrations: [react()],
});