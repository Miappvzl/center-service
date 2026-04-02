// src/components/sections/hero/animations.ts

export const EASE_ELITE = [0.16, 1, 0.3, 1] as const;

export const textRevealVariants = {
  hidden: { y: "100%", opacity: 0, rotate: 2 },
  visible: { 
    y: "0%", 
    opacity: 1, 
    rotate: 0, 
    transition: { duration: 1.2, ease: EASE_ELITE } 
  },
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: EASE_ELITE } 
  }
};