import Header from "../Header";
import Footer from "../Footer";
import Newsletter from "../NewsLetter";
import { CartProvider } from "../../app/context/CartContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CartProvider>
      <Header />
      {children}
      <Newsletter />
      <Footer />
      </CartProvider>
    </div>
  );
}
