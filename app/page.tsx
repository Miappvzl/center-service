import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // <--- Importamos el Footer

import Hero from "@/components/sections/Hero";

import Sectores from "@/components/sections/Sectores";
import Metodologia from "@/components/sections/Metodologia";
import PruebaSocial from "@/components/sections/PruebaSocial";

export default function Home() {
  return (
    <main className="bg-industrial-900 min-h-screen selection:bg-electric selection:text-white flex flex-col">
      <Navbar />
      
      {/* SECCIONES PRINCIPALES */}
      <Hero />
      <Sectores/>
      <Metodologia/>
      <PruebaSocial/>
   
      
      {/* CIERRE */}
      <Footer />
    </main>
  );
}