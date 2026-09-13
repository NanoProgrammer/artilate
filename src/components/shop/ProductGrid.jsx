// src/components/shop/ProductGrid.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Plus, ArrowRight, Check, Sparkles } from "lucide-react";
import { useCart } from "../cart/context";
import { CATALOG } from "../../lib/catalog";

/* ───────────────── Toast ───────────────── */
const Toast = React.memo(function Toast({ open, onClose, message }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [open, onClose]);
  if (!open) return null;

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-12 right-8 z-[100] w-[min(92vw,360px)] rounded-2xl border border-amber-300/40 bg-zinc-900/95 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,.45),0_0_0_1px_rgba(212,163,115,.18)] animate-[toastIn_.25s_cubic-bezier(.16,1,.3,1)_forwards]"
      >
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/15">
            <Check className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[14px] font-extrabold text-zinc-100">Added to cart</h4>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-200">{message}</p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href="/cart"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_20px_rgba(212,163,115,.25)]"
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
});

/* Groups the catalog's fine-grained categories into the two families shown as tabs. */
const FAMILY_OF = {
  "Bonbons": "Bonbons",
  "Nut Collection": "Bars",
  "Fruit Infused": "Bars",
  "Premium Dark": "Bars",
};

const TABS = ["All", "Bonbons", "Bars"];

/* ───────────────── Card ───────────────── */
const ProductCard = React.memo(function ProductCard({ p, onAdd, onOpen }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/65 shadow-[0_12px_28px_rgba(0,0,0,.28)]">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-35" />

      <div className="relative aspect-[4/3] cursor-pointer bg-zinc-950" onClick={onOpen}>
        <img
          src={p.images?.[0]}
          alt={p.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        {p.tag && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full border border-white/20 bg-black/45 px-2.5 py-0.5 text-[10.5px] font-semibold text-zinc-100 backdrop-blur">
            {p.tag}
          </span>
        )}
      </div>

      <div className="space-y-2 px-4 pb-4 pt-3">
        <h3 className="text-[16px] font-extrabold text-zinc-50">{p.name}</h3>
        <p className="text-[13px] leading-relaxed text-zinc-300 line-clamp-2">{p.shortDesc}</p>
        {p.chips?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {p.chips.slice(0, 2).map((c) => (
              <span key={c} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-zinc-200">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 border-t border-white/10 bg-black/55 px-4 py-3">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[18px] font-extrabold text-transparent">
          ${p.price}
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

/* ───────────────── Main grid ───────────────── */
export default function ProductGrid() {
  const { addItem } = useCart();
  const [tab, setTab] = useState("All");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const products = useMemo(
    () =>
      Object.values(CATALOG).filter((p) => FAMILY_OF[p.category] !== undefined),
    []
  );

  const visible = useMemo(
    () => (tab === "All" ? products : products.filter((p) => FAMILY_OF[p.category] === tab)),
    [products, tab]
  );

  const add = (p) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.images?.[0], slug: p.id, type: FAMILY_OF[p.category] });
    setToastMsg(`${p.name} was added to your cart.`);
    setToastOpen(true);
  };
  const openProduct = (id) => (window.location.href = `/shop/${id}`);

  return (
    <>
      <span id="bonbons" />
      <span id="chocolate-bars" />
      <section
        id="products"
        style={{ contentVisibility: "auto", containIntrinsicSize: "700px 1800px" }}
        className="relative rounded-2xl bg-[#0A0B0D] px-4 pb-14 pt-10 shadow-[0_20px_60px_rgba(0,0,0,.35)] sm:px-6 lg:px-8"
      >
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
        <div className="relative mx-auto max-w-7xl">
          <header className="mb-6 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <p className="text-sm text-zinc-400">Handcrafted in small batches • ethically sourced cacao</p>
            </div>
            <h2 className="text-[28px] font-extrabold tracking-tight text-zinc-100 sm:text-[34px]">
              Shop All Chocolates
            </h2>
          </header>

          <div className="mb-7 flex justify-center gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-[13px] font-extrabold transition ${
                  tab === t
                    ? "bg-gradient-to-br from-amber-400 to-orange-400 text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.25)]"
                    : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProductCard key={p.id} p={p} onAdd={() => add(p)} onOpen={() => openProduct(p.id)} />
            ))}
          </div>
        </div>
      </section>

      <Toast open={toastOpen} onClose={() => setToastOpen(false)} message={toastMsg} />
    </>
  );
}
