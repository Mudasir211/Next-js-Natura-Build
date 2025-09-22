// components/ReviewSummary.jsx
"use client";
import AverageStars from "./AverageStars";

export default function ReviewSummary({ ratings = [], averageRating = 0, onWriteReview }) {
  const totalReviews = ratings.length;

  // Count how many ratings of each from 1-5
  const ratingCounts = Array(5).fill(0);
  ratings.forEach(({ rating }) => {
    if (rating >= 1 && rating <= 5) ratingCounts[rating - 1]++;
  });

  return (
    <div className="w-full flex flex-col gap-5 items-cen mb-6 px-4">
      <div className="flex flex-col mt-4 md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
        {/* Left: Average rating + total */}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-green-800">
            {averageRating.toFixed(2)}
          </span>
          <AverageStars averageRating={averageRating} size={24} />
          <span className="text-sm text-gray-600">
            out of 5
          </span>
        </div>

        {/* Middle: total reviews */}
        <div className="text-sm text-gray-600">
          Based on {totalReviews} reviews
        </div>

        {/* Right: Write a Review Button */}
        
      </div>

      {/* Rating breakdown */}
      <div className="mt-4 space-y-2 md:mt-6">
        {ratingCounts
          .slice()
          .reverse()
          .map((count, idx) => {
            const starLevel = 5 - idx;
            const percent = totalReviews ? (count / totalReviews) * 100 : 0;
            return (
              <div key={starLevel} className="flex items-center gap-2">
                <span className="w-12 text-sm text-gray-700">{starLevel}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 text-xs text-gray-700 text-right">{count}</span>
              </div>
            );
          })}
      </div>

      
    </div>
  );
}
