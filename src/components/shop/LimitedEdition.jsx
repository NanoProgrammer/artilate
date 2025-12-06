// src/components/shop/ChristmasBoxesSection.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Plus, ArrowRight, Check } from "lucide-react";
import { useCart } from "../cart/context";

/* ───────── Toast ───────── */
const Toast = React.memo(function Toast({ open, onClose, message }) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, 3200);
    return () => clearTimeout(id);
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
          <div className="grid h-8 w-8 place-items-center rounded-full border border-emerald-400/40 bg-emerald-400/15">
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
              <button
                onClick={onClose}
                className="text-xs font-semibold text-zinc-300 hover:text-zinc-100"
              >
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

/* ───────── Datos Christmas ───────── */
const CHRISTMAS_BOXES = [
  {
    id: "christmas-12-pieces",
    name: "Christmas Tasting Box — 12 Bonbons",
    description:
      "Six festive flavours, two bonbons of each. A perfect Christmas tasting box crafted with Colombian cacao.",
    price: 35,
    slug: "christmas-tasting-box-12",
    pieces: 12,
    tag: "6 flavours • 2 of each",
    imgBase: "/images/christmas/chrismas-12-pieces",
  },
  {
    id: "christmas-16-pieces",
    name: "Christmas Sharing Box — 16 Bonbons",
    description:
      "Four favourite flavours, four bonbons of each. Designed for sharing around the tree and holiday dinners.",
    price: 45,
    slug: "christmas-tasting-box-16",
    pieces: 16,
    tag: "4 flavours • 4 of each",
    imgBase: "/images/christmas/chrismas-16-pieces",
  },
];

/* ───────── Imagen responsive ───────── */
function ChristmasImage({ base, alt, priority = false, onClick }) {
  const width = 1200;
  const height = 900;
  const sizes = "(max-width:640px) 92vw, (max-width:1024px) 46vw, 420px";

  return (
    <div
      className="relative flex h-52 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(15,23,42,1),_#020617)] sm:h-56 lg:h-60"
      onClick={onClick}
    >
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
          className="max-h-full w-auto max-w-[92%] object-contain"
        />
      </picture>
      {/* degradado suave abajo solo para texto, no tapa tanto la imagen */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>
  );
}

/* ───────── Card ───────── */
const ChristmasCard = React.memo(function ChristmasCard({
  box,
  onAdd,
  onOpen,
  priority = false,
}) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-[0_12px_28px_-12px_rgba(0,0,0,.55)]">
      {/* Luces suaves en esquinas (más pequeñas) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-red-500/16 blur-[18px]" />
        <div className="absolute -left-4 bottom-2 h-16 w-16 rounded-full bg-emerald-400/14 blur-[18px]" />
      </div>

      <ChristmasImage
        base={box.imgBase}
        alt={box.name}
        priority={priority}
        onClick={() => onOpen(box.slug)}
      />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-1 flex items-center justify-between text-[10px] font-extrabold tracking-[0.22em] text-amber-300">
          <span>CHRISTMAS EDITION</span>
          <span>{box.pieces} PIECES</span>
        </div>
        <h3 className="mb-2 text-[17px] font-extrabold leading-snug text-zinc-50 sm:text-[18px]">
          {box.name}
        </h3>
        <p className="mb-3 text-[13px] leading-relaxed text-zinc-200">
          {box.description}
        </p>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          {box.tag}
        </p>

        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[19px] font-extrabold text-transparent sm:text-[20px]">
            ${box.price}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onOpen(box.slug)}
              aria-label="View product"
              className="grid h-9 w-9 place-items-center rounded-xl border border-amber-300/30 bg-amber-300/10 text-zinc-100 hover:bg-amber-300/15"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onAdd(box)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[13px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.2)]"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

/* ───────── Main section ───────── */
export default function ChristmasBoxesSection() {
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const boxes = useMemo(() => CHRISTMAS_BOXES, []);

  const handleAdd = (box) => {
    addItem({
      id: box.id,
      name: box.name,
      price: box.price,
      image: `${box.imgBase}-800.webp`,
      slug: box.slug,
      type: "limited",
    });
    setToastMessage(`${box.name} was added to your cart.`);
    setShowToast(true);
  };

  const openProduct = (slug) => (window.location.href = `/shop/${slug}`);

  return (
    <>
      <section
        id="christmas-boxes"
        className="relative overflow-hidden bg-[#05070A] py-14"
      >
        {/* Fondo muy suave */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 520px 360px at 12% 18%, rgba(34,197,94,0.12) 0%, transparent 55%),
              radial-gradient(ellipse 520px 380px at 88% 26%, rgba(248,113,113,0.14) 0%, transparent 55%),
              radial-gradient(ellipse 600px 420px at 50% 92%, rgba(251,191,36,0.11) 0%, transparent 55%)
            `,
          }}
        />
        <div className="relative z-[1] mx-auto max-w-5xl px-4 sm:px-6">
          <header className="mb-8 text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-extrabold tracking-widest text-amber-300">
              CHRISTMAS COLLECTION
            </p>
            <h2 className="text-[24px] font-extrabold tracking-tight text-zinc-100 sm:text-[28px]">
              Christmas Bonbon Boxes by Artilate
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-[13.5px] text-zinc-400 sm:text-[14px]">
              Two small-batch Christmas boxes handcrafted in Alberta with
              Colombian cacao — one for tasting, one for sharing.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {boxes.map((box, i) => (
              <ChristmasCard
                key={box.id}
                box={box}
                onAdd={handleAdd}
                onOpen={openProduct}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <Toast
        open={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </>
  );
}
