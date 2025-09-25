import Image from "next/image";
import { Truck, Package, Clock, ShieldCheck } from "lucide-react";
import Logo from "../../assets/logo.png";

export const metadata = {
  title: "Delivery & Orders | Natura — Herbal, Organic & Wellness Products",
  description: "Learn about Natura's order processing, shipping methods, delivery times, and return/refund policies for natural and organic products.",
};

export default function DeliveryOrdersPage() {
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
            Delivery & <span className="text-yellow-300">Orders</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Everything you need to know about how we process, ship, and deliver your Natura orders.
          </p>
        </div>
      </section>

      {/* Key Steps Section */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-10">How Your Order is Processed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div className="p-6 bg-green-50 rounded-2xl shadow flex flex-col items-center">
            <Package className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="font-semibold text-lg">Order Received</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Once you place an order, we confirm it via email or WhatsApp.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow flex flex-col items-center">
            <Clock className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="font-semibold text-lg">Processing</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Orders are carefully packed and checked for quality before shipping.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow flex flex-col items-center">
            <Truck className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="font-semibold text-lg">Shipping</h3>
            <p className="text-gray-600 mt-2 text-sm">
              We ship across Pakistan via trusted delivery partners.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow flex flex-col items-center">
            <ShieldCheck className="w-10 h-10 text-green-700 mb-3" />
            <h3 className="font-semibold text-lg">Delivered Safely</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Your order arrives safely at your doorstep, ready to enjoy.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping & Delivery Details */}
      <section className="py-16 max-w-5xl mx-auto px-6 space-y-6">
        <h2 className="text-2xl font-bold text-green-800">Shipping Information</h2>
        <p className="text-gray-700">
          - Standard delivery takes 2–5 business days depending on location.<br/>
          - Orders are shipped Monday to Saturday, 10:00 AM – 6:00 PM.<br/>
          - You will receive a tracking number once your order is dispatched.<br/>
          - Shipping charges are calculated at checkout.
        </p>

        <h2 className="text-2xl font-bold text-green-800">Order Changes & Cancellations</h2>
        <p className="text-gray-700">
          - You can request changes or cancellations within 24 hours of placing the order.<br/>
          - Contact us via email or WhatsApp to modify your order.<br/>
           - For any issues, contact our support team at <a href="mailto:natura.pk1999@gmail.com" className="text-green-700 underline">natura.pk1999@gmail.com</a> or via WhatsApp.
        </p>

        
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <a
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-green-700 text-white px-6 py-3 font-semibold hover:bg-green-800 transition"
        >
          Explore Our Products
        </a>
      </section>
    </div>
  );
}
