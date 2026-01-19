"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, Variants } from "framer-motion";
import { Snowflake, Fan, Activity, Cpu, Zap, ArrowUpRight, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// --- DATOS CON IMÁGENES VERIFICADAS Y ACTIVAS ---
const services = [
  {
    id: "01",
    code: "IND-HVAC",
    title: "Refrigeración Industrial",
    description: "Mantenimiento crítico a Chillers, Torres de Enfriamiento y Bombas. Protocolos de parada.",
    icon: Snowflake,
    colSpan: "md:col-span-2",
    images: [
        "/images/services/foto1 (5).webp",
      "/images/services/foto1 (4).webp"
    ], 
    imageAlt: "Infraestructura de tuberías y sistemas de refrigeración industrial",
  },
  {
    id: "02",
    code: "COM-VRF",
    title: "Climatización Comercial",
    description: "Sistemas VRF/VRV y Rooftops de alta eficiencia.",
    icon: Fan,
    colSpan: "md:col-span-1",
    images: [
       "/images/services/foto1 (2).webp",
      // IMAGEN 6: Tecnología / Chip
      "/images/services/foto1 (1).webp",
    ],
    imageAlt: "Unidades de aire acondicionado comercial tipo paquete en azotea",
  },
  {
    id: "03",
    code: "ENG-AUDIT",
    title: "Ingeniería & Auditorías",
    description: "Estudios ASHRAE, cálculo térmico y calidad de aire (IAQ).",
    icon: Activity,
    colSpan: "md:col-span-1",
    images: [
      // IMAGEN 4: Planos Técnicos (Blueprint)
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2670&auto=format&fit=crop",
    ],
    imageAlt: "Planos de ingeniería mecánica y diseño HVAC",
  },
  {
    id: "04",
    code: "SYS-AUTO",
    title: "Automatización (BMS)",
    description: "Monitoreo remoto y control inteligente de temperatura en tiempo real.",
    icon: Cpu,
    colSpan: "md:col-span-2", 
    images: [
      // IMAGEN 5: Sala de Servidores (Data Center)
      "/images/services/foto1 (3).webp",
        "/images/services/foto1 (6).webp",
    ],
    imageAlt: "Sistemas de control BMS y servidores de alta tecnología",
  }
];

// --- COMPONENTE INTERNO DEL CARRUSEL ---
const ServiceCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  if (images.length === 1) {
    return (
      <div className="absolute inset-0 z-0">
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover opacity-60 transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradiente estático para legibilidad */}
        <div className="absolute inset-0 bg-industrial-900/80 hover:bg-industrial-900/70 transition-colors duration-500 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/60 to-transparent"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-1000">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, index) => (
            <div key={index} className="relative flex-[0_0_100%] h-full min-w-0">
              <Image
                src={src}
                alt={`${alt} - Imagen ${index + 1}`}
                fill
                className="object-cover opacity-60"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0} // Solo priorizamos la primera
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Overlay Oscuro para Texto */}
      <div className="absolute inset-0 bg-industrial-900/80 hover:bg-industrial-900/70 transition-colors duration-500 mix-blend-multiply pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/60 to-transparent pointer-events-none"></div>

      {/* Indicadores de Puntos (Dots) */}
      <div className="absolute top-4 right-14 flex gap-1 z-20">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={cn(
              "h-1 rounded-full transition-all duration-300 shadow-sm",
              idx === selectedIndex ? "w-4 bg-electric" : "w-1 bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};


// --- ANIMACIONES FRAMER ---
const cardVariants: Variants = {
  rest: { 
    y: 0,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    transition: { duration: 0.4, ease: "easeOut" }
  },
  hover: { 
    y: -5, 
    boxShadow: "0px 20px 40px rgba(0,0,0,0.4)", 
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const progressBarVariants: Variants = {
  rest: { scaleX: 0, opacity: 0, transition: { duration: 0.3 } },
  hover: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: "circOut", delay: 0.1 } }
};

const iconVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.15, rotate: 12, transition: { type: "spring", stiffness: 200, damping: 10 } }
};


export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-industrial-900 relative overflow-hidden">
      {/* Background optimizado */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <div className="mb-16 border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-electric mb-3 font-mono text-[10px] tracking-[0.2em] uppercase"
            >
              <Zap className="w-3 h-3" />
              <span>Capacidad Técnica Instalada</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              Soluciones de <span className="text-electric">Alto Rendimiento</span>
            </motion.h2>
          </div>
          
          <div className="hidden md:block text-right">
             <div className="text-engine-200 text-xs font-mono mb-2">ESTADO DEL SISTEMA</div>
             <div className="flex items-center gap-2 justify-end">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-white font-bold tracking-widest">OPERATIVO</span>
             </div>
          </div>
        </div>

        {/* BENTO GRID CON IMÁGENES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "relative rounded-xl border border-white/10 bg-industrial-900 overflow-hidden cursor-pointer perspective-1000 group",
                service.colSpan
              )}
            >
              {/* --- 1. CAPA DE IMAGEN / CARRUSEL (FONDO) --- */}
              <ServiceCarousel images={service.images} alt={service.imageAlt} />

              {/* --- 2. CONTENIDO (FRONTAL) --- */}
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardVariants}
                className="relative h-full w-full p-8 flex flex-col justify-between z-10 min-h-[320px]"
              >
                {/* Decoración Técnica */}
                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity z-20">
                   <ArrowUpRight className="w-5 h-5 text-white drop-shadow-md" />
                </div>
                <div className="absolute top-4 left-4 text-[9px] font-mono text-white/60 tracking-widest z-20">
                  ID: {service.code}
                </div>

                {/* Icono */}
                <div className="mb-6 w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg z-20">
                  <motion.div variants={iconVariants}>
                    <service.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Textos (Con sombra para legibilidad extrema) */}
                <div className="relative z-20 mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                    {service.title}
                  </h3>
                  <p className="text-engine-100 text-sm leading-relaxed antialiased font-medium drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                    {service.description}
                  </p>
                </div>

                {/* Barra de Progreso */}
                <div className="w-full h-[3px] bg-white/20 mt-auto rounded-full overflow-hidden relative z-20">
                   <motion.div
                      variants={progressBarVariants}
                      className="absolute top-0 left-0 bottom-0 w-full h-full bg-electric shadow-[0_0_10px_rgba(37,99,235,0.8)] origin-left"
                   />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}