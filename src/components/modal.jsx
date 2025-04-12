import { useState, useRef,useEffect } from "react";

export default function Modal({ clicked }) {
    const modalRef = useRef(null);

    // Estado para controlar si el modal está abierto o cerrado
    const [isOpen, setIsOpen] = useState(clicked);

    // Función para cerrar el modal
    const closeModal = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = ""; // por si se desmonta
        };
    }, [isOpen]);
    const handleModalClick = (event) => {
        // Verificar si el clic ocurrió fuera del contenido del modal
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    return (
        <>
            {/* Renderizar el modal solo si está abierto */}
            {isOpen && (
                <div
                    className="modal fixed top-0 left-0 h-[100vh] w-[100vw] bg-[var(--color-1)]/80 flex justify-center items-center z-50 overflow-hidden"
                    onClick={handleModalClick} // Manejar clics en el fondo del modal
                >
                    {/* Contenido del modal */}
                    <div
                        className="modal-content bg-white p-6 rounded-md"
                        ref={modalRef} // Referencia al contenido del modal
                    >
                        <span>Check the cart</span>
                        <button
                            className="ml-4 text-red-500"
                            id="closeModalBtn"
                            onClick={closeModal} // Cerrar el modal al hacer clic en el botón
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}