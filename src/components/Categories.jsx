// app/components/Categories.jsx
import Image from "next/image"
import Link from "next/link"
import { Oswald } from "next/font/google"
import CategoriesCarousel from "./CategoriesCarousel"

const oswald = Oswald({ subsets: ["latin"], weight: "700" })

export default async function Categories() {
  // ✅ Fetch directly on the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: "no-store", // or "force-cache" / revalidate: 3600 if caching is fine
  })
  const categories = await res.json()
  const doubled = [...categories, ...categories, ...categories]

  return (
    <section className="relative pt-16 bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 overflow-hidden">
      {/* background pattern */}
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

        {/* Carousel Client Component */}
        <CategoriesCarousel categories={doubled} />
      </div>
    </section>
  )
}
