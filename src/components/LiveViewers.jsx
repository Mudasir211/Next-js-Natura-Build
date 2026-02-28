"use client";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function LiveViewers({ min = 1, max = 30, interval = 4000 }) {
  // Random initial viewers between 5 and 15
  const getRandomInitial = () => Math.floor(Math.random() * (15 - 5 + 1)) + 5;

  const [viewers, setViewers] = useState(getRandomInitial);

  useEffect(() => {
    const timer = setInterval(() => {
      // Randomly increase or decrease viewers
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, +1

      setViewers((prev) => {
        let next = prev + change;
        if (next < min) next = min;
        if (next > max) next = max;
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [min, max, interval]);

  return (
    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 my-4 rounded-lg text-sm font-medium flex items-center justify-center mb-4">
    <Eye className="mx-1"/> {viewers} {viewers === 1 ? "person" : "people"} are viewing this product right now
    </div>
  );
}