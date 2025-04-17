import React, { useContext } from 'react';
import { CartContext } from './context';

export default function CartItem({ id, title, price, quantity, imgUrl }) {
  const { updateItem, removeItem } = useContext(CartContext);

  const increment = () => updateItem(id, quantity + 1);
  const decrement = () => {
    if (quantity > 1) updateItem(id, quantity - 1);
  };

  return (
    <div className="flex justify-between items-center border-b py-4 px-2">
      <div className="flex items-center gap-4">
        <img src={imgUrl} alt={title} className="w-16 h-16 object-cover rounded" />
        <div className="flex flex-col">
          <span className="font-semibold">{title}</span>
          <span className="text-gray-600">${price}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={decrement} className="px-2 py-1 border rounded">-</button>
        <span className="px-2">{quantity.toString().padStart(2, '0')}</span>
        <button onClick={increment} className="px-2 py-1 border rounded">+</button>
      </div>
      <div className="font-semibold w-16 text-center">${(price * quantity).toFixed(2)}</div>
      <button onClick={() => removeItem(id)} className="text-red-500 text-xl font-bold">×</button>
    </div>
  );
}

