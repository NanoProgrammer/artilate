// components/Card.jsx
import { useContext } from "react";
import Modal from "./modal.jsx";
import ModalContext from "./context.jsx";
import "../styles/card.css";
import { CartContext } from "../components/cart/context.jsx";

export default function Card({ imgUrl, title, description, id, price }) {
  const { isOpened, handleModal } = useContext(ModalContext);
  const { addItem } = useContext(CartContext);

  const toggleModal = () => {
    addItem({ imgUrl, title, description, id, price });
    handleModal(!isOpened);
  };

  return (
    <>
      <div className="relative min-h-[200px] w-full max-w-[400px] md:max-w-[500px] lg:max-w-2xl bg-color4/20 rounded-lg overflow-hidden p-4 bord hover:scale-105 transition-transform duration-200 card">
        <div className="flex flex-col md:flex-row gap-4">
          <a href={`/products/${id}`} className="w-full md:w-96 h-auto max-h-[200px] object-cover pointer">
            <img
              src={imgUrl}
              alt={title}
              className="w-full md:w-96 h-full max-h-[200px] object-cover rounded-lg border-2 border-color1"
            />
          </a>
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-color1/80 mb-2">{title}</h2>
              <p className="text-sm md:text-base text-color1/80 mb-2">{description}</p>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-color1/80 mb-4 ml-2">$ {price}</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-end md:mr-16">
              <button
                onClick={toggleModal}
                className="px-4 py-2 rounded-md bg-color1 hover:bg-color3/90 transition-colors duration-200 text-white w-full sm:w-auto"
              >
                add to cart
              </button>
              <a href={`/products/${id}`} className="w-full sm:w-auto">
                <button className="px-4 py-2 rounded-md bg-color2/70 hover:bg-color2/90 transition-colors duration-200 text-white w-full">
                  see more details
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
}
