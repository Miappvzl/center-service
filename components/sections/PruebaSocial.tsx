// src/components/sections/PruebaSocial.tsx
"use client";

import { Stethoscope, Store, Home, Server, Factory, Building2, Utensils, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// --- COPY HUMANIZADO Y ESTRATÉGICO ---
// Textos que inspiran alivio y seguridad, no solo "términos de ingeniería".
const row1 = [
  { 
    title: "Clínicas y Hospitales", 
    desc: "Cuidamos el clima exacto donde se salvan vidas y se preservan medicinas vitales.", 
    icon: Stethoscope,
    width: "w-[350px] md:w-[450px]" 
  },
  { 
    title: "Tu Hogar", 
    desc: "El rigor técnico de la industria, aplicado para el descanso y la tranquilidad de tu familia.", 
    icon: Home,
    width: "w-[320px] md:w-[400px]" 
  },
  { 
    title: "Data Centers", 
    desc: "Refrigeración de precisión. Tu red y servidores nunca se caen por recalentamiento.", 
    icon: Server,
    width: "w-[380px] md:w-[480px]" 
  },
];

const row2 = [
  { 
    title: "Supermercados y Cavas", 
    desc: "Protegemos tu mercancía. Cero pérdidas económicas por fallas abruptas de frío.", 
    icon: Store,
    width: "w-[400px] md:w-[500px]" 
  },
  { 
    title: "Edificios y Oficinas", 
    desc: "Confort total para tus equipos de trabajo, reduciendo drásticamente el gasto eléctrico mensual.", 
    icon: Building2,
    width: "w-[380px] md:w-[460px]" 
  },
  { 
    title: "Garantía Operativa", 
    desc: "Soporte técnico real y repuestos verificados para que tu negocio no se detenga.", 
    icon: ShieldCheck,
    width: "w-[340px] md:w-[420px]" 
  },
];

const row3 = [
  { 
    title: "Industria y Plantas", 
    desc: "Procesos ininterrumpidos. Soporte robusto para líneas de producción pesada.", 
    icon: Factory,
    width: "w-[360px] md:w-[480px]" 
  },
  { 
    title: "Restaurantes", 
    desc: "Cadena de frío impecable para que tu cocina fluya sin estrés ni mermas.", 
    icon: Utensils,
    width: "w-[320px] md:w-[400px]" 
  },
  { 
    title: "Espacios Críticos", 
    desc: "Laboratorios y áreas blancas. Control absoluto de la humedad y la temperatura.", 
    icon: Stethoscope, // Reutilizamos un icono que encaja
    width: "w-[380px] md:w-[450px]" 
  },
];

// Componente de Tarjeta con "Fragmento de Luz" (Iluminación Premium sin bordes duros)
const Card = ({ item }: { item: any }) => (
  <div className={cn(
    "relative flex flex-col justify-center p-8 mx-3 bg-[#0A0A0A] rounded-xl group transition-all duration-500 hover:bg-[#111111]",
    item.width
  )}>
    {/* EL FRAGMENTO DE LUZ: Un destello sutil en el borde superior central */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Reflejo ambiental suave (Glow interior) */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-12 bg-[#00A3FF]/[0.02] blur-xl rounded-full group-hover:bg-[#00A3FF]/[0.05] transition-colors duration-500"></div>

    <div className="relative z-10 flex flex-col gap-4">
      <div className="w-10 h-10 rounded-full bg-[#050505] flex items-center justify-center border border-white/5 group-hover:border-[#00A3FF]/30 transition-colors duration-500 shadow-inner">
        <item.icon className="w-4 h-4 text-white/50 group-hover:text-[#00A3FF] transition-colors duration-500" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
          {item.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed font-medium group-hover:text-white/70 transition-colors duration-500">
          {item.desc}
        </p>
      </div>
    </div>
  </div>
);

// Pista de movimiento (Track)
const MarqueeTrack = ({ items, direction = "left", speed = "normal" }: { items: any[], direction?: "left" | "right", speed?: "normal" | "slow" }) => {
  // Duplicamos el array múltiples veces para asegurar el bucle infinito en pantallas ultra anchas
  const repeatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className="flex overflow-hidden marquee-container w-full py-2">
      <div className={cn(
        "flex", 
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
      )}
      // Pequeño hack in-line para variar la velocidad si es necesario
      style={{ animationDuration: speed === "slow" ? '55s' : '45s' }}
      >
        {repeatedItems.map((item, idx) => (
          <Card key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default function PruebaSocial() {
  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden" id="sectores-atendidos">
      
      {/* HEADER SEO Y CONTEXTO */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-16 text-center">
        <div className="inline-flex items-center justify-center gap-3 font-mono text-[10px] md:text-xs text-white/60 font-bold tracking-[0.2em] uppercase mb-6 border border-white/5 bg-[#0A0A0A] px-4 py-2 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
          Respaldo Integral
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
          Diseñados para <span className="text-[#00A3FF]">proteger tu entorno.</span>
        </h2>
        <p className="mt-4 text-white/50 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Entendemos lo que está en juego. Desde el descanso en tu sala hasta la cadena de frío de tu empresa, nuestro compromiso es que nunca te detengas.
        </p>
      </div>

      {/* MURO DE BLOQUES (Masonry Tracks) */}
      <div className="relative w-full flex flex-col gap-2 -rotate-1 md:-rotate-2 scale-[1.02] md:scale-105">
        
        {/* Degradados laterales para fundir el muro con el fondo */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

        {/* Las 3 pistas interactuando */}
        <MarqueeTrack items={row1} direction="left" />
        {/* La del medio va en sentido contrario y un poco más lento para generar ese desfase orgánico */}
        <MarqueeTrack items={row2} direction="right" speed="slow" />
        <MarqueeTrack items={row3} direction="left" />
        
      </div>

    </section>
  );
}