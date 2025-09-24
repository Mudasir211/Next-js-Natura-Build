"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CategoriesDropdown({ mobile = false, onClick }) {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCats();
  }, []);

  // ✅ Close dropdown if user clicks outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (mobile) {
    // ✅ Mobile Expandable Categories
    return (
      <div className="w-full mt-3 ">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center py-2 text-gray-700 font-medium hover:text-green-700 transition"
        >
          Categories {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {open && (
          <ul className="pl-6 space-y-2">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  onClick={onClick}
                  className="block py-1 text-gray-600 hover:text-green-700 transition"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // ✅ Desktop Dropdown (only toggles on click, stays open until clicked outside)
  return (
    <div className="relative ml-5" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-gray-700 font-medium hover:text-green-700 transition"
      >
        Categories {open ? <ChevronUp size={16} /> : <ChevronDown size={16} className="ml-1" />}
      </button>
      {open && (
        <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-50">
          <ul className="py-2">
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  onClick={() => setOpen(false)} // ✅ closes dropdown on click
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
