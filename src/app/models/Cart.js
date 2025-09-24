// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // <-- store Clerk user id
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        qty: Number,
        price: Number,
        image: String,
        attributes: Object,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
