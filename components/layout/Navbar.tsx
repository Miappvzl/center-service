// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Sectores", href: "#sectores" },
  { name: "Metodología", href: "#metodologia" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para oscurecer un poco más el fondo al bajar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Contenedor fixed con un margen superior (top-4) para que flote
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
      
      <div className={cn(
        "relative w-full max-w-6xl flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-full transition-all duration-500 pointer-events-auto border",
        scrolled 
          ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]" 
          : "bg-[#050505]/50 backdrop-blur-md border-white/5"
      )}>
        
        {/* LOGO */}
        <a href="#" className="flex items-center gap-2 group relative z-50">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
            <Activity className="w-4 h-4 text-black" strokeWidth={3} />
          </div>
          <span className="text-white font-black text-lg tracking-tighter uppercase" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
            Center<span className="text-[#00A3FF]">Service</span>
          </span>
        </a>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-300"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA DESKTOP */}
        <a 
          href="#contacto"
          className="hidden md:flex items-center justify-center px-6 py-2.5 bg-[#00A3FF] text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 neo-brutal-glow"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          Emergencias
        </a>

        {/* BOTÓN HAMBURGUESA MÓVIL (Animado) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full bg-white/5 border border-white/10"
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

        {/* MENÚ DESPLEGABLE MÓVIL */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[110%] left-0 w-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-white py-4 border-b border-white/5 uppercase tracking-tighter"
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
                   className="mt-6 w-full py-4 bg-[#00A3FF] text-black font-bold text-sm uppercase tracking-widest rounded-full text-center neo-brutal-glow"
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
  );
}