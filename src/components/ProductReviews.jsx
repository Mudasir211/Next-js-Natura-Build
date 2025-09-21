"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Star, StarHalf, Edit2, Trash2, Check } from "lucide-react";
import { useUser } from "@clerk/nextjs";

// generate consistent color from string
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};

// function to render stars (supports half stars)
const renderStars = (rating, size = 22) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i + 0.5 < rating) {
      stars.push(<Star key={i} size={size} className="text-yellow-400" />);
    } else if (i < rating) {
      stars.push(<StarHalf key={i} size={size} className="text-yellow-400" />);
    } else {
      stars.push(<Star key={i} size={size} className="text-gray-300" />);
    }
  }
  return stars;
};

export default function ProductReviews({ productId }) {
  const { user, isLoaded } = useUser();
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?product=${productId}`);
    const data = await res.json();
    // Check if current user has already reviewed this product
    const existing = data.find((r) => r.user === user?.id);
    setHasReviewed(!!existing);
    setReviews(data);
  };

  useEffect(() => {
    if (productId && isLoaded) fetchReviews();
  }, [productId, user, isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to review");
    if (!name) return toast.error("Enter a display name");

    try {
      const url = editingId ? `/api/reviews/${editingId}` : "/api/reviews";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productId, rating, comment, name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      toast.success(editingId ? "Review updated" : "Review submitted");
      setRating(5);
      setComment("");
      setName("");
      setEditingId(null);
      fetchReviews();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (r) => {
    setEditingId(r._id);
    setRating(r.rating);
    setComment(r.comment);
    setName(r.name);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete your review?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Review deleted");
      setEditingId(null);
      setComment("");
      setName("");
      setRating(5);
      setHasReviewed(false);
      fetchReviews();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mt-12 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-green-800">Customer Reviews</h2>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">{renderStars(averageRating)}</div>
          <span className="text-gray-600 font-medium">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Form - Only show if user hasn't reviewed or is editing */}
      {user && (!hasReviewed || editingId) && (
        <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">{editingId ? "Edit Your Review" : "Write a Review"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />

            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  className={i < rating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Write your review..."
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition flex items-center gap-2"
              >
                <Check size={20} /> {editingId ? "Update Review" : "Submit Review"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setComment("");
                    setName("");
                    setRating(5);
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reviews.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No reviews yet. Be the first to review!</p>
        )}

        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between hover:shadow-2xl transition"
          >
            <div className="flex items-start gap-3">
              {/* Single-letter colored avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: stringToColor(r.name) }}
              >
                {r.name[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-700">{r.name}</span>
                  <div className="flex gap-1">{renderStars(r.rating, 18)}</div>
                </div>
                {r.comment && <p className="mt-2 text-gray-700">{r.comment}</p>}
              </div>
            </div>

            {/* Edit/Delete buttons if current user */}
            {user?.id === r.user && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(r)}
                  className="flex items-center gap-1 px-3 py-2 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}