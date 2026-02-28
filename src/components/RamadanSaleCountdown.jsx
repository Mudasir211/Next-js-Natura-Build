"use client";
import { useEffect, useState } from "react";

export default function RamadanSaleCountdown() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  // Sale end date (18 March 2026, 23:59)
  const saleEndDate = new Date("2026-03-18T23:59:00");

  useEffect(() => {
    // Show banner 2 seconds after first render
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    // Countdown timer
    const countdown = setInterval(() => {
      const now = new Date();
      const diff = saleEndDate - now;

      if (diff <= 0) {
        setTimeLeft("Sale ended");
        clearInterval(countdown);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(countdown);
    };
  }, []);

  return (
    <section
      className={`z-40 w-full transition-all mb-4 duration-700 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
    >
      <div className="animated-red-gradient relative overflow-hidden py-1.5 text-center text-white shadow-2xl">
        {/* Soft Glow Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3  md:space-y-0">
          {/* Heading */}
          <h2 className="font-extrabold tracking-wide text-sm ">
            🌙 Ramadan Mubarak Sale
          </h2>

          {/* Countdown */}
          <p className="text-xs md:text-sm opacity-90">
            Sale ends in: <span className="font-semibold">{timeLeft}</span>
          </p>

          {/* Discount Badge */}
          <div className="inline-block [word-spacing:0.10rem] bg-white text-green-600 font-semibold text-xs px-4 py-1 rounded shadow-xl">
            20% OFF ON ALL PRODUCTS
          </div>
        </div>
      </div>
    </section>
  );
}