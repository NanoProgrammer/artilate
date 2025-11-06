// src/components/shop/ProductDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import { useCart } from "../cart/context";
import CartProvider from "../cart/context";
/* Toast (top-right, auto hide) */
const Toast = ({ open, onClose, message }) => {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed right-8 bottom-8 z-[100] w-[min(92vw,360px)] animate-[toastIn_.25s_cubic-bezier(.16,1,.3,1)_forwards] rounded-2xl border border-amber-300/40 bg-zinc-900/95 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,.45),0_0_0_1px_rgba(212,163,115,.18)]">
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/15">
            <Check className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[14px] font-extrabold text-zinc-100">Added to cart</h4>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-200">{message}</p>
            <div className="mt-2.5 flex items-center gap-2">
              <a
                href="/cart"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]"
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

/* Image with graceful fallback */
const SafeImg = ({ src, alt, className }) => {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={() => setOk(false)} />
  ) : (
    <div
      className={`grid place-items-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-500 ${className}`}
      role="img"
      aria-label={`${alt} placeholder`}
    >
      <div className="h-16 w-12 rounded-md bg-white/10 shadow-inner" />
    </div>
  );
};

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [activeIdx, setActiveIdx] = useState(0);
  const imgs = product?.images ?? [];
  const active = useMemo(() => imgs[Math.min(activeIdx, imgs.length - 1)] ?? null, [imgs, activeIdx]);

  const onAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: active ?? imgs[0] ?? "",
      slug: product.id,
      type: product.category,
    });
    setToastMsg(`${product.name} was added to your cart.`);
    setToastOpen(true);
  };

  const goShop = () => (window.location.href = "/shop");

  return (
    <>
      <section className="bg-[#0A0B0D] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={goShop}
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] font-semibold text-zinc-300 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </button>

          {/* Grid: gallery + info */}
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {/* Gallery */}
            <div className="col-span-12 lg:col-span-6 scale-90">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50">
                <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                  {active && (
                    <SafeImg
                      src={active}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full scale-[1.3] object-contain"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Thumbs */}
              {imgs.length > 1 && (
                <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                  {imgs.map((s, i) => (
                    <button
                      key={s + i}
                      aria-label={`View image ${i + 1}`}
                      onClick={() => setActiveIdx(i)}
                      className={`relative aspect-[4/3] overflow-hidden rounded-lg border transition ${
                        i === activeIdx ? "border-amber-400/60" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <SafeImg src={s} alt={`${product.name} thumb ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="col-span-12 lg:col-span-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-extrabold tracking-widest text-amber-300">
                {product.tag}
              </div>

              <h1 className="text-[28px] font-extrabold tracking-tight text-zinc-50 sm:text-[34px]">
                {product.name}
              </h1>
              <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-zinc-300">
                {product.shortDesc}
              </p>

              {/* Chips */}
              {product.chips?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[12px] font-semibold text-zinc-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Price + Add */}
              <div className="mt-6 flex items-center gap-3">
                <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[26px] font-extrabold text-transparent">
                  ${product.price}
                </div>
                <button
                  onClick={onAdd}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-4 py-2.5 text-[14px] font-extrabold text-zinc-900 shadow-[0_8px_22px_rgba(212,163,115,.25)]"
                >
                  <Plus className="h-4 w-4" />
                  Add to cart
                </button>
                <a
                  href="/cart"
                  className="ml-1 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] font-extrabold text-zinc-100 hover:bg-white/10"
                >
                  View cart
                </a>
              </div>

              {/* Meta quick facts */}
              <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
                {product.cacao && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-zinc-400">Cacao</p>
                    <p className="mt-0.5 text-sm font-semibold text-zinc-100">{product.cacao}</p>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-zinc-400">Size</p>
                    <p className="mt-0.5 text-sm font-semibold text-zinc-100">{product.weight}</p>
                  </div>
                )}
                {product.dietary?.length ? (
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[11px] uppercase tracking-wider text-zinc-400">Dietary</p>
                    <p className="mt-0.5 text-sm font-semibold text-zinc-100">{product.dietary.join(" • ")}</p>
                  </div>
                ) : null}
              </div>

              {/* Long description */}
              {product.longDesc && (
                <div className="prose prose-invert prose-zinc mt-6 max-w-none">
                  <p className="text-[15px] leading-[1.8] text-zinc-200">{product.longDesc}</p>
                </div>
              )}

              {/* Ingredients & allergens */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {product.ingredients && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-wider text-zinc-400">Ingredients</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-200">{product.ingredients}</p>
                  </div>
                )}
                {product.allergens && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[11px] uppercase tracking-wider text-zinc-400">Allergens</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-200">{product.allergens}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Optional: related hint */}
          <div className="mt-10 text-center">
            <a
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[13px] font-semibold text-zinc-300 hover:bg-white/10"
            >
              Browse more chocolates
            </a>
          </div>
        </div>
      </section>

      <Toast open={toastOpen} onClose={() => setToastOpen(false)} message={toastMsg} />
    </>
  );
}
