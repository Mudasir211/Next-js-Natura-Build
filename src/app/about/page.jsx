import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Leaf, Heart, ShieldCheck } from "lucide-react";
import Logo from "../../assets/logo.png"; // adjust path if needed

export default function AboutPage() {
  return (
    <div className="bg-gray-50 py-14 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src={Logo}
            alt="Natura Logo"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to <span className="text-yellow-300">Natura</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Your trusted partner in natural, herbal, and organic products for a
            healthier lifestyle.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed max-w-4xl mx-auto text-gray-700">
          At <strong>Natura</strong>, we believe in the healing power of nature.
          Since our beginning, we’ve been committed to bringing high-quality,
          safe, and effective herbal products to our community. From{" "}
          <em>traditional remedies</em> to modern wellness solutions, we
          carefully source and craft each product to ensure the best for your
          health and beauty.
        </p>
      </section>

      {/* Our Products */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-10">
            Our Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Herbal Oils", desc: "Pure oils for hair & skin." },
              { title: "Organic Powders", desc: "Amla, Ashwagandha & more." },
              { title: "Wellness Supplements", desc: "Capsules & drops." },
              { title: "Skincare", desc: "Neem packs, natural shampoos." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-green-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          Our Mission & Vision
        </h2>
        <p className="text-lg leading-relaxed max-w-4xl mx-auto text-gray-700">
          Our mission is to revive the traditional wisdom of herbal remedies and
          make them accessible to modern lifestyles. We envision a healthier
          future where natural products replace chemical alternatives — helping
          communities thrive in balance with nature.
        </p>
      </section>

      {/* Why Choose Natura */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-10">
            Why Choose Natura?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center">
              <Leaf className="w-10 h-10 text-green-700 mb-3" />
              <h3 className="font-semibold text-lg">100% Natural</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Carefully sourced and chemical-free ingredients.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center">
              <Heart className="w-10 h-10 text-green-700 mb-3" />
              <h3 className="font-semibold text-lg">Loved by Customers</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Trusted by thousands of happy families across Pakistan.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-green-700 mb-3" />
              <h3 className="font-semibold text-lg">Safe & Certified</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Tested, certified, and safe for everyday use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Get in Touch</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          Have questions, feedback, or just want to say hello? We’d love to hear
          from you. Reach out anytime!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 text-lg">
          <a
            href="tel:+923057126897"
            className="flex items-center gap-2 text-green-700 hover:underline"
          >
            <Phone className="w-5 h-5" /> +92 305 7126897
          </a>
          <a
            href="mailto:natura.pk1999@gmail.com"
            className="flex items-center gap-2 text-green-700 hover:underline"
          >
            <Mail className="w-5 h-5" /> natura.pk1999@gmail.com
          </a>
          <a
            href="https://maps.app.goo.gl/AftUnzBL3XmzkX1CA"
            target="_blank"
            className="flex items-center gap-2 text-green-700 hover:underline"
          >
            <MapPin className="w-5 h-5" /> Meer Muktar Road, Bhalwal
          </a>
        </div>
      </section>
    </div>
  );
}
