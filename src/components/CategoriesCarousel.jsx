// app/components/CategoriesCarousel.jsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function CategoriesCarousel({ categories }) {
  return (
    <div className="relative mx-3 overflow-x-scroll scrollbar-hide min-h-[220px] flex items-center justify-center">
      <motion.div
        className="flex gap-5 px-8 w-max py-6 rounded-2xl backdrop-blur-md border border-green-100 shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {categories.map((cat, index) => (
          <Link
            key={index}
            href={`/products?category=${cat.slug}`}
            className="relative group flex flex-col bg-white/60 w-[180px] h-[150px] sm:w-[180px] sm:h-[190px] md:w-[220px] md:h-[210px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              priority={index < 3} // ✅ preload first few images for speed
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
