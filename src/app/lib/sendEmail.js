// lib/sendEmail.js
import nodemailer from "nodemailer";

const HOST = process.env.SMTP_HOST;
const PORT = process.env.SMTP_PORT;
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;

if (!HOST || !USER || !PASS) {
  console.warn("SMTP not fully configured. Emails won't be sent.");
}

export default async function sendEmail({ to, subject, text, html }) {
  if (!HOST || !USER || !PASS) {
    console.log("sendEmail skipped (no SMTP).", { to, subject });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: HOST,
    port: Number(PORT) || 587,
    secure: Number(PORT) === 465,
    auth: { user: USER, pass: PASS },
  });

  await transporter.sendMail({
    from: USER,
    to,
    subject,
    text,
    html,
  });
}
