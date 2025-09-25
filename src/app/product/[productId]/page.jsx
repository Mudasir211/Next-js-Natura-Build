import AverageStars from "@/components/AverageStars";
import ProductTabs from "@/components/ProductTabs";
import ProductGallery from "@/components/ProductGallery";
import ProductReviews from "@/components/ProductReviews";
import AddToCartButton from "@/components/AddToCartButton";
import { Leaf, Globe, ShieldCheck } from "lucide-react";
import BuyNowButton from "@/components/BuyNowButton";
import RelatedProducts from "@/components/RelatedProducts";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?id=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

async function getReviews(productId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?product=${productId}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function generateMetadata({ params }) {
  const { productId } = params;
  const product = await getProduct(productId);

  const firstImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png"; // fallback logo

  return {
    title: `${product.title} | Natura.pk`,
    description:
      product.shortDescription ||
      `Buy ${product.title} at Natura.pk — premium herbal & organic products crafted for natural wellness and beauty.`,
    keywords: [
      product.title,
      "Natura.pk",
      "herbal products",
      "organic skincare",
      "herbal hair oil",
      "bio organic hair oil",
      "natural remedies",
      "ayurvedic remedies",
      "wellness products",
    ],
    openGraph: {
      title: `${product.title} | Natura.pk`,
      description:
        product.shortDescription ||
        `Discover ${product.title}, made with natural ingredients for health & beauty.`,
      url: `https://naturapk.store/product/${product._id}`,
      siteName: "Natura.pk",
      images: [
        {
          url: firstImage,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      locale: "en_PK",
      type: "website", // ✅ must be website (Next.js safe)
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Natura.pk`,
      description:
        product.shortDescription ||
        `Shop ${product.title} from Natura.pk’s herbal & organic collection.`,
      images: [firstImage],
    },
  };
}



export default async function ProductPage({ params }) {
  const { productId } = params;
  const product = await getProduct(productId);
  const reviews = await getReviews(productId);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mt-5 px-4 sm:px-8 py-14 outfit bg-green-50">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Gallery */}
        <div className="flex-1">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Info */}
        <div className="flex-1 flex px-3 md:px-10 lg:px-0 flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-green-800">{product.title}</h1>
            <div className="flex items-center gap-2">
              <AverageStars averageRating={averageRating} size={18} />
              <span className="text-sm text-gray-600">({reviews.length} reviews)</span>
            </div>

            <h2 className="text-2xl font-semibold text-green-700">
              {product.onSale ? (
                <>
                  <span className="line-through text-gray-500 mr-2">
                    Rs.{product.cuttedPrice}
                  </span>
                  Rs.{product.price}{" "}
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                    -{product.discountPercentage}%
                  </span>
                </>
              ) : (
                `Rs.${product.price}`
              )}
            </h2>

            <p className="text-gray-700">{product.shortDescription}</p>
          </div>

          {/* Size + Buttons */}
          <div className="space-y-4">
            <h3 className="font-semibold text-green-800">Size</h3>
            <div className="inline-block p-3 px-6 bg-green-100 text-green-800 rounded-lg border hover:border-green-600">
              {product.size}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Client component for Add to Cart */}
              <AddToCartButton product={product} />

             <BuyNowButton product={product} qty={1} />

            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8 text-green-800">
              <div className="flex flex-col items-center gap-2">
                <Leaf className="w-8 h-8" />
                <span className="font-bold text-xs sm:text-lg">100% Ayurvedic</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Globe className="w-8 h-8" />
                <span className="font-bold text-xs sm:text-lg">Export Quality</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-8 h-8" />
                <span className="font-bold text-xs sm:text-lg">Chemical Free</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <ProductTabs product={product} />
        </div>
      </div>

      {/* Reviews */}
      <ProductReviews productId={product._id} />
      <RelatedProducts category={product.category}/>
      
    </div>
  );
}
