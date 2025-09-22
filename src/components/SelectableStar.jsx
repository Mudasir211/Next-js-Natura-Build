import { Star } from "lucide-react";

export function SelectableStar({ filled, onClick, size = 28 }) {
  return (
    <span
      onClick={onClick}
      className="relative cursor-pointer"
      style={{ width: size, height: size }}
    >
      {/* Base star (empty) */}
      <Star className="w-full h-full text-gray-300 stroke-gray-400" />
      {/* Filled star overlay */}
      {filled && (
        <Star className="w-full h-full fill-yellow-400 stroke-yellow-600 absolute top-0 left-0" />
      )}
    </span>
  );
}
