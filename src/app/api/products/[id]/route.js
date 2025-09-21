// app/api/products/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  await connectDB();
  const product = await Product.findById(params.id).populate("category");
  if (!product)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  return new Response(JSON.stringify(product), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  if (!updated)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
