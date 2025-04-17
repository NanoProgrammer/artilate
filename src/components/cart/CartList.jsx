import { CartContext } from "./context.jsx";
import { useContext } from "react";
import CartItem from "./CartItem.jsx";
import Summary from "./subtotal.jsx";

export default function CartList() {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start justify-between px-6">

      <div className="flex-1">
        {cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg self-end mt-4"
            >
              Clear Cart
            </button>
          </div>
        ) : (
          <div className="h-[70vh] bg-white rounded-lg shadow-lg overflow-y-auto flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <p className="text-gray-500 mt-2">Your cart is empty</p>
            
          </div>
        )}
      </div>
      {cart.length > 0 && <Summary />}
    </div>
  );
}
