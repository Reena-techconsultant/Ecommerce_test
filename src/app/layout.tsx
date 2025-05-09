import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/hooks/use-cart";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });


storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

export const metadata: Metadata = {
  title: "StoryShop - Quality Products",
  description: "Shop our collection of high-quality products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <CartProvider>
          <Navbar />
          <Toaster />
          <main>{children}</main>
          <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">E-Commerce</h3>
                  <p className="text-gray-400">
                    Quality products for every need.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>
                  &copy; {new Date().getFullYear()} E-commerce. All rights
                  reserved.
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
