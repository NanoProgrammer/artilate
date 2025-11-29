// src/components/cart/CartListwithProvider.jsx
import React, { useMemo, useState } from "react";
import CartProvider, { useCart } from "./context";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

function money(n) {
  if (typeof n !== "number") return "$0.00";
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
}

function Qty({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  const onInput = (e) => {
    const v = parseInt(e.target.value || "0", 10);
    if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
  };
  return (
    <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/5">
      <button
        onClick={dec}
        className="p-2 disabled:opacity-40"
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4 text-zinc-200" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={onInput}
        className="w-12 bg-transparent text-center text-sm font-semibold text-zinc-100 outline-none"
      />
      <button
        onClick={inc}
        className="p-2 disabled:opacity-40"
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4 text-zinc-200" />
      </button>
    </div>
  );
}

function CartItem({ item }) {
  const { updateItem, removeItem } = useCart();
  const lineTotal = (item.price || 0) * (item.quantity || 0);

  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-zinc-500">
            <div className="h-8 w-6 rounded bg-white/10" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-extrabold tracking-tight text-zinc-50">
              {item.name}
            </h3>
            {item.type && (
              <p className="mt-0.5 text-xs text-zinc-400">{item.type}</p>
            )}
            <p className="mt-2 text-xs font-semibold text-zinc-300">
              Unit: {money(item.price)}
            </p>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 hover:bg-white/10"
            aria-label={`Remove ${item.name}`}
            title="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Qty
            value={item.quantity}
            onChange={(q) => updateItem(item.id, q)}
            min={1}
            max={99}
          />
          <div className="text-right text-sm font-extrabold text-zinc-100">
            {money(lineTotal)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartListInner() {
  const { cart, clearCart } = useCart();

  // Campos opcionales para enviar a tu endpoint (se verán en metadata de Stripe si lo implementaste)
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { itemsCount, subtotal } = useMemo(() => {
    const itemsCount = cart.reduce((s, it) => s + (it.quantity || 0), 0);
    const subtotal = cart.reduce(
      (s, it) => s + (it.price || 0) * (it.quantity || 0),
      0
    );
    return { itemsCount, subtotal };
  }, [cart]);

const checkout = async () => {
  try {
    setLoading(true);
    setErr("");

    // 🧾 Datos enviados a tu backend
    const payload = {
      items: cart.map((p) => ({ id: p.id, quantity: p.quantity || 1 })),
      email: email || undefined,
      address: address || undefined,
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.url) {
      throw new Error(data?.error || "Checkout failed");
    }

    // 🚪 Redirección a Stripe (usa fallback y evita doble ejecución)
    let redirected = false;
    const redirectToStripe = () => {
      if (redirected) return;
      redirected = true;
      window.location.href = data.url;
    };

    // 🎯 Enviar evento de conversión Google Ads (el mismo de tu snippet)
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        'send_to': 'AW-17710658719/wq67CJeHgskbEJ_pjP1B',
        // Google NO requiere send_to aquí en tu caso
        event_callback: redirectToStripe,
        event_timeout: 2000,

        // 📌 Valor opcional de la compra (Google sí lo acepta si lo configuras en "Value")
        value: Number(subtotal || 0),
        currency: "CAD",
      });

      // fallback por si no responde (máx 2s)
      setTimeout(redirectToStripe, 2000);
      return;
    }

    // Si gtag no existe → redirige normal
    redirectToStripe();
  } catch (e) {
    console.error(e);
    setErr(e instanceof Error ? e.message : "Checkout failed");
  } finally {
    setLoading(false);
  }
};





  if (!cart.length) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-10">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-amber-400/30 bg-amber-400/10">
            <ShoppingCart className="h-6 w-6 text-amber-300" />
          </div>
          <h1 className="text-xl font-extrabold text-zinc-50">Your cart is empty</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Add some chocolates and come back—your sweet tooth will thank you.
          </p>
          <a
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-4 py-2.5 font-extrabold text-zinc-900 shadow-[0_8px_22px_rgba(212,163,115,.25)]"
          >
            Continue shopping <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A0B0D] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-50">
              Your cart
            </h1>
            <p className="text-sm text-zinc-400">{itemsCount} item(s)</p>
          </div>

          <button
            onClick={() => {
              if (confirm("Clear the entire cart?")) clearCart();
            }}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10"
          >
            Clear cart
          </button>
        </header>

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* Items */}
          <div className="col-span-12 space-y-4 lg:col-span-8">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="mb-3 text-sm font-extrabold tracking-wide text-zinc-300">
                Order summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-100">
                    {money(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <hr className="my-4 border-white/10" />

             

              <div className="mt-4 flex items-center justify-between text-[15px]">
                <span className="font-extrabold text-zinc-200">Total</span>
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-extrabold text-transparent">
                  {money(subtotal)}
                </span>
              </div>

              <button
                onClick={checkout}
                disabled={loading}
                className="mt-5 block w-full rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 px-4 py-3 text-center text-sm font-extrabold text-zinc-900 shadow-[0_10px_28px_rgba(212,163,115,.25)] disabled:opacity-60"
                aria-busy={loading}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>

              <a
                href="/shop"
                className="mt-3 block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-extrabold text-zinc-100 hover:bg-white/10"
              >
                Continue shopping
              </a>

              {/* Promo placeholder */}
              <div className="mt-5">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="h-10 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none"
                  />
                  <button
                    disabled
                    className="h-10 cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-semibold text-zinc-300 opacity-60"
                    title="Not implemented"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {err && (
                <p className="mt-3 text-sm font-semibold text-red-400">
                  {err}
                </p>
              )}

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                By placing your order, you agree to our Terms. Secure checkout,
                encrypted payments.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CartList() {
  return <CartListInner />;
}

export default function CartListwithProvider() {
  // El Provider vive en este island, y tu contexto (./context) debe leer/escribir localStorage
  return (
    <CartProvider>
      <CartList />
    </CartProvider>
  );
}
