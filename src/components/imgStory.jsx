import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImgStory({ img }) {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    if (imageElement) {
      gsap.fromTo(imageElement,
        { y: -40 },
        {
        y: 8,
        duration: 0.4,
        ease: "in-out",
        scrollTrigger: {
          trigger: imageElement,
          start: "bottom bottom",
          end: "top 20%",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div
      ref={imageRef}
      className="max-w-md max-h-64 flex justify-start border-16 border-amber-50 border-b-48 shadow-2xl overflow-hidden content-center"
    >
      <img src={img} alt="about us" />
    </div>
  );
}
