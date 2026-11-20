import BarsSection from './BarsSection'
import BonbonsSection from './BonbonsSection'
import LimitedEdition from './LimitedEdition'
import CartProvider  from '../cart/context'

export default function products() {
  return (
    <CartProvider>
      <BonbonsSection />
      <BarsSection />
  
    </CartProvider>
  )
}
