import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: "700" });

// ✅ Get category slug + products safely
async function getRelatedProducts(categoryName) {
  // 1. Fetch categories to find slug
  const catRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    cache: "no-store",
  });
  if (!catRes.ok) throw new Error("Failed to fetch categories");

  const categories = await catRes.json();
  const category = categories.find((c) => c.name === categoryName);
  if (!category) return { products: [], slug: "" };

  // 2. Fetch products using slug
  const prodRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${category.slug}`,
    { cache: "no-store" }
  );
  if (!prodRes.ok) throw new Error("Failed to fetch products");

  const products = await prodRes.json();
  return { products, slug: category.slug };
}

export default async function RelatedProducts({ category }) {
  const { products, slug } = await getRelatedProducts(category);

  // show only first 6
  const displayedProducts = products.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-3 text-center space-y-10">
        {/* Section Title */}
        <h2
          className={`text-3xl -skew-x-10 md:text-4xl ${oswald.className} font-bold text-green-800`}
        >
          Related Products
        </h2>
        <p className="text-gray-600 font-bold max-w-2xl mx-auto">
          Explore more from{" "}
          <span className="text-green-700 font-medium">{category}</span>
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:px-10  md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-10">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((item) => (
              <Link key={item._id} href={`/product/${item._id}`}>
                <div className="flex flex-col  h-full cursor-pointer group rounded-xl p-3 bg-white shadow-sm hover:shadow-lg transition duration-300 border border-green-100">
                  

                  {/* Product Image */}
                  <div className="relative w-full max-h-80 min-h-48 sm:h-72 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                    {item.bestseller && (
                    <span className="absolute top-1 left-1 z-40 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                      Bestseller
                    </span>
                  )}
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
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
                        <span className="font-bold text-green-700">
                          Rs {item.price}
                        </span>
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                          -{item.discountPercentage}%
                        </span>
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
            <p className="col-span-full text-gray-500">No products found.</p>
          )}
        </div>

        {/* ✅ See All Link */}
        {products.length > 6 && slug && (
          <div className="mt-8">
            <Link
              href={`/products?category=${slug}`}
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              See All Relevant Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
