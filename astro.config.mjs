// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://artilate.com',
  adapter: cloudflare(),
  output: 'server',
  vite: {
    assetsInclude: ['src/assets/**/*.jpg'], // Incluye todos los archivos en src/assets
  },
});