"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Servicios", href: "#servicios" },
  { name: "Sectores", href: "#sectores" }, // Asegúrate de poner id="sectores" en la sección Industries
  { name: "Metodología", href: "#workflow" }, // Asegúrate de poner id="workflow" en la sección Workflow
  { name: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para cambiar el estilo de la barra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-industrial-900/80 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* LOGO */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-electric rounded flex items-center justify-center text-white font-bold transform group-hover:rotate-12 transition-transform">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Center<span className="text-electric">Service</span>
            </span>
          </a>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            {/* Botón de Acción Principal */}
            <a
              href="https://wa.me/584120000000" // Tu número aquí
              className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              Agendar Visita
            </a>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (AnimatePresence para animar la salida) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-industrial-900 border-l border-white/10 md:hidden flex flex-col"
          >
            {/* Cabecera del Menú Móvil */}
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <span className="text-xl font-bold text-white">Menú</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Enlaces Móviles */}
            <div className="flex-1 flex flex-col p-8 gap-6">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white/50 hover:text-white hover:translate-x-2 transition-all"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Footer del Menú Móvil */}
            <div className="p-8 border-t border-white/10 bg-white/5">
              <a
                href="https://wa.me/584120000000"
                className="block w-full py-4 bg-electric text-white text-center font-bold rounded-lg shadow-lg active:scale-95 transition-transform"
              >
                Hablar con un Ingeniero
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}