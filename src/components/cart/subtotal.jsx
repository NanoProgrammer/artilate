import React, { useContext } from 'react';
import { CartContext } from './context';

export default function Summary() {
  const { cart } = useContext(CartContext);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 24;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-6 rounded shadow-md w-full max-w-xs sticky top-20 h-fit">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Shipping Est.</span>
        <span>${shipping}</span>
      </div>
      <input
        type="text"
        placeholder="Enter gift code"
        className="w-full px-3 py-2 mb-4 border rounded"
      />
      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total Price</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
}

