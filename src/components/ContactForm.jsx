"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // ✅ Clerk hook
import toast from "react-hot-toast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { user, isSignedIn } = useUser();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("You must be logged in to send a message");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Override email from Clerk (ignore any tampering)
    data.email = user?.primaryEmailAddress?.emailAddress;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Message sent successfully!");
      e.target.reset();
    } else {
      const err = await res.json();
      toast.error(err.error || "Failed to send. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {/* Name */}
      <input
        name="name"
        placeholder="Full Name"
        className="w-full border px-4 py-3 rounded-lg"
        required
      />

      {/* Email (readonly, comes from Clerk) */}
      <input
        name="email"
        type="email"
        value={user?.primaryEmailAddress?.emailAddress || ""}
        readOnly
        disabled
        className="w-full border px-4 py-3 rounded-lg bg-gray-100 cursor-not-allowed"
      />

      {/* Subject */}
      <input
        name="subject"
        placeholder="Subject"
        className="w-full border px-4 py-3 rounded-lg"
        required
      />

      {/* Message */}
      <textarea
        name="message"
        rows={5}
        placeholder="Message"
        className="w-full border px-4 py-3 rounded-lg"
        required
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !isSignedIn}
        className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition ${
          isSignedIn
            ? "bg-green-700 text-white hover:bg-green-800"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        <Send className="w-5 h-5" />
        {loading ? "Sending..." : isSignedIn ? "Send Message" : "Login to Send"}
      </button>
    </form>
  );
}
