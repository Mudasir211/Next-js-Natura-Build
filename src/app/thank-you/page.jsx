"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center space-y-6">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="flex justify-center"
        >
          <CheckCircle className="w-20 h-20 text-green-600" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-green-800"
        >
          Thank You for Your Order!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600"
        >
          We’ve received your order and will start processing it right away.
          You’ll get updates in your email.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 text-white font-medium shadow-md hover:bg-green-700 transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-green-600 text-green-700 font-medium shadow-md hover:bg-green-50 transition"
          >
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}
