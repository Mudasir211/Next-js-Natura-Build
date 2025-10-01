"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function CartDrawer() {
  const { user } = useUser();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      if (user) {
        // fetch from DB
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          setCart(data);
        }
      } else {
        // fetch from localStorage
        const localCart = JSON.parse(localStorage.getItem("cart")) || {
          items: [],
        };
        setCart(localCart);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const updateQty = async (id, qty) => {
    try {
      setActionLoading(true);
      if (user) {
        // update in DB
        const res = await fetch(`/api/cart/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qty }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed");
        setCart(data);
      } else {
        // update in localStorage
        let localCart = JSON.parse(localStorage.getItem("cart")) || {
          items: [],
        };
        localCart.items = localCart.items
          .map((item) => (item.productId === id ? { ...item, qty } : item))
          .filter((item) => item.qty > 0);

        localStorage.setItem("cart", JSON.stringify(localCart));
        setCart(localCart);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setActionLoading(true);
      if (user) {
        await fetch("/api/cart", { method: "DELETE" });
      } else {
        localStorage.removeItem("cart");
      }
      setCart({ items: [] });
    } finally {
      setActionLoading(false);
    }
  };

  // --- Totals ---
  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shipping = cart.items.length > 0 ? 250 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Shopping Cart</h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-green-700 animate-spin" />
        </div>
      ) : cart.items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.items
            .slice() // create a copy to avoid mutating state
            .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
            .map((item) => (
              <div key={user ? item.product : item.productId}>
                <div
                  key={user ? item.product : item.productId} // key must be here
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                    <div>
                      <h4 className="font-semibold text-green-800">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">Rs.{item.price}</p>
                    </div>
                  </div>
                </div>
                <div className="flex mt-2 items-center gap-3">
                  <button
                    disabled={actionLoading}
                    onClick={() =>
                      updateQty(
                        user ? item.product : item.productId,
                        item.qty - 1
                      )
                    }
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button
                    disabled={actionLoading}
                    onClick={() =>
                      updateQty(
                        user ? item.product : item.productId,
                        item.qty + 1
                      )
                    }
                    className="p-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={() =>
                      updateQty(user ? item.product : item.productId, 0)
                    }
                    className="p-2 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>{" "}
              </div>
            ))}

          {/* Totals */}
          <div className="border-t pt-6 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-medium">Rs.{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span className="font-medium">Rs.{shipping}</span>
            </div>
            <div className="flex justify-between text-green-800 text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>Rs.{total}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              disabled={actionLoading}
              onClick={clearCart}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium disabled:opacity-50"
            >
              {actionLoading ? (
                <Loader2 className="w-5 h-5 mx-auto animate-spin" />
              ) : (
                "Clear Cart"
              )}
            </button>
            <Link
              href="/checkout"
              className="flex-1 py-3 bg-green-700 hover:bg-green-800 rounded-lg text-white text-center font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
