import { Star } from "lucide-react";

export default function AverageStars({ averageRating = 4.6 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const full = i + 1 <= Math.floor(averageRating);
        const half = !full && i < averageRating && averageRating % 1 >= 0.5;

        return (
          <span key={i} className="relative w-6 h-6">
            {/* Base star (border/empty) */}
            <Star className="w-6 h-6 text-gray-300 stroke-gray-400" />

            {/* Full star overlay */}
            {full && (
              <Star className="w-6 h-6 fill-yellow-400 stroke-yellow-600 absolute top-0 left-0" />
            )}

            {/* Half star overlay (clip left side) */}
            {half && (
              <Star
                className="w-6 h-6 fill-yellow-400 stroke-yellow-600 absolute top-0 left-0"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
