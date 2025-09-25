// app/contact/page.jsx
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  User,
  AtSign,
  FileText,
  Send,
} from "lucide-react";
import Logo from "../../assets/logo.png";
import ContactForm from "@/components/ContactForm";

// Optional: SEO metadata (App Router)
// ✅ app/contact/page.jsx

// ✅ app/contact/page.jsx

// ✅ app/about/page.jsx

export const metadata = {
  title: "Contact Natura.pk | Herbal, Organic & Natural Wellness Products",
  description:
    "Discover Natura.pk, your trusted source for herbal, organic, and natural wellness products. Learn about our mission, vision, and commitment to a healthier lifestyle.",
  keywords: [
    "About Natura.pk",
    "Herbal products Pakistan",
    "Organic skincare",
    "Ayurvedic remedies",
    "Herbal oils",
    "Natural supplements",
    "Wellness products Pakistan",
  ],
  openGraph: {
    title: "About Natura.pk",
    description:
      "Learn about Natura.pk’s mission and vision — providing natural, herbal, and organic products for a healthier lifestyle.",
    url: "https://naturapk.store/about",
    siteName: "Natura.pk",
    images: [
      {
        url: "https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png", // ✅ your Cloudinary logo
        width: 800,
        height: 800,
        alt: "Natura.pk Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Natura.pk | Herbal, Organic & Wellness",
    description:
      "Natura.pk is Pakistan’s trusted partner for herbal, organic, and wellness products. Learn more about our values and mission.",
    images: [
      "https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png",
    ],
  },
};




export default function ContactPage() {
  return (
    <div className="bg-gray-50 py-14 text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-emerald-600" />
        <div className="absolute -right-24 -top-24 opacity-10 pointer-events-none">
          <Image src={Logo} alt="Natura" width={420} height={420} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 text-white">
          <p className="uppercase tracking-widest text-sm/6 opacity-90">
            We’d love to hear from you
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">
            Contact <span className="text-yellow-300">Natura</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Questions about our herbal oils, powders, supplements, or skincare?
            Reach out via phone, email, WhatsApp, or drop by our store.
          </p>

          {/* Quick actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/+923281598664"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-white text-green-700 px-5 py-2 font-medium shadow hover:shadow-md transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <a
              href="tel:+923281598664"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-5 py-2 font-medium shadow hover:bg-white/15 transition"
            >
              <Phone className="w-5 h-5" />
              Call: +92 328 1598664
            </a>
            <a
              href="mailto:natura.pk1999@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-5 py-2 font-medium shadow hover:bg-white/15 transition"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-7xl mt-10 mx-auto px-6 -mt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-700" />
              <h3 className="font-semibold text-lg">Phone</h3>
            </div>
            <p className="mt-2 text-gray-600">
              We’re available 10:00 AM – 8:00 PM
            </p>
            <a
              href="tel:+923057126897"
              className="mt-3 inline-block text-green-700 font-medium hover:underline"
            >
              +92 328 1598664
            </a>
          </div>

          <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-700" />
              <h3 className="font-semibold text-lg">Email</h3>
            </div>
            <p className="mt-2 text-gray-600">We reply within 24 hours.</p>
            <a
              href="mailto:natura.pk1999@gmail.com"
              className="mt-3 inline-block text-green-700 font-medium hover:underline"
            >
              natura.pk1999@gmail.com
            </a>
          </div>

          <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-700" />
              <h3 className="font-semibold text-lg">Store Hours</h3>
            </div>
            <p className="mt-2 text-gray-600">Mon–Sat: 10:00 AM – 8:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </section>

      {/* MAIN GRID: FORM + ADDRESS/MAP */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* CONTACT FORM (no logic, just markup) */}
          <div className="rounded-2xl bg-white shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-green-800">Send a Message</h2>
            <p className="mt-2 text-gray-600">
              Fill out the form and our support team will get back to you.
            </p>

           <ContactForm/>
          </div>

          {/* ADDRESS + MAP + SOCIALS */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-green-800">Visit Us</h2>
              <p className="mt-2 text-gray-600">
                Bhalwal, District Sargodha
              </p>

              <div className="mt-4 flex flex-col gap-2 text-gray-700">
                <a
                  href="https://maps.app.goo.gl/L58eKGw9SyPNJueG7"
                  target="_blank"
                  className="inline-flex items-center gap-2 hover:text-green-700"
                >
                  <MapPin className="w-5 h-5" />
                  Open in Google Maps
                </a>
                <a
                  href="tel:+923281598664"
                  className="inline-flex items-center gap-2 hover:text-green-700"
                >
                  <Phone className="w-5 h-5" />
                  +92 328 1598664
                </a>
                <a
                  href="mailto:natura.pk1999@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-green-700"
                >
                  <Mail className="w-5 h-5" />
                  natura.pk1999@gmail.com
                </a>
              </div>

              {/* Socials */}
              <div className="mt-6 flex gap-4">
                <a
                  href="https://www.facebook.com/thenatura.pk/"
                  target="_blank"
                  aria-label="Facebook"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-gray-50"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/thenatura.pk/?igsh=d2IwNWx5aXQxemxl#"
                  target="_blank"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-gray-50"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border">
              <iframe
                title="Natura Location"
                className="w-full h-72 md:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Meer%20Muktar%20Road%2C%20Bhalwal%2C%20Sargodha&output=embed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (no JS, native <details>) */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-green-800 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2">
            Quick answers about orders, shipping, and product authenticity.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Are your products 100% natural?",
                a: "Yes. We source herbs and ingredients carefully and avoid harsh chemicals, artificial colors, and parabens.",
              },
              {
                q: "How can I place a bulk or wholesale order?",
                a: "Use the form above with subject 'Wholesale', or email us at natura.pk1999@gmail.com with your requirements.",
              },
              {
                q: "Do you ship nationwide?",
                a: "Yes, we ship across Pakistan. Standard delivery is 2–5 business days depending on location.",
              },
              {
                q: "Are your products safe to use?",
                a: "Our products are Organic and 100% natural so they are totally safe to use. ",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group rounded-xl border p-5 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none font-semibold text-lg text-gray-800 flex items-center justify-between">
                  {item.q}
                  <span className="ml-4 text-green-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-green-700 text-white px-6 py-3 font-semibold hover:bg-green-800 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Natura",
            image: "https://your-domain.com/logo.jpg",
            telephone: "+92 328 1598664",
            email: "natura.pk1999@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "",
              addressLocality: "Bhalwal",
              addressRegion: "Sargodha",
              addressCountry: "PK",
            },
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "10:00", closes: "20:00" },
            ],
            sameAs: [
              "https://www.facebook.com/thenatura.pk/",
              "https://www.instagram.com/thenatura.pk/",
            ],
            url: "https://your-domain.com/contact",
          }),
        }}
      />
    </div>
  );
}
