// components/Card.jsx
import { useState } from "react";
import Modal from "./modal.jsx";
import "../styles/card.css"

export default function Card({ imgUrl, title, description, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <div className="relative min-h-[200px] w-full max-w-[400px] md:max-w-[500px] lg:max-w-2xl bg-[var(--color-4)]/20 rounded-lg overflow-hidden p-4 bord hover:scale-105 transition-scale ease-in-out duration-200">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={imgUrl}
          alt={title}
          className="w-full md:w-56 h-auto max-h-[200px] object-cover rounded-lg border-2 border-[var(--color-1)]"
        />
        <div className="flex flex-col justify-between w-full">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-1)]/80 mb-2">{title}</h2>
            <p className="ttext-sm md:text-base text-[var(--color-1)]/80 mb-4">{description}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-end md:mr-16">
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="px-4 py-2 rounded-md bg-[var(--color-1)] hover:bg-[var(--color-3)]/90 transition-colors ease-in-out duration-200 text-white w-full sm:w-auto open-modal"
            >
              add to cart
            </button>
            <a href={`/products/${id}`} className="w-full sm:w-auto">
              <button className="px-4 py-2 rounded-md bg-[var(--color-2)]/70 hover:bg-[var(--color-2)]/80 transition-colors ease-in-out duration-200 text-white w-full">
                see more details
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    {isModalOpen && <Modal clicked={isModalOpen} client:only onclick={() => setIsModalOpen(!isModalOpen)}/>}
    </>
  );
}
