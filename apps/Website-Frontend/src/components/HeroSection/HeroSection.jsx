import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const HeroSection = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-11/12 mx-auto shadow-lg overflow-hidden mt-11 mb-11" style={{height:"31.813rem"}}>
      <div className="absolute inset-0 flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img src={image.coverImage} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full flex justify-center p-2">
        {images.map((_, index) => (
          <div key={index} className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
