// src/components/shop/LimitedEdition.jsx
import React, { useEffect, useState } from "react";
import { Plus, ArrowRight, Check, Sparkles, Flame, Coffee, Crown } from "lucide-react";
import { useCart } from "../cart/context";

/* Toast (top-right, auto-hide) */
const Toast = ({ open, onClose, message }) => {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 3400);
    return () => clearTimeout(t);
  }, [open, onClose]);
  if (!open) return null;

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className="fixed right-8 bottom-12 z-[100] w-[min(92vw,380px)] animate-[toastIn_.25s_cubic-bezier(.16,1,.3,1)_forwards] rounded-2xl border border-amber-300/40 bg-zinc-900/95 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,.45),0_0_0_1px_rgba(212,163,115,.18)]"
      >
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/15">
            <Check className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[15px] font-extrabold text-zinc-100">Added to cart</h4>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-200">{message}</p>
            <div className="mt-3 flex items-center gap-2">
              <a
                href="/cart"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-3.5 py-2 text-[13px] font-extrabold text-zinc-900 shadow-[0_6px_20px_rgba(212,163,115,.25)]"
              >
                View cart <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button onClick={onClose} className="text-xs font-semibold text-zinc-300 hover:text-zinc-100">
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </>
  );
};

/* 100% LIMITED pieces — not seasonal rotations */
const LIMITED_ITEMS = [
  {
    id: "le-microlot-huila-72",
    name: "Micro-Lot 72% Huila — Single-Farm Bar",
    price: 14,
    weight: "55g",
    slug: "microlot-huila-72",
    tag: "Micro-lot • 600 bars",
    desc:
      "One-farm Colombian cacao (Huila). Red fruit, panela, and cocoa nib crunch. Numbered sleeve.",
    img: "/images/limited/microlot-huila.jpg",
    tone: "from-rose-400/25 to-fuchsia-600/25",
    icon: <Crown className="h-4 w-4" />,
  },
  {
    id: "le-midnight-bloom-8",
    name: "Midnight Bloom Bonbons — Box of 8",
    price: 36,
    pieces: 8,
    slug: "midnight-bloom-8",
    tag: "Limited run • 300 boxes",
    desc:
      "Blueberry–lavender confit over vanilla bean ganache in dark shell. Satin-black gift box.",
    img: "/images/limited/midnight-bloom.jpg",
    tone: "from-indigo-400/25 to-violet-600/25",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    id: "le-espresso-shards-120",
    name: "Collab: Espresso Caramel Shards",
    price: 18,
    weight: "120g",
    slug: "espresso-caramel-shards",
    tag: "Roaster collab • Small batch",
    desc:
      "Brittle shards of espresso caramel dipped in 70% dark, dusted with fine coffee grind.",
    img: "/images/limited/espresso-shards.jpg",
    tone: "from-amber-400/25 to-stone-700/30",
    icon: <Coffee className="h-4 w-4" />,
  },
  {
    id: "le-smoked-gianduja-thin",
    name: "Smoked Sea Salt Gianduja — Thin Bar",
    price: 16,
    weight: "50g",
    slug: "smoked-gianduja-thin",
    tag: "Numbered batch • #042",
    desc:
      "Hazelnut gianduja kissed with alder-smoked sea salt in an ultra-thin format for a clean snap.",
    img: "/images/limited/gianduja-thin.jpg",
    tone: "from-emerald-400/25 to-cyan-600/25",
    icon: <Flame className="h-4 w-4" />,
  },
];

/* Card (larger media, concise info) */
const LimitedCard = ({ item, onAdd, onOpen }) => (
  <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-[0_16px_40px_rgba(0,0,0,.35)] transition-transform hover:-translate-y-0.5">
    {/* Subtle glow ring */}
    <div
      className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-40 ${item.tone}`}
    />

    {/* BIG image */}
    <div className="relative aspect-[4/3] sm:aspect-[16/9]">
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
      <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-zinc-100 backdrop-blur">
        {item.icon}
        <span>{item.tag}</span>
      </div>
    </div>

    {/* Content */}
    <div className="space-y-2 px-5 py-5">
      <h3 className="text-xl font-extrabold text-zinc-50">{item.name}</h3>
      <p className="text-sm leading-relaxed text-zinc-300">{item.desc}</p>
      <p className="text-xs text-zinc-400">
        {item.pieces ? `${item.pieces} pieces` : item.weight}
      </p>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-3 border-t border-white/10 bg-black/60 px-5 py-4">
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-lg font-extrabold text-transparent">
        ${item.price}
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-3.5 py-2 font-extrabold text-zinc-900 shadow-[0_6px_20px_rgba(212,163,115,.25)]"
      >
        <Plus className="h-4 w-4" />
        <span>Add</span>
      </button>
      <button
        aria-label="View product"
        onClick={onOpen}
        className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </article>
);

export default function LimitedEdition() {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const add = (p) => {
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.img,
      slug: p.slug,
      pieces: p.pieces,
      weight: p.weight,
      type: "limited",
    });
    setMsg(`${p.name} was added to your cart.`);
    setOpen(true);
  };

  const openProduct = (slug) => (window.location.href = `/shop/${slug}`);

  return (
    <>
      <section className="rounded-2xl bg-[#0A0B0D] px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-amber-400">
              LIMITED EDITIONS
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
              Small Batches. Rare Drops.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
              One-off collaborations, numbered bars, and short runs you won’t
              see again. When they’re gone, they’re gone.
            </p>
          </header>

          {/* Keep images LARGE: 1-col on mobile, 2-col on md+ */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {LIMITED_ITEMS.map((it) => (
              <LimitedCard
                key={it.id}
                item={it}
                onAdd={() => add(it)}
                onOpen={() => openProduct(it.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      <Toast open={open} onClose={() => setOpen(false)} message={msg} />
    </>
  );
}
