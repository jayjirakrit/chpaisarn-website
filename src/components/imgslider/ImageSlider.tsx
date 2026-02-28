import React, { useState, useEffect } from "react";
import ArrowRight from "../../assets/arrow-right.svg";
import ArrowLeft from "../../assets/arrow-left.svg";
// import "./ImageSlider.css";

interface ImageType {
  url: ImageMetadata;
  alt: string;
  info?: string;
}

interface ImageSliderProps {
  images: ImageType[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<Boolean>(true);
  const [windowDimension, setDimension] = useState<number>(0);

  useEffect(() => {
   const getWindowDimension = () => {
      return window.innerWidth;
    };

    function handleResize() {
      setDimension(getWindowDimension());
    }
    
    setDimension(getWindowDimension());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const onLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
    setSlideDirection(false);
  };

  const onRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
    setSlideDirection(true);
  };

  const displayImages = () => {
    const imagesToShow = [];
    const imagesToDisplay = windowDimension <= 600 ? 1 : 3;
    // Show current image and the next 2 images to the right Desktop while mobile show only 1 image
    for (let i = 0; i < imagesToDisplay; i++) {
      const index = (currentIndex + i) % images.length;
      imagesToShow.push(images[index]);
    }
    return imagesToShow;
  };

  return (
    <div className="flex items-center">
      <img src={ArrowLeft.src} onClick={onLeft} className="cursor-pointer" />
      <span className="hidden">{windowDimension}</span>
      {/* Image Slider Items */}
      {displayImages().map((img, index) => (
        <div
          key={index}
          className={`w-full lg:w-1/3 overflow-hidden object-cover ${slideDirection ? "animate-slideInFromRight" : "animate-slideInFromLeft"}`}
        >
          <img src={img.url.src} alt={img.alt} />
          <p className="text-center">Product Info</p>
        </div>
      ))}

      <img src={ArrowRight.src} onClick={onRight} className="cursor-pointer" />
    </div>
  );
};

export default ImageSlider;
