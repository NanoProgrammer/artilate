
// components/CardWithProvider.jsx
import Card from "./Card.jsx";
import { ModalProvider } from "./context.jsx";

export default function CardWithProvider(props) {
  return (
    <ModalProvider>
      <Card {...props} />
    </ModalProvider>
  );
}
