"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [params.id]);

  if (!order)
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-8 h-8 text-green-700 animate-spin" />
      </div>
    );

  const placedDate = order.placedAt || order.createdAt;

  const copyOrderId = () => {
    navigator.clipboard.writeText(order._id);
    toast.success("Order ID copied!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl space-y-8">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl break-all font-bold text-green-800">
          Order #{order._id}
        </h1>
        <button
          onClick={copyOrderId}
          className="p-1 text-gray-500 hover:text-green-700 transition"
          title="Copy Order ID"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>

      {/* Dates */}
      <div className="text-sm text-gray-600 space-y-1">
        {placedDate && <p>Placed: {new Date(placedDate).toLocaleString()}</p>}
        {order.shippedAt && (
          <p>Shipped: {new Date(order.shippedAt).toLocaleString()}</p>
        )}
        {order.deliveredAt && (
          <p>Delivered: {new Date(order.deliveredAt).toLocaleString()}</p>
        )}
        {order.cancelledAt && (
          <p>Cancelled: {new Date(order.cancelledAt).toLocaleString()}</p>
        )}
      </div>

      {/* Shipping */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h2 className="font-semibold mb-2 text-lg">Shipping Address</h2>
        <p className="font-medium">{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.address}</p>
        <p>{order.shippingAddress.house}</p>
        <p>{order.shippingAddress.street}</p>
        <p>
          {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
          {order.shippingAddress.country}
        </p>
        <p>Phone: {order.shippingAddress.phone}</p>
      </div>

      {/* Items */}
      <div>
        <h2 className="font-semibold mb-4 text-lg">Items</h2>
        <ul className="divide-y rounded-lg border">
          {order.items.map((i) => (
            <li key={i._id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div>
                  <Link
                    href={`/product/${i.product}`}
                    className="font-medium hover:underline text-green-700"
                  >
                    {i.name}
                  </Link>
                  <p className="text-sm text-gray-600">Qty: {i.qty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">Rs.{i.price}</p>
                <p className="text-sm text-gray-500">
                  Subtotal: Rs.{i.price * i.qty}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="border-t pt-4 space-y-2 text-sm">
        <p className="flex justify-between">
          <span>Items:</span>
          <span>Rs.{order.itemsPrice}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping:</span>
          <span>Rs.{order.shippingPrice}</span>
        </p>
        <p className="flex justify-between font-bold text-lg text-green-800">
          <span>Total:</span>
          <span>Rs.{order.totalPrice}</span>
        </p>
      </div>

      {/* Status */}
      <div className="pt-4">
        <p>
          Payment:{" "}
          {order.isPaid ? (
            <span className="text-green-600">Paid</span>
          ) : (
            <span className="text-red-600">Cash on Delivery</span>
          )}
        </p>
        <p>
          Status:{" "}
          <span
            className={`${
              order.status === "Delivered"
                ? "text-green-600"
                : order.status === "Cancelled"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {order.status || "Placed"}
          </span>
        </p>
      </div>
    </div>
  );
}
