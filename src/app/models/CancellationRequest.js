import mongoose from "mongoose";

const CancellationRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    orderNumber: { type: String, required: true },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.CancellationRequest ||
  mongoose.model("CancellationRequest", CancellationRequestSchema);
