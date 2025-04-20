import React, { useEffect, useRef } from 'react';
import { img as galleryImages } from '../constants/gallery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const containersRef = useRef([]);

  useEffect(() => {
    containersRef.current.forEach((el, index) => {
      if (!el) return; // null check

      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          delay: index * 0.01,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });
  }, []);

  const getHeightClass = (index) => {
    const heightMap = ['h-64', 'h-80', 'h-96', 'h-72'];
    return heightMap[index % heightMap.length];
  };

  return (
    <section className="w-11/12 max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-10 font-serif">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((item, index) => (
          <div
            key={index}
            ref={(el) => (containersRef.current[index] = el)}
            className={`relative overflow-hidden rounded-xl shadow-lg group cursor-pointer ${getHeightClass(index)}`}
          >
            <img
              loading="lazy"
              src={item.img}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-white text-center text-sm">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
