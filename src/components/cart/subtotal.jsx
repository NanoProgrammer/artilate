import { useContext } from 'react';
import { CartContext } from './context';

export default function Summary() {
  const { cart } = useContext(CartContext);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 24;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    try {
      const items = [
        ...cart
          .map(item => ({
            name: item.title,
            price: Number(item.price),
            quantity: item.quantity,
          }))
          .filter(item => !isNaN(item.price) && item.price > 0),
        {
          name: 'Shipping',
          price: shipping,
          quantity: 1,
        },
      ];

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (res.status === 405) {
        console.error('❌ Tried to access API with GET or wrong method');
        return;
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Stripe error:', data.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <div className="bg-[var(--color-6)] text-white p-6 rounded-2xl shadow-lg w-full max-w-xs sticky top-20 h-fit border border-[var(--color-4)]">
      <h2 className="text-2xl font-bold text-[var(--color-3)] mb-4">Summary</h2>

      <div className="flex justify-between mb-2 text-[var(--color-5)]">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-4 text-[var(--color-5)]">
        <span>Shipping Est.</span>
        <span>${shipping}</span>
      </div>

      <input
        type="text"
        placeholder="Enter your discount code"
        className="w-full px-3 py-2 mb-4 rounded-lg border border-[var(--color-4)] bg-[var(--color-5)] text-white placeholder:text-[var(--color-1)]"
      />

      <div className="flex justify-between font-bold text-lg mb-4 text-[var(--color-1)]">
        <span>Total Price</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-[var(--color-3)] hover:bg-[var(--color-1)] text-white py-2 rounded-full transition-all duration-200"
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
}
