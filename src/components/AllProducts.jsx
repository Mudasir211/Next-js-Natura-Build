import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });

// ✅ Server component fetch
async function getAllProducts() {
   
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bestsellers");
  }

  return res.json();
}

export default async function AllProducts() {
  const products = await getAllProducts();

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
          {products.length > 0 ? (
            products.map((item) => (
              <Link  key={item._id} href={`/product/${item._id}`}>
                <div className="flex flex-col items-center gap-3 text-sm cursor-pointer group rounded-xl p-2 bg-white shadow-sm hover:shadow-lg transition duration-300 border border-green-100">
                  {/* Product Image */}
                  <div className="relative w-full h-48  sm:h-auto overflow-hidden rounded-lg">
                 <div className="w-full h-48 sm:h-80 flex items-center justify-center bg-white rounded-lg overflow-hidden">
  <img
    src={item.images[0]}
    alt={item.title}
    className="h-full w-full object-contain sm:object-contain transition-transform duration-500 group-hover:scale-105"
  />
</div>





                    
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-1 text-left">
                    <p className="font-medium text-green-900 group-hover:text-green-700">
                      {item.title}
                    </p>

                    {item.onSale ? (
                      <div className="flex flex-wrap items-center gap-2">
  <span className="text-gray-500 line-through text-xs">
    Rs {item.cuttedPrice}
  </span>
  <span className="font-bold text-xs text-green-700">
    Rs {item.price}
  </span>
  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
    -{item.discountPercentage}%
  </span>
</div>

                    ) : (
                      <p className="font-bold text-green-700">Rs {item.price}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
