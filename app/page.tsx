import TopSelling from "./components/TopSelling";
import Hero from "../app/components/Hero";
import BrandStrip from "../app/components/Slider";
import NewArrivals from "../app/components/NewArrivals";
import type { Product } from "../app/types/product";
import DressStyle from "./components/DressStyle";
import CustomerReviews from "./components/CustomerReviews";
import Newsletter from "./components/NewsLetter";




export default async function Home() {
  let products: Product[] = [];

  try {
    const response = await fetch(
      "https://fakestoreapi.com/products",
      { next: { revalidate: 3600 } }
    );

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
    <DressStyle/>
    <CustomerReviews/>
    <Newsletter/>
    </main>
  );
}
