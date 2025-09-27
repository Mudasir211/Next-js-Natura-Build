"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Edit2, Trash2, Check, X, Verified } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import RatingSystem from "./RatingSystem";
import AverageStars from "./AverageStars";
import { SelectableStar } from "./SelectableStar";
import ReviewImageUpload from "./ReviewImageUpload";

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};

export default function ProductReviews({ productId }) {
  const { user, isLoaded } = useUser();

  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState({ open: false, id: null });
  const [lightbox, setLightbox] = useState({ open: false, url: "" });

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?product=${productId}`);
    const data = await res.json();
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

    try {
      const url = editingId ? `/api/reviews/${editingId}` : "/api/reviews";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: productId,
          rating,
          title,
          comment,
          name,
          images,
          userEmail: user.primaryEmailAddress?.emailAddress || "", // ✅ send Clerk email
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      toast.success(editingId ? "Review updated" : "Review submitted");
      setRating(5);
      setTitle("");
      setComment("");
      setName("");
      setImages([]);
      setEditingId(null);
      setShowForm(false);
      fetchReviews();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (r) => {
    setEditingId(r._id);
    setRating(r.rating);
    setTitle(r.title || "");
    setComment(r.comment);
    setName(r.name);
    setImages(r.images || []);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setShowConfirm({ open: true, id });
  };

  const confirmDelete = async (id) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Review deleted");
      setEditingId(null);
      setHasReviewed(false);
      fetchReviews();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setShowConfirm({ open: false, id: null });
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mt-12 px-1 sm:px-30 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-center my-5 text-green-800">
          Customer Reviews
        </h2>

        {/* Rating Summary */}
        <RatingSystem ratings={reviews} averageRating={averageRating} />

        {/* Write a Review Button */}
        {user && !hasReviewed && !editingId && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium"
            >
              {showForm ? "Close Form" : "Write a Review"}
            </button>
          </div>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 w-full max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-green-700">
            {editingId ? "Edit Your Review" : "Write a Review"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 z-50">
            <input
              type="text"
              placeholder="Your display name"
              value={name}
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />

            <input
              type="text"
              placeholder="Review Title (e.g. Amazing product!)"
              value={title}
              maxLength={30}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />

            {/* Rating input */}
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <SelectableStar
                  key={i}
                  filled={i < rating}
                  size={28}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={400}
              placeholder="Write your review..."
              className="w-full p-3 border rounded-xl"
              required
            />

            {/* Image Upload */}
            <ReviewImageUpload images={images} setImages={setImages} />

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setRating(5);
                  setTitle("");
                  setComment("");
                  setImages([]);
                }}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center gap-2"
              >
                <X size={18} /> Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center gap-2"
              >
                <Check size={20} />
                {editingId ? "Update Review" : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
        {reviews.length === 0 && (
          <p className="text-gray-500 text-center">
            No reviews yet. Be the first to review!
          </p>
        )}
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-white p-5 rounded-2xl shadow-lg border"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: stringToColor(r.name) }}
              >
                {r.name[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold break-all text-green-700">
                    {r.name}
                  </span>
                  <AverageStars averageRating={r.rating} size={18} />
                </div>
                {r.userEmail && (
                  <p className="text-sm text-gray-500">{r.userEmail}</p>
                )}
                {r.title && (
                  <p className="mt-1 break-all font-semibold text-gray-900">
                    {r.title}
                  </p>
                )}
                {r.comment && (
                  <p className="mt-2 break-all text-gray-700">{r.comment}</p>
                )}

                {/* Review Images */}
                {r.images?.length > 0 && (
                  <div className="mt-3 mx-auto">
                    <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                      📷 {r.images.length} Photo
                      {r.images.length > 1 ? "s" : ""}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {r.images.map((url, i) => (
                        <div
                          key={i}
                          className="relative w-20 h-20 rounded-lg overflow-hidden border cursor-pointer hover:scale-105 transition"
                          onClick={() =>
                            setLightbox({ open: true, url })
                          }
                        >
                          <img
                            src={url}
                            alt={`review-img-${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Edit / Delete */}
            {user?.id === r.user && (
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(r)}
                  className="flex items-center gap-1 px-3 py-2 bg-yellow-100 rounded-lg hover:bg-yellow-200"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-100 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Review?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm({ open: false, id: null })}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(showConfirm.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <img
            src={lightbox.url}
            alt="enlarged-review-img"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-2xl"
          />
          <button
            onClick={() => setLightbox({ open: false, url: "" })}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>
        </div>
      )}
      {/* Integrity Note */}
<div className="max-w-2xl mx-auto mt-16 text-center flex flex-col items-center gap-4 text-sm text-gray-500 border-t pt-6">
 <Verified className="h-10 mt-4
     w-10"/>  
  <p>
    
    All reviews are submitted by verified customers using their Clerk
    account. Each review is tied to a real email address to ensure
    authenticity and maintain trust in our community.
  </p>
</div>

    </div>
  );
}
