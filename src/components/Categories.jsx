"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

import HerbalOils from "../assets/herbalOils.jpg";
import HerbalPowder from "../assets/herbalPowder.jpg";
import HerbalSupplements from "../assets/herbalSupplements.jpeg";
import SpicesAndSeeds from "../assets/spicesAndSeeds.webp";
import BestSellers from "../assets/bestSellers.png";

function Categories() {
  const categories = [
    { name: "Herbakl Growth & Scalp Herbs", img: HerbalOils, href: "/products?category=oils" },
    { name: "Herbal Powder & Superfood Seeds", img: BestSellers, href: "/products?category=bestsellers" },

    { name: "Herbal Weight loss Solution", img: HerbalPowder, href: "/products?category=powders" },
    { name: "Natural Energy & Stamina Boosters", img: HerbalSupplements, href: "/products?category=supplements" },
    { name: "Pure Spices", img: SpicesAndSeeds, href: "/products?category=spices" },
    { name: "Vision & Eyesight Support", img: BestSellers, href: "/products?category=bestsellers" },
    { name: "Skin Body And Detox Herbs", img: BestSellers, href: "/products?category=bestsellers" },
    { name: "Wellness Blends", img: BestSellers, href: "/products?category=bestsellers" },


  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Heading with Curved Decorative Line */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 inline-block relative">
            Browse Our Categories
            <div className="w-full flex justify-center mt-3">
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
        </div>

        {/* Infinite Smooth Scrolling Carousel */}
<div className="px-6 md:px-20"> 
  <Marquee gradient={false} speed={40} pauseOnHover>
    {[...categories, ...categories].map((cat, index) => (
      <Link
        key={index}
        href={cat.href}
        className="flex flex-col max-w-[130px] h-[190px] min-w-[130px] mx-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
      >
        <div className="relative w-full h-28 rounded-t-lg overflow-hidden">
          <Image
            src={cat.img}
            alt={cat.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="py-2 px-3 text-sm break-all text-green-800 text-center font-medium">
          {cat.name}
        </span>
      </Link>
    ))}
  </Marquee>
</div>

      </div>
    </section>
  );
}

export default Categories;
