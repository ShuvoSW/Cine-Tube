import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";


export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>

      <Navbar></Navbar>
      {children}
      <Footer></Footer>

    </div>
  );
}