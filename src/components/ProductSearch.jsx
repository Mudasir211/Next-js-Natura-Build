"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (query) params.set("search", query);
    else params.delete("search");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex justify-center lg:justify-start"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
      >
        Search
      </button>
    </form>
  );
}
