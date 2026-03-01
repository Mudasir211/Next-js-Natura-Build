"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function AuthButtons() {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-in"
          className="px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition"
        >
          Sign In
        </Link>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}