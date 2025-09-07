import BarsSection from './BarsSection'
import BonbonsSection from './BonbonsSection'
import GiftsSections from './GiftsSections'
import LimitedEdition from './LimitedEdition'
import SnacksSections from './SnacksSections'
import CartProvider  from '../cart/context'
import '../../styles/productStyle.css'

export default function products() {
  return (
    <CartProvider>
      <BarsSection />
      <SnacksSections />
      <BonbonsSection />
      <GiftsSections />
      <LimitedEdition />
    </CartProvider>
  )
}
