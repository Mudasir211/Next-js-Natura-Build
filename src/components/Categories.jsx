"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

import Hair from "../assets/Hair.png";
import Powders from "../assets/Powders.png";
import Energy from "../assets/Energy.png";
import Weight from "../assets/Weight.png";
import Formulaes from "../assets/Formulaes.png";
import Honey from "../assets/Honey.png";
import Spices from "../assets/Spices.png";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });

function Categories() {
  const categories = [
    { name: "Herbal Growth & Scalp Herbs", img: Hair, href: "/products?category=oils" },
    { name: "Herbal Powder & Superfood Seeds", img: Powders, href: "/products?category=bestsellers" },
    { name: "Herbal Weight Loss Solution", img: Energy, href: "/products?category=powders" },
    { name: "Natural Energy & Stamina Boosters", img: Weight, href: "/products?category=supplements" },
    { name: "Pure Spices", img: Formulaes, href: "/products?category=spices" },
    { name: "Vision & Eyesight Support", img: Honey, href: "/products?category=bestsellers" },
    { name: "Skin Body And Detox Herbs", img: Spices, href: "/products?category=bestsellers" },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center px-4">
          <h2
            className={`text-2xl md:text-4xl font-bold mb-7 inline-block relative ${oswald.className} -skew-x-10 bg-gradient-to-r from-green-700 via-emerald-500 to-green-400 text-transparent bg-clip-text`}
          >
            Browse Our Categories
          </h2>

          {/* Description */}
          <p className="mt-4 font-bold text-gray-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Explore our natural wellness range – from{" "}
            <span className="text-green-700 font-medium">hair care</span> to{" "}
            <span className="text-green-700 font-medium">superfoods, vitality boosters</span>, and{" "}
            <span className="text-green-700 font-medium">pure spices</span>. Every category is crafted to
            support your health journey.
          </p>
        </div>

        {/* Marquee */}
        <div className="px-6 overflow-y-hidden md:px-16">
          <Marquee gradient={false} speed={40} pauseOnHover>
            {[...categories, ...categories].map((cat, index) => (
              <Link
                key={index}
                href={cat.href}
                className="relative group flex flex-col w-[160px] h-[120px] sm:w-[160px] sm:h-[170px] md:w-[200px] md:h-[190px] mx-2 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                {/* Background Image */}
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
               

                {/* Category Name */}
              
              </Link>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

export default Categories;
