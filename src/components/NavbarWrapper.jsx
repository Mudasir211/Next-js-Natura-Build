"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import CategoriesDropdown from "./CategoriesDropdown";

export default function NavbarWrapper({ navLinks,categories }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-green-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
{menuOpen && (
  <div
    className={`absolute top-14 transition-all delay-75 ease-in left-0 w-full bg-white shadow-lg lg:hidden`}
  >
    <ul className="flex flex-col space-y-4 px-6 py-4">
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className="block text-gray-700 font-medium hover:text-green-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>

          {/* Insert CategoriesDropdown right after "Products" */}
          {link.name === "Your Orders" && (
            <CategoriesDropdown mobile onClick={() => setMenuOpen(false)} categories={categories} />

          )}
        </li>
      ))}

      {/* Clerk Buttons for Mobile */}
      <li>
        <SignedOut>
          <Link
            href="/sign-in"
            className="block px-4 py-2 bg-green-700 text-white rounded-lg text-center shadow hover:bg-green-800 transition"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="flex justify-center">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "w-10 h-10 rounded-full border-2 border-green-600",
                  userButtonPopoverCard:
                    "shadow-lg rounded-xl border border-gray-200",
                  userButtonPopoverFooter: "hidden",
                },
                variables: {
                  colorPrimary: "#166534",
                  colorText: "#1f2937",
                  borderRadius: "0.75rem",
                },
              }}
            />
          </div>
        </SignedIn>
      </li>
    </ul>
  </div>
)}

    </>
  );
}
