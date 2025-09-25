"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (!isLoaded) return (<div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-green-700 animate-spin" />
        </div>);

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto mt-20 p-6 text-center">
        <h1 className="text-2xl font-bold text-green-800 mb-4">My Orders</h1>
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  if (loading) return (<div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-green-700 animate-spin" />
        </div>);

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4 relative">
           <Link className="rounded-2xl text-xs absolute right-0 -top-14 text-red-600 p-3" href={'order-cancellation'} >Request Order Cancellation </Link>

          {orders.map((o) => (
            <Link
              key={o._id}
              href={`/orders/${o._id}`}
              className="block bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold ">Order #{o._id}</p>
                  <p className="text-sm text-gray-600">
                    Placed: {new Date(o.placedAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">Rs.{o.totalPrice}</p>
                  <p
                    className={`text-xs ${
                      o.status === "Delivered"
                        ? "text-green-600"
                        : o.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {o.status}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
     
    </div>
  );
}
