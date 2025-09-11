"use client";
import Image from "next/image";
import Link from "next/link";

/**
 * AutoCarousel
 * - Infinite, always-moving marquee-style carousel
 * - Responsive cards
 * - No dependencies (pure CSS keyframes)
 * - Pass your own items (title, desc, img)
 */
export default function AutoCarousel({ items, speed = 99 }) {
  // Duplicate items to create a seamless loop
  const loopItems = [...items, ...items];

  return (
    <section className="relative w-full py-6">
      {/* subtle edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-white to-transparent" />

      <div className="overflow-hidden">
        <div
          className="flex items-stretch gap-4 will-change-transform"
          style={{
            animation: `scrollX ${speed}s linear infinite`,
          }}
        >
          {loopItems.map((item, idx) => (
            <article
              key={idx}
              className="group shrink-0 w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* image area (16:10) — replace src with your images */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl">
                <Image
                  src={item.img || "/placeholder.jpg"}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 300px, 360px"
                  className="object-cover"
                  priority={idx < 6} // boost LCP on first row
                />
              </div>

              {/* text */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-5">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* local CSS keyframes (no Tailwind config needed) */}
      <style jsx>{`
        @keyframes scrollX {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
