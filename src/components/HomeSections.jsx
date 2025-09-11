import Image from "next/image";
import { Leaf, ShieldCheck, Sparkles, Heart } from "lucide-react";
import About from '../assets/about.png'
import AboutWhyNatura from "./AboutWhyNatura";
import CustomerReviews from "./CustomerReviews";
import LatestHighlights from "./LatestHighlights";
export default function HomeSections() {
  return (
    <div className="space-y-20">

<AboutWhyNatura/>        
      <CustomerReviews/>
<LatestHighlights/>
      {/* Customer Reviews
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#016630]">
            Customer <span className="text-green-700">Reviews</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ayesha K.", review: "The Natura Hair Oil transformed my hair! Softer, shinier, and healthier in just weeks." },
              { name: "Ali R.", review: "I love their herbal teas – refreshing and calming. A must-have for everyday wellness." },
              { name: "Sara M.", review: "Natura’s neem pack worked wonders for my skin. Clearer, brighter, and smoother!" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-left">
                <p className="text-gray-600 italic">"{item.review}"</p>
                <h4 className="mt-4 font-semibold text-[#016630]">– {item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Our Latest Highlights
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#016630]">
            Our Latest <span className="text-green-700">Highlights</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "/highlights1.jpg", title: "New Herbal Shampoo", desc: "A natural shampoo that strengthens and nourishes your hair." },
              { img: "/highlights2.jpg", title: "Ashwagandha Power", desc: "Boost your immunity and energy with our pure ashwagandha powder." },
              { img: "/highlights3.jpg", title: "Green Tea Collection", desc: "Detoxify and refresh with our premium herbal teas." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="p-6 text-left space-y-3">
                  <h3 className="font-semibold text-lg text-[#016630]">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                  <button className="text-green-700 font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
