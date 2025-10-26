import React, { useState, useEffect } from 'react';

const Banner = () => {
  const images = [
    'https://i.pinimg.com/originals/8d/0f/49/8d0f49dc7b1e7b7a97828aef89f7cf89.jpg',
    'https://i.ytimg.com/vi/hKv4CPh2qi4/maxresdefault.jpg',
    'https://seotakeaways.com/wp-content/uploads/2024/09/unnamed-36.jpg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative">
      <img
        src={images[currentImageIndex]}
        alt={`Banner Image ${currentImageIndex + 1}`}
        className="w-full h-96 object-cover"
      />

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
      >
        &gt;
      </button>

      {/* Image Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
