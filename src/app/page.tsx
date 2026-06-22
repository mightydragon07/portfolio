import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Separator from "@/components/Separator";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Separator />
      <About />
      <Separator />
      <Projects />
      <Separator />
      <Contact />
      <Footer />
    </main>
  );
}
