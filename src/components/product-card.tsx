import Image from "next/image";
import Link from "next/link";
import type { ProductType } from "@/lib/types";

export default function ProductCard({ product }: { product: ProductType }) {
  const sellingPrice = product.price * 1.25;
  const originalPrice = product.price;

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl">
        <div className="relative h-64">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="bg-green-300 text-black text-xs font-medium px-1.5 py-0.5 rounded">
              With Markup
            </span>
            <p className="text-emerald-600 font-bold">${sellingPrice}</p>
            <span className="bg-green-300 text-black text-xs font-medium px-1.5 py-0.5 rounded">
              Without Markup
            </span>
            <p className="text-lg text-emerald-600 font-bold">
              ${originalPrice}
            </p>
          </div>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
