"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BuyNowButton({ product, qty = 1 }) {
  const router = useRouter();

  const handleBuyNow = () => {
    try {
      const buyNowItem = {
        product: product._id,
        name: product.title,
        price: product.price,
        image: product.images?.[0] || "",
        qty,
      };
      localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
      router.push("/checkout?mode=buynow");
    } catch (err) {
      toast.error("Failed to start buy now checkout");
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      className="flex-1 py-3 text-white bg-yellow-400 rounded-lg shadow hover:bg-yellow-500 transition"
    >
      BUY NOW
    </button>
  );
}
