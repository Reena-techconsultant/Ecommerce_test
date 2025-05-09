"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.markupPrice * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you have not added any products to your cart yet.
          </p>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-emerald-600 font-medium">
                        ${item.markupPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>

            <Button
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-50"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (with markup)</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Original Price Total</span>
                <span>
                  $
                  {cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>${subtotal}</span>
              </div>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
