// src/components/layout/FluidBackground.tsx
"use client";

import React from "react";

export default function FluidBackground() {
  return (
    // Fondo base muy oscuro para contraste
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-50] bg-[#02050A]">
      
      {/* Contenedor fluido sin SVG. Todo puro CSS renderizado por GPU */}
      <div className="absolute inset-0 w-full h-full opacity-80">
        
        {/* ORBE 1: Azul Oscuro/Rey - Estructura pesada de fondo */}
        <div className="absolute -top-[1%] -left-[10%] w-[50vw] h-[50vw] fluid-blob-1 mix-blend-screen"
             style={{ 
               background: 'radial-gradient(circle at center, rgba(0, 60, 160, 0.9) 0%, rgba(0, 60, 160, 0) 60%)' 
             }}>
        </div>

        {/* ORBE 2: Azul Corporativo - El núcleo de energía */}
        <div className="absolute top-[15%] -right-[15%] w-[50vw] h-[50vw] fluid-blob-2 mix-blend-screen"
             style={{ 
               background: 'radial-gradient(circle at center, rgba(0, 90, 195, 0.25) 0%, rgba(0, 163, 255, 0) 60%)' 
             }}>
        </div>

        {/* ORBE 3: Azul Pastel / Cian - El destello suave */}
        <div className="absolute -bottom-[20%] left-[15%] w-[85vw] h-[85vw] fluid-blob-3 mix-blend-screen"
             style={{ 
               background: 'radial-gradient(circle at center, rgba(255, 136, 0, 0.15) 0%, rgb(0, 36, 109, 0.0) 50%)' 
             }}>
        </div>

      </div>
      
    </div>
  );
}