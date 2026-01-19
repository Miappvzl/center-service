import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/providers/SmoothScroll"; // <--- Importar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Center Service | Ingeniería de Climatización",
  description: "Líderes en climatización industrial y comercial en Venezuela.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(inter.className, "antialiased bg-industrial-900 text-white")}>
        <SmoothScroll> {/* <--- Envolver AQUÍ */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}