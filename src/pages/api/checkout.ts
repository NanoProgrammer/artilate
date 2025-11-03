// src/pages/api/checkout.ts
export const prerender = false;

import type { APIRoute } from "astro";
import Stripe from "stripe";
import { CATALOG } from "../../lib/catalog";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY as string);

type Incoming = {
  items: { id: string; quantity: number }[];
  email?: string;
  address?: string;
};

const toCents = (n: number) => Math.round(n * 100);

// Mapea IDs internos → slugs del catálogo (mantén esto como ya lo tienes)
const ALIASES: Record<string, string> = {
  "box-classic-9": "classic-box-9",
  "box-tropical-9": "tropical-box-9",
  "box-nutlover-5": "nut-lover-5",
  "box-floral-8": "floral-garden-8",
  "box-minis-4": "mini-sampler-4",
  "box-berry-4": "berry-burst-4",
  "box-caramel-8": "sea-salt-caramel-8",
  "gift-highlight-ribbon": "ribboned-celebration-set",
  "gift-sweetheart-duo": "sweetheart-duo",
  "gift-office-trio": "office-thanks-trio",
  "gift-luxe-16": "luxe-bonbons-16",
  "le-microlot-huila-72": "microlot-huila-72",
  "le-midnight-bloom-8": "midnight-bloom-8",
  "le-espresso-shards-120": "espresso-caramel-shards",
  "le-smoked-gianduja-thin": "smoked-gianduja-thin",
  "coins-milk": "chocolate-coins-milk",
  "coins-dark": "chocolate-coins-dark",
  "dinos-mix": "chocolate-dinosaurs-mix",
  "dinos-mini": "chocolate-dinosaurs-mini",
  "thinbar-almond": "thin-bar-almond",
};
const resolveId = (id: string) => (CATALOG[id] ? id : ALIASES[id] || id);

export const GET: APIRoute = () =>
  new Response("Method Not Allowed", { status: 405 });

export const POST: APIRoute = async ({ request }) => {
  try {
    const origin = new URL(request.url).origin;
    // Usa PUBLIC_SITE_URL si la defines (debe incluir http(s)://), si no, toma el origin actual
    const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? origin;

    const body = (await request.json()) as Incoming;

    // Agrupar cantidades
    const qtyMap = new Map<string, number>();
    for (const it of body?.items || []) {
      if (!it?.id) continue;
      const id = resolveId(String(it.id));
      const q = Math.max(1, Number(it.quantity) || 1);
      qtyMap.set(id, (qtyMap.get(id) || 0) + q);
    }
    if (!qtyMap.size) {
      return new Response(JSON.stringify({ error: "No items" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const orderForMeta: Array<{ id: string; name: string; qty: number; unit: number }> = [];

    for (const [id, qty] of qtyMap.entries()) {
      const p = CATALOG[id];
      if (!p) {
        return new Response(JSON.stringify({ error: `Product not found: ${id}` }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 🔧 Convierte la primera imagen a URL absoluta (o no envíes images)
      const img0 = p.images?.[0];
      const imgAbs =
        img0 && /^https?:\/\//i.test(img0) ? img0 : (img0 ? new URL(img0, siteUrl).href : undefined);

      line_items.push({
        quantity: qty,
        price_data: {
          currency: "CAD",
          unit_amount: toCents(p.price),
          product_data: {
            name: p.name,
            ...(imgAbs ? { images: [imgAbs] } : {}), // Stripe exige URLs absolutas
            metadata: { product_id: p.id, category: p.category || "" },
          },
        },
      });

      orderForMeta.push({ id: p.id, name: p.name, qty, unit: p.price });
    }

    const meta = {
      item_count: [...qtyMap.values()].reduce((a, b) => a + b, 0).toString(),
      items: JSON.stringify(orderForMeta),
      email: body.email || "",
      address: body.address || "",
      source: "astro-site",
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: body.email || undefined,
      shipping_address_collection: { allowed_countries: ["CA"]},
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      automatic_tax: { enabled: false },
      success_url: `${siteUrl}/order/success`,
      cancel_url: `${siteUrl}/order/cancel`,
      metadata: meta,
      payment_intent_data: { metadata: meta },
      shipping_options: [
    // Alberta
    {
      shipping_rate_data: {
        display_name: "shipping",
        type: "fixed_amount",
        fixed_amount: { amount: 1000, currency: "CAD" },
        delivery_estimate: {
          minimum: { unit: "business_day", value: 3 },
          maximum: { unit: "business_day", value: 5 },
        },
      },
    },
  
    
  ],

    });

    return new Response(JSON.stringify({ url: session.url, id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return new Response(JSON.stringify({ error: err?.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
