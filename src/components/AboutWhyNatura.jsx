import Image from "next/image";
import Link from "next/link";
import img from '../assets/image1.jpeg'
import img2 from '../assets/image2.webp'
import About from '../assets/about.png'
import heartbeat from '../assets/heartbeat.webp'
import planetearth from '../assets/planet-earth.webp'
import foodstore from '../assets/food-store.webp'
import percent from '../assets/100-percent.webp'
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });

export default function AboutWhyNatura() {
  return (
    <div className="">
      {/* About Us Section */}
     <section className="bg-white pb-12">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Imagery (goes first on mobile) */}
    <div className="flex justify-center relative order-1 md:order-2">
      <Image
        src={About}
        alt="About Natura"
        width={560}
        height={400}
        className="rounded-lg shadow-lg object-cover"
      />
      {/* Decorative Accent */}
      <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-green-100 rounded-full -z-10" />
    </div>

    {/* Text (second on mobile, first on desktop) */}
    <div className="space-y-6 order-2 md:order-1">
      <h2 className={`text-4xl font-extrabold text-green-800 ${oswald.className}`}>
        About <span className="text-green-600">Natura</span>
      </h2>

      <p className="text-gray-700 text-lg leading-relaxed">
        At Natura, we believe true wellness comes from the earth. Since our
        beginnings, we have been committed to crafting herbal and organic
        solutions that respect both people and the planet. Every product is
        created with transparency, purity, and sustainability at its core —
        ensuring you receive nothing but the best nature has to offer.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-green-800">Our Mission</h4>
          <p className="text-sm text-gray-600 mt-1">
            To enrich lives with natural, safe, and effective wellness products
            that empower healthier lifestyles.
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-green-800">Our Vision</h4>
          <p className="text-sm text-gray-600 mt-1">
            To be a global leader in holistic wellness, driven by sustainability
            and ethical sourcing.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
     {/* Quick Stats */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
  <div className="bg-white rounded-lg shadow-sm p-4 text-center">
    <div className="text-2xl font-bold text-green-700">25+</div>
    <div className="text-xs text-gray-500">Years of Trust</div>
  </div>
  <div className="bg-white rounded-lg shadow-sm p-4 text-center">
    <div className="text-2xl font-bold text-green-700">120+</div>
    <div className="text-xs text-gray-500">Herbal Products</div>
  </div>
  <div className="bg-white rounded-lg shadow-sm p-4 text-center">
    <div className="text-2xl font-bold text-green-700">10K+</div>
    <div className="text-xs text-gray-500">Happy Customers</div>
  </div>
  <div className="bg-white rounded-lg shadow-sm p-4 text-center">
    <div className="text-2xl font-bold text-green-700">80%</div>
    <div className="text-xs text-gray-500">Eco Packaging</div>
  </div>
</div>


      {/* CTA */}
      <div className="flex px-1 gap-4 mt-6">
        <Link
          href="/about"
          className="bg-green-700 text-white px-5 py-2 rounded-md font-medium hover:bg-green-800 transition"
        >
          Learn More
        </Link>
        <Link
          href="/products"
          className="border border-green-700 text-green-700 px-5 py-2 rounded-md hover:bg-green-50 transition"
        >
          Explore Products
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* Why Choose Us Section */}
      <section className="bg-gray-50 border-b md:mx-10 border-green-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Images */}
          {/* Left Images */}
{/* Left Images */}
<div className=" flex-col hidden md:flex sm:flex-row gap-6 justify-center">
  <Image
    src={img}
    alt="Why Choose Natura 1"
    width={280}
    height={350}
    className="rounded-xl shadow-md object-cover sm:-translate-y-6" // 👈 shifted upward
  />
  <Image
    src={img2}
    alt="Why Choose Natura 2"
    width={280}
    height={350}
    className="rounded-xl shadow-md object-cover sm:translate-y-6" // 👈 shifted downward
  />
</div>



          {/* Right Content */}
          <div className="text-center md:text-left space-y-10">
            <div>
              <h2 className={`text-3xl font-bold text-green-800 ${oswald.className}`}>
                Why Choose <span className="text-green-600">Natura?</span>
              </h2>
              <p className="mt-4 text-gray-600">
                We provide high-quality, sustainable products with a
                customer-first approach, ensuring your health and satisfaction
                are our top priorities.
              </p>
            </div>

           <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
  {[
    {
      title: "Sustainable & Ethical",
      desc: "Ethically sourced ingredients with a commitment to sustainability.",
      img: planetearth,
    },
    {
      title: "Wellness Focused",
      desc: "Harnessing the power of nature for your everyday health and vitality.",
      img: heartbeat,
    },
    {
      title: "Wide Product Range",
      desc: "Explore a variety of curated wellness essentials for body and mind.",
      img: foodstore,
    },
    {
      title: "Premium Ingredients",
      desc: "Only the finest herbal ingredients go into our products.",
      img: percent,
    },
  ].map((item, idx) => (
    <div
      key={idx}
      className="bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition text-center"
    >
      <div className="flex justify-center mb-3">
        <Image src={item.img} alt={item.title} width={40} height={40} />
      </div>
      <h3 className="text-sm font-semibold text-green-700">{item.title}</h3>
      <p className="mt-1 text-gray-600 text-xs leading-snug">{item.desc}</p>
    </div>
  ))}
</div>


            <Link
              href="/products"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
