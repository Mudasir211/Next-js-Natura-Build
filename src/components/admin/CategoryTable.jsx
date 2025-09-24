// components/admin/CategoryTable.jsx
"use client";
import { Pencil, Trash2 } from "lucide-react";

export default function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-green-100 text-green-800 text-sm sm:text-base">
            <th className="border px-4 py-3 text-left">Name</th>
            <th className="border px-4 py-3 text-left">Slug</th>
            <th className="border px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr
              key={cat._id}
              className="hover:bg-green-50 text-sm sm:text-base"
            >
              <td className="border px-4 py-3">{cat.name}</td>
              <td className="border px-4 py-3">{cat.slug}</td>
              <td className="border px-4 py-3">
                <div className="flex gap-4">
                  <button
                    onClick={() => onEdit(cat)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(cat._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
