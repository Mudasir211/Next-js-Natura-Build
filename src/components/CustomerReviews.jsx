"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });
export default function StoryReviews() {
  const reviews = [
    {
      src: '/rev1.jpeg',
      author: "Rizwan Ali.",
      rating: 5,
      excerpt:
        "Ma abhi tak 2 bottle use kar chuka hon This product is literally magical Meri hair line bhot khrab hogai thi or Literally meri regrowth start hoi or ab meri hair line bhot achi hogai 100 percent recommend Sukriya to you guys Allah kush rkha.",
    },
    {
      src: '/rev2.jpeg',
      author: "Rizwan Ali.",
      rating: 5,
      excerpt:
        "",
    },
    {
      src: '/rev3.jpeg',
      author: "Sara Ali.",
      rating: 5,
      excerpt:
        "Its been a wonderful experience, i will order again soon, as its finishing already. My kids hair were really frizzy, and at front head hair were less, but now mashaa Allah it's growing so quick and looks more beautiful silky and shiny. I will share the photos too.",
    },
    {
      src: '/rev4.jpeg',
      author: "Omar N.",
      rating: 5,
      excerpt:
        "I used half of the bottle Brother Aresults bhot acha Iga impressing 4 5 bar use krna se baal bikul silky hogai lak dost ko bi recommend kia woh bi ap se order kra ga Love this product.",
    },
    {
      src: '/rev5.jpeg',
      author: "Ehtisham Malik.",
      rating: 5,
      excerpt:
        "Mana abhi 4 5 bar use kia Or 5 wash ma hi baal bikul maza dar hogai Bhot fizzy or dry tha Density bi zada Igrhi ha Ap ko pta hna mera balo ki density zada ki vja se rough lagta tha Ikin is se bikul silky hogai Ya khtam ho la phir in sha allah 2 or manvani Apna dost ka liya bi",
    },
    {
      src: '/rev6.jpeg',
      author: "Hassan A.",
      rating: 5,
      excerpt:
        "",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const intervalTime = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
      setExpanded(false);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const Stars = ({ n = 5 }) => (
    <div className="flex items-center space-x-1 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
          className={i < n ? "text-yellow-400" : "text-gray-300"}
        >
          <path
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 .587l3.668 7.431 8.2 1.19-5.934 5.787 1.402 8.173L12 18.897l-7.336 3.858 1.402-8.173L.132 9.208l8.2-1.19z"
          />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="w-full px-5 md:px-8">
      {/* Heading + Intro */}
      <div className="w-full text-center space-y-6 px-4 md:px-0">
        <h2 className={`text-3xl md:text-4xl font-extrabold text-green-800 ${oswald.className}`}>
          Real Feedback • Real Results
        </h2>

        <div className="max-w-3xl mx-auto text-left text-gray-700">
          <p className="mb-3">
            These are unfiltered screenshots from our customers — WhatsApp messages,
            Instagram comments, and order follow-ups. We share actual screenshots
            so you can evaluate product performance, packaging, and delivery
            reliability for yourself.
          </p>

          <p className="mb-3">What you’ll commonly see in these reviews:</p>

          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
            <li>
              <strong>Product effectiveness:</strong> reports on hair growth,
              scalp health, skin improvements.
            </li>
            <li>
              <strong>Packaging & delivery:</strong> timely, secure shipping and
              eco-friendly wrapping.
            </li>
            <li>
              <strong>Customer support:</strong> help choosing the right product
              and quick responses.
            </li>
          </ul>

          <p className="mt-3 text-sm text-gray-600">
            We verify reviews where possible — if you'd like to submit your own
            experience, tap “Leave a Review” below.
          </p>
        </div>
      </div>

      {/* Slideshow */}
      <div className="relative w-full h-[80vh] sm:h-[85vh] overflow-hidden mt-8">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src={review.src}
              alt={`Review background by ${review.author}`}
              fill
              className="object-cover"
              priority={i === current}
            />
            <div className="absolute inset-0 backdrop-blur-md bg-black/10" />

            <div className="relative w-full h-full flex items-center justify-center px-4">
              <div className="relative w-[95%] sm:w-[80%] lg:w-[70%] h-full">
                <Image
                  src={review.src}
                  alt={`Customer review screenshot`}
                  fill
                  className="object-contain drop-shadow-xl"
                  priority={i === current}
                />

                {/* Review Card */}
                <div
                  onClick={() => setExpanded((prev) => !prev)}
                  className="cursor-pointer absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-12 w-[92%] sm:w-2/3 bg-white/85 backdrop-blur-sm border border-green-100 rounded-xl px-4 py-3 shadow-md flex flex-col gap-2 z-20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                        {review.author.split(" ")[0].charAt(0)}
                      </div>
                      <div className="text-sm font-semibold text-green-800">
                        {review.author}
                      </div>
                    </div>
                    <Stars n={review.rating} />
                  </div>

                  {expanded && (
                    <p className="text-sm text-gray-700 mt-1">
                      {review.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Progress Bars */}
        <div className="absolute top-5 left-0 right-0 flex gap-2 px-6 z-30">
          {reviews.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 bg-green-200 overflow-hidden rounded-full"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: i === current ? "100%" : i < current ? "100%" : "0%",
                }}
                transition={{ duration: intervalTime / 1000, ease: "linear" }}
                className="h-full bg-gradient-to-r from-green-600 to-emerald-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto text-xs text-gray-500 mt-6 px-4 md:px-0">
        <p>
          Note: screenshots are shared with customer consent when possible. We
          redact sensitive details and only publish authentic feedback.
        </p>
      </div>
    </section>
  );
}
