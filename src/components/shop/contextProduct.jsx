import ProductDetail from "./ProductDetail"
import CartProvider from "../cart/context"

export default function contextProduct({product}) {
  return (
   <CartProvider>
    <ProductDetail product={product} />
   </CartProvider>
  )
}
