import React, { useContext } from 'react';
import { CartContext } from './context';

export default function CartItem({ id, title, price, quantity, imgUrl }) {
  const { updateItem, removeItem } = useContext(CartContext);

  const increment = () => updateItem(id, quantity + 1);
  const decrement = () => {
    if (quantity > 1) updateItem(id, quantity - 1);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center border-b border-[var(--color-4)] py-4 px-2 bg-[var(--color-6)] rounded-xl shadow-sm text-white">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-[250px]">
        <img
          src={imgUrl}
          alt={title}
          className="w-16 h-16 object-cover rounded-lg border border-[var(--color-1)]"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-[var(--color-3)]">{title}</span>
          <span className="text-sm text-[var(--color-5)]">${price}</span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <button
          onClick={decrement}
          className="px-3 py-1 border border-[var(--color-4)] rounded-full text-sm hover:bg-[var(--color-5)] transition-colors"
        >
          −
        </button>
        <span className="px-3 text-sm">{quantity.toString().padStart(2, '0')}</span>
        <button
          onClick={increment}
          className="px-3 py-1 border border-[var(--color-4)] rounded-full text-sm hover:bg-[var(--color-5)] transition-colors"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="font-semibold w-20 text-center text-[var(--color-1)] text-sm">
        ${(price * quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(id)}
        className="text-red-500 text-xl font-bold ml-2 hover:text-red-300 transition-colors"
        aria-label={`Remove ${title}`}
      >
        ×
      </button>
    </div>
  );
}
