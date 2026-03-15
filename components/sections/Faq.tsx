// src/components/sections/Faq.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// --- COPY SEO: Preguntas Reales del Mercado Venezolano ---
const faqs = [
  {
    question: "¿Cómo protegen los equipos ante las fluctuaciones eléctricas?",
    answer: "Las fallas de voltaje son el enemigo número uno en Venezuela. No solo instalamos el aire acondicionado o la cava; evaluamos y recomendamos sistemas de protección térmica y relés de fase específicos para la carga de tu equipo, garantizando que una caída de tensión no queme tu compresor."
  },
  {
    question: "Mi equipo enfría poco pero consume mucha electricidad, ¿por qué?",
    answer: "Suele deberse a serpentines obstruidos por falta de mantenimiento profundo o un sistema trabajando forzado por pérdida de eficiencia térmica. Nuestro diagnóstico con herramientas de precisión detecta si es un problema de flujo de aire, capacitores agotados o fallas en el aislamiento, corrigiéndolo para reducir tu factura eléctrica."
  },
  {
    question: "¿Ofrecen garantía por los repuestos y la mano de obra?",
    answer: "Absolutamente. Rompemos con la informalidad del sector. Todo proyecto, desde un mantenimiento residencial hasta una instalación de chillers industriales, viene con respaldo documentado. Usamos repuestos verificados y no damos por terminado el trabajo hasta medir que los parámetros de presión y temperatura sean óptimos."
  },
  {
    question: "¿Es normal tener que 'recargarle gas' al aire acondicionado frecuentemente?",
    answer: "No. El gas refrigerante no se consume ni se evapora por el uso. Si a tu equipo le falta gas, significa que hay una fuga en la tubería o en las conexiones. En lugar de cobrarte recargas infinitas, presurizamos el sistema con nitrógeno, localizamos la fuga, soldamos y luego hacemos la carga definitiva."
  }
];

// --- COMPONENTE INTERNO: Pregunta Individual ---
const FaqItem = ({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 md:py-8 text-left group focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className={cn(
          "text-lg md:text-2xl font-bold pr-8 transition-colors duration-300",
          isOpen ? "text-[#00A3FF]" : "text-white group-hover:text-white/80"
        )} style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
          {faq.question}
        </h3>
        
        {/* Icono animado (Plus que gira a X) */}
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex shrink-0 items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border transition-colors duration-300",
            isOpen ? "border-[#00A3FF] text-[#00A3FF]" : "border-white/10 text-white/50 group-hover:border-white/30"
          )}
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-white/60 font-medium text-base md:text-lg leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // El primero abierto por defecto

  // --- MAGIA SEO: Generación del Schema Markup (JSON-LD) ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#050505] border-t border-white/5" id="faq">
      
      {/* INYECCIÓN DEL SCRIPT PARA GOOGLE BOT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* COLUMNA IZQUIERDA: Titular Fijo (Sticky) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32 h-fit">
            <div className="inline-flex items-center gap-3 font-mono text-[10px] md:text-xs text-white/70 font-bold tracking-[0.2em] uppercase mb-6 border border-white/10 bg-[#0A0A0A] px-4 py-2 rounded-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_rgba(0,163,255,0.8)]"></span>
              Base de Conocimiento
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-6" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
              Respuestas <br />
              <span className="text-white/30">Críticas.</span>
            </h2>
            
            <p className="text-white/50 font-medium text-sm md:text-base max-w-sm leading-relaxed mb-8">
              Rompemos con los mitos y las malas prácticas del sector. Si tienes dudas sobre tu infraestructura térmica, aquí hablamos con la verdad técnica.
            </p>

            {/* Micro-interacción: Botón secundario para contacto rápido */}
            <a href="#contacto" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00A3FF] hover:text-white transition-colors duration-300 group">
              ¿No encuentras tu problema? Escríbenos 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* COLUMNA DERECHA: Acordeón de Preguntas */}
          <div className="lg:col-span-7 flex flex-col border-t border-white/10 mt-8 lg:mt-0">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}