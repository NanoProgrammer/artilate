export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
  
      // Servir archivos estáticos desde /assets
      if (url.pathname.startsWith('/assets/')) {
        const filePath = `./dist/public${url.pathname}`;
        try {
          const file = await Deno.open(filePath, { read: true });
          return new Response(file.readable, {
            headers: { 'Content-Type': 'image/png' },
          });
        } catch (error) {
          return new Response('File not found', { status: 404 });
        }
      }
  
      // Maneja otras solicitudes
      return new Response('Not Found', { status: 404 });
    },
  };