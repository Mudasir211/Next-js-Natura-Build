import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

export async function POST() {
  // Debug logs (will show in your terminal, not browser)
  console.log("Cloud name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log("API key:", process.env.CLOUDINARY_API_KEY);
  console.log("API secret exists:", !!process.env.CLOUDINARY_API_SECRET);

  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: "Missing Cloudinary API credentials" },
      { status: 500 }
    );
  }

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET
  );

  return NextResponse.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY, // 👈 next-cloudinary needs this
  });
}
