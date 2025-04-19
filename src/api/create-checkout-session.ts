import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export const GET: APIRoute = () => {
  console.log('[GET] ❌ Someone hit this with GET');
  return new Response('Method Not Allowed', { status: 405 });
};

export const POST: APIRoute = async ({ request }) => {
  console.log('[POST] ✅ POST request received');

  try {
    const { items }: { items: { name: string; price: number; quantity: number }[] } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'cad',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: 'http://artilate.com/success',
      cancel_url: 'http://artilate.com/cancel',
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
