import React, { useEffect, useMemo, useRef, useState } from "react";

/** Demo data — replace with your CMS if needed */
const DATA = [
  { id: 1, name: "Maria Gonzalez", role: "Chocolate Enthusiast", location: "Calgary, AB", avatar: "MG",
    text: "The passion fruit bonbons are divine. You can taste the Colombian heritage in every bite—quality is unmatched.", rating: 5 },
  { id: 2, name: "James Mitchell", role: "Corporate Buyer", location: "Edmonton, AB", avatar: "JM",
    text: "Perfect for our client gifts. Elegant packaging and consistently outstanding quality. Clients are impressed every time.", rating: 5 },
  { id: 3, name: "Sofia Rodriguez", role: "Food Blogger", location: "Vancouver, BC", avatar: "SR",
    text: "Artilate bridges Colombian tradition with Canadian craftsmanship. Each piece tells a story—chocolate as art.", rating: 5 },
  { id: 4, name: "David Chen", role: "Restaurant Owner", location: "Toronto, ON", avatar: "DC",
    text: "Our guests love the small-batch quality. Temper is perfect and flavours are sophisticated—beautiful dessert pairings.", rating: 5 },
  { id: 5, name: "Isabella Martinez", role: "Gift Shop Owner", location: "Airdrie, AB", avatar: "IM",
    text: "These chocolates sell themselves. Hand-painted finishes make them feel like art. Customers keep coming back.", rating: 5 },
  { id: 6, name: "Robert Thompson", role: "Coffee Roaster", location: "Montreal, QC", avatar: "RT",
    text: "The coffee bonbons pair perfectly with our Colombian beans. You can taste the mountain terroir—exceptional craft.", rating: 5 },
  { id: 7, name: "Ana Gutierrez", role: "Event Planner", location: "Calgary, AB", avatar: "AG",
    text: "Artilate elevates every event I plan. Guests always ask where they’re from—they’re instant conversation starters.", rating: 5 },
  { id: 8, name: "Michael Foster", role: "Wine Sommelier", location: "Victoria, BC", avatar: "MF",
    text: "Complex flavours that rival fine wine—sweet, acid, and bitter notes in harmony. Beautiful balance.", rating: 5 },
  { id: 9, name: "Carmen Delgado", role: "Pastry Chef", location: "Winnipeg, MB", avatar: "CD",
    text: "As a professional, I appreciate the technical precision: temper, ganache texture, flavour profiles—world-class.", rating: 5 },
  { id: 10, name: "Alexandre Dubois", role: "Food Critic", location: "Québec City, QC", avatar: "AD",
    text: "Colombian soul, Canadian precision—the future of Canadian chocolate. Tradition and innovation in one box.", rating: 5 },
];

export default function VerticalTestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [auto, setAuto] = useState(true);
  const baseScrollRef = useRef(null);
  const wrapRef = useRef(null);

  // 5 visible normally; 7 on xl+
  const visibleCount = useVisibleCount();

  // Autoplay (pauses after manual interaction)
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % DATA.length), 5000);
    return () => clearInterval(id);
  }, [auto]);

  // Map index to rotation (counter-clockwise)
  useEffect(() => {
    setRotation((-(index * 360)) / DATA.length);
  }, [index]);

  // Scroll-driven step: when you scroll ~300px, advance one item (up or down)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (baseScrollRef.current == null) baseScrollRef.current = y;
      const delta = y - baseScrollRef.current;
      if (Math.abs(delta) > 300) {
        setIndex((p) => (p + Math.sign(delta) + DATA.length) % DATA.length);
        baseScrollRef.current = y;
        setAuto(false);
        window.setTimeout(() => setAuto(true), 7000);
      } else {
        // subtle continuous rotation for WOW effect
        setRotation((prev) => prev - (delta * 0.02) / 10);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = useMemo(() => {
    const arr = [];
    const centre = Math.floor(visibleCount / 2);
    for (let i = 0; i < visibleCount; i++) {
      const idx = (index - centre + i + DATA.length) % DATA.length;
      arr.push({ ...DATA[idx], pos: i, isCentre: i === centre, absolute: idx });
    }
    return arr;
  }, [index, visibleCount]);

  const cardTransform = (pos, isCentre) => {
    const offset = pos - Math.floor(visibleCount / 2);
    if (isCentre) return { transform: `translate(-50%,-50%) translateY(0px) scale(1)`, opacity: 1, zIndex: 20, filter: "blur(0px)" };
    const abs = Math.abs(offset);
    const translate = offset * 36;
    const scale = 1 - Math.min(0.15 * abs, 0.35);
    const opacity = 1 - Math.min(0.25 * abs, 0.6);
    const blur = Math.min(0.8 * abs, 2.5);
    return { transform: `translate(-50%,-50%) translateY(${translate}px) scale(${scale})`, opacity, zIndex: 20 - abs, filter: `blur(${blur}px)` };
  };

  const pick = (i) => {
    setIndex(i);
    setAuto(false);
    window.setTimeout(() => setAuto(true), 7000);
  };

  const next = () => pick((index + 1) % DATA.length);
  const prev = () => pick((index - 1 + DATA.length) % DATA.length);

  return (
    <div ref={wrapRef} className="relative flex h-[74vh] w-full items-center justify-center overflow-hidden md:h-[80vh]" aria-label="Artilate Testimonials">
      {/* Rotating half circle on the right */}
      <div
        className="pointer-events-none absolute right-[-84px] top-1/2 z-[1] h-[320px] w-[320px] -translate-y-1/2 md:right-[-110px] md:h-[400px] md:w-[400px]"
        style={{ transform: `translateY(-50%) rotate(${rotation}deg)`, transition: "transform 800ms cubic-bezier(0.16,1,0.3,1)" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full drop-shadow-[0_0_20px_rgba(245,158,11,.3)]">
          <defs>
            <linearGradient id="rail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A373" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#D4A373" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path d="M 50 200 A 150 150 0 0 1 350 200" fill="none" stroke="url(#rail)" strokeWidth="4" />
          <path d="M 80 200 A 120 120 0 0 1 320 200" fill="none" stroke="url(#rail)" strokeWidth="2" opacity="0.6" />
          {DATA.map((_, i) => {
            const angle = (i * 180) / (DATA.length - 1) - 180;
            const x = 200 + 150 * Math.cos((angle * Math.PI) / 180);
            const y = 200 + 150 * Math.sin((angle * Math.PI) / 180);
            const active = i === index;
            return <circle key={i} cx={x} cy={y} r={active ? 8 : 4} fill={active ? "#F59E0B" : "#D4A373"} opacity={active ? 1 : 0.7} />;
          })}
          <circle cx="200" cy="200" r="6" fill="url(#rail)" />
        </svg>
      </div>

      {/* Stack of testimonial cards */}
      <div className="relative z-[5] flex h-[62vh] w-full max-w-[540px] items-center justify-center md:h-[70vh]">
        {visible.map((t) => (
          <div
            key={`${t.id}-${t.absolute}`}
            className="absolute left-1/2 top-1/2 w-full max-w-[520px] cursor-pointer overflow-hidden 
                       rounded-3xl border border-[#D4A373]/15 bg-[linear-gradient(135deg,rgba(212,163,115,.1),rgba(245,158,11,.06)_50%,rgba(212,163,115,.08))]
                       backdrop-blur-xl shadow-[0_24px_48px_rgba(0,0,0,.35),_0_12px_24px_rgba(212,163,115,.12)]
                       transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={cardTransform(t.pos, t.isCentre)}
            onClick={() => pick(t.absolute)}
            role="button"
            aria-label={`Read testimonial from ${t.name}`}
            tabIndex={t.isCentre ? 0 : -1}
          >
            <div className="relative min-h-[300px] p-6 sm:p-8">
              <div className="absolute right-6 top-5 size-7 text-[#D4A373]/40" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"/></svg>
              </div>

              <p className="mb-6 text-[1.05rem] italic leading-7 text-[#FAFAF9] sm:text-[1.12rem]">{t.text}</p>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A373] to-amber-500 font-bold text-[#0A0B0D] shadow-[0_4px_12px_rgba(245,158,11,.3)]">
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="m-0 font-serif text-[1.05rem] font-semibold">{t.name}</h4>
                  <p className="m-0 text-sm text-white/85">{t.role}</p>
                  <p className="m-0 text-xs text-[#D4A373]/90">{t.location}</p>
                </div>
              </div>

              <div className="flex gap-1.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="size-[18px] text-amber-500" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 md:bottom-8">
        <button
          onClick={prev}
          className="flex size-11 items-center justify-center rounded-full border border-[#D4A373]/30 bg-[#D4A373]/10 
                     text-[#FAFAF9] transition hover:border-[#D4A373]/50 hover:bg-[#D4A373]/20 hover:shadow-lg md:size-12"
          aria-label="Previous testimonial"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"></polyline></svg>
        </button>

        <div className="flex items-center gap-3 font-serif text-[1.05rem] font-semibold">
          <span>{index + 1}</span>
          <div className="h-5 w-[2px] bg-gradient-to-b from-[#D4A373] to-amber-500" />
          <span>{DATA.length}</span>
        </div>

        <button
          onClick={next}
          className="flex size-11 items-center justify-center rounded-full border border-[#D4A373]/30 bg-[#D4A373]/10 
                     text-[#FAFAF9] transition hover:border-[#D4A373]/50 hover:bg-[#D4A373]/20 hover:shadow-lg md:size-12"
          aria-label="Next testimonial"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6"></polyline></svg>
        </button>
      </div>

      {/* Vertical progress dots on the left */}
      <div className="absolute left-[-.75rem] top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 md:left-[-1rem]">
        {DATA.map((_, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className={`size-2.5 rounded-full transition 
                        ${i === index ? "scale-125 bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,.6)]" : "bg-[#D4A373]/40 hover:bg-[#D4A373]/70"}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/** Picks 7 visible on xl+ screens, otherwise 5 */
function useVisibleCount() {
  const [count, setCount] = useState(check() ? 7 : 5);
  useEffect(() => {
    const onResize = () => setCount(check() ? 7 : 5);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return count;
  function check() { return typeof window !== "undefined" && window.matchMedia("(min-width: 1280px)").matches; }
}
