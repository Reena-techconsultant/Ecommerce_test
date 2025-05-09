"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function Navbar() {
  const { cart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartItemsCount = isClient
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-emerald-600">
            E-commerce
          </Link>

          <div className="flex items-center">
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
