"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* FONDO (Background) */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente radial para simular luz industrial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-industrial-800 via-industrial-900 to-black opacity-80"></div>
        {/* Grid sutil para efecto técnico */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* TEXTO (Columna Izquierda) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-electric animate-pulse"></span>
            <span className="text-xs font-medium text-engine-200 tracking-wide uppercase">Ingeniería Certificada</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Climatización Industrial para la <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-blue-400 to-cyan-300">Continuidad Operativa</span>
          </h1>
          
          <p className="text-lg text-engine-DEFAULT mb-8 max-w-xl leading-relaxed">
            Optimizamos sistemas HVAC para industrias, data centers y edificios corporativos en Venezuela. Reduzca costos energéticos y evite paradas críticas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-electric hover:bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105">
              Solicitar Auditoría <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium rounded-lg transition-all">
              Ver Servicios
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-engine-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-electric" />
              <span>Normativa ASHRAE</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-electric" />
              <span>Eficiencia Energética</span>
            </div>
          </div>
        </motion.div>

        {/* VISUAL (Columna Derecha - Placeholder Tecnológico) */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative hidden lg:block"
        >
          {/* Aquí simulamos una interfaz técnica o imagen de equipo */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-industrial-800/50 backdrop-blur-sm p-2 shadow-2xl">
             {/* Placeholder visual - Reemplazar luego con foto real */}
             <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-industrial-700 to-industrial-900 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-electric/10 group-hover:bg-electric/5 transition-colors"></div>
                {/* Texto simulado */}
                <div className="text-center p-6">
                  <div className="text-5xl font-bold text-white mb-2">24°C</div>
                  <div className="text-engine-DEFAULT text-sm tracking-widest uppercase">Temperatura Controlada</div>
                  <div className="mt-4 flex justify-center gap-2">
                    <span className="h-1 w-12 bg-green-500 rounded-full"></span>
                    <span className="h-1 w-2 bg-industrial-600 rounded-full"></span>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}