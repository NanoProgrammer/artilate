import Button from "./Button.jsx";
import { ModalProvider } from "../context.jsx";
import { CartProvider } from "../cart/context.jsx";
export default function ButtonProvider({
  imgUrl,
  title,
  description,
  id,
  price,
  className,
}) {
  return (
    <>
      <CartProvider>
        <ModalProvider>
          <Button
            imgUrl={imgUrl}
            title={title}
            description={description}
            id={id}
            price={price}
            className={className}
          />
        </ModalProvider>
      </CartProvider>
    </>
  );
}
