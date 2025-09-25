// app/api/cancel-order/route.js
import { connectDB } from "@/lib/mongodb";
import nodemailer from "nodemailer";
import CancellationRequest from "@/models/CancellationRequest"; // create model

export async function POST(req) {
  try {
    await connectDB();

    const { name, phone, email, orderNumber, reason } = await req.json();

    if (!name || !phone || !email || !orderNumber || !reason) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Prevent duplicate requests in 24h
    const existing = await CancellationRequest.findOne({
      email,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (existing) {
      return new Response(
        JSON.stringify({
          error: "You already submitted a cancellation in the last 24h.",
        }),
        { status: 429 }
      );
    }

    // Save request in DB
    const request = await CancellationRequest.create({
      name,
      email,
      phone,
      orderNumber,
      reason,
    });

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Notify Admin
    await transporter.sendMail({
      from: `"Natura Cancellation" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🚨 Cancellation Request for Order ${orderNumber}`,
      html: `
        <h2>New Order Cancellation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Order ID:</strong> ${orderNumber}</p>
        <p><strong>Reason:</strong><br/>${reason}</p>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `,
    });

    // 2. Confirm to Customer
    await transporter.sendMail({
      from: `"Natura Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your cancellation request (Order ${orderNumber})`,
      html: `
        <h2>Hi ${name},</h2>
        <p>We’ve received your cancellation request for order <strong>${orderNumber}</strong>.</p>
        <p>Our team will review and confirm via email/WhatsApp within 1 business day.</p>
        <p>If you have any urgent questions, please contact us at 
        <a href="mailto:${process.env.ADMIN_EMAIL}">${process.env.ADMIN_EMAIL}</a>.</p>
        <br/>
        <p>Thank you,<br/>Team Natura 🌱</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Cancellation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process cancellation" }),
      {
        status: 500,
      }
    );
  }
}
