"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [cart, setCart] = useState({ items: [] });
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    house: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mode = searchParams.get("mode");

    if (mode === "buynow") {
      // Get product from localStorage
      const item = localStorage.getItem("buyNowItem");
      if (item) {
        setCart({ items: [JSON.parse(item)] });
      }
    } else {
      // Fetch regular cart
      const fetchCart = async () => {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          setCart(data);
        }
      };
      fetchCart();
    }
  }, [searchParams]);

  // Auto-fill email from Clerk
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setForm((prev) => ({ ...prev, email: user.primaryEmailAddress.emailAddress }));
    }
  }, [user]);

  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = cart.items.length > 0 ? 150 : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.items,
        shippingAddress: form,
        paymentMethod: "COD",
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
      }),
    });

    setLoading(false);
    if (res.ok) {
      const order = await res.json();
      toast.success("Order placed successfully!");
      localStorage.removeItem("buyNowItem"); // clear buy now
      router.push(`/orders/${order._id}`);
    } else {
      const err = await res.json();
      toast.error(err.message || "Failed to place order");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left - Form */}
     <form
        onSubmit={handleSubmit}
        className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-green-800">Checkout</h1>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              placeholder="Full Name"
              className="input p-3 outline-none border border-gray-300"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email Address"
              className="input p-3 outline-none border border-gray-300 bg-gray-100 cursor-not-allowed"
              value={form.email}
              disabled
            />
            <input
              required
              type="tel"
              placeholder="Phone Number"
              className="input p-3 outline-none border border-gray-300 md:col-span-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>

        {/* Shipping Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Shipping Address
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              placeholder="Full Address"
              className="input p-3 outline-none border border-gray-300 md:col-span-2"
              value={form.street}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              required
              placeholder="House"
              className="input p-3 outline-none border border-gray-300 md:col-span-2"
              value={form.street}
              onChange={(e) => setForm({ ...form, house: e.target.value })}
            />
            <input
              required
              placeholder="Street"
              className="input p-3 outline-none border border-gray-300 md:col-span-2"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
            />
            <input
              required
              placeholder="City"
              className="input p-3 outline-none border border-gray-300"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              required
              placeholder="State / Province"
              className="input p-3 outline-none border border-gray-300"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
            <input
              required
              type="text"
              placeholder="Postal Code"
              className="input p-3 outline-none border border-gray-300"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            />
            <input
              required
              placeholder="Country"
              className="input p-3 outline-none border border-gray-300"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-xl shadow-md transition text-lg"
        >
          {loading ? "Placing Order…" : "Place Order (Cash on Delivery)"}
        </button>
      </form>


      {/* Right - Order Summary */}
      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4 h-fit">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Order Summary
        </h2>

        <div className="space-y-2">
          {cart.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>Rs.{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-3 space-y-1 text-sm">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs.{subtotal}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span>Rs.{shipping}</span>
          </p>
          <p className="flex justify-between font-bold text-green-800 text-lg border-t pt-2">
            <span>Total</span>
            <span>Rs.{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
