import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Aquí le decimos: "Busca en TODAS partes"
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Por si acaso no usas carpeta src:
    "./*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          900: "#050505",
          800: "#0A0A0A",
          700: "#121212",
        },
        engine: {
          100: "#E2E8F0",
          200: "#CBD5E1",
          DEFAULT: "#94A3B8",
        },
        electric: {
          DEFAULT: "#2563EB", // Azul Eléctrico
          glow: "#3B82F6",
        },
        white: "#F8FAFC",
      },
    },
  },
  plugins: [],
};
export default config;