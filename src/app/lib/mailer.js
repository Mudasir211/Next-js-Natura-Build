import nodemailer from "nodemailer";

export async function sendMail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    const mailOptions = {
      from: `Natura <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    return await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending mail:", err);
    throw err;
  }
}
