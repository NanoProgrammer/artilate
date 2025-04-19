/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
    ],
    theme: {
      extend: {
        colors: {
            color1: '#0E0C15',
            color2: '#1E40FF',
            color3: '#F03900',
            color4: '#FFD000',
            color5: '#F2F2F2',
            color6: '#FFFFFF',
          },
          fontFamily: {
            sans: 'var(--font-sans)',
            serif: 'var(--font-serif)',
          },
        }
    },
    plugins: [],
  }
  