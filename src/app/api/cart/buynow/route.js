// app/api/cart/buynow/route.js
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  await connectDB();
  const user = await currentUser();
  if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { productId, name, price, image, qty } = await req.json();
  if (!productId || !name || !price || !qty)
    return Response.json({ message: "Missing fields" }, { status: 400 });

  // Create or replace "buynow" cart
  let cart = await Cart.findOne({ user: user.id });
  if (!cart) {
    cart = await Cart.create({
      user: user.id,
      items: [{ product: productId, name, price, image, qty }],
    });
  } else {
    // Clear existing items for buynow and add only this product
    cart.items = [{ product: productId, name, price, image, qty }];
    await cart.save();
  }

  return Response.json(cart.toObject(), { status: 200 });
}
