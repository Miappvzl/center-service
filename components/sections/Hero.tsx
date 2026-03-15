// src/components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Activity, ThermometerSun } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

// --- 1. COMPONENTE 3D: EL ASSET DE INGENIERÍA (DARK MODE) ---
function IndustrialCore() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <torusGeometry args={[2, 0.6, 64, 128]} />
        {/* Ajustado para Dark Mode: Más oscuro, refleja las luces azules */}
        <MeshTransmissionMaterial 
          thickness={0.5} 
          roughness={0.15} 
          transmission={0.9} 
          ior={1.5} 
          chromaticAberration={0.06} 
          backside={true} 
          color="#111111"
        />
      </mesh>
    </Float>
  );
}

// --- 2. COMPONENTE PRINCIPAL: HERO ---
export default function Hero() {
  // EL FIX DE TYPESCRIPT
  const EASE_ELITE = [0.16, 1, 0.3, 1] as const;

  const textRevealVariants = {
    hidden: { y: "100%", opacity: 0, rotate: 2 },
    visible: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 1.2, ease: EASE_ELITE } },
  };

  return (
    // Fondo asfalto profundo (#050505) con texto base en blanco
    <section className="relative min-h-screen flex items-center bg-[#050505] text-white overflow-hidden">
      
      {/* --- CANVAS 3D DE FONDO --- */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.1} />
          {/* Luz principal blanca */}
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          {/* Luz de rebote AZUL ELÉCTRICO para bañar el cristal 3D */}
          <directionalLight position={[-10, -10, -5]} intensity={3} color="#00A3FF" />
          <Environment preset="city" />
          <IndustrialCore />
        </Canvas>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full pt-24 pb-12">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col items-start md:items-center text-left md:text-center w-full max-w-6xl mx-auto"
        >
          
          {/* ETIQUETA TÉCNICA (Status Console) */}
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_ELITE } } }} className="mb-8">
            <div className="inline-flex items-center gap-3 font-mono text-[11px] md:text-xs text-white/80 font-medium tracking-[0.2em] uppercase border border-white/10 bg-[#0A0A0A] px-4 py-2 rounded-sm backdrop-blur-md shadow-[0_0_15px_rgba(0,163,255,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
              <span><span className="text-white/30 mr-2">1 [INFO]</span> Ingeniería Térmica</span>
            </div>
          </motion.div>

          {/* TITULAR MONUMENTAL */}
          <div className="flex flex-col mb-8 w-full">
            <div className="overflow-hidden">
              <motion.h1 variants={textRevealVariants} className="text-5xl sm:text-7xl lg:text-[110px] font-black tracking-tighter leading-[0.9] text-white uppercase" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                Cero margen
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 variants={textRevealVariants} className="text-5xl sm:text-7xl lg:text-[110px] font-black tracking-tighter leading-[0.9] text-white/30 uppercase" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                de error.
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-1 md:mt-2">
              <motion.h1 variants={textRevealVariants} className="text-4xl sm:text-5xl lg:text-[80px] font-bold tracking-tight leading-[0.9] text-[#00A3FF] uppercase" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                Continuidad absoluta.
              </motion.h1>
            </div>
          </div>

          {/* COPY */}
          <div className="overflow-hidden w-full max-w-2xl mb-12">
            <motion.p variants={textRevealVariants} className="text-base md:text-xl text-white/60 leading-relaxed font-medium">
              Diseñamos e instalamos infraestructuras HVAC y de refrigeración comercial. 
              Garantizamos la estabilidad térmica de data centers, quirófanos y plantas industriales donde una parada técnica, sin importar las condiciones externas, <span className="text-white font-bold">no es una opción</span>.
            </motion.p>
          </div>

          {/* CALL TO ACTION (Contraste extremo: Píldora blanca) */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, ease: EASE_ELITE } } }} className="flex w-full justify-start md:justify-center mb-16">
            <button className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black font-bold text-xs md:text-sm uppercase tracking-widest rounded-full overflow-hidden flex items-center gap-3 hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(0,163,255,0.15)]">
              <span className="relative z-10 flex items-center gap-2">
                Agendar Inspección 
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>

          {/* MICRO-DASHBOARD */}
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } } }} className="w-full flex flex-row gap-8 md:gap-16 justify-start md:justify-center border-t border-white/10 pt-8">
            <div className="flex flex-col items-start md:items-center">
              <span className="flex items-center gap-2 font-mono text-white text-lg md:text-xl font-bold">
                <Activity className="w-4 h-4 md:w-5 md:h-5 text-[#00A3FF]" /> 24/7
              </span>
              <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-widest mt-1">Soporte Crítico</span>
            </div>
            <div className="flex flex-col items-start md:items-center">
              <span className="flex items-center gap-2 font-mono text-white text-lg md:text-xl font-bold">
                <ThermometerSun className="w-4 h-4 md:w-5 md:h-5 text-[#00A3FF]" /> Exactitud
              </span>
              <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-widest mt-1">Normativa ASHRAE</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}