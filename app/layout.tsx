import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"; // <--- Importamos las nuevas fuentes
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/providers/SmoothScroll";

// 1. Instanciamos las fuentes de Google
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Center Service | Ingeniería Térmica y Climatización en Venezuela",
  description: "Líderes en climatización industrial, comercial y doméstica. Garantizamos continuidad operativa sin margen de error.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 2. Inyectamos las variables de fuente en el HTML
    <html lang="es" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${inter.variable} scroll-smooth`}>
      {/* 3. LIMPIEZA TOTAL: Eliminamos bg-industrial-900.
        Aplicamos fondo asfalto (#050505), texto blanco y selección cyan.
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