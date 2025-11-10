// src/components/shop/BarsSection.jsx  (CHOCOLATE BARS • OPTIMIZADO)
import React, { useMemo, useState, useEffect } from "react";
import { Plus, ArrowRight, Check } from "lucide-react";
import { useCart } from "../cart/context";

/* ───────── Toast (memo) ───────── */
const Toast = React.memo(function Toast({ open, onClose, message }) {
  useEffect(() => { if (!open) return; const id = setTimeout(onClose, 3200); return () => clearTimeout(id); }, [open, onClose]);
  if (!open) return null;
  return (
    <>
      <div role="status" aria-live="polite" className="fixed bottom-12 right-8 z-[100] w-[min(92vw,360px)] rounded-2xl border border-amber-300/40 bg-zinc-900/95 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,.45),0_0_0_1px_rgba(212,163,115,.18)] animate-[toastIn_.25s_cubic-bezier(.16,1,.3,1)_forwards]">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/15"><Check className="h-4 w-4 text-emerald-400" /></div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[14px] font-extrabold text-zinc-100">Added to cart</h4>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-200">{message}</p>
            <div className="mt-2 flex items-center gap-2">
              <a href="/cart" onClick={onClose} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_20px_rgba(212,163,115,.25)]">View cart <ArrowRight className="h-3.5 w-3.5" /></a>
              <button onClick={onClose} className="text-xs font-semibold text-zinc-300 hover:text-zinc-100">Continue shopping</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </>
  );
});

/* ───────── Datos (usa imgBase) ───────── */
const BARS = [
  {
    id: "milk-37-pistachio",
    name: "37% Milky Pistachio Bar",
    description: "Creamy 37% milk chocolate studded with pieces of pistachios and a whisper of sea salt.",
    price: 8,
    slug: "milk-37-pistachio",
    category: "MILKY",
    features: ["pieces of pistachios", "Creamy 37%", "Bean-to-bar"],
    colorTheme: "pistachio",
    imgBase: "/images/bars/milk-pistachio",
  },
  {
    id: "milk-37-rasp-crumble",
    name: "37% Milky Raspberry Crumble",
    description: "Silky 37% milk chocolate with raspberry crumble bits for a bright, crunchy finish.",
    price: 8,
    slug: "milk-37-raspberry-crumble",
    category: "MILKY",
    features: ["Raspberry crumble", "Creamy 37%", "Kid-friendly"],
    colorTheme: "raspberry",
    imgBase: "/images/bars/milk-raspberry-crumble",
  },
  {
    id: "dark-60-pistachio",
    name: "60% Dark Pistachio Bar",
    description: "Balanced 60% dark chocolate layered with pieces of pistachios—nutty, lightly sweet, satisfying.",
    price: 11,
    slug: "dark-60-pistachio",
    category: "DARK",
    features: ["60% dark", "pieces of pistachios", "Vegan"],
    colorTheme: "nuts",
    imgBase: "/images/bars/dark-pistachio",
  },
];

const themeMap = {
  pistachio: { blur1: "rgba(139,195,74,.15)", blur2: "rgba(76,175,80,.12)", blur3: "rgba(104,159,56,.18)" },
  raspberry: { blur1: "rgba(233,30,99,.15)", blur2: "rgba(240,98,146,.12)", blur3: "rgba(194,24,91,.18)" },
  nuts: { blur1: "rgba(255,152,0,.15)", blur2: "rgba(255,183,77,.12)", blur3: "rgba(245,124,0,.18)" },
};

/* ───────── Imagen responsive ───────── */
function BarImage({ base, alt, onClick, priority = false }) {
  // Ajusta si tus export tienen otro aspecto; 4:3 -> 1200x900
  const width = 1200;
  const height = 900;
  const sizes = "(max-width:640px) 92vw, (max-width:1024px) 44vw, 360px";

  return (
    <div className="relative h-56 overflow-hidden" onClick={onClick}>
      <picture>
        <source
          type="image/avif"
          srcSet={`${base}-480.avif 480w, ${base}-800.avif 800w, ${base}-1200.avif 1200w`}
          sizes={sizes}
        />
        <source
          type="image/webp"
          srcSet={`${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`}
          sizes={sizes}
        />
        <img
          src={`${base}-800.webp`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : undefined}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
    </div>
  );
}

/* ───────── Card (memo) ───────── */
const BarCard = React.memo(function BarCard({ bar, theme, onOpen, onAdd, priority = false }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-[0_15px_35px_-10px_rgba(0,0,0,.3),0_5px_20px_rgba(0,0,0,.1)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full opacity-40 blur-[20px]" style={{ background: theme.blur1 }} />
        <div className="absolute -bottom-6 -left-5 h-28 w-28 rounded-full opacity-35 blur-[18px]" style={{ background: theme.blur2 }} />
        <div className="absolute left-1/2 top-1/2 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[22px]" style={{ background: theme.blur3 }} />
      </div>

      <BarImage base={bar.imgBase} alt={bar.name} onClick={() => onOpen(bar.slug)} priority={priority} />

      <div className="p-5">
        <div className="mb-1 flex justify-between">
          <span className="text-[11px] font-extrabold tracking-widest text-amber-300">{bar.category}</span>
        </div>
        <h3 className="mb-2 text-[19px] font-extrabold leading-tight text-zinc-50">{bar.name}</h3>
        <p className="mb-3 line-clamp-2 text-[13.5px] leading-relaxed text-zinc-200">{bar.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {bar.features.slice(0, 2).map((f) => (
            <span key={f} className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[11px] font-semibold text-zinc-100">
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[20px] font-extrabold text-transparent">${bar.price}</div>
          <div className="flex gap-2">
            <button
              onClick={() => onOpen(bar.slug)}
              aria-label="View product"
              className="grid h-10 w-10 place-items-center rounded-xl border border-amber-300/30 bg-amber-300/10 text-zinc-100 hover:bg-amber-300/15"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onAdd(bar)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-3.5 py-2 font-extrabold text-zinc-900 shadow-[0_6px_20px_rgba(212,163,115,.2)]"
            >
              <Plus className="h-4 w-4" /><span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

/* ───────── Main ───────── */
export default function BarsSection() {
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const bars = useMemo(() => BARS, []); // evita recrear array en rerenders

  const handleAdd = (bar) => {
    addItem({ id: bar.id, name: bar.name, price: bar.price, image: `${bar.imgBase}-800.webp`, slug: bar.slug, type: "bar" }, 1);
    setToastMessage(`${bar.name} was added to your cart.`);
    setShowToast(true);
  };
  const openProduct = (slug) => (window.location.href = `/shop/${slug}`);

  return (
    <>
      <section id="chocolate-bars" className="relative overflow-hidden bg-[#0A0B0D] py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30" style={{
          background: `
            radial-gradient(ellipse 600px 400px at 20% 30%, rgba(212,163,115,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 500px 600px at 80% 70%, rgba(245,158,11,0.04) 0%, transparent 50%)
          `
        }} />
        <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6">
          <header className="mb-8 text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-extrabold tracking-widest text-amber-300">
              PREMIUM COLLECTION
            </p>
            <h2 className="text-[26px] font-extrabold tracking-tight text-zinc-100 sm:text-[30px]">Artisan Chocolate Bars</h2>
            <p className="mx-auto mt-2 max-w-2xl text-[14px] text-zinc-400">Handcrafted from ethically sourced cacao — each bar is a small-batch expression of flavor and craft.</p>
          </header>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
            {bars.map((bar, i) => {
              const t = themeMap[bar.colorTheme] || themeMap.nuts;
              // Marca priority=true SOLO si la primera card cae en el fold inicial
              const priority = i === 0 ? false : false;
              return (
                <BarCard
                  key={bar.id}
                  bar={bar}
                  theme={t}
                  onOpen={openProduct}
                  onAdd={handleAdd}
                  priority={priority}
                />
              );
            })}
          </div>
        </div>
      </section>

      <Toast open={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    </>
  );
}

