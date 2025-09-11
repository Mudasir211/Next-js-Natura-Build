"use client";
import AverageStars from "@/components/AverageStars";
import prod1 from '../../../assets/prod1.jpeg'
import Image from "next/image";
export default function ProductPage() {
  return (
    <div className="mt-5 py-14 px-8 outfit bg-green-50">
      {/* Top Section */}
      <div className="flex flex-col pt-5 sm:flex-row">
        {/* Product Images */}
        <div className="flex flex-col flex-1 gap-2 sm:w-1/2 sm:flex-row-reverse">
          <div className="w-full sm:w-[80%]">
        

<div className="w-full h-[550px] relative">
  <Image
    src={prod1}
    alt="Main Product"
    fill
    className="object-cover  shadow-md"
  />
</div>




          </div>
          <div className="sm:flex grid grid-cols-4 gap-3 sm:w-[18.7%] sm:h-full sm:flex-col">
            {[1, 2, 3, 4].map((_, i) => (
              <button
                key={i}
                className={`rounded-lg overflow-hidden border-2 sm:w-full ${
                  i === 0 ? "border-green-600" : "border-transparent"
                }`}
              >
                <img
                  src={`/placeholder-thumb-${i + 1}.jpg`}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="break-all whitespace-normal sm:w-1/2 sm:px-8">
          <div className="flex flex-col gap-4 py-8 sm:p-0">
            <h1 className="text-3xl font-bold text-green-800">
              Herbal Hair Growth Oil
            </h1>
            <div className="flex items-center gap-1">
              <AverageStars /> &nbsp;
              <span className="text-sm text-gray-600">(123 reviews)</span>
            </div>
            <h1 className="text-2xl font-semibold text-green-700">$24.99</h1>
            <p className="text-gray-700">
              A natural blend of herbs and essential oils, crafted to promote
              strong, healthy, and nourished hair.
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-10 space-y-5">
            <h1 className="font-semibold text-green-800">Select Size</h1>
            <div>
              {["100ml", "200ml", "500ml"].map((size, i) => (
                <button
                  key={i}
                  className="p-2 px-4 mr-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 border border-transparent hover:border-green-600"
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="space-y-1.5">
              <button className="py-3 text-sm text-white bg-green-700 px-7 rounded-lg shadow hover:bg-green-800 transition">
                ADD TO CART
              </button>
              <br />
              <button className="w-[146.98px] py-2.5 text-sm text-white bg-yellow-400 px-7 rounded-lg shadow hover:bg-yellow-500 transition">
                BUY NOW
              </button>
            </div>

            {/* Extra Info */}
            <div className="flex flex-col gap-1 py-5 mt-5 text-sm text-gray-600 border-t border-gray-300">
              <p>🌱 100% Natural & Herbal product.</p>
              <p>🚚 Cash on delivery is available.</p>
              <p>♻️ Eco-friendly packaging.</p>
              <p>🔄 Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="my-20 sm:my-5">
        <div className="flex">
          <p className="px-5 py-3 text-sm border border-green-700 bg-green-100 cursor-pointer text-green-800 rounded-t-md">
            Description
          </p>
          <p className="px-5 py-3 text-sm border cursor-pointer text-gray-600 hover:text-green-800 hover:border-green-600 rounded-t-md">
            Reviews
          </p>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-700 border border-green-200 bg-white rounded-b-lg shadow">
          <p>
            This herbal oil is enriched with Amla, Bhringraj, and Neem extracts
            to strengthen your hair naturally. Regular use reduces hair fall,
            nourishes the scalp, and promotes thicker hair growth.
          </p>
          <p>
            Our products are crafted with eco-friendly packaging and sourced
            from trusted organic farms. No harmful chemicals, only pure herbal
            goodness for you.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="my-10">
        <h2 className="text-xl font-bold mb-4 text-green-800">
          🌿 Related Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={`/related-${i + 1}.jpg`}
                alt={`Related Product ${i + 1}`}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 text-sm font-medium text-green-800">
                Herbal Product
              </h3>
              <p className="text-green-700 font-semibold">$14.99</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
