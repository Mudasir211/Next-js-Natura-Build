"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";

export default function ProductFilters({ categories = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [bestseller, setBestseller] = useState(
    searchParams.get("bestseller") === "true"
  );
  const [isOpen, setIsOpen] = useState(false);

  const updateFilters = (newCategory, newBestseller) => {
    const params = new URLSearchParams();

    if (newCategory) params.set("category", newCategory);
    if (newBestseller) params.set("bestseller", "true");
    if (searchParams.get("sort")) params.set("sort", searchParams.get("sort"));

    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (slug) => {
    const newCategory = selectedCategory === slug ? "" : slug;
    setSelectedCategory(newCategory);
    updateFilters(newCategory, bestseller);
  };

  const handleBestsellerChange = () => {
    const newBestseller = !bestseller;
    setBestseller(newBestseller);
    updateFilters(selectedCategory, newBestseller);
  };

  const handleAllProducts = () => {
    setSelectedCategory("");
    setBestseller(false);
    router.push("/products");
  };

  return (
    <div>
      {/* Mobile Filter Button */}
      <button
        className="lg:hidden mb-4 px-4 py-2 bg-green-700 text-white rounded-lg flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Filter className="w-4 h-4" /> Categories
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-3/4 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-green-800">Filters</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-6">
              {/* All Products */}
              <button
                onClick={handleAllProducts}
                className="w-full text-left px-2 py-1 rounded hover:bg-green-50 font-semibold text-green-700"
              >
                All Products
              </button>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <ul className="space-y-2 text-gray-600">
                  {categories.map((cat) => (
                    <li key={cat._id}>
                      <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-green-50">
                        <input
                          type="checkbox"
                          className="accent-green-700"
                          checked={selectedCategory === cat.slug}
                          onChange={() => handleCategoryChange(cat.slug)}
                        />
                        {cat.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bestseller Filter */}
              <div>
                <h3 className="font-semibold mb-2">Bestsellers</h3>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-green-50">
                  <input
                    type="checkbox"
                    className="accent-green-700"
                    checked={bestseller}
                    onChange={handleBestsellerChange}
                  />
                  Show only bestsellers
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block bg-white p-6 rounded-2xl shadow-md space-y-8 w-64">
        <h2 className="text-xl font-semibold text-green-800">Filters</h2>

        {/* All Products */}
        <button
          onClick={handleAllProducts}
          className="w-full text-left px-2 py-1 rounded hover:bg-green-50 font-semibold text-green-700"
        >
          All Products
        </button>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-2">Categories</h3>
          <ul className="space-y-2 text-gray-600">
            {categories.map((cat) => (
              <li key={cat._id}>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-green-50">
                  <input
                    type="checkbox"
                    className="accent-green-700"
                    checked={selectedCategory === cat.slug}
                    onChange={() => handleCategoryChange(cat.slug)}
                  />
                  {cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Bestseller Filter */}
        <div>
          <h3 className="font-semibold mb-2">Bestsellers</h3>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-green-50">
            <input
              type="checkbox"
              className="accent-green-700"
              checked={bestseller}
              onChange={handleBestsellerChange}
            />
            Show only bestsellers
          </label>
        </div>
      </aside>
    </div>
  );
}
