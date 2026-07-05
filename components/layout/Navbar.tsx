"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Sectores", href: "#sectores" },
  { name: "Metodología", href: "#metodologia" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* =======================================================================
        MOTOR DE REFRACCIÓN CILÍNDRICA (GLASS TUBE)
        ======================================================================= */}
      <svg className="pointer-events-none absolute hidden invisible" aria-hidden="true">
        <defs>
          <filter id="glass-tube-refraction" colorInterpolationFilters="sRGB">
            {/* 1. Ruido estirado al extremo para simular la tensión de un cristal curvo.
                La frecuencia en X es mínima (0.001) para crear bandas horizontales limpias. */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.001 0.04"
              numOctaves="1"
              result="glass-curve"
            />
            {/* 2. Suavizamos el ruido matemático para que la distorsión sea elegante, no ruidosa */}
            <feColorMatrix 
              type="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" 
              in="glass-curve" 
              result="smooth-curve" 
            />
            {/* 3. Desplazamiento óptico: Empuja los píxeles del fondo a través de nuestra "lente" */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="smooth-curve"
              scale="18" // Calibrador de distorsión óptica del cristal
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
        
        {/* =======================================================================
          CHASIS DEL COMPONENTE (VOLUMEN Y MATERIALIDAD)
          ======================================================================= */}
        <div 
          className={cn(
            "relative w-full max-w-6xl flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-full pointer-events-auto transition-all duration-700 ease-out",
            // Aceleración por hardware forzada para evitar el bug del primer render
            "transform-gpu will-change-[backdrop-filter,transform]",
            scrolled 
              // ESTADO ACTIVO: Cristal profundo con sombras dramáticas y bordes definidos
              ? "bg-[#050505]/20 border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_inset_0_-1px_1px_rgba(255,255,255,0.03),_0_20px_40px_-10px_rgba(0,0,0,0.8)]" 
              // ESTADO REPOSO: Cristal translúcido sutil
              : "bg-transparent border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
          )}
          style={{
            WebkitBackdropFilter: scrolled 
              ? "url(#glass-tube-refraction) blur(1px)" 
              : "url(#glass-tube-refraction) blur(1px)",
            backdropFilter: scrolled 
              ? "url(#glass-tube-refraction) blur(1px)" 
              : "url(#glass-tube-refraction) blur(11px)",
          }}
        >
          {/* LUZ ESPECULAR TÁCTIL (El reflejo superior del tubo de cristal) */}
          <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-b from-white/[0.08] via-transparent to-black/[0.2] opacity-80 mix-blend-overlay" />
          
          <div className="h-10 md:h-12 flex items-center group-hover:scale-95 transition-transform duration-300 relative z-10">
            <Image 
              src="/cscalogo.png" 
              alt="Center Service Logo" 
              width={220} 
              height={48} 
              priority 
              className="h-full w-auto object-contain drop-shadow-md" 
            />
          </div>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 z-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 drop-shadow-sm"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a 
            href="#contacto"
            className="hidden md:flex items-center justify-center px-6 py-2.5 bg-[#00A3FF] text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] relative z-10"
            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
          >
            Emergencias
          </a>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} 
              className="w-4 h-[2px] bg-white block transition-all" 
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
              className="w-4 h-[2px] bg-white block transition-all" 
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} 
              className="w-4 h-[2px] bg-white block transition-all" 
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[110%] left-0 w-full bg-[#050505]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
              >
                <div className="flex flex-col gap-2 relative z-10">
                  {navLinks.map((link, i) => (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-bold text-white py-4 border-b border-white/[0.05] uppercase tracking-tighter"
                      style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  
                  <motion.a
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 }}
                     href="#contacto"
                     onClick={() => setIsOpen(false)}
                     className="mt-6 w-full py-4 bg-[#00A3FF] text-black font-bold text-sm uppercase tracking-widest rounded-full text-center shadow-[0_0_15px_rgba(0,163,255,0.4)]"
                     style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                  >
                    Reportar Emergencia
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  );
}