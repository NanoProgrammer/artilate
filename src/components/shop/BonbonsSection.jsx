// src/components/shop/BarsSection.jsx
import React, { useState, useEffect } from "react";
import { Plus, ArrowRight, Check, Info } from "lucide-react";
import { useCart } from "../cart/context";

/* ---------- Toast (auto-hide) ---------- */
const Toast = ({ open, onClose, message }) => {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [open, onClose]);
  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-12 right-8 z-[100] w-[min(92vw,380px)] rounded-2xl border border-amber-300/40 bg-zinc-900/95 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,.4),0_0_0_1px_rgba(212,163,115,.2),0_8px_32px_rgba(212,163,115,.15)] animate-[toastIn_.28s_cubic-bezier(.16,1,.3,1)_forwards]"
    >
      <div className="flex gap-3">
        <div className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 to-emerald-400/25 shadow-[0_4px_12px_rgba(16,185,129,.25)]">
          <Check className="h-5 w-5 text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 text-[15px] font-extrabold text-zinc-100">Added to cart</h4>
          <p className="mb-3 text-[13px] leading-relaxed text-zinc-200">{message}</p>
          <div className="flex items-center gap-2">
            <a
              href="/cart"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-3.5 py-2 text-[13px] font-extrabold text-zinc-900 shadow-[0_6px_20px_rgba(212,163,115,.25)]"
            >
              View cart <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={onClose}
              className="text-xs font-semibold text-zinc-300 hover:text-zinc-100"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes toastIn { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
      `}</style>
    </div>
  );
};

/* ---------- Data with extra info ---------- */
const products = [
  {
    id: "box-classic-9",
    name: "Classic Box — 9",
    pieces: 9,
    price: 31,
    slug: "classic-box-9",
    tag: "Best Seller",
    img: "/images/bonbons/classic-9.jpg",
    palette: "amber",
    description:
      "Our crowd-pleasing selection of signature fillings covered in silky dark and milk chocolate.",
    subtags: ["Balanced", "Gluten-free friendly"],
    notes: ["Caramel", "Vanilla bean", "Hazelnut"],
    origin: "72% dark chocolate",
  },
  {
    id: "box-tropical-9",
    name: "Tropical Box — 9",
    pieces: 9,
    price: 33,
    slug: "tropical-box-9",
    tag: "Fruity",
    img: "/images/bonbons/tropical-9.jpg",
    palette: "violet",
    hero: true,
    description:
      "A bright journey through tropical fruit ganaches made with real purées and citrus peels.",
    subtags: ["Vegan options", "Limited batch"],
    notes: ["Guava", "Passion fruit", "Lime zest"],
    origin: "Colombia 70%",
  },
  {
    id: "box-nutlover-5",
    name: "Nut Lover Box — 5",
    pieces: 5,
    price: 20,
    slug: "nut-lover-5",
    tag: "Crunchy",
    img: "/images/bonbons/nut-5.jpg",
    palette: "orange",
    description:
      "Pralines and gianduja with a satisfying crunch of roasted nuts.",
    subtags: ["Contains nuts"],
    notes: ["Hazelnut", "Almond", "Pistachio"],
    origin: "72% dark chocolate",
  },
  {
    id: "box-floral-8",
    name: "Floral Garden — 8",
    pieces: 8,
    price: 28,
    slug: "floral-garden-8",
    tag: "Aromatic",
    img: "/images/bonbons/floral-8.jpg",
    palette: "blue",
    description:
      "Delicate infusions layered with cacao—soft floral notes with a long finish.",
    subtags: ["Light body"],
    notes: ["Rose", "Lavender", "Orange blossom"],
    origin: "72% dark chocolate",
  },
  {
    id: "box-minis-4",
    name: "Mini Sampler — 4",
    pieces: 4,
    price: 15,
    slug: "mini-sampler-4",
    tag: "Starter",
    img: "/images/bonbons/mini-4.jpg",
    palette: "emerald",
    description:
      "A small taste of our best sellers. Perfect add-on for gifts.",
    subtags: ["Gift-ready"],
    notes: ["Caramel", "Berry", "Crunch"],
    origin: "72% dark chocolate",
  },
  {
    id: "box-berry-4",
    name: "Berry Burst — 4",
    pieces: 4,
    price: 16,
    slug: "berry-burst-4",
    tag: "Vibrant",
    img: "/images/bonbons/berry-4.jpg",
    palette: "violet",
    description:
      "High-fruit intensity with a tart finish—tiny but powerful.",
    subtags: ["Seasonal fruit"],
    notes: ["Raspberry", "Blackberry"],
    origin: "Peru 72%",
  },
  {
    id: "box-caramel-8",
    name: "Sea Salt Caramel — 8",
    pieces: 8,
    price: 27,
    slug: "sea-salt-caramel-8",
    tag: "Indulgent",
    img: "/images/bonbons/caramel-8.jpg",
    palette: "amber",
    description:
      "Slow-cooked caramel with Maldon sea salt in a thin dark shell.",
    subtags: ["Soft center"],
    notes: ["Butterscotch", "Sea salt"],
    origin: "72% dark chocolate",
  },
];

const palette = {
  amber: "from-amber-400/20 to-amber-600/20",
  orange: "from-orange-400/20 to-orange-600/20",
  emerald: "from-emerald-400/20 to-emerald-700/20",
  blue: "from-blue-500/20 to-indigo-700/20",
  violet: "from-violet-600/25 to-fuchsia-600/20",
  slate: "from-slate-400/20 to-slate-700/20",
};

/* ---------- Card ---------- */
function Card({ p, onAdd, onOpen }) {
  const hero = p.hero;

  return (
    <article
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-[0_16px_40px_rgba(0,0,0,.35)] transition-transform hover:-translate-y-0.5",
        "col-span-1",
        hero ? "lg:col-span-6 xl:col-span-7" : "lg:col-span-3 xl:col-span-2.5",
      ].join(" ")}
    >
      {/* Image / aspect box */}
      <div className={["relative w-full", hero ? "pb-[46%]" : "pb-[62%]"].join(" ")}>
        <div className={`absolute inset-0 bg-gradient-to-br ${palette[p.palette] || palette.amber}`} />
        <img
          src={p.img}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 bg-black/60 p-4">
        <div className="flex items-start gap-2">
          <span
            className={[
              "inline-block rounded-full border px-2.5 py-1 text-[11px] font-extrabold tracking-wider",
              hero
                ? "border-white/80 bg-white/90 text-zinc-900"
                : "border-amber-300/30 bg-amber-300/10 text-amber-300",
            ].join(" ")}
          >
            {p.tag}
          </span>
          {/* tiny origin + cocoa pill */}
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-zinc-300 sm:inline">
            {p.origin}
          </span>
        </div>

        <h3 className="text-lg font-extrabold leading-tight text-zinc-100 md:text-xl">
          {p.name}
        </h3>

        {/* Description */}
        <p className={["text-sm leading-relaxed text-zinc-300", hero ? "line-clamp-3" : "line-clamp-2"].join(" ")}>
          {p.description}
        </p>

        {/* Extra tags (flavors / meta) */}
        <div className="flex flex-wrap gap-2">
          {p.subtags?.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[11px] font-semibold text-zinc-100"
            >
              {t}
            </span>
          ))}
          {p.notes?.slice(0, hero ? 3 : 2).map((n) => (
            <span
              key={n}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
            >
              {n}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-lg font-extrabold text-transparent">
            ${p.price}
          </div>

          <button
            onClick={onAdd}
            className="ml-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-3.5 py-2 font-extrabold text-zinc-900 shadow-[0_6px_20px_rgba(212,163,115,.25)] hover:brightness-[1.02]"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>

          <button
            onClick={onOpen}
            aria-label="View product"
            className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-amber-300/30 bg-amber-300/10 text-zinc-100 hover:bg-amber-300/15"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
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
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.img,
      slug: p.slug,
      pieces: p.pieces,
      type: "bonbon-box",
    });
    setMsg(`${p.name} was added to your cart.`);
    setOpen(true);
  };

  const go = (slug) => (window.location.href = `/shop/${slug}`);

  return (
    <>
      <section id="bonbons" className="rounded-2xl bg-[#0A0B0D] px-4 pb-16 pt-12 shadow-[0_20px_60px_rgba(0,0,0,.35)] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-center justify-center gap-2">
            <Info className="h-4 w-4 text-amber-400" />
            <p className="text-sm text-zinc-400">
              Handcrafted in small batches • ethically sourced cacao
            </p>
          </div>

          <h2 className="mb-6 text-center text-3xl font-extrabold content-center tracking-tight text-zinc-100 sm:text-4xl">
            Bonbons Menu
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {products.map((p) => (
              <Card key={p.id} p={p} onAdd={() => handleAdd(p)} onOpen={() => go(p.slug)} />
            ))}
          </div>
        </div>
      </section>

      <Toast open={open} onClose={() => setOpen(false)} message={msg} />
    </>
  );
}
