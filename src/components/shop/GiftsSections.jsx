// src/components/shop/GiftsSections.jsx
import React, { useEffect, useState } from "react";
import { Gift, Heart, Sparkles, Plus, ArrowRight, Check } from "lucide-react";
import { useCart } from "../cart/context";

/* --- Toast (top-right, auto-hide) --- */
const Toast = ({ open, onClose, message }) => {
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
        className="fixed right-8 bottom-8 z-[100] w-[min(92vw,360px)] animate-[toastIn_.25s_cubic-bezier(.16,1,.3,1)_forwards] rounded-2xl border border-amber-300/40 bg-zinc-900/95 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,.45),0_0_0_1px_rgba(212,163,115,.18)]"
      >
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
};

/* --- Data --- */
const GIFTS = {
  spotlight: {
    id: "gift-highlight-ribbon",
    name: "Ribboned Celebration Set",
    price: 74,
    slug: "ribboned-celebration-set",
    tag: "Ready-to-gift",
    desc:
      "A 9-piece bonbon box paired with a single-origin dark bar. Arrives ribboned with a handwritten note card.",
    img: "/images/gifts/celebration-collection.jpg",
    icon: <Gift className="h-4 w-4" />,
    chips: ["9-piece bonbons", "70% Dark bar", "Note card"],
    tone: "from-amber-400/25 to-orange-600/25",
  },
  topLeft: {
    id: "gift-sweetheart-duo",
    name: "Sweetheart Duo",
    price: 46,
    slug: "sweetheart-duo",
    tag: "Limited bundle",
    desc: "Salt-caramel thins with a raspberry 70% bar — a small gesture with big flavor.",
    img: "/images/gifts/sweetheart-duo.jpg",
    icon: <Heart className="h-4 w-4" />,
    chips: ["Caramel thins", "70% Raspberry bar"],
    tone: "from-rose-400/25 to-fuchsia-600/25",
  },
  topRight: {
    id: "gift-office-trio",
    name: "Office Thanks Trio",
    price: 59,
    slug: "office-thanks-trio",
    tag: "Team favorite",
    desc: "Three crowd-pleasers with guided tasting cards — perfect for quick appreciation.",
    img: "/images/gifts/office-thanks-trio.jpg",
    icon: <Sparkles className="h-4 w-4" />,
    chips: ["45% Milk", "70% Dark", "85% Extra Dark"],
    tone: "from-cyan-400/25 to-emerald-600/25",
  },
  bottomWide: {
    id: "gift-luxe-16",
    name: "Luxe Bonbons — 16",
    price: 68,
    slug: "luxe-bonbons-16",
    tag: "Hand-painted",
    desc: "A keepsake rigid box with a curated medley of fruit, nut, and single-origin ganaches.",
    img: "/images/gifts/luxe-16.jpg",
    icon: <Gift className="h-4 w-4" />,
    chips: ["16 artisan bonbons", "Flavor map included"],
    tone: "from-indigo-400/25 to-violet-600/25",
  },
};

/* --- Small helpers --- */
const Badge = ({ icon, children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10.5px] font-semibold text-zinc-100 backdrop-blur">
    {icon}
    <span className="truncate">{children}</span>
  </span>
);

const Chip = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-zinc-200">
    {children}
  </span>
);

/* --- Cards --- */
const SpotlightCard = ({ item, onAdd, onOpen }) => (
  <article className="group relative col-span-12 overflow-hidden rounded-2xl border max-h-[110vh] border-white/10 bg-zinc-900/60 shadow-[0_14px_34px_rgba(0,0,0,.32)] lg:col-span-5 lg:row-span-2">
    {/* glow */}
    <div
      className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${item.tone} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-35`}
    />
    {/* image */}
    <div className="relative aspect-[13/10] sm:aspect-[16/11] lg:aspect-[10/11]">
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 h-full w-4/5 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
      <div className="absolute left-4 top-4 z-10">
        <Badge icon={item.icon}>{item.tag}</Badge>
      </div>
    </div>
    {/* content */}
    <div className="flex flex-col gap-3 px-5 pb-5 pt-4">
      <h3 className="text-[19px] font-extrabold text-zinc-50 sm:text-[20px]">{item.name}</h3>
      <p className="text-[13.5px] leading-relaxed text-zinc-300">{item.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {item.chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </div>
    {/* actions */}
    <div className="flex items-center gap-2.5 border-t border-white/10 bg-black/60 px-5 py-3">
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[19px] font-extrabold text-transparent">
        ${item.price}
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[13px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]"
      >
        <Plus className="h-4 w-4" />
        Add
      </button>
      <button
        aria-label="View product"
        onClick={onOpen}
        className="ml-auto grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </article>
);

const SquareCard = ({ item, onAdd, onOpen }) => (
  <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-[0_12px_28px_rgba(0,0,0,.28)]">
    <div
      className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${item.tone} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-35`}
    />
    <div className="relative aspect-[16/12]">
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 h-1/2 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
      <div className="absolute left-3 top-3 z-10">
        <Badge icon={item.icon}>{item.tag}</Badge>
      </div>
    </div>
    <div className="space-y-2 px-4 pb-4 pt-3">
      <h3 className="text-[17px] font-extrabold text-zinc-50">{item.name}</h3>
      <p className="text-[13px] leading-relaxed text-zinc-300 line-clamp-2">{item.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {item.chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-2.5 border-t border-white/10 bg-black/60 px-4 py-3">
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[18px] font-extrabold text-transparent">
        ${item.price}
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]"
      >
        <Plus className="h-4 w-4" />
        Add
      </button>
      <button
        aria-label="View product"
        onClick={onOpen}
        className="ml-auto grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </article>
);

const BannerCard = ({ item, onAdd, onOpen }) => (
  <article className="group relative col-span-12 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-[0_12px_28px_rgba(0,0,0,.28)] lg:col-span-7">
    <div
      className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${item.tone} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-35`}
    />
    <div className="relative aspect-[16/9] md:aspect-[16/8]">
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
      <div className="absolute left-4 top-4 z-10">
        <Badge icon={item.icon}>{item.tag}</Badge>
      </div>
    </div>
    <div className="grid gap-3 px-5 pb-5 pt-4 md:grid-cols-[1fr_auto] md:items-start">
      <div>
        <h3 className="text-[18px] font-extrabold text-zinc-50">{item.name}</h3>
        <p className="mt-1 text-[13.5px] leading-relaxed text-zinc-300">{item.desc}</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {item.chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 md:self-center">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-[18px] font-extrabold text-transparent">
          ${item.price}
        </div>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 px-3 py-1.5 text-[12.5px] font-extrabold text-zinc-900 shadow-[0_6px_18px_rgba(212,163,115,.22)]"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
        <button
          aria-label="View product"
          onClick={onOpen}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  </article>
);

/* --- Main section (mosaic layout, like bonbons but unique) --- */
export default function GiftsSections() {
  const { addItem } = useCart();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const add = (p) => {
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.img,
      slug: p.slug,
      type: "gift",
    });
    setToastMsg(`${p.name} was added to your cart.`);
    setToastOpen(true);
  };
  const openProduct = (slug) => (window.location.href = `/shop/${slug}`);

  const { spotlight, topLeft, topRight, bottomWide } = GIFTS;

  return (
    <>
      <section className="rounded-2xl bg-[#0A0B0D] px-4 pb-12 pt-8 sm:px-6 lg:px-8" id="gift-collections">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-extrabold tracking-widest text-amber-300">
              <Gift className="h-3.5 w-3.5" />
              GIFTING &amp; BUNDLES
            </p>
            <h2 className="text-[26px] font-extrabold tracking-tight text-zinc-100 sm:text-[30px]">
              Thoughtful gifts, beautifully packed
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-[14px] text-zinc-400">
              Curated bundles for celebrations, thank-yous, and cozy nights in. Add a personal note at checkout.
            </p>
          </header>

          {/* Mosaic layout */}
          <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-12 gap-5">
            {/* Left spotlight (taller but not huge) */}
            <SpotlightCard
              item={spotlight}
              onAdd={() => add(spotlight)}
              onOpen={() => openProduct(spotlight.slug)}
            />

            {/* Right column: two squares on top */}
            <div className="col-span-12 grid grid-cols-12 gap-5 lg:col-span-7">
              <div className="col-span-12 grid grid-cols-12 gap-5">
                <div className="col-span-12 sm:col-span-6">
                  <SquareCard
                    item={topLeft}
                    onAdd={() => add(topLeft)}
                    onOpen={() => openProduct(topLeft.slug)}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <SquareCard
                    item={topRight}
                    onAdd={() => add(topRight)}
                    onOpen={() => openProduct(topRight.slug)}
                  />
                </div>
              </div>

              {/* Bottom wide banner */}
              <BannerCard
                item={bottomWide}
                onAdd={() => add(bottomWide)}
                onOpen={() => openProduct(bottomWide.slug)}
              />
            </div>
          </div>
        </div>
      </section>

      <Toast open={toastOpen} onClose={() => setToastOpen(false)} message={toastMsg} />
    </>
  );
}
