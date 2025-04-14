import CartList from './CartList'
import { CartProvider } from './context'
export default function CartListwithProvider() {
  return (
    <>
    <CartProvider>
        <CartList />
    </CartProvider>
    </>
  )
}
