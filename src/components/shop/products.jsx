import BarsSection from './BarsSection'
import BonbonsSection from './BonbonsSection'
import GiftsSections from './GiftsSections'
import LimitedEdition from './LimitedEdition'
import SnacksSections from './SnacksSections'
import CartProvider  from '../cart/context'

export default function products() {
  return (
    <CartProvider>
      <BonbonsSection />
      <GiftsSections />
      <BarsSection />
      {/**SnacksSections */}
      <LimitedEdition />
    </CartProvider>
  )
}
