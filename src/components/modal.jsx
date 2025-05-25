import { useContext, useEffect, useState } from "react";
import ModalContext from "./context.jsx";

export default function Modal() {
  const { isOpened, handleModal } = useContext(ModalContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpened) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        handleModal(false);
      }, 3100); // duración total
      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-gray-800 text-white px-5 py-3 rounded-md shadow-lg text-sm relative overflow-hidden w-[90vw] max-w-sm animate-fade-in">
        Successfully added to cart —{" "}
        <a
          href="/cart"
          className="underline hover:text-purple-300 transition"
        >
          check the cart
        </a>
        <div className="absolute bottom-0 left-0 h-1 bg-purple-400 animate-progress w-full" />
      </div>
    </div>
  );
}
