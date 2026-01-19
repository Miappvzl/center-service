"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ClipboardCheck, PenTool, Wrench, FileCheck2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "01. Diagnóstico Digital",
    description: "Levantamiento técnico con instrumentos de precisión. Generamos un reporte preliminar con termografía y medición de parámetros eléctricos.",
    icon: ClipboardCheck,
  },
  {
    id: 2,
    title: "02. Ingeniería de Solución",
    description: "Diseño de la reparación o instalación basado en carga térmica real y especificaciones del fabricante (Manual de Servicio).",
    icon: PenTool,
  },
  {
    id: 3,
    title: "03. Despliegue Técnico",
    description: "Ejecución limpia. Uso de bombas de vacío para 500 micrones, soldadura con atmósfera de nitrógeno y recuperación de refrigerante.",
    icon: Wrench,
  },
  {
    id: 4,
    title: "04. Certificación de Entrega",
    description: "Pruebas de estrés y entrega de Bitácora de Servicio con parámetros finales de operación validados.",
    icon: FileCheck2,
  },
];

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. Detectamos el Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // Ajustado para que empiece antes
  });

  // 2. APLICAMOS FÍSICA (Aquí está la magia de la fluidez)
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100, // Qué tan rápido trata de alcanzar el scroll
    damping: 30,    // Qué tanto "frena" (evita rebotes locos, da sensación de aceite)
    restDelta: 0.001
  });

  return (
    <section id="workflow" className="py-24 bg-industrial-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-electric animate-pulse"></span>
            <span className="text-xs font-mono tracking-widest text-engine-200 uppercase">
              Workflow Certificado
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Cero Improvisación. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-engine-200 to-white">
              Solo Protocolos Estrictos.
            </span>
          </motion.h2>
        </div>

        {/* CONTENEDOR DE LA LÍNEA DE TIEMPO */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          
          {/* TUBO VACÍO (Fondo) */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 md:translate-x-0 h-full rounded-full"></div>

          {/* TUBO LLENÁNDOSE (Con Física) */}
          <motion.div 
            style={{ scaleY, originY: 0 }} // Usamos scaleY para mejor rendimiento
            className="absolute left-[19px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-electric via-cyan-400 to-electric -translate-x-1/2 md:translate-x-0 rounded-full shadow-[0_0_20px_#2563EB] z-10 h-full"
          >
            {/* Gota Brillante en la punta (Leading Drop) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-6 bg-electric/50 blur-md rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white rounded-full"></div>
          </motion.div>

          {/* LOS PASOS */}
          <div className="space-y-20 md:space-y-32">
            {steps.map((step, index) => (
              <div key={step.id} className={cn(
                "relative flex flex-col md:flex-row gap-8 items-start md:items-center",
                index % 2 !== 0 ? "md:flex-row-reverse" : "" 
              )}>
                
                {/* 1. NODO CENTRAL (Conector) */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center z-20">
                   <div className="w-4 h-4 rounded-full bg-industrial-900 border border-white/20 ring-4 ring-industrial-900 shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                   
                   {/* Este círculo se enciende cuando la línea pasa por él */}
                   <motion.div 
                     initial={{ scale: 0, opacity: 0 }}
                     whileInView={{ scale: 1.5, opacity: 1 }}
                     viewport={{ margin: "-50% 0px -50% 0px" }} // Se activa justo al centro
                     className="absolute inset-0 bg-electric rounded-full blur-md -z-10"
                   />
                </div>

                {/* 2. TARJETA DE CONTENIDO */}
                <motion.div 
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }} // Entrada más cinematográfica
                  className={cn(
                    "ml-12 md:ml-0 md:w-1/2 relative group",
                    index % 2 !== 0 ? "md:pr-20 text-left" : "md:pl-20 md:text-right"
                  )}
                >
                   {/* Número gigante de fondo (Decorativo) */}
                   <span className={cn(
                     "absolute top-0 text-8xl font-bold text-white/[0.03] -z-10 select-none font-mono",
                     index % 2 !== 0 ? "left-0" : "right-0"
                   )}>
                     0{step.id}
                   </span>

                   <div className={cn(
                     "flex flex-col gap-4 relative",
                     index % 2 === 0 ? "md:items-end" : "md:items-start"
                   )}>
                      {/* Icono Flotante */}
                      <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 text-electric backdrop-blur-sm group-hover:scale-110 group-hover:bg-electric/10 transition-all duration-500">
                        <step.icon size={28} strokeWidth={1.5} />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-electric transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-engine-200 text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                   </div>
                </motion.div>

                {/* 3. ESPACIO DE EQUILIBRIO */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}