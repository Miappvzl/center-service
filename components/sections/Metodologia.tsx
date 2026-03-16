// src/components/sections/Metodologia.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Search, FileCheck, Wrench, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

// --- COPY ESTRATÉGICO ---
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

// --- RUTAS DEL GRÁFICO (Reutilizables) ---
const erraticPath = "M 0 50 Q 10 10 20 60 T 40 20 T 60 80 T 80 10 T 100 50";
const stablePath = "M 0 50 Q 25 50 50 50 T 100 50";

// --- MICRO-GRÁFICO PARA MÓVILES ---
// Este componente se muestra debajo del texto en teléfonos
const MobileMiniChart = ({ isStable }: { isStable: boolean }) => {
  const pathColor = isStable ? "#00A3FF" : "#ef4444";
  
  return (
    <div className="lg:hidden mt-6 h-16 w-full rounded-md border border-white/5 bg-[#0A0A0A] p-2 flex items-center relative overflow-hidden">
      {/* Etiqueta de estado en miniatura */}
      <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
         <Activity className={cn("w-3 h-3", isStable ? "text-[#00A3FF]" : "text-red-500 animate-pulse")} />
         <span className="font-mono text-[8px] uppercase text-white/40 tracking-widest">
            {isStable ? "ESTABILIZADO" : "ANOMALÍA TÉRMICA"}
         </span>
      </div>
      
      {/* Vector SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-80" preserveAspectRatio="none">
       <motion.path
  initial={{ d: isStable ? stablePath : erraticPath }} // <-- AÑADE ESTA LÍNEA
  d={isStable ? stablePath : erraticPath}
  fill="transparent"
          stroke={pathColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ d: isStable ? stablePath : erraticPath }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        />
      </svg>
    </div>
  );
};

// --- COMPONENTE INTERNO: Ítem de la Línea de Tiempo ---
const TimelineStep = ({ 
  step, 
  index, 
  setActiveStep, 
  isActive,
  isStable // Pasamos el estado de estabilidad al ítem
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
    <div ref={ref} className="relative py-12 md:py-24 flex gap-6 md:gap-10 opacity-100 group">
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
            : "bg-[#050505] border-white/10 text-white/30"
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
        <p className="text-white/60 text-base leading-relaxed font-medium max-w-md">
          {step.description}
        </p>
        
        {/* Renderizamos el mini-gráfico SOLO si el paso está activo (para performance) y en pantallas móviles */}
        {isActive && <MobileMiniChart isStable={isStable} />}
      </div>
    </div>
  );
};

export default function Metodologia() {
  const [activeStep, setActiveStep] = useState(0);

  // La lógica es simple: a partir del paso 3 (index 2), consideramos el sistema "Estable"
  const isStable = activeStep >= 2;
  const pathColor = isStable ? "#00A3FF" : "#ef4444";
  const glowColor = isStable ? "rgba(0,163,255,0.4)" : "rgba(239,68,68,0.4)";

  return (
    <section className="relative  text-white py-20 border-t border-white/5" id="metodologia">
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
          
          {/* COLUMNA IZQUIERDA: Línea de Tiempo Interactiva */}
          {/* Reduje el padding inferior en móvil para que no quede tanto espacio vacío */}
          <div className="flex flex-col relative z-10 pb-12 lg:pb-32">
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
          </div>

          {/* COLUMNA DERECHA: Monitor Gráfico Sticky (Solo Desktop) */}
          {/* Se mantiene hidden en móvil (lg:block), ya que inyectamos el mini-gráfico arriba */}
          <div className="hidden lg:block relative">
            <div className="sticky top-40 w-full aspect-[4/3] rounded-xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              
              {/* Header del Monitor */}
              <div className="flex justify-between items-start z-10">
                <div>
                  <h4 className="font-mono text-xs text-white/50 tracking-widest uppercase mb-1">Telemetría en Vivo</h4>
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

              {/* El Gráfico SVG Reactivo (Desktop) */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
<motion.path
  initial={{ d: isStable ? stablePath : erraticPath }} // <-- AÑADE ESTA LÍNEA
  d={isStable ? stablePath : erraticPath}
  fill="transparent"
                    stroke={glowColor}
                    strokeWidth="8"
                    className="blur-md transition-colors duration-700"
                    animate={{ d: isStable ? stablePath : erraticPath }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                  />
                 <motion.path
  initial={{ d: isStable ? stablePath : erraticPath }} // <-- AÑADE ESTA LÍNEA
  d={isStable ? stablePath : erraticPath}
  fill="transparent"
                    stroke={pathColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ d: isStable ? stablePath : erraticPath }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                  />
                </svg>
              </div>

              {/* Footer del Monitor */}
              <div className="flex justify-between items-end z-10 font-mono text-[10px] text-white/30 uppercase tracking-widest">
                <span>Consumo Energético: {isStable ? "ÓPTIMO" : "ELEVADO"}</span>
                <span>T° {isStable ? "24°C CONSTANTE" : "FLUCTUANTE"}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}