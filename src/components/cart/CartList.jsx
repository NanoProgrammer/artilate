import { CartContext } from "./context.jsx";
import { useContext } from "react";
import CartItem from "./CartItem.jsx";
import Summary from "./subtotal.jsx";

export default function CartList() {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start justify-between px-6 py-12">

      <div className="flex-1">
        {cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}

            <button
              onClick={clearCart}
              className="self-end mt-4 bg-[var(--color-2)] text-white px-5 py-2 rounded-full shadow-md hover:bg-[var(--color-3)] transition-all duration-200"
            >
              Clear Cart
            </button>
          </div>
        ) : (
          <div className="h-[70vh] bg-[var(--color-6)] text-white rounded-2xl shadow-lg overflow-y-auto flex flex-col items-center justify-center p-8">
            <h2 className="text-3xl font-bold text-[var(--color-3)]">Shopping Cart</h2>
            <p className="text-[var(--color-5)] mt-2">Your cart is empty</p>
          </div>
        )}
      </div>

      {cart.length > 0 && <Summary />}
    </div>
  );
}
