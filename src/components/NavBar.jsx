import Image from "next/image";
import Link from "next/link";
import NavbarWrapper from "./NavbarWrapper";
import Logo from "../assets/logo.png";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import CategoriesDropdown from "./CategoriesDropdown";

export default async function Navbar() {
  const user = await currentUser();

  // ✅ Fetch categories on server
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: "no-store", // or "force-cache" if categories rarely change
  });
  const categories = await res.json();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Cart", href: "/cart" },
    { name: "Your Orders", href: "/orders" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
    { name: "About Us", href: "/about" },
  ];

  if (user?.publicMetadata?.role === "admin") {
    navLinks.push({ name: "Admin Panel", href: "/admin" });
  }

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-3 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="Natura Logo" width={50} height={50} priority />
          <span className="text-xl font-bold text-green-800">NATURA.PK</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-center space-x-2">
              <Link
                href={link.href}
                className="text-gray-700 font-medium hover:text-green-700 transition"
              >
                {link.name}
              </Link>
              {link.name === "Your Orders" && (
                <CategoriesDropdown categories={categories} />
              )}
            </div>
          ))}
          {/* Clerk Auth */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition"
            >
              Sign In
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        <NavbarWrapper navLinks={navLinks} categories={categories} />
      </div>
    </nav>
  );
}
