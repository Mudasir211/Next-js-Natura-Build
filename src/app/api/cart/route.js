// app/api/cart/route.js
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";

// GET: return user's cart
export async function GET(req) {
  await connectDB();
  const user = await currentUser();
  if (!user)
    return Response.json({ message: "Not authorized" }, { status: 401 });

  const cart = (await Cart.findOne({ user: user.id })) || { items: [] };
  return Response.json(cart, { status: 200 });
}

// POST: add/update item in cart
export async function POST(req) {
  await connectDB();
  const user = await currentUser();
  if (!user)
    return Response.json({ message: "Not authorized" }, { status: 401 });

  const { productId, name, price, image, attributes, qty } = await req.json();
  if (!productId || !name || !price || !qty)
    return Response.json({ message: "Missing fields" }, { status: 400 });

  let cart = await Cart.findOne({ user: user.id });
  if (!cart) {
    cart = await Cart.create({
      user: user.id,
      items: [{ product: productId, name, price, image, attributes, qty }],
    });
  } else {
    const existingItem = cart.items.find(
      (i) =>
        i.product.toString() === productId &&
        JSON.stringify(i.attributes || {}) === JSON.stringify(attributes || {})
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({
        product: productId,
        name,
        price,
        image,
        attributes,
        qty,
      });
    }
    await cart.save();
  }

  return Response.json(cart.toObject(), { status: 200 });
}

// DELETE: clear the cart
export async function DELETE(req) {
  await connectDB();
  const user = await currentUser();
  if (!user)
    return Response.json({ message: "Not authorized" }, { status: 401 });

  await Cart.deleteOne({ user: user.id });
  return Response.json({ message: "Cart cleared" }, { status: 200 });
}
