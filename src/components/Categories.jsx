"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const doubled = [...categories, ...categories, ...categories];

  return (
    <section className="relative pt-16 bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 overflow-hidden">
      {/* subtle overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[length:20px_20px] opacity-40 -z-10"></div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center px-4">
          <h2
            className={`text-2xl md:text-4xl font-bold mb-4 inline-block relative ${oswald.className} -skew-x-10 bg-gradient-to-r from-green-700 via-emerald-500 to-green-400 text-transparent bg-clip-text`}
          >
            Browse Our Categories
          </h2>

          <p className="mt-3 font-semibold text-gray-600 max-w-lg mx-auto px-3 text-sm sm:text-base leading-relaxed">
            Explore our natural wellness range – carefully curated categories to
            support your health journey.
          </p>
        </div>

        {/* Loader or Content */}
        <div className="relative mx-3 overflow-x-scroll scrollbar-hide min-h-[220px] flex items-center justify-center">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div
              className="flex gap-5 px-8 w-max py-6 rounded-2xl backdrop-blur-md border border-green-100 shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
            >
              {doubled.map((cat, index) => (
                <Link
                  key={index}
                  href={`/products?category=${cat.slug}`}
                  className="relative group flex flex-col bg-white/60 w-[180px] h-[150px] sm:w-[180px] sm:h-[190px] md:w-[220px] md:h-[210px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Categories;
