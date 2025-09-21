// lib/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User";
import { connectDB } from "./mongodb";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) throw new Error("Please set JWT_SECRET in .env");

export function signToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Get user from Authorization header "Bearer <token>" or cookie "token"
export async function getUserFromRequest(req) {
  await connectDB();
  let token = null;
  // Look for Authorization header
  try {
    const auth = req.headers.get("authorization");
    if (auth && auth.startsWith("Bearer ")) {
      token = auth.split(" ")[1];
    }
  } catch (e) {
    // headers.get may throw in some test contexts
  }

  // Fallback to cookie (serverless edge won't have cookie parsing)
  if (!token) {
    try {
      const cookie = req.headers.get("cookie") || "";
      const match = cookie.match(/token=([^;]+)/);
      if (match) token = match[1];
    } catch (e) {}
  }

  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    return user || null;
  } catch (err) {
    return null;
  }
}

// protect helper for route handlers (use inside GET/POST by calling getUserFromRequest)
export async function requireAuth(req) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return {
      error: true,
      response: new Response(JSON.stringify({ message: "Not authorized" }), {
        status: 401,
      }),
    };
  }
  return { error: false, user };
}
