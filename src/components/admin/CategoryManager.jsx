// components/admin/CategoryManager.jsx
"use client";
import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import { FolderPlus, Tags } from "lucide-react";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (cat) => {
    const url = editing ? `/api/categories/${editing._id}` : "/api/categories";
    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cat),
    });

    setEditing(null);
    setShowForm(false);
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-green-50 via-white to-green-100 py-8 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-3xl font-extrabold text-green-800">
            <Tags className="w-8 h-8 text-green-600" />
            Natura Admin – Categories
          </h1>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm((prev) => !prev);
            }}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg transition"
          >
            <FolderPlus className="w-5 h-5" />
            {showForm ? "Close Form" : "Add Category"}
          </button>
        </div>

        {/* Category Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <CategoryForm
              onSubmit={handleSave}
              initialData={editing}
              onCancel={() => {
                setEditing(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        {/* Category Table */}
        <div className="bg-white rounded-2xl shadow-xl sm:p-6 border border-green-100">
          <CategoryTable
            categories={categories}
            onEdit={(c) => {
              setEditing(c);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
