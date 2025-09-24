"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function BuyNowButton({ product, qty = 1 }) {
  const router = useRouter();
  const { user } = useUser();

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to continue");
      router.push("/sign-in");
      return;
    }

    try {
      // Store product info in localStorage
      const buyNowItem = {
        productId: product._id,
        name: product.title,
        price: product.price,
        image: product.images?.[0] || "",
        qty,
      };
      localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));

      // Redirect to checkout in "buynow mode"
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
