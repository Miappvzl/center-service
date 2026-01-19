"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-industrial-900 border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      
      {/* Elemento decorativo de fondo (Grid) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-electric/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* COLUMNA IZQUIERDA: EL CIERRE DE VENTA (CTA) */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                ¿Listo para optimizar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan-400">
                  su infraestructura?
                </span>
              </h2>
              
              <p className="text-engine-200 text-lg mb-10 max-w-md leading-relaxed">
                Hable directamente con los ingenieros, no con vendedores. Diagnóstico preliminar sin compromiso en menos de 24 horas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/584120000000" // <--- CAMBIA ESTO POR TU NÚMERO
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-electric hover:bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Agendar Visita Técnica
                </a>
                
                <a 
                  href="mailto:contacto@centerservice.com"
                  className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Enviar Solicitud
                </a>
              </div>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: DATOS DUROS & NAVEGACIÓN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:pl-12 border-l border-white/5">
            
            {/* Ubicación */}
            <div>
              <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-electric w-4 h-4" />
                Base de Operaciones
              </h4>
              <p className="text-engine-200 text-sm leading-relaxed mb-4">
                Cobertura principal en:<br />
                <span className="text-white font-medium">Valencia, Zona Industrial</span><br />
                y Estado Cojedes.
              </p>
              <div className="text-xs text-white/40 font-mono mt-4">
                DISPONIBILIDAD INMEDIATA
                <br />
                LUN - SAB / 8:00 AM - 6:00 PM
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div>
              <h4 className="text-white font-bold mb-6">Navegación</h4>
              <ul className="space-y-4">
                {['Servicios', 'Proyectos', 'Nosotros', 'Protocolos'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-engine-200 hover:text-electric transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-electric transition-colors"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* BARRA INFERIOR (LEGAL) */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              Center<span className="text-electric">Service</span>
            </span>
            <span className="text-white/20 text-sm">|</span>
            <span className="text-white/40 text-xs">
              © {currentYear} Ingeniería Aplicada.
            </span>
          </div>

          {/* Socials (Iconos minimalistas) */}
          <div className="flex items-center gap-6">
            {[Instagram, Linkedin, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="text-white/40 hover:text-electric transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}