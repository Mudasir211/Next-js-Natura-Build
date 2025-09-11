import Image from "next/image";
import Link from "next/link";
import NaturaHairOil from "../assets/NaturaHairOil.png";
import Moringa from "../assets/Moringa.jpeg";

export default function BestSellersComponent() {
  const products = [
    { id: 1, name: "Natura Hair Oil", price: "$19.99", img: NaturaHairOil },
    { id: 2, name: "Moringa Powder", price: "$12.99", img: Moringa },
       { id: 3, name: "Natura Hair Oil", price: "$19.99", img: NaturaHairOil },
    { id: 4, name: "Moringa Powder", price: "$12.99", img: Moringa },    { id: 88, name: "Natura Hair Oil", price: "$19.99", img: NaturaHairOil },
       { id: 99, name: "Natura Hair Oil", price: "$19.99", img: NaturaHairOil },
    
  ];

  return (
    <section className=" ">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-800">
          🌿 Bestsellers <div className="w-full flex justify-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 20"
                className="w-32 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 15 C50 -5, 150 25, 195 10" />
              </svg>
            </div>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our most loved herbal products, trusted by thousands of happy customers.
        </p>

        {/* Product Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-5">
                  {products.map((item) => (
                   <Link key={item.id} href={`product/${item.id}`}> <div
                      
                      
                      className="flex flex-col gap-2 text-sm break-all whitespace-normal cursor-pointer group"
                    >
                     <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
  <Image
    src={item.img}
    alt={item.name}
    fill
    className="object-cover transition-all duration-300 group-hover:scale-110"
  />
</div>

                      <div className=" flex flex-col gap-1 ">
                        <p>{item.name}</p>
                        <p className="font-bold">${item.price}</p>
                      </div>
                    </div></Link>
                  ))}
                </div>
      </div>
    </section>
  );
}
