import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/providers/SmoothScroll";

// 1. Instanciamos el stack tipográfico
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk" 
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains" 
});

export const metadata: Metadata = {
  title: "Center Service | Ingeniería Térmica y Climatización",
  description: "Especialistas en infraestructura HVAC y refrigeración comercial en Venezuela. Garantizamos continuidad operativa sin margen de error.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${inter.variable} scroll-smooth`}>
      {/* 2. Limpiamos las clases antiguas. 
        Aplicamos el fondo '#F7F7F8' (Blanco roto/Gris Hielo) y texto en asfalto '#0A0A0A'.
        El selection:bg cambia el color cuando el usuario subraya texto.
      */}
      
<body className={cn(
  inter.className, 
  "antialiased bg-[#050505] text-white selection:bg-[#00A3FF] selection:text-white"
)}>
        
        {/* Capa de textura global */}
        <div className="noise-overlay"></div>

        <SmoothScroll>
          {children}
        </SmoothScroll>
        
      </body>
    </html>
  );
}