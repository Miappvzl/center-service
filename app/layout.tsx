// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/providers/SmoothScroll";
import FluidBackground from "@/components/layout/FluidBackground"; // ✅ INYECTADO

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Exergia | Servicios y Proyectos Climatización y Refrigeración en Venezuela",
  description: "Líderes en climatización industrial, comercial y doméstica. Garantizamos continuidad operativa sin margen de error.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${inter.variable} scroll-smooth`}>
      <body className={cn(
        inter.className, 
        // ✅ Quitamos bg-[#050505] y dejamos bg-transparent para ver el fluido
        "antialiased text-white selection:bg-[#00A3FF] selection:text-white relative bg-transparent"
      )}>
        
        {/* MAGIA FLUIDA A NIVEL GLOBAL */}
        <FluidBackground />
        
        {/* TEXTURA SUTIL ENCIMA DEL FLUIDO PARA EFECTO PREMIUM */}
        <div className="noise-overlay"></div>

        <SmoothScroll>
          {children}
        </SmoothScroll>
        
      </body>
    </html>
  );
}