import nodemailer from "nodemailer";
import { connectDB } from "@/app/lib/mongodb"; // your MongoDB connection helper
import Message from "@/models/Message";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Check if user already sent a message in last 24h
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existing = await Message.findOne({
      email,
      createdAt: { $gte: oneDayAgo },
    });

    if (existing) {
      return new Response(
        JSON.stringify({
          error: "You can only send one message every 24 hours.",
        }),
        { status: 429 }
      );
    }

    // Save the message in DB
    await Message.create({ name, email, subject, message });

    // Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Natura Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact Message: ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
          <div style="padding:20px;text-align:center;background:#ffffff;">
            <img src="https://res.cloudinary.com/dokusdeg3/image/upload/v1758715263/logo_zj8pjv.png" alt="Natura Logo" style="max-height:70px;margin-bottom:10px;">
            <h1 style="color:#1b5e20;margin:0;">New Contact Message</h1>
          </div>
          <div style="padding:20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), {
      status: 500,
    });
  }
}
