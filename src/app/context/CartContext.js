"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCart({ items: data.items || [] }); // safe default
      } catch (err) {
        setCart({ items: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Add item to cart
  const addToCart = async (product, qty = 1) => {
    const existingItem = cart.items.find((i) => i.product === product._id);
    let newItems;

    if (existingItem) {
      newItems = cart.items.map((i) =>
        i.product === product._id ? { ...i, qty: i.qty + qty } : i
      );
    } else {
      newItems = [
        ...cart.items,
        {
          product: product._id,
          name: product.title,
          price: product.price,
          image: product.images[0],
          qty,
          attributes: { size: product.size },
        },
      ];
    }

    setCart({ items: newItems });
    await updateCartOnServer(newItems);
    toast.success("Cart updated!");
  };

  // Remove item
  const removeFromCart = async (productId) => {
    const newItems = cart.items.filter((i) => i.product !== productId);
    setCart({ items: newItems });
    await updateCartOnServer(newItems);
    toast.success("Item removed!");
  };

  // Update quantity
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;
    const newItems = cart.items.map((i) =>
      i.product === productId ? { ...i, qty } : i
    );
    setCart({ items: newItems });
    await updateCartOnServer(newItems);
  };

  // Clear cart
  const clearCart = async () => {
    setCart({ items: [] });
    await fetch("/api/cart", { method: "DELETE" });
    toast.success("Cart cleared!");
  };

  // Update cart on backend
  const updateCartOnServer = async (items) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
  };

  // Total price safely
  const totalPrice = (cart.items || []).reduce(
    (acc, i) => acc + (i.price || 0) * (i.qty || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
