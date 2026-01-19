import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // <--- Importamos el Footer

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Workflow from "@/components/sections/Workflow";
import Trust from "@/components/sections/Trust";

export default function Home() {
  return (
    <main className="bg-industrial-900 min-h-screen selection:bg-electric selection:text-white flex flex-col">
      <Navbar />
      
      {/* SECCIONES PRINCIPALES */}
      <Hero />
      <Services />
      <Industries />
      <Workflow />
      <Trust />
      
      {/* CIERRE */}
      <Footer />
    </main>
  );
}