import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });

// ✅ Server component fetch
async function getBestsellers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?bestseller=true`,
    {
      cache: "no-store", // always fresh data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bestsellers");
  }

  return res.json();
}

export default async function BestSellersComponent() {
  const products = await getBestsellers();

  return (
    <section className="py-10 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
        {/* Section Title */}
        <h2
          className={`text-3xl md:text-4xl ${oswald.className} -skew-x-16 font-bold text-green-800`}
        >
          Bestsellers
        </h2>
        <p className="text-gray-600 font-bold max-w-2xl mx-auto">
          Discover our{" "}
          <span className="text-green-700 font-medium">
            most loved herbal products
          </span>
          , trusted by thousands of happy customers for their natural care.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:px-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6">
          {products.length > 0 ? (
            products.map((item) => (
               <Link  key={item._id} href={`/product/${item._id}`}>
                <div className="flex flex-col h-full cursor-pointer group rounded-xl p-3 bg-white shadow-sm hover:shadow-lg transition duration-300 border border-green-100">
                  

                  {/* Product Image */}
                  <div className="relative w-full max-h-80 min-h-48 sm:max-h-72 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                    {item.bestseller && (
                    <span className="absolute top-1 left-1 z-40 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                      Bestseller
                    </span>
                  )}
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full  transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-grow justify-between mt-3 text-left">
                    {/* ✅ Force 2 lines height for title */}
                    <p className="font-medium text-green-900 line-clamp-2 min-h-[2.8rem] group-hover:text-green-700">
                      {item.title}
                    </p>

                    {item.onSale ? (
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-gray-500 line-through text-xs">
                          Rs {item.cuttedPrice}
                        </span>
                        <span className="font-bold text-xs text-green-700">
                          Rs {item.price}
                        </span>
                     {item.discountPercentage>0 &&   <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                          -{item.discountPercentage}%
                        </span>}
                      </div>
                    ) : (
                      <p className="font-bold text-green-700 mt-1">
                        Rs {item.price}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              No bestseller products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
