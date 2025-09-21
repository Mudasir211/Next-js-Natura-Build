"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";

export default function ProductImageUpload({ images, setImages }) {
  const handleRemove = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  return (
    <div className="space-y-4">
      {/* Upload Widget */}
      <CldUploadWidget
        uploadPreset="ml_default" // make sure this preset exists in Cloudinary settings
        options={{
          multiple: false, // only one at a time
          maxFiles: 6,
        }}
        onSuccess={(result) => {
          if (result?.info?.secure_url) {
            setImages((prev) => [...prev, result.info.secure_url]);
            toast.success("Image uploaded!");
          }
        }}
        onError={() => toast.error("Upload failed")}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => {
              if (images.length >= 6) {
                toast.error("Max 6 images allowed");
                return;
              }
              open();
            }}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-medium rounded-xl shadow-md flex items-center gap-2 transition"
          >
            <Upload size={18} />
            Upload Images
          </button>
        )}
      </CldUploadWidget>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {images.map((url, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden shadow-md border border-green-200 "
            >
              <img src={url} alt="product" className="object-cover w-40 h-60" />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
