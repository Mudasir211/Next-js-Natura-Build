import CheckoutClient from "@/components/CheckoutClient";

// app/checkout/page.js (server component)
export default async function CheckoutPage({ searchParams }) {
    const params = await searchParams;
  return <CheckoutClient mode={params.mode} />;
}
