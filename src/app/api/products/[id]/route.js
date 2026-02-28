import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  const product = await Product.findById(id).populate("category");
  if (!product)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  return new Response(JSON.stringify(product), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;

  const user = await currentUser();

  if (!user || user.publicMetadata?.role !== "admin") {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  const body = await req.json();
  const updated = await Product.findByIdAndUpdate(id, body, {
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
  const { id } = await params;

  const user = await currentUser();

  if (!user || user.publicMetadata?.role !== "admin") {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  await Product.findByIdAndDelete(id);
  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
