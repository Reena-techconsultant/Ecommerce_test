import { getStoryblokApi } from "@storyblok/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/add-to-cart-button";
import type { ProductType } from "@/lib/types";

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
    starts_with: "products/",
  });

  return data.stories.map((story) => ({
    //@typescript-eslint/no-explicit-any
    slug: story.full_slug.replace("products/", ""),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "published",
    });

    console.log("Storyblok API response:", data);

    const story = data.story;

    const product: ProductType = {
      id: story.uuid,
      slug: story.full_slug,
      name: story.content.name || story.name,
      price: Number.parseFloat(story.content.price) || 0,
      description:
        typeof story.content.description === "string"
          ? story.content.description
          : story.content.description?.content?.[0]?.content?.[0]?.text || "",
      image: story.content.image || "/placeholder.svg?height=600&width=600",
    };

    const sellingPrice = product.price * 1.25;
    const originalPrice = product.price;

    if (product.image && product.image.startsWith("//")) {
      product.image = "https:" + product.image;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
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
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                Description
              </h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-4">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
