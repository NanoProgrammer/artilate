import { CartContext } from "./context.jsx";
import { useContext } from "react";
import CartItem from "./CartItem.jsx"; // Asegurate de importar esto

export default function CartList() {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div className="w-full flex justify-center items-center">
      {cart.length > 0 ? (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded-lg self-end">
            Clear Cart
          </button>
        </div>
      ) : (
        <div className="h-[60vh] w-[60vw] bg-white rounded-lg shadow-lg overflow-y-auto">
          <h2 className="text-center text-2xl font-bold py-4">Shopping Cart</h2>
          <div className="flex flex-col items-center">
            <p className="text-gray-500">Your cart is empty</p>
            <img src="/images/empty-cart.png" alt="Empty Cart" className="w-1/2 h-auto mt-4" />
          </div>
        </div>
      )}
    </div>
  );
}
