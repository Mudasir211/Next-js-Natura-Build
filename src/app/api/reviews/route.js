// /api/reviews/route.js
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  await connectDB();
  const url = new URL(req.url);
  const productId = url.searchParams.get("product");
  const query = productId ? { product: productId } : {};
  const reviews = await Review.find(query).sort({ createdAt: -1 });
  return new Response(JSON.stringify(reviews), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const { userId } = await auth();
  if (!userId)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  const body = await req.json();
  const { product: productId, rating, comment, name } = body;

  if (!productId || !rating || !name)
    return new Response(JSON.stringify({ message: "Missing fields" }), {
      status: 400,
    });

  // Check if user already reviewed this product using Clerk userId
  const existing = await Review.findOne({
    product: productId,
    user: userId,
  });
  if (existing)
    return new Response(
      JSON.stringify({ message: "You already reviewed this product" }),
      { status: 400 }
    );

  const review = await Review.create({
    product: productId,
    user: userId, // Use Clerk userId instead of email
    name,
    rating,
    comment,
  });

  return new Response(JSON.stringify(review), { status: 201 });
}

export async function PUT(req, { params }) {
  await connectDB();
  const { userId } = await auth();
  if (!userId)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  const body = await req.json();
  const review = await Review.findById(params.id);

  if (!review)
    return new Response(JSON.stringify({ message: "Review not found" }), {
      status: 404,
    });
  if (review.user !== userId)
    return new Response(
      JSON.stringify({ message: "Cannot edit others' reviews" }),
      { status: 403 }
    );

  review.rating = body.rating || review.rating;
  review.comment = body.comment || review.comment;
  review.name = body.name || review.name;

  await review.save();
  return new Response(JSON.stringify(review), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { userId } = await auth();
  if (!userId)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  const review = await Review.findById(params.id);
  if (!review)
    return new Response(JSON.stringify({ message: "Review not found" }), {
      status: 404,
    });
  if (review.user !== userId)
    return new Response(
      JSON.stringify({ message: "Cannot delete others' reviews" }),
      { status: 403 }
    );

  await review.deleteOne();
  return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
