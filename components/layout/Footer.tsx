// src/components/layout/Footer.tsx
"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-8 border-t border-white/5 overflow-hidden">
      
      {/* Fondo de Cuadrícula Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Marca */}
          <div className="lg:col-span-2 flex flex-col items-start">
          <div className="h-10 md:h-12 flex items-center group-hover:scale-95 transition-transform duration-300">
            <Image 
              src="/cscalogo.png" 
              alt="Center Service Logo" 
              width={220} // Ajusta este número si quieres que se vea aún más grande
              height={48} 
              priority 
              className="h-full w-auto object-contain" 
            />
          </div>
            <p className="text-white/50 text-sm max-w-sm font-medium leading-relaxed">
              Diseñamos, instalamos y protegemos infraestructuras HVAC en entornos residenciales, comerciales e industriales en Venezuela.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            <h4 className="font-mono text-xs text-[#00A3FF] uppercase tracking-widest font-bold mb-6">Navegación</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#sectores" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Áreas de Operación</a></li>
              <li><a href="#metodologia" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Proceso Técnico</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-white text-sm font-medium transition-colors">Base de Conocimiento</a></li>
            </ul>
          </div>

          {/* Legal / Contacto */}
          <div className="flex flex-col">
            <h4 className="font-mono text-xs text-[#00A3FF] uppercase tracking-widest font-bold mb-6">Soporte</h4>
            <ul className="flex flex-col gap-4">
              <li className="text-white/60 text-sm font-medium">Emergencias 24/7</li>
              <li className="text-white/60 text-sm font-medium">+58 414 420 7165</li>
              <li className="text-white/60 text-sm font-medium">contacto@centerserviceve.com</li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-[1px] bg-white/10 mb-8"></div>

        {/* Letra pequeña y Sello de Autor */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} Center Service. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/30 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Sistemas Operativos | <span className="text-white/50">ENG: QUANZOS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}