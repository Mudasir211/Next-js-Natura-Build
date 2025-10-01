"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Package, ListTree, ShoppingCart } from "lucide-react";

export default function AdminPanel() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in"); // ✅ Redirect to Clerk sign-in
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  // ✅ Restrict access only to admin users
  if (user.publicMetadata.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-semibold">
        Access Denied — Admins Only 🚫
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-10 border border-green-200">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Products */}
          <Link
            prefetch={false}
            href="/admin/products"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-green-50 hover:bg-green-100 shadow-sm border border-green-200 transition transform hover:-translate-y-1"
          >
            <Package className="w-10 h-10 text-green-700 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-green-900">Products</span>
          </Link>

          {/* Categories */}
          <Link
            prefetch={false}
            href="/admin/categories"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-green-50 hover:bg-green-100 shadow-sm border border-green-200 transition transform hover:-translate-y-1"
          >
            <ListTree className="w-10 h-10 text-green-700 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-green-900">Categories</span>
          </Link>

          {/* Orders */}
          <Link
            prefetch={false}
            href="/admin/orders"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-green-50 hover:bg-green-100 shadow-sm border border-green-200 transition transform hover:-translate-y-1"
          >
            <ShoppingCart className="w-10 h-10 text-green-700 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-green-900">Orders</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
