"use client";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export default function AddToCartButton({ product }) {
  const { user } = useUser();

  const addToCart = async () => {
    if (!user) return toast.error("You must be logged in to add to cart");

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          name: product.title,
          price: product.price,
          image: product.images?.[0],
          attributes: { size: product.size },
          qty: 1,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <button
      onClick={addToCart}
      className="flex-1 py-3 text-white bg-green-700 rounded-lg shadow hover:bg-green-800 transition"
    >
      ADD TO CART
    </button>
  );
}
