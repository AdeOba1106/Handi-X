import "./globals.css";
import Hero from "./components/home/Hero"
import Services from "./components/home/Services";
import Navbar from "./components/common/Navbar";
import Portfolio from "./components/home/Portfolio";
import Testimonials from "./components/home/Testimonials";
import Team from "./components/home/Team";
import Contact from "./components/home/Contact";
import Footer from "./components/common/Footer";
import FAQ from "./components/home/FAQ";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Hero/>
        <Services />
        <Portfolio/>
       <Testimonials/>
       <Team/>
       <FAQ/>
       <Contact/>
        <Footer />
        {children}
      </body>
    </html>
  );
}