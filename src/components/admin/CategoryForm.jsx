"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CategoryForm({ onSubmit, initialData, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, slug, description, image });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Category name"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="unique-category-slug"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Slug is the URL identifier (e.g., <code>/products?category=slug</code>)
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          rows={3}
          placeholder="Short description"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <div className="flex items-center gap-4">
          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border"
            />
          )}
          <CldUploadWidget
            uploadPreset="ml_default" // make sure it exists in Cloudinary
            options={{
              multiple: false, // only one image allowed
            }}
            onSuccess={(result) => {
              if (result?.info?.secure_url) {
                setImage(result.info.secure_url);
                toast.success("Image uploaded!");
              }
            }}
            onError={() => toast.error("Upload failed")}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-medium rounded-xl shadow-md flex items-center gap-2 transition"
              >
                <Upload size={18} />
                {image ? "Change Image" : "Upload Image"}
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Save Category
        </button>
      </div>
    </form>
  );
}
