// app/api/cart/route.js
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { getUserFromRequest } from "@/lib/auth";

/**
 * GET - get user's cart
 * POST - replace user's cart (client sends full cart object)
 * DELETE - clear cart
 */
export async function GET(req) {
  await connectDB();
  const user = await getUserFromRequest(req);
  if (!user)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  const cart = (await Cart.findOne({ user: user._id })) || { items: [] };
  return new Response(JSON.stringify(cart), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const user = await getUserFromRequest(req);
  if (!user)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  const body = await req.json();
  // body.items expected
  const updated = await Cart.findOneAndUpdate(
    { user: user._id },
    { user: user._id, items: body.items || [] },
    { upsert: true, new: true }
  );
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req) {
  await connectDB();
  const user = await getUserFromRequest(req);
  if (!user)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  await Cart.deleteOne({ user: user._id });
  return new Response(JSON.stringify({ message: "Cart cleared" }), {
    status: 200,
  });
}
