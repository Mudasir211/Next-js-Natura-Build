import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req, { params }) {
  await connectDB();
  const user = await currentUser();
  if (!user)
    return Response.json({ message: "Not authorized" }, { status: 401 });

  const body = await req.json();
  const review = await Review.findById(params.id);

  if (!review)
    return Response.json({ message: "Review not found" }, { status: 404 });
  if (review.user !== user.id)
    return Response.json(
      { message: "Cannot edit others' reviews" },
      { status: 403 }
    );

  review.rating = body.rating ?? review.rating;
  review.comment = body.comment ?? review.comment;
  review.name = body.name ?? review.name;
  review.title = body.title ?? review.title;
  review.images = body.images ?? review.images; // ✅ update images

  await review.save();
  return Response.json(review.toObject(), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectDB();
  const user = await currentUser();
  if (!user)
    return Response.json({ message: "Not authorized" }, { status: 401 });

  const review = await Review.findById(params.id);
  if (!review)
    return Response.json({ message: "Review not found" }, { status: 404 });
  if (review.user !== user.id)
    return Response.json(
      { message: "Cannot delete others' reviews" },
      { status: 403 }
    );

  await review.deleteOne();
  return Response.json({ message: "Deleted" }, { status: 200 });
}
