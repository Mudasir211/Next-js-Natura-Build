import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // Clerk userId
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        qty: Number,
        price: Number,
        image: String,
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },

      street: { type: String, required: true },
      house: { type: String, required: true },

      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, default: "COD" },
    itemsPrice: Number,
    shippingPrice: Number,
    taxPrice: Number,
    totalPrice: Number,

    // Status lifecycle
    status: {
      type: String,
      enum: ["Placed", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },
    placedAt: { type: Date, default: Date.now },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
