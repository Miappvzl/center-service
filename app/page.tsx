import Navbar from "@/components/layout/Navbar";


import Hero from "@/components/sections/Hero";

import Sectores from "@/components/sections/Sectores";
import Metodologia from "@/components/sections/Metodologia";
import PruebaSocial from "@/components/sections/PruebaSocial";
import Faq from "@/components/sections/Faq"
import Contacto from "@/components/sections/Contacto"
import Footer from "@/components/layout/Footer"


   export default function Home() {
  return (
    // Quitamos 'bg-industrial-900', el fondo negro lo provee el layout y el fluido
    <main className="min-h-screen flex flex-col relative z-10">
      <Navbar />
      <Hero />
      <Sectores />
      <Metodologia />
      <PruebaSocial />
      <Faq />
      <Contacto />
      <Footer />
    </main>
  );
}