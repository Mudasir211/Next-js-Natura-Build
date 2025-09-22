"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";
import { Leaf, PackagePlus } from "lucide-react";

export default function AdminProductsPage() {
  const { isLoaded, user } = useUser();
  const router = useRouter();


  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  // check admin
  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (user.publicMetadata?.role !== "admin") {
      router.push("/");
      return;
    }
    setAuthorized(true);
  }, [isLoaded, user, router]);

  // fetch products
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    if (authorized) fetchProducts();
  }, [authorized]);

  const handleSave = async (product) => {
    const url = editing ? `/api/products/${editing._id}` : "/api/products";
    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    setEditing(null);
    setShowForm(false);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (!authorized) return <p className="mt-16 text-center">Checking access…</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-green-50 via-white to-green-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-3xl font-extrabold text-green-800">
            <Leaf className="w-8 h-8 text-green-600" />
            Natura Admin – Products
          </h1>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm((prev) => !prev);
            }}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg transition"
          >
            <PackagePlus className="w-5 h-5" />
            {showForm ? "Close Form" : "Add Product"}
          </button>
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 animate-fadeIn">
            <ProductForm
              onSubmit={handleSave}
              initialData={editing}
              onCancel={() => {
                setEditing(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100 animate-fadeIn">
          <ProductTable
            products={products}
            onEdit={(p) => {
              setEditing(p);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
