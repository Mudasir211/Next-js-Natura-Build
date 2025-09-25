import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true },
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
