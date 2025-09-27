"use client";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";

export default function ReviewImageUpload({ images, setImages }) {
  const handleRemove = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  return (
    <div className="space-y-3">
      <CldUploadWidget
        uploadPreset="ml_default"
        options={{
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result) => {
          if (result?.info?.secure_url) {
            if (images.length >= 4) {
              toast.error("Maximum 4 images allowed");
              return;
            }
            setImages((prev) => [...prev, result.info.secure_url]);
            toast.success("Image uploaded!");
          }
        }}
        onError={() => toast.error("Upload failed")}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}   // ✅ fixed here
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
          >
            <Upload size={18} /> Add Image
          </button>
        )}
      </CldUploadWidget>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded-lg overflow-hidden border"
            >
              <img
                src={url}
                alt="review"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
