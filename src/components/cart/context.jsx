import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>.");
  return ctx;
}

const STORAGE_KEY = "artilate:cart:v1";

/* Helpers públicos por si necesitas leer el carrito fuera de React */
export function readCartFromStorage() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCartToStorage(next) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // avisa a otras islas/pestañas
    window.dispatchEvent(new CustomEvent("cart:changed"));
  } catch {}
}

export default function CartProvider({ children }) {
  // hidrata con lo que ya haya en localStorage (evita parpadeos)
  const [cart, setCart] = useState(() => readCartFromStorage());

  // set + persist + broadcast en un solo lugar
  const syncSet = (updater) =>
    setCart((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      writeCartToStorage(next);
      return next;
    });

  // escucha cambios desde otras islas/pestañas
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setCart(readCartFromStorage());
    };
    const onPing = () => setCart(readCartFromStorage());
    window.addEventListener("storage", onStorage);
    window.addEventListener("cart:changed", onPing);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart:changed", onPing);
    };
  }, []);

  // acciones
  const addItem = (item, qty = 1) =>
    syncSet((prev) => {
      const hit = prev.find((p) => p.id === item.id);
      if (hit) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: (p.quantity || 0) + qty }
            : p
        );
      }
      return [...prev, { ...item, quantity: Math.max(1, qty) }];
    });

  const removeItem = (id) => syncSet((prev) => prev.filter((p) => p.id !== id));

  const updateItem = (id, quantity) =>
    syncSet((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, Number(quantity) || 1) } : p
      )
    );

  const clearCart = () => syncSet([]);

  // derivados
  const totalItems = useMemo(
    () => cart.reduce((n, p) => n + (p.quantity || 0), 0),
    [cart]
  );
  const subtotal = useMemo(
    () => cart.reduce((s, p) => s + (p.price || 0) * (p.quantity || 0), 0),
    [cart]
  );
  const getItem = (id) => cart.find((p) => p.id === id);

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      updateItem,
      clearCart,
      totalItems,
      subtotal,
      getItem,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
