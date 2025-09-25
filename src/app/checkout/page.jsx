import CheckoutClient from "@/components/CheckoutClient";

// app/checkout/page.js (server component)
export default function CheckoutPage({ searchParams }) {
    
  return <CheckoutClient mode={searchParams.mode} />;
}
