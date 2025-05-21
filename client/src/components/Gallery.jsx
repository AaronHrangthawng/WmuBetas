import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [fullscreenImg, setFullscreenImg] = useState(null);

  useEffect(() => {
    fetch("/api/new-gallery")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Failed to load gallery", err));
  }, []);

  return (
    <section id="gallery" className="py-20 bg-transparent text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-purple-700 mb-2">
            Gallery
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            A collection of moments and memories from our chapter.
          </p>
        </div>

        {images.length === 0 ? (
          <p className="text-center text-gray-500">No images available.</p>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              autoplay={{ delay: 4000 }}
              className="w-full"
            >
              {images.map((img) => (
                <SwiperSlide key={img._id}>
                  <div
                    onClick={() => setFullscreenImg(img)}
                    className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-purple-200 shadow bg-white/80 backdrop-blur-sm hover:shadow-lg transition"
                  >
                    <img
                      src={img.url}
                      alt={img.title || "Gallery image"}
                      className="w-full h-auto max-h-[75vh] object-contain bg-white/80 transition-transform duration-200 hover:scale-[1.02]"
                      loading="lazy"
                    />
                    {img.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm sm:text-base font-medium text-center py-3 px-4 rounded-b-xl backdrop-blur-sm">
                        {img.title}
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Arrows */}
            <div className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition">
              <ChevronLeft className="w-6 h-6 text-purple-700" />
            </div>
            <div className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition">
              <ChevronRight className="w-6 h-6 text-purple-700" />
            </div>
          </div>
        )}

        {fullscreenImg && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={() => setFullscreenImg(null)}
          >
            <div className="max-w-6xl w-full max-h-[90vh] overflow-auto relative">
              <img
                src={fullscreenImg.url}
                alt={fullscreenImg.title || "Fullscreen image"}
                className="w-full max-h-[90vh] object-contain rounded-lg"
              />
              {fullscreenImg.title && (
                <div className="absolute bottom-0 left-0 right-0 text-white text-center bg-black/60 py-3 text-base font-medium">
                  {fullscreenImg.title}
                </div>
              )}
              <button
                onClick={() => setFullscreenImg(null)}
                className="absolute top-3 right-4 text-white text-2xl font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
