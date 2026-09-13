import ProductGrid from './ProductGrid'
import CartProvider  from '../cart/context'

export default function products() {
  return (
    <CartProvider>
      <ProductGrid />
    </CartProvider>
  )
}
