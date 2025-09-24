// app/api/cart/[productId]/route.js
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req, { params }) {
  await connectDB();
  const user = await currentUser();
  if (!user)
    return Response.json({ message: "Not authorized" }, { status: 401 });

  const { qty } = await req.json();
  const cart = await Cart.findOne({ user: user.id });
  if (!cart)
    return Response.json({ message: "Cart not found" }, { status: 404 });

  const item = cart.items.find(
    (i) => i.product.toString() === params.productId
  );
  if (!item)
    return Response.json({ message: "Item not found" }, { status: 404 });

  if (qty <= 0) {
    cart.items = cart.items.filter(
      (i) => i.product.toString() !== params.productId
    );
  } else {
    item.qty = qty;
  }

  await cart.save();
  return Response.json(cart.toObject(), { status: 200 });
}
