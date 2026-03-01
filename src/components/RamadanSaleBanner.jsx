"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RamadanSaleBanner() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();


  const shouldShow = pathname === "/" || pathname === "/products";
  useEffect(() => {
      if (!shouldShow) return; // Do not show on other pages

    // Show after 2 seconds on first render
    

    // Then keep toggling (come & go)
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 5000); // every 5 seconds

    return () => {
    
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      className={`absolute top-14 md:top-16 z-40 w-full transition-all duration-700 ease-in-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
    >
      <div className="animated-red-gradient relative overflow-hidden py-1.5 text-center text-white shadow-2xl">
        
        {/* Soft Glow Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        <div className="relative space-y-1 z-10">
          {/* Heading */}
          <h2 className="font-extrabold tracking-wide text-sm md:text-base">
            🌙 Ramadan Mubarak Sale
          </h2>

          {/* Subtitle */}
          <p className="text-xs md:text-sm opacity-90">
            Blessings, Joy & Exclusive Savings This Ramadan
          </p>

          {/* Discount Badge */}
          <div className="inline-block [word-spacing:0.10rem] w-full bg-white text-green-600 font-semibold text-xs px-5 py-1 shadow-xl">
            20% OFF ON ALL PRODUCTS
          </div>
        </div>
      </div>
    </section>
  );
}