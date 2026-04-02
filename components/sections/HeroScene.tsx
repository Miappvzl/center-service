// src/components/sections/hero/HeroScene.tsx
"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh } from "three";

function IndustrialCore() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0}>
      <mesh ref={meshRef} scale={1.8}>
        <torusGeometry args={[3, 0.6, 32, 60]} />
        <meshPhysicalMaterial 
          color="#050505" 
          metalness={5.5} 
          roughness={0.15} 
          clearcoat={9.0} 
          clearcoatRoughness={10}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

const Background3D = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 opacity-50 pointer-events-none mix-blend-screen gpu-accelerated">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]} 
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true, stencil: false, depth: false }} 
      >
        <ambientLight intensity={18} /> 
        <directionalLight position={[5, 8, 5]} intensity={20} color="#ffa851" /> 
        <directionalLight position={[-10, -10, -8]} intensity={25} color="#00A3FF" /> 
        <spotLight position={[0, 80, 40]} intensity={10} color="#7173ff" penumbra={6} /> 
        
        <IndustrialCore />
      </Canvas>
    </div>
  );
});

Background3D.displayName = "Background3D";
export default Background3D;