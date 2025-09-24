"use client";
import { Plus, Minus, X } from "lucide-react";

export default function CartItem({ item }) {
  const updateQuantity = async (qty) => {
    if (qty < 1) return;

    await fetch("/api/cart/update-quantity", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: item.product, qty }),
    });

    // optional: refresh the page or re-fetch cart
    window.location.reload();
  };

  const removeItem = async () => {
    await fetch("/api/cart/remove-item", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: item.product }),
    });

    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4 bg-white p-3 rounded shadow">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p>Rs.{item.price}</p>
        <div className="flex items-center gap-2 mt-1">
          <button onClick={() => updateQuantity(item.qty - 1)}>
            <Minus className="w-4 h-4" />
          </button>
          <span>{item.qty}</span>
          <button onClick={() => updateQuantity(item.qty + 1)}>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button onClick={removeItem}>
        <X className="w-5 h-5 text-red-500" />
      </button>
    </div>
  );
}
