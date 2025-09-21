import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    images: [{ type: String, required: true }], // up to 6
    ingredients: { type: [String], default: [] },
    howToUse: { type: String },
    category: { type: String, required: true },
    bestseller: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    discountPercentage: { type: Number, default: 0 },
    cuttedPrice: { type: Number },
    price: { type: Number, required: true },
    size: { type: String },
  },
  { timestamps: true } // 👈 force correct collection name
);

// if already compiled, use it, else create new
export default mongoose.models.Products ||
  mongoose.model("Products", productSchema);
