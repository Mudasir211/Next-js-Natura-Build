// app/api/categories/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const cat = await Category.findByIdAndUpdate(id, body, { new: true });
  return new Response(JSON.stringify(cat), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;

  await Category.findByIdAndDelete(id);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
