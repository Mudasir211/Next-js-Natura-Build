"use client";
import { Star } from "lucide-react";

export default function AverageStars({ averageRating = 0, size = 24 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const full = i + 1 <= Math.floor(averageRating);
        const half = !full && i < averageRating && averageRating % 1 >= 0.5;

        return (
          <span key={i} className="relative" style={{ width: size, height: size }}>
            {/* Base star (empty) */}
            <Star
              className="text-gray-300 stroke-gray-400"
              style={{ width: size, height: size }}
            />

            {/* Full star */}
            {full && (
              <Star
                className="fill-yellow-400 stroke-yellow-600 absolute top-0 left-0"
                style={{ width: size, height: size }}
              />
            )}

            {/* Half star */}
            {half && (
              <Star
                className="fill-yellow-400 stroke-yellow-600 absolute top-0 left-0"
                style={{
                  width: size,
                  height: size,
                  clipPath: "inset(0 50% 0 0)",
                }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
