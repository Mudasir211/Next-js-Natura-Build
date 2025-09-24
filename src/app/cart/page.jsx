import CartDrawer from "@/components/CartDrawer";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Your Cart</h1>
      <CartDrawer />
    </div>
  );
}
