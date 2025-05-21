import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/api/home/images")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.order - b.order);
        setImages(sorted);
      })
      .catch((err) => console.error("Failed to fetch hero images", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        images.length > 0 ? (prev + 1) % images.length : 0
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [images]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });

  return (
    <div
      className="relative h-[90vh] sm:h-screen overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-white"
      id="home"
      {...swipeHandlers}
    >
      {images.map((img, i) => (
        <div
          key={img._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          role="img"
          aria-label={img.caption || "Hero image"}
          style={{
            backgroundImage: `url(${img.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-white/10 dark:bg-black/40 flex flex-col justify-center items-center text-center text-white px-4 pt-20 pb-16 sm:py-32 animate-fade-in">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight font-serif max-w-3xl">
              Exotic Epsilon Chapter
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light tracking-wide mb-6 max-w-xl">
              Leadership | Brotherhood | Excellence
            </p>
            <a
              href="#about"
              className="bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-[2px] w-6 sm:w-8 transition-all duration-300 ${
              i === activeIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 dark:bg-black/60 hover:bg-black/50 dark:hover:bg-black/70 p-1 sm:p-2 rounded-full"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 dark:bg-black/60 hover:bg-black/50 dark:hover:bg-black/70 p-1 sm:p-2 rounded-full"
      >
        <ChevronRight className="text-white" size={24} />
      </button>
    </div>
  );
}
