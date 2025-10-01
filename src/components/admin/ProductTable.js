"use client";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-green-100">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-green-100 text-green-800 text-sm uppercase tracking-wider">
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-100">
          {products
            .slice() // create a copy to avoid mutating state
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((p) => (
              <tr key={p._id} className="hover:bg-green-50 transition">
                <td className="px-6 py-4">
                  {p.images[0] && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border border-green-200">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-green-900">
                  {p.title}
                </td>
                <td className="px-6 py-4 font-semibold text-green-700">
                  RS. {p.price}
                </td>
                <td className="px-6 py-4 text-green-800">{p.category}</td>
                <td className="px-6 py-4 flex gap-3 justify-center">
                  <button
                    onClick={() => onEdit(p)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg shadow-md transition"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
