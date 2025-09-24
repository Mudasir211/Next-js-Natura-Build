"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (e) => {
    const sort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (sort) params.set("sort", sort);
    else params.delete("sort");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 mb-6 justify-end">
      <ArrowUpDown className="w-4 h-4 text-gray-600" />
      <select
        className="border px-3 py-2 rounded-lg text-sm"
        value={currentSort}
        onChange={handleSortChange}
      >
        <option value="">Default</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>
    </div>
  );
}
