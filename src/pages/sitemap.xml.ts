// src/pages/sitemap.xml.ts
import type { APIRoute } from "astro";

// ——— Helpers ———
const url = (base: string, path: string) =>
  `${base}${path.startsWith("/") ? "" : "/"}${path}`.replace(/\/+$/, "");

// Intenta cargar productos del catálogo local
async function getProductPaths(): Promise<string[]> {
  try {
    // desde /src/pages a /src/lib
    const mod = await import("../lib/catalog");
    const CATALOG: Record<string, { id: string }> = (mod as any).CATALOG ?? {};
    return Object.keys(CATALOG).map((id) => `/shop/${id}`);
  } catch {
    return [];
  }
}

// Intenta cargar slugs del blog (Sanity). Si no hay client/vars, devuelve []
async function getJournalPaths(): Promise<string[]> {
  try {
    const mod = await import("../lib/sanity");
    const client = (mod as any).client || (mod as any).sanityClient;
    if (!client) return [];
    // GROQ: posts publicados con slug
    const posts: { slug?: { current?: string } }[] = await client.fetch(
      `*[_type=="post" && defined(slug.current) && !(_id in path("drafts.**"))]{slug}`
    );
    return (posts || [])
      .map((p) => p?.slug?.current)
      .filter(Boolean)
      .map((s) => `/journal/${s}`);
  } catch {
    return [];
  }
}

export const GET: APIRoute = async () => {
  const site =
    import.meta.env.PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://example.com";

  // Rutas estáticas sacadas de tu árbol /src/pages
  const staticPaths = [
    "/", // tu home si existe (Layout suele montarlo)
    "/about",
    "/about/origins",
    "/about/process",
    "/about/sustainability",
    "/contact",
    "/disclaimer",
    "/events",
    "/faq",
    "/find-us",
    "/journal",
    "/order/cancel",
    "/order/thank-you",
    "/policy",
    "/shop",
    "/terms-of-sale",
    "/testimonial",
    "/thank-you",
    "/wholesale",
    "/404" // opcional
  ];

  const [productPaths, journalPaths] = await Promise.all([
    getProductPaths(),
    getJournalPaths()
  ]);

  const all = Array.from(
    new Set<string>([...staticPaths, ...productPaths, ...journalPaths])
  );

  const now = new Date().toISOString();

  const xmlItems = all
    .map((p) => {
      const loc = url(site, p);
      const isContent = p.startsWith("/journal/") || p.startsWith("/shop/");
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${isContent ? "weekly" : "monthly"}</changefreq>
    <priority>${isContent ? "0.80" : "0.60"}</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${xmlItems}
</urlset>`.trim();

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
