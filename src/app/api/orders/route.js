// app/api/orders/route.js
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import { getUserFromRequest } from "@/lib/auth";
import sendEmail from "@/lib/sendEmail";

export async function GET(req) {
  await connectDB();
  const user = await getUserFromRequest(req);
  if (!user)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  // if admin query param ?admin=true then return all orders
  const url = new URL(req.url);
  const admin = url.searchParams.get("admin") === "true";
  if (admin && user.isAdmin) {
    const all = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    return new Response(JSON.stringify(all), { status: 200 });
  }
  const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
  return new Response(JSON.stringify(orders), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const user = await getUserFromRequest(req);
  if (!user)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  const body = await req.json();
  // expect body: items, shippingAddress, paymentMethod, prices
  const order = await Order.create({
    user: user._id,
    items: body.items,
    shippingAddress: body.shippingAddress,
    paymentMethod: body.paymentMethod,
    itemsPrice: body.itemsPrice,
    shippingPrice: body.shippingPrice,
    taxPrice: body.taxPrice,
    totalPrice: body.totalPrice,
  });

  // clear cart
  await Cart.deleteOne({ user: user._id });

  // send confirmation email (best-effort)
  sendEmail({
    to: user.email,
    subject: `Order confirmation - ${order._id}`,
    text: `Thanks for your order! Order ID: ${order._id}`,
    html: `<p>Thanks for your order! Order ID: <strong>${order._id}</strong></p>`,
  }).catch(() => {});

  return new Response(JSON.stringify(order), { status: 201 });
}
