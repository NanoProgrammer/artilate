
// components/CardWithProvider.jsx
import Card from "./Card.jsx";
import { ModalProvider } from "./context.jsx";
import {CartProvider} from "./cart/context.jsx";

export default function CardWithProvider(props) {
  return (
    <CartProvider>
      <ModalProvider>
      <Card {...props} />
    </ModalProvider>
    </CartProvider>
  );
}
