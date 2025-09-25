import Image from "next/image";
import { ShieldCheck, Leaf, Heart } from "lucide-react";
import Logo from "../../assets/logo.png";

export const metadata = {
  title: "Privacy Policy | Natura — Herbal, Organic & Wellness Products",
  description: "Learn how Natura collects, uses, and protects your information while you shop for natural and organic products.",
};

export default function PrivacyPolicyPage() {
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
            Privacy <span className="text-yellow-300">Policy</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Your trust matters. Here's how we protect your personal information when you shop with Natura.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Our Commitment</h2>
        <p className="text-lg leading-relaxed max-w-4xl mx-auto text-gray-700">
          At <strong>Natura</strong>, your privacy is our priority. We collect only the information necessary to provide you with the best service, and we never share your personal data with third parties without consent.
        </p>
      </section>

      {/* Key Privacy Points */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-10">Key Points</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-green-700 mb-3" />
              <h3 className="font-semibold text-lg">Secure Data</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Your personal and payment information is encrypted and safe.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center">
              <Leaf className="w-10 h-10 text-green-700 mb-3" />
              <h3 className="font-semibold text-lg">Minimal Collection</h3>
              <p className="text-gray-600 mt-2 text-sm">
                We only collect what is necessary to fulfill orders and improve your experience.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center">
              <Heart className="w-10 h-10 text-green-700 mb-3" />
              <h3 className="font-semibold text-lg">Your Consent</h3>
              <p className="text-gray-600 mt-2 text-sm">
                We never share your data without your explicit permission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-16 max-w-5xl mx-auto px-6 space-y-6">
        <h2 className="text-2xl font-bold text-green-800">Information We Collect</h2>
        <p className="text-gray-700">
          We may collect your name, email, phone number, shipping address, and order history. This helps us process orders, provide customer support, and improve your shopping experience.
        </p>

        <h2 className="text-2xl font-bold text-green-800">How We Use Your Data</h2>
        <p className="text-gray-700">
          Your information is used to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Process and deliver your orders</li>
          <li>Provide customer service and support</li>
          <li>Send promotional updates if you opt-in</li>
          <li>Enhance and personalize your shopping experience</li>
        </ul>

        <h2 className="text-2xl font-bold text-green-800">Cookies & Tracking</h2>
        <p className="text-gray-700">
          Our website uses cookies to improve performance, remember your preferences, and understand user trends. You can manage cookies via your browser settings.
        </p>

        <h2 className="text-2xl font-bold text-green-800">Third-Party Services</h2>
        <p className="text-gray-700">
          We may work with trusted third-party services for payment processing and email notifications. These partners only access the data needed to perform their functions.
        </p>

        <h2 className="text-2xl font-bold text-green-800">Your Rights</h2>
        <p className="text-gray-700">
          You can request access, correction, or deletion of your personal data by contacting us at <a href="mailto:natura.pk1999@gmail.com" className="text-green-700 underline">natura.pk1999@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}
