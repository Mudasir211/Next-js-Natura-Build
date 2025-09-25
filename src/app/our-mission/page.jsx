import Image from "next/image";
import { Leaf, Heart, Globe } from "lucide-react";
import Logo from "../../assets/logo.png";

export const metadata = {
  title: "Our Mission | Natura — Herbal, Organic & Wellness Products",
  description: "Discover Natura's mission and vision for providing natural, herbal, and organic products to promote health and wellness.",
};

export default function OurMissionPage() {
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
            Our <span className="text-yellow-300">Mission & Vision</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Guiding every product we craft, Natura is dedicated to health, wellness, and sustainability.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl font-bold text-green-800">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          To revive the traditional wisdom of herbal remedies, craft natural and safe products, and make wellness accessible for every household.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
          <div className="p-6 bg-green-50 rounded-2xl shadow flex flex-col items-center">
            <Leaf className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="font-semibold text-lg">Natural</h3>
            <p className="text-gray-600 mt-2 text-sm">
              100% herbal, organic, and chemical-free products.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow flex flex-col items-center">
            <Heart className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="font-semibold text-lg">Trusted</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Loved by families across Pakistan for quality and care.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow flex flex-col items-center">
            <Globe className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="font-semibold text-lg">Sustainable</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Promoting eco-friendly practices and mindful sourcing.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800">Our Vision</h2>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          To create a healthier future where natural products are a staple in everyday life — reducing dependency on chemicals, promoting wellness, and keeping communities in harmony with nature.
        </p>
      </section>
    </div>
  );
}
