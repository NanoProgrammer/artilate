import { Suspense, useEffect } from "react";
import { gsap } from "gsap";

export default function ImgHero() {
  useEffect(() => {
    const imageElement = document.querySelector('.increase');

    if (imageElement) {
      gsap.fromTo(
        imageElement,
        { scale: 1 }, // Inicia con la escala normal
        {
          scale: 1.5, // Aumenta la escala al 150%
          duration: 10, // Duración del efecto en segundos
          repeat: -1, // Repite infinitamente
          yoyo: true, // Hace que el efecto sea reversible (ida y vuelta)
          ease: "power1.inOut", // Efecto de transición suave
        }
      );
    } else {
      console.error("El elemento .increase no existe en el DOM.");
    }
  }, []);

  return (
    <Suspense fallback={<div className="w-full h-full text-amber-700 text-3xl">...</div>}>
      <div className="relative overflow-hidden w-full h-full">
      {/* Contenedor con overflow:hidden */}
      <img
        src="/assets/main-banner.webp"
        alt="chocolates of background"
        className="w-full h-full object-cover increase" // La imagen cubre todo el contenedor
      />
    </div>
    </Suspense>
  );
}