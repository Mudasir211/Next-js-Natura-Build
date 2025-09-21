import AverageStars from "@/components/AverageStars";
import ProductTabs from "@/components/ProductTabs";
import ProductGallery from "@/components/ProductGallery";
import { Leaf, Globe, ShieldCheck } from "lucide-react"; // icons
import ProductReviews from "@/components/ProductReviews";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?id=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({ params }) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return (
    <div className="mt-5 sm:py-14 px-4 py-8 sm:px-8 outfit bg-green-50">
      <div className="flex flex-col pt-5 sm:flex-row gap-6">
        {/* ✅ Image Gallery (Client) */}
        <ProductGallery images={product.images} title={product.title} />

        {/* Info */}
        <div className="break-words sm:w-1/2 sm:px-8">
          <div className="flex flex-col gap-4 py-8 sm:p-0">
            <h1 className="text-3xl font-bold text-green-800">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <AverageStars />{" "}
              <span className="text-sm text-gray-600">(123 reviews)</span>
            </div>
            <h1 className="text-2xl font-semibold text-green-700">
              {product.onSale ? (
                <>
                  <span className="line-through text-gray-500 mr-2">
                    ${product.cuttedPrice}
                  </span>
                  ${product.price}
                </>
              ) : (
                `$${product.price}`
              )}
            </h1>
            <p className="text-gray-700">{product.shortDescription}</p>
          </div>

          {/* Size + Buttons */}
          <div className="mb-6 space-y-4">
            <h1 className="font-semibold text-green-800">Size</h1>
            <div className="inline-block p-3 px-6 bg-green-100 text-green-800 rounded-lg border hover:border-green-600">
              {product.size}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="sm:px-16 px-10 py-3 text-sm text-white bg-green-700 rounded-lg shadow hover:bg-green-800 transition">
                ADD TO CART
              </button>
              <button className="sm:px-16 px-10 py-3 text-sm text-white bg-yellow-400 rounded-lg shadow hover:bg-yellow-500 transition">
                BUY NOW
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center flex-wrap gap-6 sm:gap-14  my-7 text-green-800">
              <div className="flex flex-col items-center gap-2">
                <Leaf className="sm:w-8 sm:h-8" />
                <span className="sm:text-lg text-xs font-bold">100% Ayurvedic</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Globe className="sm:w-8 sm:h-8" />
                <span className="sm:text-lg text-xs font-bold">Export Quality</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="sm:w-8 sm:h-8" />
                <span className="sm:text-lg text-xs font-bold">Chemical Free</span>
              </div>
            </div>
          </div>

          {/* Tabs right below buttons */}
          <ProductTabs product={product} />
        </div>
      </div>
        {/* Reviews */}
        <ProductReviews productId={product._id} />
    </div>
  );
}
