"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });
export default function LatestHighlights() {
  const highlights = [
    { title: "Behind the Scenes", src: "https://res.cloudinary.com/dpoxhiyts/video/upload/v1759304518/vid1_ecn2cd.mp4" },
    { title: "Customer Love", src: "https://res.cloudinary.com/dpoxhiyts/video/upload/v1759304658/vid2_ix2pui.mp4" },
    { title: "Natura’s Process", src: "https://res.cloudinary.com/dpoxhiyts/video/upload/v1759304828/vid3_rdbkvh.mp4" },
  ];

  return (
    <section className="bg-white border-t border-green-400 md:mx-14 py-10">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col space-y-12">
        <h2 className={`text-3xl  font-bold text-green-800 ${oswald.className}`}>
          #Our Latest <span className="text-green-600">Highlights</span><div className="w-full flex justify-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 20"
                className="w-32 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 15 C50 -5, 150 25, 195 10" />
              </svg>
            </div>
        </h2>
       <p className="text-gray-600 max-w-2xl mx-auto">
          Catch up with Natura’s journey, customer stories, and behind-the-scenes
          moments.
        </p>

        {/* ✅ Carousel for mobile & tablet */}
        <div className="block lg:hidden mt-1">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 }, // 2 slides on sm/md
            }}
          >
            {highlights.map((video, idx) => (
              <SwiperSlide key={idx}>
                <div className="rounded-xl  overflow-hidden hover:shadow-lg transition">
                  <video
                    controls
                    className="w-full h-[360px] object-cover rounded-lg"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ✅ Static grid for desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-6 justify-items-center mt-16">
          {highlights.map((video, idx) => (
            <div
              key={idx}
              className={`rounded-xl  overflow-hidden transition ${
                idx === 1
                  ? "scale-110 -translate-y-6 z-10" // middle video standout
                  : "scale-95 opacity-90"
              }`}
            >
              <video
                controls
                className={`object-cover rounded-lg ${
                  idx === 1
                    ? "w-[340px] h-[440px]"
                    : "w-[280px] h-[380px]"
                }`}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
