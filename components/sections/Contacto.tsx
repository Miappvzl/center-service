// src/components/sections/Contacto.tsx
"use client";

import { useState } from "react";
import { ArrowRight, Home, Store, Factory, Wrench, Snowflake, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// --- OPCIONES HUMANAS (Copywriting Ultra-Breve) ---
const locations = [
  { id: "hogar", label: "MI HOGAR", icon: Home },
  { id: "negocio", label: "MI NEGOCIO", icon: Store },
  { id: "industria", label: "INDUSTRIA", icon: Factory },
];

const services = [
  { id: "reparacion", label: "REPARACIÓN URGENTE", icon: Wrench },
  { id: "mantenimiento", label: "MANTENIMIENTO", icon: ShieldCheck },
  { id: "instalacion", label: "INSTALACIÓN NUEVA", icon: Snowflake },
];

export default function Contacto() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>("hogar");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Número de WhatsApp real de Center Service
  const whatsappNumber = "584144207165"; 

  // Generador del mensaje dinámico (Texto Humano)
  const handleWhatsAppClick = () => {
    let mensaje = "Hola, me gustaría agendar una visita técnica Exergia.";
    
    if (selectedLocation && selectedService) {
      const locLabel = locations.find(l => l.id === selectedLocation)?.label.toLowerCase();
      const servLabel = services.find(s => s.id === selectedService)?.label.toLowerCase();
      mensaje = `Hola, necesito ayuda con un equipo en ${locLabel}. Requiero un servicio de ${servLabel}. ¿Cuándo podrían visitarme?`;
    }

    const encodedMessage = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="relative bg-[#050505] text-white overflow-hidden border-t border-white/5 selection:bg-[#00A3FF] selection:text-white" id="contacto">
      
      {/* EL FRAGMENTO DE LUZ SUPERIOR (Sello de la casa) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/40 to-transparent z-10"></div>

      {/* GRID EXPUESTO (Bordes rectos y duros) */}
      {/* ✅ REQUERIMIENTO #3: 'flex-col-reverse' para mobile (formulario arriba, info abajo). */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:border-b lg:border-white/5">
        
        {/* COLUMNA IZQUIERDA: Información y Autoridad (Fondo en Mobile, Izquierda Sticky en Desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-16 lg:p-24 lg:border-r border-white/5 lg:sticky lg:top-32 lg:h-[calc(100vh-128px)]">
          
          <div className="inline-flex items-center gap-3 font-mono text-[10px] md:text-xs text-[#00A3FF] font-bold tracking-[0.2em] uppercase mb-10 border border-[#00A3FF]/20 bg-[#00A3FF]/5 px-4 py-2 rounded-none w-fit shadow-[0_0_15px_rgba(0,163,255,0.1)]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse"></span>
            ATENCIÓN DIRECTA
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-8 uppercase leading-[0.85]" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
            SIN <br className="hidden lg:block"/>
            <span className="text-white/20">ESPERAS.</span>
          </h2>
          
          <p className="text-white/60 font-medium text-lg leading-relaxed mb-16 max-w-lg">
            Rompemos con la informalidad. Agenda tu visita técnica directamente por WhatsApp con un especialista real.
          </p>

          {/* DATOS DE CONTACTO (Neo-Brutalistas) */}
          <div className="flex flex-col gap-10 border-t border-white/5 pt-12">
            <div className="flex items-center gap-6 group">
              <MapPin className="w-6 h-6 text-[#00A3FF] shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-tight">COBERTURA CENTRAL</h4>
                <p className="text-white/50 text-sm font-mono" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>Cobertura a nivel nacional. Oficina principal: Carabobo-Valencia C.C Gran Bazar av Lara</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <Phone className="w-6 h-6 text-[#00A3FF] shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-tight">LÍNEA DIRECTA</h4>
                <p className="text-white/50 text-sm font-mono" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>+58 4144207165</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <Mail className="w-6 h-6 text-[#00A3FF] shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-tight">CORREO CORPORATIVO</h4>
                <p className="text-white/50 text-sm font-mono" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>contacto@centerserviceve.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: El Terminal de Triage (Neo-Brutalismo Puro) */}
        {/* En mobile, esto aparece ARRIBA del bloque de información */}
        <div className="lg:col-span-7 flex flex-col p-8 md:p-16 lg:p-24 bg-[#080808] border-b border-white/5 lg:border-b-0">
          
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-4 uppercase leading-none" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
            ¿QUÉ <span className="text-white/30">NECESITAS?</span>
          </h3>
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-16 pointer-events-none" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Selección rápida para agendar tu visita.
          </p>

          {/* PASO 1: Ubicación (Interruptores Duros Neo-Brutal) */}
          <div className="mb-12 border-b border-white/5 pb-12">
            <label className="block text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              1. ¿DÓNDE ESTÁ EL EQUIPO?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={cn(
                    "relative flex flex-row md:flex-col items-center md:items-start justify-center md:justify-between gap-4 p-5 transition-all duration-300 rounded-none border border-white/5 group",
                    selectedLocation === loc.id 
                      ? "bg-white text-black border-white neo-brutal-glow" // ✅ Contraste radical Neo-Brutal
                      : "bg-[#050505] text-white/50 hover:border-white/20 hover:text-white"
                  )}
                >
                  {/* ✅ FIX: strokeWidth={2} fijo, sin la variable undefined */}
                  <loc.icon className={cn("w-6 h-6 md:mb-5", selectedLocation === loc.id ? "text-black" : "text-[#00A3FF]")} strokeWidth={2} />
                  <span className="text-lg font-extrabold tracking-tighter uppercase leading-none" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>{loc.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PASO 2: Tipo de Servicio (Interruptores Duros Neo-Brutal) */}
          <div className="mb-16">
            <label className="block text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              2. ¿QUÉ SERVICIO REQUIERES?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {services.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  className={cn(
                    "relative flex flex-row md:flex-col items-center md:items-start justify-center md:justify-between gap-4 p-5 transition-all duration-300 rounded-none border border-white/5 group",
                    selectedService === srv.id 
                      ? "bg-[#00A3FF] text-black border-[#00A3FF] neo-brutal-glow" // ✅ Contraste radical Neo-Brutal
                      : "bg-[#050505] text-white/50 hover:border-white/20 hover:text-white"
                  )}
                >
                  {/* ✅ FIX: strokeWidth={2} fijo */}
                  <srv.icon className={cn("w-6 h-6 md:mb-5", selectedService === srv.id ? "text-black" : "text-white/70")} strokeWidth={2} />
                  <span className="text-lg font-extrabold tracking-tighter uppercase leading-none" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>{srv.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* BOTÓN FINAL NEO-BRUTALISTA (WhatsApp) */}
          <div className="flex w-full justify-start md:justify-center mb-16">
            <button
                onClick={handleWhatsAppClick}
                disabled={!selectedLocation || !selectedService}
            
                className="group relative px-10 py-5 bg-white text-black font-black text-sm md:text-base uppercase tracking-[0.1em] rounded-full overflow-hidden flex items-center justify-center gap-3 hover:bg-neutral-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
                <span className="relative z-10 flex items-center gap-2">
                    CONTACTAR ESPECIALISTA
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
            </button>
          </div>
          
          <p className="text-center font-mono text-[9px] uppercase tracking-widest text-white/20 mt-5 pointer-events-none" style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
            Te responderemos de inmediato por WhatsApp.
          </p>

        </div>
      </div>
    </section>
  );
}