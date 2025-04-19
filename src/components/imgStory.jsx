import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImgStory({ img }) {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    if (imageElement) {
      gsap.fromTo(
        imageElement,
        { y: -80 },
        {
          y: 8,
          duration: 0.4,
          ease: "in-out",
          scrollTrigger: {
            trigger: imageElement,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={imageRef}
      className="bg-white shadow-2xl border-[16px] border-b-[64px] border-color5 max-w-[300px] md:max-w-[360px] overflow-hidden mx-auto transform hover:scale-[1.02] transition-transform duration-300"
    >
      <img
        src={img}
        alt="about us"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
