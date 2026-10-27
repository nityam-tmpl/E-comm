import Header from "../Header";
import Footer from "../Footer";
import Newsletter from "../NewsLetter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Newsletter />
      <Footer />
    </div>
  );
}
