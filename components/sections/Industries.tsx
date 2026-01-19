"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Activity, Factory, Building2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const industries = [
  {
    id: "datacenter",
    title: "Data Centers",
    subtitle: "Refrigeración de Precisión",
    description: "Control estricto de humedad y temperatura para servidores. Reducción del PUE (Power Usage Effectiveness) y redundancia N+1.",
    icon: Server,
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2668&auto=format&fit=crop", 
  },
  {
    id: "healthcare",
    title: "Salud & Clínicas",
    subtitle: "Calidad de Aire (IAQ)",
    description: "Filtración HEPA y control de presión positiva para quirófanos y laboratorios. Cumplimiento de normativa sanitaria.",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2535&auto=format&fit=crop", 
  },
  {
    id: "industry",
    title: "Manufactura",
    subtitle: "Procesos Industriales",
    description: "Enfriamiento de maquinaria crítica y confort para grandes naves industriales. Mantenimiento de chillers de proceso.",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2574&auto=format&fit=crop", 
  },
  {
    id: "corporate",
    title: "Corporativo",
    subtitle: "Edificios Inteligentes",
    description: "Sistemas VRF centralizados para oficinas y retail. Balance entre confort térmico y eficiencia energética.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop", 
  },
];

export default function Industries() {
  const [activeId, setActiveId] = useState<string>("datacenter");

  return (
    <section id="sectores" className="py-24 bg-industrial-900 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4">
        
        {/* HEADER */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
             <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-electric text-xs font-mono tracking-widest uppercase mb-4 block"
            >
              SECTORES DE APLICACIÓN
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white"
            >
              Infraestructura <span className="text-white/40">Crítica</span>
            </motion.h2>
          </div>
          
          <div className="hidden md:block">
            <p className="text-engine-200 text-sm max-w-xs text-right">
              Adaptamos nuestros protocolos de ingeniería a la normativa específica de su industria.
            </p>
          </div>
        </div>

        {/* ACORDEÓN INTERACTIVO */}
        <div className="flex flex-col lg:flex-row gap-2 h-[600px] lg:h-[500px]">
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              layout 
              onClick={() => setActiveId(industry.id)}
              onMouseEnter={() => setActiveId(industry.id)}
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-white/10 group",
                activeId === industry.id ? "lg:flex-[3] flex-[3]" : "lg:flex-[1] flex-[1] grayscale hover:grayscale-0"
              )}
            >
              {/* 1. IMAGEN DE FONDO (Capa Base) */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 group-hover:scale-110 z-0"
                style={{ backgroundImage: `url(${industry.image})` }}
              ></div>

              {/* 2. EL GRADIENTE "SCRIM" (Capa Intermedia de Contraste) */}
              {/* CAMBIO CLAVE: Usamos 'h-3/4' y 'bottom-0' para concentrar el negro ABAJO */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 h-3/4 z-10 transition-opacity duration-500",
                activeId === industry.id 
                  // Gradiente agresivo: Empieza negro puro, sube negro al 80%, y termina transparente
                  ? "bg-gradient-to-t from-black via-black/80 to-transparent opacity-100" 
                  : "bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90"
              )}></div>

              {/* 3. CONTENIDO (Capa Superior) */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                
                {/* Icono y Flecha */}
                <div className="flex items-center justify-between mb-2">
                   <div className={cn(
                     "p-2 rounded-lg backdrop-blur-md border border-white/20 transition-colors duration-300 relative z-30",
                     activeId === industry.id ? "bg-electric text-white" : "bg-black/40 text-white/70"
                   )}>
                      <industry.icon size={24} strokeWidth={1.5} />
                   </div>
                   
                   <motion.div 
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: activeId === industry.id ? 1 : 0, scale: activeId === industry.id ? 1 : 0 }}
                     className="p-2 rounded-full bg-white/10 text-white relative z-30"
                   >
                     <ArrowUpRight size={20} />
                   </motion.div>
                </div>

                {/* Título */}
                <h3 className={cn(
                  "font-bold text-white transition-all duration-300 relative z-30 drop-shadow-lg", // Drop shadow extra
                  activeId === industry.id ? "text-3xl mb-1" : "text-xl lg:text-lg lg:-rotate-90 lg:origin-bottom-left lg:absolute lg:bottom-20 lg:left-6 lg:mb-0 mb-0"
                )}>
                  {industry.title}
                </h3>

                {/* Texto Expandible */}
                <div className={cn(
                   "overflow-hidden transition-all duration-500 ease-in-out relative z-30",
                   activeId === industry.id ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                )}>
                  <p className="text-electric font-mono text-xs uppercase tracking-wider mb-2 font-bold">
                    {industry.subtitle}
                  </p>
                  <p className="text-gray-200 text-sm leading-relaxed max-w-md drop-shadow-md font-medium"> 
                    {industry.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}