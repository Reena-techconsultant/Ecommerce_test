import { getStoryblokApi } from "@storyblok/react";
import ProductCard from "@/components/product-card";
import type { ProductType } from "@/lib/types";

export default async function Home() {
  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    throw new Error("Storyblok API not initialized properly");
  }

  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
  });

  console.log("Storyblok API response:", data.stories);

  if (!data?.stories || data.stories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Our Products</h1>
        <p className="text-gray-600 mb-8">
          No products found. Please add products in Storyblok.
        </p>
      </div>
    );
  }

  const products = data.stories.map((story) => {
    //@typescript-eslint/no-explicit-any
    let imageUrl = story.content.image || "/placeholder.svg";

    if (imageUrl.startsWith("//")) {
      imageUrl = "https:" + imageUrl;
    }

    return {
      id: story.content._uid,
      slug: story.full_slug,
      name: story.name,
      price: story.content.price,
      description: story.content.description.content[0].content[0].text,
      image: imageUrl,
    };
  }) as ProductType[];

  console.log("Mapped products:", products);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Our Products</h1>
      <p className="text-gray-600 mb-8">
        Discover our high-quality selection of products
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
}
