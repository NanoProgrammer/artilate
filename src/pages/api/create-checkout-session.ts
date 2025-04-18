import type { APIRoute } from 'astro';
import Stripe from 'stripe';
interface CheckoutSessionRequest {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
}
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

export const POST: APIRoute = async ({ request }) => {
  const { items } = await request.json() as CheckoutSessionRequest;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(Number(item.price) * 100) || 1, // por si viene inválido, evita que Stripe explote
        },
        quantity: item.quantity,
        customer_email: undefined,
      })),
      success_url: 'http://artilate.com/success',
      cancel_url: 'http://artilate.com/cancel',
    });
    

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error('Stripe error:', error); // 👈 dejalo
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
          ? (error as any).message
          : 'Unknown error';
  
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
  
  
};

