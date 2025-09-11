"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import rev1 from "../assets/rev1.jpeg";
import rev2 from "../assets/rev2.jpeg";
import rev3 from "../assets/rev3.jpeg";
import rev4 from "../assets/rev4.jpeg";
import rev5 from "../assets/rev5.jpeg";
import rev6 from "../assets/rev6.jpeg";

export default function StoryReviews() {
  const reviews = [
    {
      src: rev1,
      author: "Aisha K.",
      rating: 5,
      excerpt:
        "My hairline seriously improved in 3 weeks. Packaging was neat and arrived fast!",
    },
    {
      src: rev2,
      author: "Bilal R.",
      rating: 5,
      excerpt:
        "Natura's customer service helped me choose the right size. Product smells natural and works.",
    },
    {
      src: rev3,
      author: "Sara M.",
      rating: 4,
      excerpt:
        "Reduced my dandruff within 2 uses. Highly recommend for sensitive scalps.",
    },
    {
      src: rev4,
      author: "Omar N.",
      rating: 5,
      excerpt:
        "Great value. Real herbal ingredients—no harsh chemicals as advertised.",
    },
    {
      src: rev5,
      author: "Fatima S.",
      rating: 5,
      excerpt:
        "Ordered 2 bottles, both arrived quickly. My family has been using it daily.",
    },
    {
      src: rev6,
      author: "Hassan A.",
      rating: 4,
      excerpt:
        "Effective oil. Slight scent but nothing overpowering—results are promising.",
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800">
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
