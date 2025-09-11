import Link from "next/link";
import Logo from "../assets/logo.png";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Facebook,
  Instagram,
  Info,
  Headphones,
  Newspaper,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#016630] border-gray-400 border-t text-white">
      {/* Logo */}
      <div className="flex items-center md:justify-start md:px-6 justify-center p-6 bg-white">
        <Image alt="Natura Logo" src={Logo} width={110} height={110} />
      </div>

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Contact Us */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-5">
            <Phone className="w-5 h-5" /> Contact Us
          </h2>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 mt-1" />
              <Link
                href="https://maps.app.goo.gl/L58eKGw9SyPNJueG7"
                target="_blank"
                className="hover:text-green-300"
              >
                Meer Muktar Road, Bhalwal, Dist Sargodha
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              10:00 AM – 8:00 PM (Sunday Closed)
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <a href="tel:+923057126897" className="hover:text-green-300">
                +92 305 7126897
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <a
                href="mailto:natura.pk1999@gmail.com"
                className="hover:text-green-300"
              >
                natura.pk1999@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <a
                href="https://wa.me/923057126897"
                target="_blank"
                className="hover:text-green-300"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-5">
            <Headphones className="w-5 h-5" /> Customer Support
          </h2>
          <ul className="space-y-3 text-base">
            <li>
              <Link href="/pages/contact" className="hover:text-green-300">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/pages/privacy-policy" className="hover:text-green-300">
                Privacy & Policy
              </Link>
            </li>
            <li>
              <Link
                href="/pages/returns-exchanges"
                className="hover:text-green-300"
              >
                Return & Exchange
              </Link>
            </li>
            <li>
              <Link href="/pages/delivery-orders" className="hover:text-green-300">
                Delivery & Orders
              </Link>
            </li>
            <li>
              <Link
                href="/pages/cancellation-policy"
                className="hover:text-green-300"
              >
                Order Cancellation
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-5">
            <Info className="w-5 h-5" /> About Us
          </h2>
          <ul className="space-y-3 text-base">
            <li>
              <Link href="/pages/about-us" className="hover:text-green-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/pages/our-mission" className="hover:text-green-300">
                Our Mission
              </Link>
            </li>
            <li>
              <Link href="/pages/map" className="hover:text-green-300">
                Location Map
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-5">
            <Newspaper className="w-5 h-5" /> Newsletter
          </h2>
          <p className="text-base mb-4 opacity-90">
            Stay updated with exclusive offers, new arrivals, and insider-only deals!
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="w-full px-4 py-2 rounded-md text-black text-base bg-white border focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md text-base font-medium"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300">
          <p>© 2025 Natura. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a
              href="https://www.facebook.com/thenatura.pk/"
              target="_blank"
              className="hover:text-green-300 flex items-center gap-2"
            >
              <Facebook className="w-5 h-5" /> Facebook
            </a>
            <a
              href="https://www.instagram.com/thenatura.pk/?igsh=d2IwNWx5aXQxemxl#"
              target="_blank"
              className="hover:text-green-300 flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" /> Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
