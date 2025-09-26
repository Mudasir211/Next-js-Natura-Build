import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Oswald,Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const oswald = Oswald({
  subsets: ["latin"],
  weights: ["400", "500", "600", "700"], // pick what you need
  variable: "--font-oswald", // optional: for CSS variables
});


const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // pick what you need
  variable: "--font-outfit", // optional: for CSS variables
});

export const metadata = {
  title: "Natura.pk | Herbal & Organic Products for Natural Wellness",
  description:
    "Discover Natura.pk’s range of premium herbal and organic products. From hair oils to skincare and wellness remedies, we bring you natural solutions for a healthier, more beautiful life.",
  keywords: [
    "Natura.pk",
    "organic products Pakistan",
    "herbal products",
    "natural hair oil",
    "organic skincare",
    "herbal remedies",
    "wellness products",
    "natural beauty solutions",
  ],
   icons: {
    icon: [
      { url: "/favicon.ico" },       // classic ICO
      { url: "/favicon.png" }, // modern PNG fallback
    ], // favicon in /public
  },
  openGraph: {
    title: "Natura.pk | Herbal & Organic Products for Natural Wellness",
    description:
      "Shop herbal and organic wellness products in Pakistan — including hair oils, skincare, and natural remedies trusted nationwide.",
    url: "https://naturapk.store",
    siteName: "Natura.pk",
    images: [
      {
        url: "https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png",
        width: 1200,
        height: 630,
        alt: "Natura.pk Herbal & Organic Products",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natura.pk | Herbal & Organic Products",
    description:
      "Herbal oils, organic skincare, and wellness products — crafted with 100% natural ingredients at Natura.pk.",
    images: [
      "https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png",
    ],
  },
};


export default function RootLayout({ children }) {
  return (

    <ClerkProvider>
        
      <Toaster position="top-right" />
    <html className={`${oswald.variable} ${outfit.variable}`} lang="en">
      <body
        className={outfit.className}
      >
       
    <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
       
    
    </ClerkProvider>
  );
}
