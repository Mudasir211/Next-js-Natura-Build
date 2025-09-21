// app/api/categories/route.js
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  const cats = await Category.find({}).sort({ name: 1 });
  return new Response(JSON.stringify(cats), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const cat = await Category.create(body);
  return new Response(JSON.stringify(cat), { status: 201 });
}
