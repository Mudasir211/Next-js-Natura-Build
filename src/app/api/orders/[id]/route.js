import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { currentUser } from "@clerk/nextjs/server";
import { sendMail } from "@/lib/mailer";
import { statusUpdateTemplate } from "@/lib/emailTemplates";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const order = await Order.findById(params.id);
    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    if (order.user !== user.id && user.publicMetadata?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const order = await Order.findById(params.id);
    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    // Only admin can update status
    if (body.status && user.publicMetadata?.role === "admin") {
      order.status = body.status;

      if (body.status === "Shipped") order.shippedAt = new Date();
      if (body.status === "Delivered") order.deliveredAt = new Date();
      if (body.status === "Cancelled") order.cancelledAt = new Date();

      // --- EMAIL user about status update ---
      await sendMail({
        to: order.shippingAddress.email,
        subject: `Your Natura Order ${order._id} is now ${body.status}`,
        html: statusUpdateTemplate(order, body.status),
      });
    }

    if (body.action === "markPaid") {
      order.isPaid = true;
      order.paidAt = new Date();
    }

    await order.save();
    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}
