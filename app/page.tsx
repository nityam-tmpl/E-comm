import TopSelling from "../components/TopSelling";
import Hero from "../components/Hero";
import BrandStrip from "../components/Slider";
import NewArrivals from "../components/NewArrivals";
import type { Product } from "./types/product";
import DressStyle from "../components/DressStyle";
import CustomerReviews from "../components/CustomerReviews";

export default async function Home() {
  let products: Product[] = [];

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await response.json();
  } catch (error) {
    console.error("Product API error:", error);
  }

  return (
    <main>
      <Hero />
      <BrandStrip />

      <NewArrivals products={products} />
      <TopSelling products={products} />
      <DressStyle />
      <CustomerReviews />
     
    </main>
  );
}
