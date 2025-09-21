// app/api/orders/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req, { params }) {
  await connectDB();
  const user = await getUserFromRequest(req);
  if (!user)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  const order = await Order.findById(params.id);
  if (!order)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });

  // allow owner or admin
  if (!order.user.equals(user._id) && !user.isAdmin) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
    });
  }
  return new Response(JSON.stringify(order), { status: 200 });
}

export async function PUT(req, { params }) {
  await connectDB();
  const user = await getUserFromRequest(req);
  if (!user)
    return new Response(JSON.stringify({ message: "Not authorized" }), {
      status: 401,
    });

  const body = await req.json();
  const order = await Order.findById(params.id);
  if (!order)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });

  // Only admin can mark paid/delivered OR owner can mark paid if payment confirmation
  if (body.action === "markPaid") {
    order.isPaid = true;
    order.paidAt = new Date();
    await order.save();
    return new Response(JSON.stringify(order), { status: 200 });
  }

  if (body.action === "markDelivered" && user.isAdmin) {
    order.isDelivered = true;
    order.deliveredAt = new Date();
    await order.save();
    return new Response(JSON.stringify(order), { status: 200 });
  }

  return new Response(JSON.stringify({ message: "No action performed" }), {
    status: 400,
  });
}
