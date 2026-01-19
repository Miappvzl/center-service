"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Gauge, Zap, Clock, Ruler, CheckCircle2 } from "lucide-react";

// Componente Contador (Sin cambios, la lógica funciona perfecto)
const Counter = ({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = from;
    const end = to;
    // Ajustamos la velocidad si el número es muy grande (como 500)
    const incrementTime = (duration * 1000) / Math.abs(end - start);
    let timer: NodeJS.Timeout;

    const step = () => {
      // Si el salto es grande, incrementamos de a más pasos para que no sea eterno
      const jump = end > 100 ? 10 : 1; 
      start += jump;
      
      if (start > end) start = end; // Evitar pasarse

      if (nodeRef.current) {
        nodeRef.current.textContent = String(start);
      }
      if (start !== end) {
        timer = setTimeout(step, incrementTime);
      }
    };

    timer = setTimeout(step, incrementTime);
    return () => clearTimeout(timer);
  }, [isInView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
};

// Métrica HONESTAS basadas en Estándares Técnicos
const metrics = [
  {
    id: 1,
    label: "Vacío Profundo Garantizado",
    value: 500, // <--- Esto impresiona a cualquier ingeniero
    suffix: "µ", // Micrones
    icon: Gauge,
    description: "Uso estricto de vacuómetro digital. Cero humedad en el sistema.",
  },
  {
    id: 2,
    label: "Precisión en Diagnóstico",
    value: 100,
    suffix: "%",
    icon: Ruler,
    description: "Herramientas digitales y termografía. Sin adivinanzas.",
  },
  {
    id: 3,
    label: "Disponibilidad Técnica",
    value: 24,
    suffix: "/7",
    icon: Clock,
    description: "Atención directa con los dueños. Respuesta ágil ante fallas.",
  },
  {
    id: 4,
    label: "Apego a Normativa",
    value: 100,
    suffix: "%",
    icon: CheckCircle2,
    description: "Instalaciones bajo manual de fabricante y estándares eléctricos.",
  },
];

export default function Trust() {
  return (
    <section className="py-24 bg-industrial-900 relative border-t border-white/5">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* COLUMNA IZQUIERDA: La Propuesta de Valor de una Empresa Nueva */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="inline-block px-3 py-1 mb-6 border border-electric/30 rounded-full bg-electric/10">
              <span className="text-electric text-xs font-mono tracking-widest uppercase">
                // METODOLOGÍA MODERNA
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Menos Burocracia. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan-400">
                Más Ingeniería.
              </span>
            </h2>
            
            <p className="text-engine-200 text-lg leading-relaxed mb-8 max-w-lg">
              Sabemos que está cansado de contratistas que "improvisan". En Center Service combinamos la agilidad de un equipo dedicado con herramientas de última generación.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Reportes fotográficos digitales (Antes/Después).",
                "Personal capacitado y certificado.",
                "Garantía por escrito sobre la instalación."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-electric"></div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="text-white border-b border-electric hover:text-electric transition-colors pb-1 font-medium">
              Ver nuestros equipos &rarr;
            </button>
          </motion.div>

          {/* COLUMNA DERECHA: Grid de Estándares (No Historial) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-electric/30 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden"
              >
                {/* Fondo Glow sutil al hover */}
                <div className="absolute inset-0 bg-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-industrial-900 border border-white/10 text-electric group-hover:scale-110 transition-transform duration-300">
                      <metric.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter tabular-nums">
                      <Counter from={0} to={metric.value} />
                    </span>
                    <span className="text-xl text-electric font-medium">{metric.suffix}</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-2 opacity-80">
                    {metric.label}
                  </h3>
                  
                  <p className="text-xs text-engine-200 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}