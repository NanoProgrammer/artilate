// src/components/shop/GiftsSections.jsx
import React, { useEffect, useState } from "react";
import { Gift, Heart, Plus, ArrowRight, Check, Sparkles } from "lucide-react";
import { useCart } from "../cart/context";

/* --- Toast --- */
const Toast = ({ open, onClose, message }) => {
  useEffect(() => { if (!open) return; const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [open, onClose]);
  if (!open) return null;
  return (
    <>
      <div role="status" aria-live="polite" className="fixed right-5 bottom-6 z-[100] w-[min(92vw,340px)] animate-[toastIn_.25s_cubic-bezier(.16,1,.3,1)_forwards] rounded-2xl border border-amber-300/35 bg-zinc-900/95 p-3.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,.45),0_0_0_1px_rgba(212,163,115,.16)]">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/15">
            <Check className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[13.5px] font-extrabold text-zinc-100">Added to cart</h4>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-200">{message}</p>
            <div className="mt-2 flex items-center gap-2">
              <a href="/cart" onClick={onClose} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]">
                View cart <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button onClick={onClose} className="text-[12px] font-semibold text-zinc-300 hover:text-zinc-100">Continue shopping</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </>
  );
};

/* --- Data (sincronizado con CATALOG) --- */
const GIFTS = [
  {
    id: "heart-gift-box",
    name: "Heart Gift Box",
    price: 86, // CATALOG
    slug: "heart-gift-box",
    tag: "Romantic",
    desc: "Thirty hand-painted heart bonbons — 16 caramel with blackberry, 10 pistachio, and 4 passionfruit.",
    img: "/images/gifts/heart-gift-box.webp",
    tone: "from-rose-400/25 to-fuchsia-600/25",
    icon: <Heart className="h-4 w-4" />,
    chips: ["Hand-painted", "Message card", "Gift-ready"],
    fit: "contain",
    focal: "center",
    scale: 1.22,
    rotate: 0,
    top: 42,
    boost: 1.23,
  },
  {
    id: "golden-ribbon-keepsake-box",
    name: "Golden Ribbon Keepsake Box",
    price: 48, // CATALOG
    slug: "golden-ribbon-keepsake-box",
    tag: "Ready-to-gift",
    desc: "Reusable wooden keepsake box with a ribboned assortment — bonbons, chocolate bars, and coins.",
    img: "/images/gifts/keepsake-wood-box.webp",
    tone: "from-amber-400/25 to-orange-600/25",
    icon: <Gift className="h-4 w-4" />,
    chips: ["Wooden box", "Assorted chocolates", "Gift-ready"],
    fit: "contain",
    focal: "top",
    scale: 1.04,
    rotate: -11,
    top: 0,
    boost: 1.1,
  },
];

/* --- Helpers --- */
const Badge = ({ icon, children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10.5px] font-semibold text-zinc-100 backdrop-blur">
    {icon}<span className="truncate">{children}</span>
  </span>
);

const Chip = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-zinc-200">
    {children}
  </span>
);

/* --- Card --- */
const GiftCard = ({ item, onAdd, onOpen }) => {
  const fitClass = item.fit === "contain" ? "object-contain" : "object-cover";
  const posClass = item.focal === "top" ? "object-top" : item.focal === "bottom" ? "object-bottom" : "object-center";
  const boost = item.boost ?? 1.08;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/65 shadow-[0_12px_28px_rgba(0,0,0,.28)]">
      {/* halo exterior */}
      <div className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${item.tone} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-35`} />

      {/* Imagen + decor */}
      <div className="relative h-72 sm:h-80" onClick={onOpen}>
        <img
          src={item.img}
          alt={item.name}
          
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full ${fitClass} ${posClass} will-change-transform`}
          style={{
            transform: `translateY(${item.top || 0}px) scale(${item.scale || 1}) rotate(${item.rotate || 0}deg)`,
            transition: "transform .55s cubic-bezier(.16,1,.3,1), filter .35s",
            filter: `brightness(${boost}) contrast(${boost}) saturate(${boost + 0.06})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

        {/* badge */}
        <div className="absolute left-3 top-3 z-10">
          <Badge icon={item.icon}>{item.tag}</Badge>
        </div>
      </div>

      {/* Texto */}
      <div className="space-y-2 px-4 pb-4 pt-3">
        <h3 className="text-[16.5px] font-extrabold text-zinc-50">{item.name}</h3>
        <p className="text-[13px] leading-relaxed text-zinc-300 line-clamp-2">{item.desc}</p>
        <div className="flex flex-wrap gap-1.5">{item.chips.map((c) => <Chip key={c}>{c}</Chip>)}</div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2.5 border-t border-white/10 bg-black/55 px-4 py-3">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[18px] font-extrabold text-transparent">${item.price}</div>
        <button onClick={onAdd} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]">
          <Plus className="h-4 w-4" /> Add
        </button>
        {/* Discover (mejor CTR) */}
        <button
          aria-label="Discover more about this product"
          onClick={onOpen}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-[12px] font-semibold text-amber-300 hover:bg-amber-400/20 transition"
        >
          <Sparkles className="h-4 w-4" />
          Discover
        </button>
      </div>
    </article>
  );
};

/* --- Main section --- */
export default function GiftsSections() {
  const { addItem } = useCart();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const add = (p) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.img, slug: p.slug, type: "gift" });
    setToastMsg(`${p.name} was added to your cart.`);
    setToastOpen(true);
  };
  const openProduct = (slug) => (window.location.href = `/shop/${slug}`);

  return (
    <>
      <section id="gifts" className="relative rounded-2xl bg-[#0A0B0D] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40" style={{
          background: `
            radial-gradient(ellipse 560px 360px at 18% 28%, rgba(212,163,115,0.06) 0%, transparent 52%),
            radial-gradient(ellipse 480px 520px at 82% 72%, rgba(245,158,11,0.045) 0%, transparent 55%)
          `,
        }}/>
        <div className="relative mx-auto max-w-6xl">
          <header className="mb-6 text-center">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10.5px] font-extrabold tracking-widest text-amber-300">
              <Gift className="h-3.5 w-3.5" /> GIFTING &amp; BUNDLES
            </p>
            <h2 className="text-[24px] font-extrabold tracking-tight text-zinc-100 sm:text-[28px]">Thoughtful gifts, beautifully packed</h2>
          </header>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {GIFTS.map((g) => (
              <GiftCard key={g.id} item={g} onAdd={() => add(g)} onOpen={() => openProduct(g.slug)} />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes floaty { 0%,100% { transform: translateY(0) scale(1); opacity:.22 } 50% { transform: translateY(-12px) scale(1.08); opacity:.3 } }
        `}</style>
      </section>

      <Toast open={toastOpen} onClose={() => setToastOpen(false)} message={toastMsg} />
    </>
  );
}
