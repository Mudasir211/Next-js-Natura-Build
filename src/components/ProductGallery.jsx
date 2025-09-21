"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images, title }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  const [isDesktop, setIsDesktop] = useState(false);
  const thumbsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollThumbnails = (direction) => {
    if (!thumbsRef.current) return;

    const scrollAmount =
      isDesktop ? thumbsRef.current.clientHeight / 2 : thumbsRef.current.clientWidth / 2;

    if (direction === "next") {
      if (isDesktop) thumbsRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
      else thumbsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      if (isDesktop) thumbsRef.current.scrollBy({ top: -scrollAmount, behavior: "smooth" });
      else thumbsRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row-reverse gap-4 flex-1">
      {/* Main Image */}
      <div className="flex sm:w-[75%] justify-center">
        <div className="w-[500px] sm:h-[620px]">
          <img
            src={activeImage}
            alt={title}
            className="w-full h-full object-fill shadow-md rounded-lg"
          />
        </div>
      </div>

      {/* Thumbnails Carousel */}
      <div className="relative flex sm:flex-col flex-row gap-3 sm:w-[13%] sm:h-[620px]">
        {/* Thumbnails Scroll Area */}
        <div
          ref={thumbsRef}
          className="flex sm:flex-col flex-row gap-3 overflow-auto scrollbar-hide sm:max-h-full"
        >
          {images?.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                activeImage === img ? "border-green-600" : "border-gray-200"
              }`}
            >
              <div className="w-20 h-28 sm:w-20 sm:h-32 bg-white">
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Buttons Overlay */}
        {images.length > 3 && (
          <>
            <button
              onClick={() => scrollThumbnails("prev")}
              className={`absolute z-20 flex items-center justify-center p-2 rounded-full bg-white/70 hover:bg-green-200 transition shadow-md ${
                isDesktop
                  ? "top-2 left-1/2 -translate-x-1/2"
                  : "left-2 top-1/2 -translate-y-1/2"
              }`}
            >
              {isDesktop ? <ChevronUp size={28} /> : <ChevronLeft size={28} />}
            </button>

            <button
              onClick={() => scrollThumbnails("next")}
              className={`absolute z-20 flex items-center justify-center p-2 rounded-full bg-white/70 hover:bg-green-200 transition shadow-md ${
                isDesktop
                  ? "bottom-2 left-1/2 -translate-x-1/2"
                  : "right-2 top-1/2 -translate-y-1/2"
              }`}
            >
              {isDesktop ? <ChevronDown size={28} /> : <ChevronRight size={28} />}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
