"use client";
import { usePathname } from "next/navigation";
import RamadanSaleBanner from "@/components/RamadanSaleBanner";

export default function ConditionalRamadanBanner() {
  const pathname = usePathname();

  // Only show on homepage "/" or all-products page "/products"
  const shouldShow = pathname === "/" || pathname === "/products";

  if (!shouldShow) return null;

  return <RamadanSaleBanner />;
}