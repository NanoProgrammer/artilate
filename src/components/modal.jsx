import { useContext, useEffect, useRef } from "react";
import ModalContext from "./context.jsx";
import "../styles/card.css";

export default function Modal() {
  const { isOpened, handleModal } = useContext(ModalContext);
  const modalRef = useRef(null);

  const closeModal = () => {
    handleModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpened ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  const handleModalClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  if (!isOpened) return null;

  return (
    <>
      <div
        className="modal fixed top-0 left-0 h-[100vh] w-[100vw] bg-[var(--color-1)]/80 flex justify-center items-center z-50 overflow-hidden"
        onClick={handleModalClick}
      >
        <div
          className="modal-content bg-white p-6 rounded-md px-6 sm:px-10 py-8 sm:py-10 w-[90vw] sm:w-[70vw] md:w-[50vw] "
          ref={modalRef}
          
        >
          <div className="flex flex-col sm:flex-row justify-center items-center text-center gap-4">
            <h4 className="text-lg sm:text-2xl font-semibold">
              You have successfully added a product to your cart
            </h4>
            <button
              className="border-1 border-red-500 rounded-md px-4 py-2 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white transition-colors ease-in-out duration-200"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between ml-35 sm:ml-0  mt-8 gap-4">
            <a href="/products" className="flex hov">
              <div className="flex flex-row bg-[var(--color-4)]/60 rounded-md p-4 border-2 border-[var(--color-4)] hover:bg-[var(--color-4)]/80 transition-colors ease-in-out duration-200">
                <div className="flex flex-col justify-center items-center w-24 text-center">
                  <p className="text-sm sm:text-base">Explore more</p>
                  <img
                    src="/assets/magnifying.svg"
                    alt="magnifying glass"
                    className="w-10 sm:w-14 h-auto"
                  />
                </div>
              </div>
            </a>
            <a href="/cart" className="flex hov">
              <div className="flex flex-row bg-[var(--color-2)]/60 rounded-md p-4 border-2 border-[var(--color-2)] hover:bg-[var(--color-2)]/80 transition-colors ease-in-out duration-200">
                <div className="flex flex-col justify-center items-center w-24 text-center">
                  <p className="text-sm sm:text-base">Check the cart</p>
                  <img
                    src="/assets/cart.svg"
                    alt="cart"
                    className="w-12 sm:w-16 h-auto"
                  />
                </div>
              </div>
            </a>
            <a href="/" className="flex hov">
              <div className="flex flex-row bg-[var(--color-3)]/60 rounded-md p-4 border-2 border-[var(--color-3)] hover:bg-[var(--color-3)]/80 transition-colors ease-in-out duration-200">
                <div className="flex flex-col justify-center items-center w-24 text-center">
                  <p className="text-sm sm:text-base">See home</p>
                  <img
                    src="/assets/home.svg"
                    alt="home"
                    className="w-12 sm:w-16 h-auto"
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
