"use client";
import { useState, useEffect } from "react";
import ProductImageUpload from "./ProductImageUpload";
import { Leaf } from "lucide-react";

export default function ProductForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ""
  );
  const [fullDescription, setFullDescription] = useState(
    initialData?.fullDescription || ""
  );
  const [price, setPrice] = useState(initialData?.price || "");
  const [cuttedPrice, setCuttedPrice] = useState(
    initialData?.cuttedPrice || ""
  );
  const [discountPercentage, setDiscountPercentage] = useState(
    initialData?.discountPercentage || 0
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [categories, setCategories] = useState([]); // fetched categories
  const [size, setSize] = useState(initialData?.size || "");
  const [ingredients, setIngredients] = useState(
    initialData?.ingredients?.join(", ") || ""
  );
  const [howToUse, setHowToUse] = useState(initialData?.howToUse || "");
  const [bestseller, setBestseller] = useState(
    initialData?.bestseller || false
  );
  const [onSale, setOnSale] = useState(initialData?.onSale || false);
  const [images, setImages] = useState(initialData?.images || []);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      shortDescription,
      fullDescription,
      price: Number(price),
      cuttedPrice: Number(cuttedPrice) || null,
      discountPercentage: Number(discountPercentage) || 0,
      category,
      size,
      ingredients: ingredients
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i.length > 0),
      howToUse,
      bestseller,
      onSale,
      images,
    });

    if (!initialData) {
      setTitle("");
      setShortDescription("");
      setFullDescription("");
      setPrice("");
      setCuttedPrice("");
      setDiscountPercentage(0);
      setCategory("");
      setSize("");
      setIngredients("");
      setHowToUse("");
      setBestseller(false);
      setOnSale(false);
      setImages([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gradient-to-br from-green-50 via-white to-green-100 p-8 rounded-2xl shadow-xl border border-green-200"
    >
      <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
        <Leaf className="w-6 h-6 text-green-600" />
        {initialData ? "Edit Product" : "Add New Product"}
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Product Title"
          className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          Short Description
        </label>
        <textarea
          placeholder="Write a short description..."
          className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
          rows={2}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          Full Description
        </label>
        <textarea
          placeholder="Write a detailed description..."
          className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
          rows={4}
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
        />
      </div>

      {/* Price, Cutted Price, Discount */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Price
          </label>
          <input
            type="number"
            placeholder="Price"
            className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Cutted Price
          </label>
          <input
            type="number"
            placeholder="Original Price"
            className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
            value={cuttedPrice}
            onChange={(e) => setCuttedPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Discount %
          </label>
          <input
            type="number"
            placeholder="Discount %"
            className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
        </div>
      </div>

      {/* Category + Size */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Category
          </label>
          <select
            className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">
            Size
          </label>
          <input
            type="text"
            placeholder="Size"
            className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          Ingredients (comma separated)
        </label>
        <input
          type="text"
          placeholder="e.g. Aloe Vera, Coconut Oil"
          className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      {/* How to Use */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          How to Use
        </label>
        <textarea
          placeholder="Explain how to use the product..."
          className="border border-green-300 focus:border-green-500 focus:ring-green-200 w-full p-3 rounded-lg shadow-sm"
          rows={3}
          value={howToUse}
          onChange={(e) => setHowToUse(e.target.value)}
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-green-800 font-medium">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          Bestseller
        </label>
        <label className="flex items-center gap-2 text-green-800 font-medium">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) => setOnSale(e.target.checked)}
          />
          On Sale
        </label>
      </div>

      {/* Cloudinary Upload */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          Upload Images (Max 6)
        </label>
        <ProductImageUpload images={images} setImages={setImages} />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition"
        >
          {initialData ? "Update Product" : "Create Product"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg shadow-md transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
