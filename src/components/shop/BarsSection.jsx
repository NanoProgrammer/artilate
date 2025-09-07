// src/components/shop/BarsSection.jsx
import React, { useState, useEffect } from "react";
import { Plus, ArrowRight, Check } from "lucide-react";

/**
 * Toast — floating notification (auto-hides)
 */
const Toast = ({ open, onClose, message }) => {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, 3500);
    return () => clearTimeout(id);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className="toast"
        style={{
          position: "fixed",
          bottom: "48px",
          right: "32px",
          zIndex: 100,
          borderRadius: "16px",
          padding: "16px 18px",
          background: "rgba(15,15,15,0.95)",
          border: "1px solid rgba(212,163,115,0.4)",
          boxShadow:
            "0 30px 60px -15px rgba(0,0,0,.4), 0 0 0 1px rgba(212,163,115,.2), 0 8px 32px rgba(212,163,115,.15)",
          width: "min(92vw, 360px)",
          transform: "translateY(-8px)",
          animation: "toastIn .28s cubic-bezier(.16,1,.3,1) forwards",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div
            aria-hidden="true"
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(135deg, rgba(34,197,94,.2), rgba(16,185,129,.25))",
              border: "1px solid rgba(34,197,94,.4)",
              boxShadow: "0 4px 12px rgba(34,197,94,.2)",
              marginTop: 2,
              flexShrink: 0,
            }}
          >
            <Check size={18} color="#34d399" />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h4
              style={{
                margin: 0,
                color: "#F5F5F4",
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              Added to cart
            </h4>
            <p
              style={{
                margin: "6px 0 12px",
                color: "#E5E7EB",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              {message}
            </p>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <a
                href="/cart"
                onClick={onClose}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: 13,
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg, #D4A373 0%, #F59E0B 100%)",
                  color: "#0A0B0D",
                  boxShadow: "0 6px 20px rgba(212,163,115,.25)",
                }}
              >
                View cart <ArrowRight size={14} />
              </a>
              <button
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(229,231,235,.9)",
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

/**
 * BarsSection — self-contained demo.
 * NOTE: If you already have a CartContext, pass an `onAdd` prop that adds the item to your real cart.
 */
export default function BarsSection({ onAdd }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Local demo cart (only used if no onAdd is provided)
  const [localCart, setLocalCart] = useState([]);
  const addLocal = (item) => {
    setLocalCart((prev) => {
      const hit = prev.find((p) => p.id === item.id);
      if (hit) return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p));
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const bars = [
    {
      id: "bar-pistachio-75",
      name: "75% Pistachio Crunch",
      description:
        "Intense dark chocolate with roasted Sicilian pistachios and sea salt crystals.",
      price: 24,
      slug: "dark-75-pistachio",
      category: "PREMIUM DARK",
      features: ["Sicilian Pistachios", "Sea Salt", "Bean-to-Bar"],
      colorTheme: "pistachio",
      image: "/images/bars/pistachio-bar.jpg",
    },
    {
      id: "bar-raspberry-70",
      name: "70% Raspberry Bliss",
      description:
        "Rich dark chocolate infused with freeze-dried raspberries and rose petals.",
      price: 22,
      slug: "dark-70-raspberry",
      category: "FRUIT INFUSED",
      features: ["Freeze-Dried Fruit", "Rose Petals", "Vegan"],
      colorTheme: "raspberry",
      image: "/images/bars/raspberry-bar.jpg",
    },
    {
      id: "bar-mixed-nuts-65",
      name: "65% Mixed Nuts Delight",
      description:
        "Smooth dark chocolate loaded with almonds, hazelnuts, and walnuts.",
      price: 20,
      slug: "dark-65-mixed-nuts",
      category: "NUT COLLECTION",
      features: ["Three-Nut Blend", "Artisan Made", "Ethically Sourced"],
      colorTheme: "nuts",
      image: "/images/bars/mixed-nuts-bar.jpg",
    },
  ];

  const themeMap = {
    pistachio: {
      blur1: "rgba(139, 195, 74, 0.15)",
      blur2: "rgba(76, 175, 80, 0.12)",
      blur3: "rgba(104, 159, 56, 0.18)",
    },
    raspberry: {
      blur1: "rgba(233, 30, 99, 0.15)",
      blur2: "rgba(240, 98, 146, 0.12)",
      blur3: "rgba(194, 24, 91, 0.18)",
    },
    nuts: {
      blur1: "rgba(255, 152, 0, 0.15)",
      blur2: "rgba(255, 183, 77, 0.12)",
      blur3: "rgba(245, 124, 0, 0.18)",
    },
  };

  const handleAdd = (bar) => {
    if (onAdd) onAdd(bar);
    else addLocal(bar);

    setToastMessage(`${bar.name} was added to your cart.`);
    setShowToast(true);
  };

  const openProduct = (slug) => {
    window.location.href = `/shop/${slug}`;
  };

  return (
    <>
      <section
        className="bars-section content-center"
        style={{
          background: "#0A0B0D",
          padding: "64px 0 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            background: `
              radial-gradient(ellipse 600px 400px at 20% 30%, rgba(212,163,115,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 500px 600px at 80% 70%, rgba(245,158,11,0.04) 0%, transparent 50%)
            `,
          }}
        />

        <div
          className="container content-center"
          style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(212,163,115,0.08)",
                border: "1px solid rgba(212,163,115,0.15)",
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#F59E0B",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  color: "#F59E0B",
                }}
              >
                PREMIUM COLLECTION
              </span>
            </div>

            <h2
              style={{
                color: "#F5F5F4",
                fontWeight: 800,
                fontSize: "clamp(28px, 4.2vw, 40px)",
                margin: "0 0 8px",
              }}
            >
              Artisan Chocolate Bars
            </h2>
            <p
              style={{
                color: "#A1A1AA",
                maxWidth: 760,
                margin: "0 auto",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              Handcrafted from ethically sourced cacao — each bar is a small-batch expression of flavor and craft.
            </p>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              maxWidth: 1120,
              margin: "0 auto",
            }}
          >
            {bars.map((bar, i) => {
              const t = themeMap[bar.colorTheme] || themeMap.nuts;
              return (
                <article
                  key={bar.id}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 24,
                    background: "rgba(15,15,15,0.85)",
                    border: "1px solid rgba(250,250,249,0.08)",
                    boxShadow: "0 15px 35px -10px rgba(0,0,0,.3), 0 5px 20px rgba(0,0,0,.1)",
                    transform: "translateZ(0)",
                  }}
                >
                  {/* Decorative blurs */}
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 24 }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: 128,
                        height: 128,
                        right: -16,
                        top: -16,
                        borderRadius: 999,
                        filter: "blur(20px)",
                        opacity: 0.4,
                        background: t.blur1,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: 112,
                        height: 112,
                        left: -20,
                        bottom: -24,
                        borderRadius: 999,
                        filter: "blur(18px)",
                        opacity: 0.35,
                        background: t.blur2,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: 96,
                        height: 64,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: 999,
                        filter: "blur(22px)",
                        opacity: 0.25,
                        background: t.blur3,
                      }}
                    />
                  </div>

                  {/* Image area */}
                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        background: "linear-gradient(135deg,#1F2937,#0F172A)",
                      }}
                    >
                      {/* Simple placeholder shape */}
                      <div
                        style={{
                          width: 56,
                          height: 80,
                          borderRadius: 10,
                          background: "rgba(255,255,255,.06)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(15,15,15,0) 50%, rgba(15,15,15,0.7) 100%)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span
                        style={{
                          color: "#D4A373",
                          fontSize: 11,
                          fontWeight: 900,
                          letterSpacing: 1.5,
                        }}
                      >
                        {bar.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        color: "#FAFAF9",
                        fontWeight: 800,
                        fontSize: 20,
                        lineHeight: 1.2,
                        margin: "0 0 8px",
                      }}
                    >
                      {bar.name}
                    </h3>

                    <p
                      style={{
                        color: "#E5E7EB",
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: "0 0 12px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {bar.description}
                    </p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                      {bar.features.slice(0, 2).map((f) => (
                        <span
                          key={f}
                          style={{
                            fontSize: 12,
                            padding: "6px 10px",
                            borderRadius: 999,
                            color: "rgba(250,250,249,.92)",
                            background: "rgba(212,163,115,.08)",
                            border: "1px solid rgba(212,163,115,.16)",
                            backdropFilter: "blur(6px)",
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          fontWeight: 900,
                          fontSize: 22,
                          background: "linear-gradient(90deg,#F59E0B,#FFB020)",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        ${bar.price}
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <button
                          onClick={() => openProduct(bar.slug)}
                          aria-label="View product"
                          style={{
                            padding: 10,
                            borderRadius: 12,
                            background: "rgba(212,163,115,.08)",
                            border: "1px solid rgba(212,163,115,.22)",
                            color: "#FAFAF9",
                            cursor: "pointer",
                          }}
                        >
                          <ArrowRight size={16} />
                        </button>

                        <button
                          onClick={() => handleAdd(bar)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 14px",
                            borderRadius: 12,
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #D4A373 0%, #F59E0B 100%)",
                            color: "#0A0B0D",
                            boxShadow: "0 6px 20px rgba(212,163,115,.2)",
                            cursor: "pointer",
                            border: "none",
                          }}
                        >
                          <Plus size={16} />
                          <span className="sm-only">Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Minimal floating dots */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: [2, 3, 2, 3][i],
                height: [2, 3, 2, 3][i],
                borderRadius: 999,
                background: ["#D4A373", "#F59E0B", "#8BC34A", "#E91E63"][i],
                top: `${[20, 70, 40, 80][i]}%`,
                left: `${[15, 85, 10, 90][i]}%`,
                opacity: 0.2,
                animation: `floaty ${12 + i * 2}s ease-in-out infinite ${i * 2}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes floaty {
            0%,100% { transform: translateY(0) scale(1); opacity: .2; }
            50% { transform: translateY(-14px) scale(1.1); opacity: .3; }
          }

          @media (max-width: 640px) {
            .sm-only { display: none; }
          }
        `}</style>
      </section>

      <Toast open={showToast} onClose={() => setShowToast(false)} message={toastMessage} />
    </>
  );
}
