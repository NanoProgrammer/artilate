// src/components/shop/SnacksSections.jsx
import React, { useEffect, useState } from "react";
import { Plus, ArrowRight, Check } from "lucide-react";
import { useCart } from "../cart/context";

/* --------------------------- Toast (same style) --------------------------- */
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
        style={{
          position: "fixed",
          bottom: 48,
          right: 32,
          zIndex: 100,
          borderRadius: 16,
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

/* ---------------------------- Snacks (circular) --------------------------- */
/**
 * Props:
 *  - onAdd?: (item) => void   // If provided, uses your real cart; otherwise a local demo cart is used
 */
export default function SnacksSections({ onAdd }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const {addItem} = useCart()

  const items = [
    {
      id: "coins-milk",
      name: "Chocolate Coins — Milk",
      count: 3,
      price: 7,
      href: "/shop/snacks/chocolate-coins-milk",
      img: "/images/snacks/coins-milk.jpg",
      bg: "linear-gradient(135deg, rgba(245,158,11,.25), rgba(212,163,115,.25))",
    },
    {
      id: "coins-dark",
      name: "Chocolate Coins — Dark",
      count: 4,
      price: 7,
      href: "/shop/snacks/chocolate-coins-dark",
      img: "/images/snacks/coins-dark.jpg",
      bg: "linear-gradient(135deg, rgba(234,179,8,.25), rgba(120,113,108,.25))",
    },
    {
      id: "dinos-mix",
      name: "Chocolate Dinosaurs — Mix",
      count: 4,
      price: 12,
      href: "/shop/snacks/chocolate-dinosaurs-mix",
      img: "/images/snacks/dinos-mix.jpg",
      bg: "linear-gradient(135deg, rgba(99,102,241,.25), rgba(56,189,248,.25))",
    },
    {
      id: "dinos-mini",
      name: "Chocolate Dinosaurs — Mini",
      count: 3,
      price: 9,
      href: "/shop/snacks/chocolate-dinosaurs-mini",
      img: "/images/snacks/dinos-mini.jpg",
      bg: "linear-gradient(135deg, rgba(147,51,234,.22), rgba(59,130,246,.22))",
    },
 
    {
      id: "thinbar-almond",
      name: "Thin Bar — Almond",
      count: 3,
      price: 6,
      href: "/shop/snacks/thin-bar-almond",
      img: "/images/snacks/thin-bar-almond.jpg",
      bg: "linear-gradient(135deg, rgba(245,158,11,.22), rgba(234,88,12,.22))",
    },
  ];

  const go = (href) => (window.location.href = href);

  const handleAdd = (item) => {
    addItem(item, 1);

    setToastMessage(`${item.name} was added to your cart.`);
    setShowToast(true);
  };

  return (
    <>
      <section
        style={{
          background: "#0A0B0D",
          position: "relative",
          overflow: "hidden",
          padding: "56px 0 64px",
        }}
      >
        {/* glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 600px 380px at 20% 30%, rgba(212,163,115,0.06) 0%, transparent 55%),
              radial-gradient(ellipse 520px 540px at 85% 70%, rgba(245,158,11,0.05) 0%, transparent 55%)
            `,
            opacity: 0.9,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {/* header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2
              style={{
                margin: 0,
                color: "#F5F5F4",
                fontWeight: 800,
                fontSize: "clamp(22px, 3.5vw, 30px)",
              }}
            >
              Snacks & Minis
            </h2>
            <p
              style={{
                color: "#A1A1AA",
                fontSize: 15,
                marginTop: 8,
              }}
            >
              Coins, dinos, and slim bars — playful bites for quick cravings.
            </p>
          </div>

          {/* circular categories */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 18,
              justifyItems: "center",
              alignItems: "start",
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {items.map((s) => (
              <article
                key={s.id}
                style={{
                  display: "grid",
                  justifyItems: "center",
                  gap: 10,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {/* circle */}
                <button
                  onClick={() => go(s.href)}
                  aria-label={s.name}
                  style={{
                    cursor: "pointer",
                    width: 168,
                    height: 168,
                    borderRadius: "999px",
                    overflow: "hidden",
                    position: "relative",
                    border: "1px solid rgba(212,163,115,.18)",
                    background: "#111318",
                    boxShadow:
                      "0 14px 34px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.04)",
                    transition:
                      "transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s",
                  }}
                  className="snacks-circle"
                >
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.setAttribute("data-show", "1");
                    }}
                  />
                  {/* gradient fallback */}
                  <div
                    data-show="0"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: s.bg,
                      display: "grid",
                      placeItems: "center",
                      transition: "opacity .3s",
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 96,
                        borderRadius: 12,
                        background: "rgba(255,255,255,.06)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)",
                      }}
                    />
                  </div>
                  {/* legibility gradient */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: 84,
                      background:
                        "linear-gradient(180deg, rgba(10,11,13,0) 0%, rgba(10,11,13,.65) 100%)",
                    }}
                  />
                  {/* hover arrow */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: 12,
                      bottom: 12,
                      width: 36,
                      height: 36,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 12,
                      background: "rgba(212,163,115,.12)",
                      border: "1px solid rgba(212,163,115,.25)",
                      color: "#FAFAF9",
                      backdropFilter: "blur(6px)",
                      transform: "translateY(6px)",
                      opacity: 0,
                      transition: "all .25s",
                    }}
                    className="snacks-circle__cta"
                  >
                    <ArrowRight size={16} />
                  </div>
                </button>

                {/* label & count */}
                <div>
                  <div
                    style={{
                      color: "#FAFAF9",
                      fontWeight: 800,
                      fontSize: 15,
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      color: "#C7C7CC",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    {s.count} items
                  </div>
                </div>

                {/* actions: price + add */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 6,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: 16,
                      background: "linear-gradient(90deg,#F59E0B,#FFB020)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      minWidth: 48,
                    }}
                  >
                    ${s.price}
                  </div>

                  <button
                    onClick={() => handleAdd(s)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: 12,
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg, #D4A373 0%, #F59E0B 100%)",
                      color: "#0A0B0D",
                      boxShadow: "0 6px 20px rgba(212,163,115,.2)",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* small floating dots */}
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
                top: `${[20, 72, 45, 78][i]}%`,
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
          .snacks-circle:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 18px 46px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.05);
          }
          .snacks-circle:hover .snacks-circle__cta {
            transform: translateY(0);
            opacity: 1;
          }
          @media (max-width: 520px) {
            .snacks-circle { width: 148px; height: 148px; }
          }
        `}</style>
      </section>

      <Toast
        open={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </>
  );
}
