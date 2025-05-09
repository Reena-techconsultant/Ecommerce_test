# E-commerce with Storyblok and Next.js

This is a modern e-commerce application built with Next.js 15 and Storyblok CMS.

## Overview

This project demonstrates a simple e-commerce store with the following features:

- Product catalog powered by Storyblok CMS
- Product listing and detail pages
- Shopping cart functionality
- Responsive design with Tailwind CSS

## Technical Details

### Content Management

- Products are stored in Storyblok CMS
- Product data is fetched using the Storyblok SDK
- Each product has name, price, description, and image fields

### Frontend

- Built with Next.js 15 App Router
- Responsive UI with Tailwind CSS
- Client-side cart functionality with React Context
- Toast notifications for user feedback

### Cart Features

- Add products to cart
- Remove products from cart
- Update product quantities
- Persistent cart (saved to localStorage)
- Display both original and markup prices (25% markup)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with your Storyblok access token:

```
STORYBLOK_ACCESS_TOKEN=your_access_token_here
```

## Storyblok Setup

1. Create a Storyblok space
2. Create a "Product" content type with fields for name, price, description, and image
3. Add products to your space
4. Publish your products to make them visible in the app
