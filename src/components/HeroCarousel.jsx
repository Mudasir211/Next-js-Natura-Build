"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

export default function HeroCarousel() {
  return (
    <section className="relative pt-14 w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {[
          "https://res.cloudinary.com/dpoxhiyts/image/upload/f_auto,q_auto,w_1920/v1759302861/Home_Hero_kjlwno.png",
          "responsive-slide",
        ].map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full md:h-[100vh] bg-[#daf1c5] flex justify-center items-center">
              {/* First slide → Hero1 */}
              {img !== "responsive-slide" && (
                <Image unoptimized
                  src={img} // ✅ use the array value
                  alt={`Hero Slide ${i + 1}`}
                  width={1920}
                  height={1080}
                  priority={i === 0} // ✅ only first slide gets priority
                  className="w-full h-auto md:h-full object-contain md:object-cover object-center"
                />
              )}

              {/* Second slide → responsive images */}
              {img === "responsive-slide" && (
                <>
                  <Image
                    src="https://res.cloudinary.com/dpoxhiyts/image/upload/v1759303111/Home_Hero15_pu45v7.jpg"
                    alt="Hero Slide Mobile"
                    width={1080}
                    height={1920}
                    className="block md:hidden w-full h-auto object-contain object-center"
                  />
                  <Image
                    src="https://res.cloudinary.com/dpoxhiyts/image/upload/v1759303194/Home_Hero156_ak9jpk.png"
                    alt="Hero Slide Desktop"
                    width={1920}
                    height={1080}
                    className="hidden md:block w-full h-full object-cover object-center"
                  />
                </>
              )}

              {/* Overlay only on first slide */}
              {i === 0 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4">
                      Discover Natural Herbal Products
                    </h1>
                    <p className="text-sm sm:text-lg md:text-2xl mb-6">
                      Organic. Healthy. Pure.
                    </p>
                    <Link
                      href="/products"
                      className="bg-green-600 hover:bg-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-semibold text-sm sm:text-base"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
