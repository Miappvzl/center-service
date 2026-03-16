// src/components/sections/Hero.tsx
"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, ThermometerSun } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh } from "three";

// --- 1. COMPONENTE 3D: EL OBJETO ---
function IndustrialCore() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0}>
      <mesh ref={meshRef} scale={1.8}>
        {/* Geometría suave pero ligera (32x64) para mantener 60 FPS */}
        <torusGeometry args={[3, 0.6, 32, 60]} />
        
        {/* MATERIAL FÍSICO NATIVO: Luce premium (Metal oscuro/Barniz) sin Multi-pass Rendering */}
        <meshPhysicalMaterial 
          color="#050505" // Un tono base muy oscuro para el metal
          metalness={5.5} // Alta metalicidad para reflejos intensos
          roughness={0.15} // Superficie lisa para brillo nítido
          clearcoat={9.0} // Capa de barniz para brillo profundo
          clearcoatRoughness={10}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// --- 2. EL ESCUDO: CANVAS MEMOIZADO (ILUMINACIÓN POTENCIADA) ---
// React.memo evita re-renderizados innecesarios y protege el contexto WebGL.
const Background3D = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none mix-blend-screen gpu-accelerated">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]} 
        // Configuraciones críticas para la estabilidad del WebGL
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true, stencil: false, depth: false }} 
      >
        {/* Iluminación Drásticamente Potenciada y Estratégica */}
        <ambientLight intensity={18} /> {/* Luz ambiental más intensa */}
        
        {/* Luz direccional blanca frontal y superior para highlight principal */}
        <directionalLight position={[5, 8, 5]} intensity={20} color="#ffa851" /> 
        
        {/* Luz direccional azul trasera e inferior para reflejos de color */}
        <directionalLight position={[-10, -10, -8]} intensity={25} color="#00A3FF" /> 
        
        {/* Spotlight azul superior para un highlight específico */}
        <spotLight position={[0, 80, 40]} intensity={10} color="#7173ff" penumbra={6} /> 
        
        <IndustrialCore />
      </Canvas>
    </div>
  );
});

// Nombrar el componente memoizado es buena práctica para las herramientas de desarrollo de React
Background3D.displayName = "Background3D";


// --- 3. COMPONENTE PRINCIPAL: HERO ---
export default function Hero() {
  const EASE_ELITE = [0.16, 1, 0.3, 1] as const;

  const textRevealVariants = {
    hidden: { y: "100%", opacity: 0, rotate: 2 },
    visible: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 1.2, ease: EASE_ELITE } },
  };

  return (
    <section className="relative min-h-screen flex items-center bg-[#050505] text-white overflow-hidden selection:bg-[#00A3FF] selection:text-white">
      
      {/* INYECTAMOS EL CANVAS PROTEGIDO Y POTENCIADO AQUÍ */}
      <Background3D />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full pt-24 pb-12">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col items-start md:items-center text-left md:text-center w-full max-w-6xl mx-auto"
        >
          
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_ELITE } } }} className="mb-8">
            <div className="inline-flex items-center gap-3 font-mono text-[11px] md:text-xs text-white/80 font-medium tracking-[0.2em] uppercase border border-white/10 bg-[#0A0A0A] px-4 py-2 rounded-none backdrop-blur-md shadow-[0_0_15px_rgba(0,163,255,0.05)]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
              <span><span className="text-white/30 mr-2">1 [INFO]</span> Ingeniería Térmica</span>
            </div>
          </motion.div>

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

          <div className="overflow-hidden w-full max-w-2xl mb-12">
            <motion.p variants={textRevealVariants} className="text-base md:text-xl text-white/60 leading-relaxed font-medium">
              Diseñamos e instalamos infraestructuras HVAC y de refrigeración comercial. 
              Garantizamos la estabilidad térmica de data centers, quirófanos y plantas industriales donde una parada técnica, sin importar las condiciones externas, <span className="text-white font-bold">no es una opción</span>.
            </motion.p>
          </div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3, ease: EASE_ELITE } } }} className="flex w-full justify-start md:justify-center mb-16">
            <button className="group relative px-8 py-4 md:px-10 md:py-5 bg-white text-black font-bold text-xs md:text-sm uppercase tracking-widest rounded-full overflow-hidden flex items-center gap-3 hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
              <span className="relative z-10 flex items-center gap-2">
                Agendar Inspección 
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } } }} className="w-full flex flex-row gap-8 md:gap-16 justify-start md:justify-center border-t border-white/10 pt-8">
            <div className="flex flex-col items-start md:items-center font-mono" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              <span className="flex items-center gap-2 text-white text-lg md:text-xl font-bold">
                <Activity className="w-4 h-4 md:w-5 md:h-5 text-[#00A3FF]" /> 24/7
              </span>
              <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest mt-1">Soporte Crítico</span>
            </div>
            <div className="flex flex-col items-start md:items-center font-mono" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              <span className="flex items-center gap-2 text-white text-lg md:text-xl font-bold">
                <ThermometerSun className="w-4 h-4 md:w-5 md:h-5 text-[#00A3FF]" /> Exactitud
              </span>
              <span className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest mt-1">Normativa ASHRAE</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}