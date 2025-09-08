// src/pages/robots.txt.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const site =
    import.meta.env.PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://example.com";

  const isPreview =
    import.meta.env.PUBLIC_ROBOTS_NOINDEX === "1" ||
    import.meta.env.NODE_ENV !== "production";

  // Bloquea API y páginas de checkout; permite resto. Añade enlace al sitemap.
  const body = [
    `User-agent: *`,
    isPreview ? `Disallow: /` : `Allow: /`,
    `Disallow: /api/`,
    `Disallow: /cart/`,
    `Disallow: /order/`,
    `Sitemap: ${site}/sitemap.xml`,
    ``
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
