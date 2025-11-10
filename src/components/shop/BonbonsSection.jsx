// src/components/shop/BarsSection.jsx
import React, { useState, useEffect } from "react";
import { Plus, Check, Info, Sparkles, Crown } from "lucide-react";
import { useCart } from "../cart/context";


/* ---------- Toast ---------- */
const Toast = ({ open, onClose, message }) => {

  useEffect(() => { if (!open) return; const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [open, onClose]);
  if (!open) return null;
  return (
    <div role="status" aria-live="polite" className="fixed bottom-12 right-8 z-[100] w-[min(92vw,380px)] rounded-2xl border border-amber-300/40 bg-zinc-900/95 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,.4),0_0_0_1px_rgba(212,163,115,.2),0_8px_32px_rgba(212,163,115,.15)] animate-[toastIn_.28s_cubic-bezier(.16,1,.3,1)_forwards]">
      <div className="flex gap-3">
        <div className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 to-emerald-400/25 shadow-[0_4px_12px_rgba(16,185,129,.25)]">
          <Check className="h-5 w-5 text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 text-[15px] font-extrabold text-zinc-100">Added to cart</h4>
          <p className="mb-3 text-[13px] leading-relaxed text-zinc-200">{message}</p>
          <div className="flex items-center gap-2">
            <a href="/cart" onClick={onClose} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-3.5 py-2 text-[13px] font-extrabold text-zinc-900 shadow-[0_6px_20px_rgba(212,163,115,.25)]">
              View cart
              {/* mantenemos flecha aquí si te gusta, o se puede cambiar por Sparkles también */}
              {/* <Sparkles className="h-3.5 w-3.5" /> */}
            </a>
            <button onClick={onClose} className="text-xs font-semibold text-zinc-300 hover:text-zinc-100">Continue shopping</button>
          </div>
        </div>
      </div>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
};

/* ---------- Data (fit/scale/y por producto) ---------- */
/* Actualizado para reflejar el CATALOG: precios, shortDesc como description, y cacao/origin */
const products = [
  {
    id: "classic-box-9",
    name: "Classic Box — 9",
    pieces: 9,
    price: 28,
    slug: "classic-box-9",
    tag: "Signature",
    img: "/images/bonbons/classic-9.webp",
    palette: "violet",
    description: "Nine signature bonbons spanning pistachio, caramel with blackberry, and chocolate and hazelnut.",
    subtags: ["Gluten-free friendly", "Balanced"],
    notes: ["Pistachio", "Blackberry Caramel", "Chocolate & Hazelnut"],
    origin: "54% dark chocolate single-origin",
    fit: "contain",
    scale: 0.60,
    y: "-30%",
  },
  {
    id: "tropical-box-9",
    name: "Tropical Box — 9",
    pieces: 9,
    price: 25,
    slug: "tropical-box-9",
    tag: "Fruity",
    img: "/images/bonbons/tropical-9.webp",
    palette: "emerald",
    description: "Exotic and vibrant: spicy pineapple, passionfruit, and coffee in silky dark chocolate shells.",
    subtags: ["Tropical fruits", "Spice & coffee contrast"],
    notes: ["Spicy Pineapple", "Passionfruit", "Coffee"],
    origin: "Single-origin Colombia • 52% dark chocolate",
    fit: "contain",
    scale: 0.76,
    y: "-22%",
  },
  {
    id: "classic-box-8",
    name: "Classic Box — 8",
    pieces: 8,
    price: 24,
    slug: "classic-box-8",
    tag: "Signature",
    img: "/images/bonbons/classic-8.webp",
    palette: "amber",
    description: "Timeless signatures—silky caramels, pralinés and vanilla-forward ganaches.",
    subtags: ["Crowd-pleaser"],
    notes: ["Caramel with Blackberry", "Pistachio", "Chocolate & Hazelnut", "Strawberry"],
    origin: "57% dark chocolate single-origin",
    scale: 0.82,
    y: "-14%",
    fit: "contain",
  },
  {
    id: "vibrant-box-8",
    name: "Vibrant Box — 8",
    pieces: 8,
    price: 23,
    slug: "vibrant-box-8",
    tag: "Fruity",
    img: "/images/bonbons/vibrant-8.webp",
    palette: "blue",
    description: "Eight vibrant bonbons — mango, spicy pineapple, passion fruit, and caramel with blackberry.",
    subtags: ["Seasonal fruit", "Tropical spice"],
    notes: ["Mango", "Spicy Pineapple", "Passion Fruit", "Caramel with Blackberry"],
    origin: "Single-origin Colombia • 59% dark chocolate",
    scale: 0.93,
    y: "-14%",
    fit: "contain",
  },
  {
    id: "essentials-box-6",
    name: "Essentials Box — 6",
    pieces: 6,
    price: 18,
    slug: "essentials-box-6",
    tag: "Best Value",
    img: "/images/bonbons/essentials-6.webp",
    palette: "slate",
    description: "Six essentials — pistachio, caramel with blackberry, chocolate & hazelnut, passionfruit, coffee, and strawberry.",
    subtags: ["Gift-ready", "Balanced assortment"],
    notes: ["Pistachio", "Caramel & Blackberry", "Chocolate & Hazelnut", "Passionfruit", "Coffee", "Strawberry"],
    origin: "Single-origin Colombia • 53% dark chocolate",
    scale: 0.96,
    y: "-22%",
    fit: "contain",
  },
];

const tone = {
  amber: "from-amber-400/20 to-amber-600/20",
  emerald: "from-emerald-400/20 to-emerald-700/20",
  blue: "from-blue-500/20 to-indigo-700/20",
  violet: "from-violet-600/25 to-fuchsia-600/20",
  slate: "from-slate-400/20 to-slate-700/20",
};

/* ---------- Helpers imagen ---------- */
function Picture({ p, overlay = true, pad = true }) {
  const isContain = p.fit === "contain";
  const scale = Math.max(0.7, Math.min(1.3, p.scale ?? 1));
  const ty = p.y ?? "0%";

  return (
    <div className="relative aspect-[16/10]" onClick={() =>{
              window.location.href = `/shop/${p.slug}`;
            }}>
      {isContain ? (
        <div className={`absolute inset-0 grid place-items-center ${pad ? "p-3" : ""}`} >
          <img
            src={p.img}
            alt={p.name}
            
            loading="lazy"
            className="max-h-[88%] max-w-[88%] object-contain transition-transform duration-500"
            style={{ transform: `translateY(${ty}) scale(${scale})` }}
          />
        </div>
      ) : (
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
          style={{ transform: `translateY(${ty}) scale(${scale})` }}
        />
      )}
      {overlay && !isContain && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      )}
    </div>
  );
}

/* ---------- Featured Card (9 pcs) ---------- */
function FeaturedCard({ p, onAdd, onOpen }) {
  return (
    <article className="group relative col-span-12 overflow-hidden rounded-3xl border border-amber-300/25 bg-zinc-950/70 shadow-[0_20px_70px_rgba(0,0,0,.45)] lg:col-span-5 xl:col-span-6 scale-[0.95]">
      {/* glow de borde */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br ${
          tone[p.palette] || tone.amber
        } opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40`}
      />

      {/* Imagen */}
      <Picture p={p} overlay />

      {/* Badge superior */}
      <div className="absolute left-3.5 top-3.5 z-10 flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-300/15 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-200">
        <Crown className="h-3.5 w-3.5" /> MOST POPULAR • 9 PCS
      </div>

      {/* Contenido */}
      <div className="grid gap-2.5 p-4">
        <h3 className="text-[20px] font-extrabold tracking-tight text-zinc-50 sm:text-[22px]">
          {p.name}
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-zinc-300">
          {p.description}
        </p>

        {/* chips */}
        <div className="mt-2 flex flex-wrap gap-0">
          {[...(p.subtags || []), ...(p.notes || []).slice(0, 1)].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10.5px] font-semibold text-zinc-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Barra inferior: $ | Add | Discover */}
      <div className="flex items-center gap-2.5 border-t border-white/10 bg-black/60 px-4 py-3">
        {/* Precio a la izquierda */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[20px] font-extrabold leading-none text-transparent">
          ${p.price}
        </div>

        {/* Add */}
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_8px_24px_rgba(212,163,115,.28)] active:translate-y-[1px]"
        >
          <Plus className="h-4 w-4" /> Add
        </button>

        {/* Discover a la derecha */}
        <button
          onClick={onOpen}
          aria-label="Discover more about this product"
          className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-black/30 px-3 py-1.5 text-[12px] font-semibold text-amber-300 hover:bg-amber-400/10 transition active:translate-y-[1px]"
        >
          <Sparkles className="h-4 w-4" />
          Discover
        </button>
      </div>
    </article>
  );
}


/* ---------- Compact Card (8 & 6) ---------- */
function CompactCard({ p, onAdd, onOpen }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-[0_14px_34px_rgba(0,0,0,.32)]">
      <div className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${tone[p.palette] || tone.slate} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-30`} />
      <div className="relative aspect-[16/13]">
        <div className="absolute inset-0">
          <Picture p={p} overlay={false} pad />
        </div>
        <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-100">
          <Sparkles className="h-3.5 w-3.5" /> {p.tag}
        </div>
      </div>

      <div className="space-y-2 px-3.5 pb-3.5 pt-2.5">
        <h3 className="text-[16px] font-extrabold text-zinc-50">{p.name}</h3>
        <p className="text-[12.5px] leading-relaxed text-zinc-300 line-clamp-2">{p.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {(p.subtags || []).slice(0, 2).map((c) => (
            <span key={c} className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 text-[10.5px] font-semibold text-zinc-100">{c}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2.5 border-t border-white/10 bg-black/60 px-3.5 py-3">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[17px] font-extrabold text-transparent">${p.price}</div>
        <button onClick={onAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]">
          <Plus className="h-4 w-4" /> Add
        </button>
        {/* BOTÓN DISCOVER (sustituye flecha) */}
        <button
          onClick={onOpen}
          aria-label="Discover more about this product"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-[12px] font-semibold text-amber-300 hover:bg-amber-400/20 transition"
        >
          <Sparkles className="h-4 w-4" />
          Discover
        </button>
      </div>
    </article>
  );
}

/* ---------- Section ---------- */
export default function BarsSection() {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleAdd = (p) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.img, slug: p.slug, pieces: p.pieces, type: "bonbon-box" });
    setMsg(`${p.name} was added to your cart.`);
    setOpen(true);
  };
  const go = (slug) => (window.location.href = `/shop/${slug}`);

  const featured = products.filter((p) => p.pieces === 9);
  const compact = products.filter((p) => p.pieces !== 9);

  return (
    <>
      <section id="bonbons"  style={{ contentVisibility: 'auto', containIntrinsicSize: '700px 1200px' }}
  className="rounded-2xl bg-[#0A0B0D] px-4 pb-14 pt-10 shadow-[0_20px_60px_rgba(0,0,0,.35)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-center gap-2">
            <Info className="h-4 w-4 text-amber-400" />
            <p className="text-sm text-zinc-400">Handcrafted in small batches • ethically sourced cacao</p>
          </div>

          <h2 className="mb-5 text-center text-[28px] font-extrabold tracking-tight text-zinc-100 sm:text-[34px]">
            Bonbons Menu
          </h2>

          {/* 9 pcs */}
          <div className="mb-5 grid grid-cols-12 gap-4">
            {featured.map((p) => (
              <FeaturedCard key={p.id} p={p} onAdd={() => handleAdd(p)} onOpen={() => go(p.slug)} />
            ))}
          </div>

          {/* 8 & 6 */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {compact.map((p) => (
              <CompactCard key={p.id} p={p} onAdd={() => handleAdd(p)} onOpen={() => go(p.slug)} />
            ))}
          </div>
        </div>
      </section>

      <Toast open={open} onClose={() => setOpen(false)} message={msg} />
    </>
  );
}
