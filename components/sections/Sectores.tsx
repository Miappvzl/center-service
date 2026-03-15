// src/components/sections/Sectores.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image"; // ⚡ IMPORTACIÓN CRÍTICA PARA RENDIMIENTO

// --- DATA DEL CLIENTE INTEGRADA AL NUEVO DISEÑO ---
const sectors = [
  {
    id: "01",
    title: "REFRIGERACIÓN COMERCIAL E INDUSTRIAL",
    subtitle: "COD: IND-HVAC",
    description: "Mantenimiento preventivo y correctivo a vitrinas exhibidoras, máquinas de hielo, cuartos fríos, túneles de congelación y torres de enfriamiento. Protocolos de parada técnica.",
    image: "/images/services/foto1 (5).webp",
    tags: ["Cuartos Fríos", "Torres de Enfriamiento", "Túneles de Congelación"]
  },
  {
    id: "02",
    title: "CLIMATIZACIÓN INTEGRAL",
    subtitle: "COD: COM-VRF",
    description: "Mantenimiento preventivo y correctivo desde unidades tipo split residencial hasta equipos VRF/VRV, sistemas de precisión y edificios corporativos, chillers y ambientes críticos.",
    image: "/images/services/foto1 (2).webp",
    tags: ["Equipos VRF/VRV", "Chillers", "Sistemas de Precisión"]
  },
  {
    id: "03",
    title: "AUTOMATIZACIÓN INTELIGENTE",
    subtitle: "COD: SYS-AUTO",
    description: "Monitoreo remoto y control inteligente de temperatura en tiempo real. Gestión centralizada para garantizar continuidad operativa y eficiencia.",
    image: "/images/services/foto1 (3).webp",
    tags: ["Monitoreo Remoto", "Control BMS", "Tiempo Real"]
  },
  {
    id: "04",
    title: "PROYECTOS DE INGENIERÍA",
    subtitle: "COD: ENG-AUDIT",
    description: "Proyectos HVAC integrales. Cálculo de carga térmica, selección de equipos, unidades manejadoras de aire y cumplimiento estricto de normativas ASHRAE.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2670&auto=format&fit=crop",
    tags: ["Cálculo Térmico", "Selección de Equipos", "Normas ASHRAE"]
  }
];

export default function Sectores() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-40 bg-[#050505] text-white border-t border-white/5" id="sectores">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* COLUMNA IZQUIERDA: Header Sticky */}
          {/* Añadimos gpu-accelerated para que el sticky no cause repaints costosos */}
          <div className="lg:col-span-4 flex flex-col items-start lg:sticky lg:top-32 h-fit gpu-accelerated">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 font-mono text-[10px] md:text-xs text-white/70 font-bold tracking-[0.2em] uppercase mb-6 border border-white/10 bg-[#0A0A0A] px-4 py-2 rounded-sm backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
                Capacidad Instalada
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                Soluciones de<br />
                <span className="text-[#00A3FF]">Alto Rendimiento.</span>
              </h2>
              
              <p className="mt-6 text-white/50 font-medium text-sm md:text-base max-w-sm leading-relaxed">
                Desplegamos ingeniería especializada y protocolos técnicos rigurosos para garantizar la estabilidad térmica de sus operaciones críticas.
              </p>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Acordeón Interactivo */}
          <div className="lg:col-span-8 flex flex-col border-t border-white/10">
            {sectors.map((sector, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div 
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/10 flex flex-col gpu-accelerated"
                >
                  {/* BOTÓN DEL ACORDEÓN */}
                  <button 
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full py-8 md:py-12 flex items-center justify-between group text-left focus:outline-none"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-baseline gap-4 md:gap-8 pr-4">
                      <span className={`font-mono text-sm md:text-lg font-medium transition-colors duration-300 ${isActive ? 'text-[#00A3FF]' : 'text-white/20 group-hover:text-[#00A3FF]'}`}>
                        {sector.id}
                      </span>
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white uppercase" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                        {sector.title}
                      </h3>
                    </div>
                    
                    <motion.div 
                      animate={{ rotate: isActive ? 45 : 0 }}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-colors duration-300 shrink-0 ${isActive ? 'border-[#00A3FF] text-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.2)]' : 'border-white/20 text-white/50 group-hover:border-[#00A3FF] group-hover:text-[#00A3FF]'}`}
                    >
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                  </button>

                  {/* CONTENIDO EXPANDIBLE */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Ligeramente más rápido para que no haya lag
                        className="overflow-hidden"
                      >
                        <div className="pb-12 pt-2 flex flex-col md:flex-row gap-8 md:gap-12 pl-0 md:pl-16 md:pr-4">
                          
                          {/* Info del Sector */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-mono text-xs uppercase tracking-widest text-[#00A3FF] font-bold mb-3">
                                {sector.subtitle}
                              </h4>
                              <p className="text-white/60 font-medium leading-relaxed mb-6">
                                {sector.description}
                              </p>
                            </div>
                            
                            {/* Tags Dinámicos */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                              {sector.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 text-white/60 font-mono text-[10px] uppercase tracking-wider border border-white/5">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* IMAGEN ULTRA-OPTIMIZADA CON NEXT/IMAGE */}
                          {/* Envolvemos en un contenedor relative con aspect ratio forzado */}
                          <div className="w-full md:w-5/12 aspect-[4/3] md:aspect-square bg-[#0A0A0A] overflow-hidden relative group border border-white/5 gpu-accelerated rounded-sm">
                            
                           <Image 
  src={sector.image} 
  alt={`Servicio ${sector.title}`}
  fill
  sizes="(max-width: 768px) 100vw, 33vw" 
  className="object-cover filter grayscale opacity-60 contrast-125 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
/>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none"></div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}