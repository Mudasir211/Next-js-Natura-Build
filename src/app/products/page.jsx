"use client";

import { useState } from "react";
import { Filter, ArrowUpDown } from "lucide-react";
import Image from "next/image";

const products = [
  { id: 1, name: "Natura Hair Oil", price: 19.99, img: "/products/oil.png" },
  { id: 2, name: "Organic Amla Powder", price: 12.99, img: "/products/amla.png" },
  { id: 3, name: "Herbal Green Tea", price: 9.99, img: "/products/tea.png" },
  { id: 4, name: "Black Seed Capsules", price: 15.99, img: "/products/capsules.png" },
  { id: 5, name: "Neem Face Pack", price: 11.49, img: "/products/neem.png" },
  { id: 6, name: "Tulsi Immunity Drops", price: 14.99, img: "/products/tulsi.png" },
  { id: 7, name: "Herbal Shampoo", price: 18.99, img: "/products/shampoo.png" },
  { id: 8, name: "Ashwagandha Powder", price: 16.49, img: "/products/ashwagandha.png" },
];

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <div className="bg-[#016630] text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our Products</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
          Explore Natura’s premium herbal collection, crafted with natural ingredients for a healthy lifestyle.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block bg-white p-6 rounded-2xl shadow-md space-y-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-[#016630]">
            <Filter className="w-5 h-5" /> Filters
          </h2>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-gray-600">
              <li><input type="checkbox" className="mr-2" /> Hair Care</li>
              <li><input type="checkbox" className="mr-2" /> Skin Care</li>
              <li><input type="checkbox" className="mr-2" /> Herbal Powders</li>
              <li><input type="checkbox" className="mr-2" /> Supplements</li>
              <li><input type="checkbox" className="mr-2" /> Beverages</li>
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <input type="range" min="0" max="50" className="w-full" />
            <p className="text-sm text-gray-500 mt-2">Up to $50</p>
          </div>
        </aside>

        {/* Product Grid Section */}
        <div className="lg:col-span-3">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            {/* Mobile Filter Button */}
            <button
              className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-600" />
              <select className="border px-3 py-2 rounded-lg text-sm focus:outline-none">
                <option>Sort by</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Best Selling</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer group"
              >
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="object-contain transition-transform duration-300 group-hover:scale-105 mx-auto"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-[#016630] font-bold mt-1">${item.price}</p>
                  <button className="mt-3 w-full bg-[#016630] text-white py-2 rounded-lg hover:bg-green-700 transition">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-3/4 bg-white p-6 overflow-y-auto">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#016630] mb-6">
              <Filter className="w-5 h-5" /> Filters
            </h2>
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><input type="checkbox" className="mr-2" /> Hair Care</li>
                  <li><input type="checkbox" className="mr-2" /> Skin Care</li>
                  <li><input type="checkbox" className="mr-2" /> Herbal Powders</li>
                  <li><input type="checkbox" className="mr-2" /> Supplements</li>
                  <li><input type="checkbox" className="mr-2" /> Beverages</li>
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <input type="range" min="0" max="50" className="w-full" />
                <p className="text-sm text-gray-500 mt-2">Up to $50</p>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-[#016630] text-white py-3 rounded-lg hover:bg-green-700 transition"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
