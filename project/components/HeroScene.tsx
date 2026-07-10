'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const count = 2000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y += 0.0005;
    points.current.rotation.x += 0.0002;
    const t = state.clock.elapsedTime;
    points.current.position.x = Math.sin(t * 0.1) * 0.5 + mouse.x * 0.5;
    points.current.position.y = Math.cos(t * 0.15) * 0.3 + mouse.y * 0.5;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={new THREE.Color('hsl(189, 94%, 60%)')}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrb({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.5;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.3;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.2;
    ref.current.position.z = position[2] + mouse.x * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = mouse.x * 5;
    lightRef.current.position.y = mouse.y * 5;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 5]}
      color="hsl(189, 94%, 60%)"
      intensity={2}
      distance={15}
    />
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="hsl(217, 91%, 60%)" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="hsl(152, 76%, 50%)" />
      <MouseLight />
      <ParticleField />
      <FloatingOrb position={[-3, 1, -2]} color="hsl(189, 94%, 60%)" scale={0.8} speed={0.8} />
      <FloatingOrb position={[3, -1, -1]} color="hsl(217, 91%, 60%)" scale={1.2} speed={1} />
      <FloatingOrb position={[0, 2, -3]} color="hsl(152, 76%, 50%)" scale={0.6} speed={1.2} />
      <FloatingOrb position={[2, 2, 0]} color="hsl(280, 65%, 60%)" scale={0.5} speed={0.6} />
    </Canvas>
  );
}
