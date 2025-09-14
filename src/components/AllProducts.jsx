import Image from "next/image";
import Link from "next/link";
import NaturaHairOil from "../assets/NaturaHairOil.png";
import Moringa from "../assets/Moringa.jpeg";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });
export default function AllProducts() {
  const products = [
    { id: 1, name: "Natura Hair Oil", price: "19.99", img: NaturaHairOil },
    { id: 2, name: "Moringa Powder", price: "12.99", img: Moringa },
    { id: 3, name: "Natura Hair Oil", price: "19.99", img: NaturaHairOil },
    { id: 4, name: "Moringa Powder", price: "12.99", img: Moringa },
    { id: 88, name: "Natura Hair Oil", price: "19.99", img: NaturaHairOil },
    { id: 99, name: "Natura Hair Oil", price: "19.99", img: NaturaHairOil },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
        {/* Section Title */}
        <h2 className={`text-3xl -skew-x-10 md:text-4xl ${oswald.className} font-bold text-green-800`
        }>
         All Products
          
        </h2>
        <p className="text-gray-600 font-bold max-w-2xl mx-auto">
          Explore our full range of{" "}
          <span className="text-green-700 font-medium">
            herbal and natural products
          </span>{" "}
          — carefully crafted to support your health & well-being.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-10">
          {products.map((item) => (
            <Link key={item.id} href={`product/${item.id}`}>
              <div className="flex flex-col gap-3 text-sm cursor-pointer group rounded-xl p-3 bg-white shadow-sm hover:shadow-lg transition duration-300 border border-green-100">
                {/* Product Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                    New
                  </span>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-1 text-left">
                  <p className="font-medium text-green-900 group-hover:text-green-700">
                    {item.name}
                  </p>
                  <p className="font-bold text-green-700">${item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
