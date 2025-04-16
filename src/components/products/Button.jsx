import {useContext} from 'react'
import {CartContext} from "../cart/context.jsx";
import Modal from "../modal.jsx";
import ModalContext from "../context.jsx";
export default function Button({ imgUrl, title, description, id, price, className }) {
    const { isOpened, handleModal } = useContext(ModalContext);
  const { addItem } = useContext(CartContext);
  const toggleModal = () => {
    addItem({ imgUrl, title, description, id, price });
    handleModal(!isOpened);
  };
  return (
    <>
    <button
        className={className} onClick={toggleModal}>
        Buy now
      </button>
      {isOpened && <Modal />}
      </>
  )
}
