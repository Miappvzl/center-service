"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ==========================================
// 1. GAS SHADER (GLSL) - El Motor del Viento
// ==========================================

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  varying vec2 vUv;

  // Ruido Simplex para la textura del gas/humo
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Coordenadas normalizadas con influencia suave del tiempo
    vec2 st = vUv;
    st.x += snoise(st * 4.0 + u_time * 0.1) * 0.1;
    st.y -= snoise(st * 2.0 - u_time * 0.1) * 0.05;

    // Campo de densidad del gas (simulando vórtices y flujo)
    float n1 = snoise(st * 3.0 + u_time * 0.1);
    float n2 = snoise(st * 5.0 - u_time * 0.15 + n1);
    float fluid = snoise(st * 1.5 + u_time * 0.05 - n2);
    
    // Suavizamos el gas y añadimos desvanecimiento a distancia (eje Y)
    fluid = smoothstep(-0.5, 0.5, fluid) * (1.0 - st.y);

    // PALETA "COLD ENGINEERING"
    vec3 deepBlueGas = vec3(0.01, 0.06, 0.15); // Tono azul abismal para dar volumen
    vec3 cyanLaser = vec3(0.0, 0.85, 1.0);     // Cian frío metálico

    // Mezcla matemática de colores basada en la densidad del fluido
    vec3 finalColor = mix(vec3(0.0), deepBlueGas, fluid);
    finalColor = mix(finalColor, cyanLaser, smoothstep(0.4, 0.8, fluid));
    finalColor = mix(finalColor, u_color, smoothstep(0.7, 1.0, fluid)); // Toque cian pastel

    // Alpha final: el gas se vuelve transparente en los bordes y a distancia
    float alpha = smoothstep(0.1, 0.9, fluid) * (1.0 - st.y * 1.5);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// ==========================================
// 2. COMPONENTE WEBGL: El Plano Mágico y Ventilador
// ==========================================
const GasPlane = ({ scale }: { scale: [number, number, number] }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  
  // Generamos el material UNA sola vez
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_color: { value: new THREE.Color("#8DC4FF") }, // Cian pastel
    }),
    [size]
  );

  // El Loop de Renderizado (Se ejecuta a 60 FPS fijos)
  useFrame((state, delta) => {
    if (materialRef.current) {
      // 1. Actualizamos el tiempo para que el gas se mueva
      materialRef.current.uniforms.u_time.value += delta;
    }
  });

  return (
    // Renderizamos un plano translúcido en frente del ventilador
    <mesh scale={scale} position={[0, -0.2, 0.1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// ==========================================
// 3. COMPONENTE 3D: El Ventilador Industrial
// ==========================================
function IndustrialFanGeometry() {
  const bladesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (bladesRef.current) {
      // Aspas giran lentamente (1.5 rad/s)
      bladesRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group ref={bladesRef}>
      {/* FRAME DEL VENTILADOR (Círculo externo) */}
      <mesh position={[0, 0, -0.05]}>
        <torusGeometry args={[0.5, 0.05, 32, 64]} />
        <meshPhysicalMaterial color="#010101" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* ASPAS (Haciendo geometría simple con cajas) */}
      {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, i) => (
        <mesh key={i} position={[0, 0, -0.05]} rotation={[0, angle, 0]}>
          <boxGeometry args={[0.02, 0.45, 0.005]} />
          <meshPhysicalMaterial color="#1a1a1a" metalness={1} roughness={0.2} />
        </mesh>
      ))}

      {/* NÚCLEO CENTRAL */}
      <mesh position={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.1, 0.1, 0.01, 16]} />
        <meshPhysicalMaterial color="#0A0A0A" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ==========================================
// 4. ENVOLTORIO FINAL (Canvas WebGL)
// ==========================================
export default function IndustrialFan() {
  const { viewport } = useThree();
  // El plano del gas debe ocupar todo el ancho del Canvas
  const gasScale: [number, number, number] = [viewport.width, viewport.height * 2, 1];

  return (
    <group position={[0, 0, -5]}>
      
      {/* 1. VENTILADOR INDUSTRIAL 3D */}
      <IndustrialFanGeometry />

      {/* 2. PLANO DE GAS FRÍO SHADER (ULTRA OPTIMIZADO) */}
      <GasPlane scale={gasScale} />

    </group>
  );
}