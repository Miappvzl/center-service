// src/components/sections/Metodologia.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Search, FileCheck, Wrench, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

// --- COPY ESTRATÉGICO (Mantenemos tu gran copy) ---
const steps = [
  {
    id: "01",
    title: "Diagnóstico de Precisión",
    description: "Evaluamos tu equipo a fondo usando herramientas de medición reales para encontrar la raíz del problema. Nada de adivinanzas ni 'cambiar piezas por cambiar'.",
    icon: Search,
  },
  {
    id: "02",
    title: "Propuesta Transparente",
    description: "Hablamos claro. Te entregamos un reporte exacto de la falla, las soluciones viables y un presupuesto cerrado, sin costos ocultos ni sorpresas de última hora.",
    icon: FileCheck,
  },
  {
    id: "03",
    title: "Ejecución Impecable",
    description: "Intervenimos el sistema respetando tu espacio. Utilizamos repuestos verificados, trabajamos con orden, limpieza total y protegemos las áreas de tu hogar o empresa.",
    icon: Wrench,
  },
  {
    id: "04",
    title: "Estabilidad Garantizada",
    description: "No nos vamos hasta medir el rendimiento. Realizamos pruebas de presión y temperatura para asegurar que el sistema enfríe perfectamente y consuma la energía correcta.",
    icon: ShieldCheck,
  }
];
// --- RUTAS DEL GRÁFICO (ESTÉTICA DE OSCILOSCOPIO DE ALTA GAMA) ---
// 4 segmentos de Bézier fluidos que ocupan todo el espectro visual.
const erraticStrokePath = "M 0 50 C 10 15 15 85 25 50 C 35 15 45 95 55 50 C 65 5 75 85 85 50 C 90 30 95 70 100 50";
const erraticLinePath = erraticStrokePath + " L 100 100 L 0 100 Z";

const stableStrokePath = "M 0 50 C 10 50 15 50 25 50 C 35 50 45 50 55 50 C 65 50 75 50 85 50 C 90 50 95 50 100 50";
const stableLinePath = stableStrokePath + " L 100 100 L 0 100 Z";
// --- DEFINICIONES DE LUMINISCENCIA (SVG DEFS) ---
// Creamos una degradado para el área bajo la línea
const GraphDefs = ({ id_prefix }: { id_prefix: string }) => (
  <defs>
    <linearGradient id={`${id_prefix}-gradient-area`} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="var(--stop-color)" stopOpacity="0.3" />
      <stop offset="100%" stopColor="var(--stop-color)" stopOpacity="0.01" />
    </linearGradient>
  </defs>
);

// --- MICRO-GRÁFICO PARA MÓVILES (AMPLIADO Y DETALLADO) ---
const MobileMiniChart = ({ isStable }: { isStable: boolean }) => {
  const pathColor = isStable ? "#00A3FF" : "#ef4444";
  const stopColor = isStable ? "#00A3FF" : "#ef4444";
  
  return (
    // Altura aumentada a h-28 y shadow-inner para mayor profundidad
    <div className="lg:hidden mt-8 h-28 w-full rounded-xl border border-white/5 bg-[#080808] p-4 flex flex-col relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
      
      {/* Etiqueta de estado superior */}
      <div className="flex w-full justify-between items-center z-20">
          <div className="flex items-center gap-1.5">
            <Activity className={cn("w-3.5 h-3.5", isStable ? "text-[#00A3FF]" : "text-red-500 animate-pulse")} />
            <span className="font-mono text-[10px] uppercase text-white/60 tracking-widest font-bold">
               {isStable ? "ESTABILIZADO" : "ANOMALÍA DETECTADA"}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase text-white/30 tracking-widest">T° {isStable ? "24.0°C" : "ERR"}</span>
      </div>
      
      {/* Rejilla de telemetría de fondo (Textura Premium) */}
      <div className="absolute inset-0 top-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-50 z-0"></div>

      {/* Contenedor del SVG que empuja hacia abajo para no tapar el texto */}
      <div className="absolute inset-0 top-8 left-0 right-0 bottom-0 z-10 flex items-end">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full opacity-90 overflow-visible" 
          preserveAspectRatio="none" // <-- VITAL para que la línea ocupe todo el ancho del celular
          style={{ '--stop-color': stopColor } as React.CSSProperties}
        >
          <GraphDefs id_prefix="mobile" />

          {/* Capa de Sustancia (Área) */}
          <motion.path
            initial={{ d: isStable ? stableLinePath : erraticLinePath }}
            d={isStable ? stableLinePath : erraticLinePath}
            fill={`url(#mobile-gradient-area)`}
            animate={{ d: isStable ? stableLinePath : erraticLinePath }}
            transition={{ type: "tween", duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Capa Principal (Línea con grosor adaptado a móvil) */}
          <motion.path
            initial={{ d: isStable ? stableStrokePath : erraticStrokePath }}
            d={isStable ? stableStrokePath : erraticStrokePath}
            fill="transparent"
            stroke={pathColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            // Filtro drop-shadow CSS para dar brillo de neón sin sobrecargar el DOM móvil con más nodos
            style={{ filter: `drop-shadow(0px 0px 6px ${isStable ? 'rgba(0,163,255,0.6)' : 'rgba(239,68,68,0.6)'})` }}
            animate={{ d: isStable ? stableStrokePath : erraticStrokePath }}
            transition={{ type: "tween", duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>
    </div>
  );
};

// --- COMPONENTE INTERNO: Ítem de la Línea de Tiempo (Optimizado para SEO) ---
const TimelineStep = ({ 
  step, 
  index, 
  setActiveStep, 
  isActive,
  isStable 
}: { 
  step: typeof steps[0], 
  index: number, 
  setActiveStep: (idx: number) => void, 
  isActive: boolean,
  isStable: boolean
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) setActiveStep(index);
  }, [isInView, index, setActiveStep]);

  return (
    // CAMBIO CLAVE SEO: Usamos <li> para semántica SEO
    <li ref={ref} className="relative py-12 md:py-24 flex gap-6 md:gap-10 opacity-100 group list-none">
      {/* Línea conectora vertical */}
      <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-white/5 z-0"></div>
      
      {/* Línea conectora iluminada */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: isActive ? "100%" : "0%" }}
        className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-[#00A3FF] z-0 shadow-[0_0_10px_rgba(0,163,255,0.5)]"
      />

      {/* Círculo / Icono */}
      <div className="relative z-10 shrink-0">
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500",
          isActive 
            ? "bg-[#0A0A0A] border-[#00A3FF] text-[#00A3FF] shadow-[0_0_20px_rgba(0,163,255,0.3)]" 
            : "bg-[#050505] border-white/10 text-white/50" // <- Mejorado el contraste para accesibilidad
        )}>
          <step.icon className="w-6 h-6" strokeWidth={isActive ? 2 : 1.5} />
        </div>
      </div>

      {/* Contenido del Paso */}
      <div className={cn(
        "flex flex-col pt-2 transition-all duration-500 w-full",
        isActive ? "opacity-100 translate-x-0" : "opacity-40 -translate-x-2"
      )}>
        <span className="font-mono text-xs text-[#00A3FF] font-bold tracking-widest mb-3">PASO {step.id}</span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
          {step.title}
        </h3>
        <p className="text-white/60 text-base leading-relaxed font-medium max-w-md mb-2">
          {step.description}
        </p>
        
        {/* Renderizamos el mini-gráfico HI-FI en pantallas móviles */}
        {isActive && <MobileMiniChart isStable={isStable} />}
      </div>
    </li>
  );
};

export default function Metodologia() {
  const [activeStep, setActiveStep] = useState(0);

  // La lógica es simple: a partir del paso 3 (index 2), consideramos el sistema "Estable"
  const isStable = activeStep >= 2;
  const pathColor = isStable ? "#00A3FF" : "#ef4444";
  const glowColor = isStable ? "#00A3FF" : "#ef4444";
  const stopColor = isStable ? "#00A3FF" : "#ef4444";

  return (
    <section className="relative text-white py-20 border-t border-white/5" id="metodologia">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Encabezado */}
        <div className="mb-16 md:mb-24 text-left">
          <div className="inline-flex items-center gap-3 font-mono text-[10px] md:text-xs text-white/70 font-bold tracking-[0.2em] uppercase mb-6 border border-white/10 bg-[#0A0A0A] px-4 py-2 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"></span>
            Proceso de Trabajo
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
            Ingeniería aplicada a <br className="hidden md:block"/>
            <span className="text-white/40">tu tranquilidad.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 relative">
          
          {/* COLUMNA IZQUIERDA: Línea de Tiempo Interactiva (Semántica SEO) */}
          {/* CAMBIO CLAVE SEO: Usamos <ol> en lugar de <div> */}
          <ol className="flex flex-col relative z-10 pb-12 lg:pb-32 list-none m-0 p-0">
            {steps.map((step, index) => (
              <TimelineStep 
                key={step.id} 
                step={step} 
                index={index} 
                isActive={activeStep === index} 
                setActiveStep={setActiveStep}
                isStable={index >= 2} // Pasamos la lógica al componente hijo
              />
            ))}
          </ol>

          {/* COLUMNA DERECHA: Monitor Gráfico Sticky HI-FI (Solo Desktop) */}
          <div className="hidden lg:block relative">
            <div className="sticky top-40 w-full aspect-[4/3] rounded-xl border border-white/10 bg-[#080808] p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              
              {/* Header del Monitor */}
              <div className="flex justify-between items-start z-10">
                <div>
                  <h4 className="font-mono text-xs text-white/50 tracking-widest uppercase mb-1.5">Telemetría en Vivo</h4>
                  <div className={cn(
                    "text-2xl font-bold tracking-tighter transition-colors duration-500",
                    isStable ? "text-[#00A3FF]" : "text-red-500"
                  )} style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                    {isStable ? "ESTABILIDAD TÉRMICA" : "ANOMALÍA DETECTADA"}
                  </div>
                </div>
                <Activity className={cn(
                  "w-6 h-6 transition-colors duration-500",
                  isStable ? "text-[#00A3FF]" : "text-red-500 animate-pulse"
                )} />
              </div>

              {/* EL GRÁFICO SVG HI-FI (Desktop) */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                {/* Patrón de Rejilla de Fondo */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>
                
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full overflow-visible opacity-95" 
                  preserveAspectRatio="xMidYMid meet" // <- Eliminamos "none", mantenemos proporción pro
                  style={{ '--stop-color': stopColor } as React.CSSProperties}
                >
                    <GraphDefs id_prefix="desktop" />

                    {/* CAPA 1: Degradado de Área bajo la línea (Sustancia) */}
                    <motion.path
                      initial={{ d: isStable ? stableLinePath : erraticLinePath }}
                      d={isStable ? stableLinePath : erraticLinePath}
                      fill={`url(#desktop-gradient-area)`}
                      animate={{ d: isStable ? stableLinePath : erraticLinePath }}
                      transition={{ type: "tween", duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* CAPA 2: Línea Principal (Frontera) */}
                    <motion.path
                      initial={{ d: isStable ? stableStrokePath : erraticStrokePath }}
                      d={isStable ? stableStrokePath : erraticStrokePath}
                      fill="transparent"
                      stroke={pathColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-colors duration-500"
                      animate={{ d: isStable ? stableStrokePath : erraticStrokePath }}
                      transition={{ type: "tween", duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* CAPA 3: Línea de Brillo (Glow Exterior) */}
                    <motion.path
                      initial={{ d: isStable ? stableStrokePath : erraticStrokePath }}
                      d={isStable ? stableStrokePath : erraticStrokePath}
                      fill="transparent"
                      stroke={glowColor}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="blur-sm opacity-50 transition-colors duration-500"
                      animate={{ d: isStable ? stableStrokePath : erraticStrokePath }}
                      transition={{ type: "tween", duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />

                </svg>
              </div>

              {/* Footer del Monitor (Interactivo dinámicamente) */}
              <div className="flex justify-between items-end z-10 font-mono text-[10px] text-white/30 uppercase tracking-widest">
                <span>Consumo Energético: {isStable ? "ÓPTIMO" : "ELEVADO"}</span>
                {/* Añadimos micro-interacción parpadeante en la temperatura */}
                <div className="flex items-center gap-1">
                    <span className={cn("w-1.5 h-1.5 rounded-full", isStable ? "bg-[#00A3FF]" : "bg-red-500 animate-pulse")}></span>
                    T° {isStable ? "24.0°C CONSTANTE" : "FLUCTUANTE"}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}