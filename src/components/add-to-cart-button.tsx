"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductType } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: ProductType }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    console.log("added");
    addToCart(product);
    toast.success("Added to cart");
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={`w-full ${
        added
          ? "bg-green-600 hover:bg-green-700"
          : "bg-emerald-600 hover:bg-emerald-700"
      }`}
    >
      {added ? (
        <>
          <Check className="h-5 w-5 mr-2" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
