import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import { currentUser } from "@clerk/nextjs/server";
import { sendMail } from "@/lib/mailer";
import {
  adminOrderNotificationTemplate,
  orderPlacedTemplate,
} from "@/lib/emailTemplates";

// GET - fetch user orders (or all if admin)
export async function GET(req) {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";

    if (isAdmin && user.publicMetadata?.role === "admin") {
      const allOrders = await Order.find({}).sort({ createdAt: -1 });
      return NextResponse.json(allOrders);
    }

    const orders = await Order.find({ user: user.id }).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST - create order
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      user,
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "No items in order" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      user,

      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    // clear user cart
    await Cart.deleteOne({ user });

    // --- EMAILS ---
    // 1. Admin notification
    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Order Placed - ${order._id}`,
      html: adminOrderNotificationTemplate(order),
    });

    // 2. User confirmation
    await sendMail({
      to: order.shippingAddress.email,
      subject: `Your Natura Order ${order._id} has been placed`,
      html: orderPlacedTemplate(order),
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to place order" },
      { status: 500 }
    );
  }
}
