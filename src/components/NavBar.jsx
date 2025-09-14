import Image from "next/image";
import Link from "next/link";
import NavbarWrapper from "./NavbarWrapper";
import Logo from '../assets/logo.png'
export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={Logo }
            alt="Natura Logo"
            width={50}
            height={50}
            priority
          />
          <span className="text-xl font-bold text-green-800">NATURA.PK</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 font-medium hover:text-green-700 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu (Client-side logic in NavbarWrapper) */}
        <NavbarWrapper navLinks={navLinks} />
      </div>
    </nav>
  );
}
