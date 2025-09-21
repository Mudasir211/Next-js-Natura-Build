// app/sign-up/[[...sign-up]]/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex items-center py-10 flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <h1 className="text-3xl my-5 font-bold text-green-800">
        Welcome to <span className="text-green-700">NATURA.PK</span>
      </h1>
      <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md text-center">
        Join <span className="text-green-700 font-semibold">Natura</span> and
        start your natural wellness journey 🌿
      </p>

      {/* Clerk Sign Up Form */}
      <SignUp
        appearance={{
          elements: {
            card: "shadow-lg rounded-2xl border border-green-200 bg-white/80 backdrop-blur-sm p-6",
            headerTitle: "text-xl font-bold text-green-800 text-center",
            headerSubtitle: "text-sm text-gray-600 text-center",
            formFieldLabel: "text-green-800 font-semibold",
            formFieldInput:
              "rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500",
            formButtonPrimary:
              "bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg shadow-md transition",
            footerActionText: "text-gray-600 text-sm",
            footerActionLink:
              "text-green-700 font-semibold hover:underline hover:text-green-800",
          },
        }}
      />

      {/* Already have an account */}
      <p className="mt-6 text-gray-600 text-sm">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-green-700 font-semibold hover:underline hover:text-green-800"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
