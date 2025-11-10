// src/components/shop/GiftsSections.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Gift, Heart, Plus, ArrowRight, Check, Sparkles } from "lucide-react";
import { useCart } from "../cart/context";

/* ───────────────── Toast ───────────────── */
const Toast = React.memo(function Toast({ open, onClose, message }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [open, onClose]);
  if (!open) return null;

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className="fixed right-5 bottom-6 z-[100] w-[min(92vw,340px)] animate-[toastIn_.25s_cubic-bezier(.16,1,.3,1)_forwards] rounded-2xl border border-amber-300/35 bg-zinc-900/95 p-3.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,.45),0_0_0_1px_rgba(212,163,115,.16)]"
      >
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/15">
            <Check className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[13.5px] font-extrabold text-zinc-100">Added to cart</h4>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-200">{message}</p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href="/cart"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]"
              >
                View cart <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button onClick={onClose} className="text-[12px] font-semibold text-zinc-300 hover:text-zinc-100">
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </>
  );
});

/* ───────────────── Data ───────────────── */
const GIFTS = [
  {
    id: "heart-gift-box",
    name: "Heart Gift Box",
    price: 86,
    slug: "heart-gift-box",
    tag: "Romantic",
    desc: "Thirty hand-painted heart bonbons — 16 caramel with blackberry, 10 pistachio, and 4 passionfruit.",
    imgBase: "/images/gifts/heart-gift-box", // 👈 base para picture
    tone: "from-rose-400/25 to-fuchsia-600/25",
    icon: <Heart className="h-4 w-4" />,
    chips: ["Hand-painted", "Message card", "Gift-ready"],
    fit: "contain",
    focal: "center",
    scale: 1.1,         // ↓ filtros más ligeros
    rotate: 0,
    top: 20,
    priority: false,    // marca true si esta tarjeta cae en el fold inicial
  },
  {
    id: "golden-ribbon-keepsake-box",
    name: "Golden Ribbon Keepsake Box",
    price: 48,
    slug: "golden-ribbon-keepsake-box",
    tag: "Ready-to-gift",
    desc: "Reusable wooden keepsake box with a ribboned assortment — bonbons, chocolate bars, and coins.",
    imgBase: "/images/gifts/keepsake-wood-box",
    tone: "from-amber-400/25 to-orange-600/25",
    icon: <Gift className="h-4 w-4" />,
    chips: ["Wooden box", "Assorted chocolates", "Gift-ready"],
    fit: "contain",
    focal: "top",
    scale: 1.02,
    rotate: -6,
    top: 0,
    priority: false,
  },
];

/* ───────────────── Helpers ───────────────── */
const Badge = React.memo(function Badge({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10.5px] font-semibold text-zinc-100 backdrop-blur">
      {icon}<span className="truncate">{children}</span>
    </span>
  );
});

const Chip = React.memo(function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-zinc-200">
      {children}
    </span>
  );
});

/** Imagen optimizada con <picture> y tamaños adaptativos */
function GiftImage({ item, onOpen }) {
  const fitClass = item.fit === "contain" ? "object-contain" : "object-cover";
  const posClass =
    item.focal === "top" ? "object-top" : item.focal === "bottom" ? "object-bottom" : "object-center";

  // Tamaños: ocupa ~100% del card width (col 1/2 en sm)
  const sizes = "(max-width:640px) 92vw, (max-width:1024px) 48vw, 560px";

  // Añade width/height reales de tu export (para CLS). Si usas 4:3: 1200x900.
  const width = 1200;
  const height = 900;

  return (
    <div className="relative h-72 sm:h-80" onClick={onOpen}>
      <picture>
        <source
          type="image/avif"
          srcSet={`${item.imgBase}-480.avif 480w, ${item.imgBase}-800.avif 800w, ${item.imgBase}-1200.avif 1200w`}
          sizes={sizes}
        />
        <source
          type="image/webp"
          srcSet={`${item.imgBase}-480.webp 480w, ${item.imgBase}-800.webp 800w, ${item.imgBase}-1200.webp 1200w`}
          sizes={sizes}
        />
        <img
          src={`${item.imgBase}-800.webp`}
          alt={item.name}
          loading={item.priority ? "eager" : "lazy"}
          fetchpriority={item.priority ? "high" : undefined}
          decoding="async"
          width={width}
          height={height}
          className={`absolute inset-0 h-full w-full ${fitClass} ${posClass}`}
          style={{
            transform: `translateY(${item.top || 0}px) scale(${item.scale || 1}) rotate(${item.rotate || 0}deg)`,
            transition: "transform .45s cubic-bezier(.16,1,.3,1)",
          }}
        />
      </picture>

      {/* Degradado suave (más barato que filtros chain) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />

      {/* badge */}
      <div className="absolute left-3 top-3 z-10">
        <Badge icon={item.icon}>{item.tag}</Badge>
      </div>
    </div>
  );
}

/* ───────────────── Card ───────────────── */
const GiftCard = React.memo(function GiftCard({ item, onAdd, onOpen }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/65 shadow-[0_12px_28px_rgba(0,0,0,.28)]">
      {/* halo exterior solo en hover (opacity 0 por defecto) */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${item.tone} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-35`}
      />

      <GiftImage item={item} onOpen={onOpen} />

      {/* Texto */}
      <div className="space-y-2 px-4 pb-4 pt-3">
        <h3 className="text-[16.5px] font-extrabold text-zinc-50">{item.name}</h3>
        <p className="text-[13px] leading-relaxed text-zinc-300 line-clamp-2">{item.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2.5 border-t border-white/10 bg-black/55 px-4 py-3">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[18px] font-extrabold text-transparent">
          ${item.price}
        </div>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
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
});

/* ───────────────── Main section ───────────────── */
export default function GiftsSections() {
  const { addItem } = useCart();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // memo de data (evita recrear arrays/funciones en cada render)
  const gifts = useMemo(() => GIFTS, []);

  const add = (p) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: `${p.imgBase}-800.webp`, slug: p.slug, type: "gift" });
    setToastMsg(`${p.name} was added to your cart.`);
    setToastOpen(true);
  };
  const openProduct = (slug) => (window.location.href = `/shop/${slug}`);

  return (
    <>
      <section id="gifts" style="content-visibility:auto; contain-intrinsic-size: 700px 1200px"
  className="relative rounded-2xl bg-[#0A0B0D] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 560px 360px at 18% 28%, rgba(212,163,115,0.06) 0%, transparent 52%),
              radial-gradient(ellipse 480px 520px at 82% 72%, rgba(245,158,11,0.045) 0%, transparent 55%)
            `,
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <header className="mb-6 text-center">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[10.5px] font-extrabold tracking-widest text-amber-300">
              <Gift className="h-3.5 w-3.5" /> GIFTING &amp; BUNDLES
            </p>
            <h2 className="text-[24px] font-extrabold tracking-tight text-zinc-100 sm:text-[28px]">
              Thoughtful gifts, beautifully packed
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {gifts.map((g, i) => (
              <GiftCard
                key={g.id}
                item={{ ...g, priority: i === 0 ? false : false /* ← pon true si la 1ª cae en fold */ }}
                onAdd={() => add(g)}
                onOpen={() => openProduct(g.slug)}
              />
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
