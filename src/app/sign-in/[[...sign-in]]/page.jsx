// app/sign-in/[[...sign-in]]/page.tsx

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex items-center py-20 flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
      {/* Header */}
      <h1 className="text-2xl my-5 text-green-900">
        Sign in to{" "}
        <span className="text-green-700 font-bold">NATURA</span>
        <span className="text-emerald-500 font-bold">.PK</span>
      </h1>

      {/* Sign In Form */}
      <SignIn
      signUpUrl="/sign-up"      // your custom sign-up page
  signInUrl="/sign-in"  
        appearance={{
          elements: {
            card:
              "shadow-xl rounded-2xl border border-green-200 bg-white/90 backdrop-blur-sm",
            headerTitle: "text-2xl font-semibold text-green-800 text-center",
            formFieldInput:
              "rounded-md border-green-300 focus:border-green-500 focus:ring-green-500",
            formButtonPrimary:
              "bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors",
              
          },
        }}
      />

      {/* Sign Up Option */}
      <p className="mt-6 text-green-700 text-sm">
        Don’t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-emerald-600 font-semibold hover:underline hover:text-emerald-700"
        >
          Sign up here
        </Link>
      </p>

     
    </div>
  );
}
