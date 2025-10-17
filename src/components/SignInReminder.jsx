"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SignInReminder() {
  const { isSignedIn } = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 30000); // 1 minute = 60000 ms
      return () => clearTimeout(timer);
    }
  }, [isSignedIn]);

  if (isSignedIn) return null;

  const handleSignIn = () => {
    setShowPopup(false);
    // add a tiny delay for animation before redirecting
    setTimeout(() => {
      router.push("/sign-in");
    }, 300);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-green-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Sign in for a Better Experience
            </h2>
            <p className="text-gray-600 mb-6">
              Track your orders live, save your favorites to cart, and enjoy a smoother shopping journey.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleSignIn}
                className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Not Now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
