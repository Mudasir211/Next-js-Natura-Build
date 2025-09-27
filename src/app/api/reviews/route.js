import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  await connectDB();
  const url = new URL(req.url);
  const productId = url.searchParams.get("product");
  const query = productId ? { product: productId } : {};
  const reviews = await Review.find(query).sort({ createdAt: -1 });
  return Response.json(reviews, { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const user = await currentUser();
  if (!user)
    return Response.json({ message: "Not authorized" }, { status: 401 });

  const {
    product: productId,
    rating,
    comment,
    name,
    userEmail,
    title,
    images,
  } = await req.json();

  if (!productId || !rating || !name || !title) {
    return Response.json({ message: "Missing fields" }, { status: 400 });
  }

  const existing = await Review.findOne({ product: productId, user: user.id });
  if (existing) {
    return Response.json(
      { message: "You already reviewed this product" },
      { status: 400 }
    );
  }

  const review = await Review.create({
    product: productId,
    user: user.id,
    name,
    userEmail,
    title,
    rating,
    comment,
    images: images || [], // ✅ store images
  });

  return Response.json(review.toObject(), { status: 201 });
}
