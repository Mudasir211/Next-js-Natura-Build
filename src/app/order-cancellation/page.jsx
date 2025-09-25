"use client";

import Image from "next/image";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { User, AtSign, FileText, Send, Phone } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../../assets/logo.png";



export default function OrderCancellationPage() {
  const [loading, setLoading] = useState(false);
  const { user, isSignedIn } = useUser();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("You must be logged in to submit a cancellation request.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Force email from Clerk
    data.email = user?.primaryEmailAddress?.emailAddress;

    const res = await fetch("/api/cancel-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Your cancellation request has been submitted!");
      e.target.reset();
    } else {
      const err = await res.json();
      toast.error(err.error || "Failed to submit request.");
    }
  }

  return (
    <div className="bg-gray-50 py-14 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src={Logo}
            alt="Natura Logo"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Order <span className="text-yellow-300">Cancellation</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Submit your request to cancel an order. Please review our
            cancellation policy before submitting.
          </p>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="rounded-2xl bg-green-50 shadow p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Cancellation Policy
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Orders can only be cancelled <strong>before they are shipped</strong>.
            </li>
            <li>
              Requests should be submitted within <strong>24 hours</strong> of
              placing the order.
            </li>
            <li>
              Fill out the form below with accurate details to request a
              cancellation.
            </li>
            <li>
              Our team will confirm your request via email or WhatsApp within 1
              business day.
            </li>
            <li>
              Refunds (if applicable) will be processed after confirmation and
              may take 3–5 business days.
            </li>
            <li>
              For questions, contact us at{" "}
              <a
                href="mailto:natura.pk1999@gmail.com"
                className="text-green-700 underline"
              >
                natura.pk1999@gmail.com
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      {/* Cancellation Form */}
      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="rounded-2xl bg-white shadow-sm p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Cancellation Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full rounded-lg border bg-white px-10 py-3 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

<div className="relative">
              <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Phone No"
                
                className="w-full rounded-lg border bg-gray-100 px-10 py-3 text-gray-600 "
              />
            </div>

            {/* Email (Clerk, disabled) */}
            <div className="relative">
              <AtSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="email"
                type="email"
                value={user?.primaryEmailAddress?.emailAddress || ""}
                readOnly
                disabled
                className="w-full rounded-lg border bg-gray-100 px-10 py-3 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Order Id */}
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                name="orderNumber"
                type="text"
                placeholder="Order Id"
                required
                className="w-full rounded-lg border bg-white px-10 py-3 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Reason */}
            <textarea
              name="reason"
              rows={5}
              placeholder="Reason for cancellation..."
              required
              className="w-full rounded-lg border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
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
              {loading
                ? "Submitting..."
                : isSignedIn
                ? "Submit Request"
                : "Login to Submit"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
