"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Leaf, ChevronDown, ChevronUp, Search } from "lucide-react";

export default function AdminOrdersPage() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return router.push("/sign-in");
    if (user.publicMetadata?.role !== "admin") return router.push("/");
    setAuthorized(true);
  }, [isLoaded, user, router]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders?admin=true");
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
      setFilteredOrders(data); // initialize with all orders
    }
  };

  useEffect(() => {
    if (authorized) fetchOrders();
  }, [authorized]);

  const handleStatusChange = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((o) => {
      return (
        o._id.toLowerCase().includes(query) ||
        o.shippingAddress?.fullName?.toLowerCase().includes(query) ||
        o.shippingAddress?.email?.toLowerCase().includes(query) ||
        o.shippingAddress?.phone?.toLowerCase().includes(query)
      );
    });
    setFilteredOrders(filtered);
  };

  if (!authorized) return <p className="mt-16 text-center">Checking access…</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-green-50 via-white to-green-100 py-8 px-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold text-green-800">
          <Leaf className="w-8 h-8 text-green-600" /> Natura Admin – Orders
        </h1>

        {/* 🔍 Search Bar */}
        <div className="flex items-center gap-2 max-w-md bg-white px-3 py-2 rounded-lg shadow border">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Order ID, Name, Email, Phone..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-1 outline-none text-sm"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl sm:p-6 border border-green-100 overflow-x-auto">
          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Dates</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <React.Fragment key={o._id}>
                    {/* Main row */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-3 font-mono text-xs">{o._id}</td>
                      <td className="p-3">{o.shippingAddress.fullName}</td>
                      <td className="p-3 font-semibold text-green-700">
                        Rs.{o.totalPrice}
                      </td>
                      <td className="p-3">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleStatusChange(o._id, e.target.value)
                          }
                          className="border rounded p-1 text-sm"
                        >
                          <option>Placed</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-xs text-gray-600">
                        {o.placedAt && (
                          <p>Placed: {new Date(o.placedAt).toLocaleString()}</p>
                        )}
                        {o.shippedAt && (
                          <p>
                            Shipped: {new Date(o.shippedAt).toLocaleString()}
                          </p>
                        )}
                        {o.deliveredAt && (
                          <p>
                            Delivered: {new Date(o.deliveredAt).toLocaleString()}
                          </p>
                        )}
                        {o.cancelledAt && (
                          <p>
                            Cancelled:{" "}
                            {new Date(o.cancelledAt).toLocaleString()}
                          </p>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleExpand(o._id)}
                          className="flex items-center gap-1 text-green-700 font-medium hover:underline"
                        >
                          {expanded[o._id] ? (
                            <>
                              Hide <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              View Details <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded row */}
                    {expanded[o._id] && (
                      <tr>
                        <td colSpan={6} className="bg-green-50 p-4">
                          <div className="space-y-6">
                            {/* Shipping Info */}
                            <div>
                              <h3 className="font-semibold mb-2">
                                Shipping Address
                              </h3>
                              <ul className="text-sm space-y-1">
                                <li>
                                  <strong>Name:</strong>{" "}
                                  {o.shippingAddress.fullName}
                                </li>
                                <li>
                                  <strong>Address:</strong>{" "}
                                  {o.shippingAddress.address}
                                </li>
                                <li>
                                  <strong>House:</strong>{" "}
                                  {o.shippingAddress.house}
                                </li>
                                <li>
                                  <strong>Street:</strong>{" "}
                                  {o.shippingAddress.street}
                                </li>
                                <li>
                                  <strong>City:</strong>{" "}
                                  {o.shippingAddress.city}
                                </li>
                                <li>
                                  <strong>Postal Code:</strong>{" "}
                                  {o.shippingAddress.postalCode}
                                </li>
                                <li>
                                  <strong>Country:</strong>{" "}
                                  {o.shippingAddress.country}
                                </li>
                                <li>
                                  <strong>Phone:</strong>{" "}
                                  {o.shippingAddress.phone}
                                </li>
                                <li>
                                  <strong>Email:</strong>{" "}
                                  {o.shippingAddress.email}
                                </li>
                              </ul>
                            </div>

                            {/* Items */}
                            <div>
                              <h3 className="font-semibold mb-2">Items</h3>
                              <ul className="divide-y">
                                {o.items.map((i) => (
                                  <li
                                    key={i._id}
                                    className="py-2 flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-3">
                                      {i.image && (
                                        <img
                                          src={i.image}
                                          alt={i.name}
                                          className="w-12 h-12 rounded-md object-cover border"
                                        />
                                      )}
                                      <span>
                                        {i.name} × {i.qty}
                                      </span>
                                    </div>
                                    <span className="font-medium">
                                      Rs.{i.price * i.qty}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Summary */}
                            <div className="border-t pt-3 space-y-1 text-sm">
                              <p className="flex justify-between">
                                <span>Items:</span>
                                <span>Rs.{o.itemsPrice}</span>
                              </p>
                              <p className="flex justify-between">
                                <span>Shipping:</span>
                                <span>Rs.{o.shippingPrice}</span>
                              </p>
                              <p className="flex justify-between font-bold text-green-800">
                                <span>Total:</span>
                                <span>Rs.{o.totalPrice}</span>
                              </p>
                              <p>
                                Payment:{" "}
                                {o.isPaid ? (
                                  <span className="text-green-600">Paid</span>
                                ) : (
                                  <span className="text-red-600">
                                    Cash on Delivery
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
