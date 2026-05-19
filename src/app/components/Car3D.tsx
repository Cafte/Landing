import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

const COLORS = {
  body: '#c8a96e',
  glass: '#223344',
  dark: '#111111',
  wheel: '#1a1a1a',
  rim: '#cccccc'
};

function Wheel({ position }: { position: [number, number, number] }) {
  const spokes = useMemo(() => [0, 1, 2, 3, 4], []);
  
  return (
    <group position={position}>
      {/* Tire */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.28, 24]} />
        <meshStandardMaterial color={COLORS.wheel} roughness={0.8} />
      </mesh>
      {/* Rims / Spokes */}
      {spokes.map((i) => (
        <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
          <boxGeometry args={[0.06, 0.56, 0.05]} />
          <meshStandardMaterial color={COLORS.rim} roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      {/* Hubcap */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
        <meshStandardMaterial color={COLORS.rim} roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

function VeloceRS({ onPartClick }: { onPartClick: (id: string) => void }) {
  const carRef = useRef<THREE.Group>(null);

  return (
    <group ref={carRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group>
          {/* Main Body */}
          <mesh position={[0, 0.52, 0]} castShadow onClick={() => onPartClick('body')}>
            <boxGeometry args={[3.6, 0.55, 1.7]} />
            <meshStandardMaterial color={COLORS.body} roughness={0.15} metalness={0.85} />
          </mesh>

          {/* Hood */}
          <mesh position={[1.15, 0.88, 0]} rotation={[0, 0, 0.18]} castShadow onClick={() => onPartClick('engine')}>
            <boxGeometry args={[1.1, 0.25, 1.65]} />
            <meshStandardMaterial color={COLORS.body} roughness={0.15} metalness={0.85} />
          </mesh>

          {/* Cabin */}
          <mesh position={[-0.1, 1.05, 0]} castShadow onClick={() => onPartClick('body')}>
            <boxGeometry args={[1.5, 0.52, 1.5]} />
            <meshStandardMaterial color={COLORS.body} roughness={0.15} metalness={0.85} />
          </mesh>

          {/* Windows */}
          <group onClick={(e) => { e.stopPropagation(); onPartClick('windows'); }}>
            {/* Windshield */}
            <mesh position={[0.65, 1.02, 0]} rotation={[0, 0, -0.55]}>
              <boxGeometry args={[0.05, 0.45, 1.35]} />
              <meshStandardMaterial color={COLORS.glass} roughness={0.05} metalness={0.1} transparent opacity={0.7} />
            </mesh>
            {/* Rear window */}
            <mesh position={[-0.85, 1.02, 0]} rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.05, 0.42, 1.32]} />
              <meshStandardMaterial color={COLORS.glass} roughness={0.05} metalness={0.1} transparent opacity={0.7} />
            </mesh>
            {/* Side Windows */}
            <mesh position={[-0.05, 1.08, 0.728]}>
              <boxGeometry args={[1.3, 0.35, 0.04]} />
              <meshStandardMaterial color={COLORS.glass} roughness={0.05} metalness={0.1} transparent opacity={0.7} />
            </mesh>
            <mesh position={[-0.05, 1.08, -0.728]}>
              <boxGeometry args={[1.3, 0.35, 0.04]} />
              <meshStandardMaterial color={COLORS.glass} roughness={0.05} metalness={0.1} transparent opacity={0.7} />
            </mesh>
          </group>

          {/* Bumpers */}
          <mesh position={[1.89, 0.38, 0]} onClick={() => onPartClick('body')}>
            <boxGeometry args={[0.18, 0.32, 1.65]} />
            <meshStandardMaterial color={COLORS.dark} roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh position={[-1.89, 0.38, 0]} onClick={() => onPartClick('body')}>
            <boxGeometry args={[0.18, 0.32, 1.65]} />
            <meshStandardMaterial color={COLORS.dark} roughness={0.5} metalness={0.3} />
          </mesh>

          {/* Headlights */}
          <group onClick={() => onPartClick('lights')}>
            <mesh position={[1.9, 0.5, 0.55]}>
              <boxGeometry args={[0.12, 0.14, 0.28]} />
              <meshStandardMaterial color="#ffffee" emissive="#ffffcc" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[1.9, 0.5, -0.55]}>
              <boxGeometry args={[0.12, 0.14, 0.28]} />
              <meshStandardMaterial color="#ffffee" emissive="#ffffcc" emissiveIntensity={0.8} />
            </mesh>
          </group>

          {/* Wheels */}
          <group onClick={(e) => { e.stopPropagation(); onPartClick('wheels'); }}>
            <Wheel position={[1.2, 0.38, 0.92]} />
            <Wheel position={[1.2, 0.38, -0.92]} />
            <Wheel position={[-1.2, 0.38, 0.92]} />
            <Wheel position={[-1.2, 0.38, -0.92]} />
          </group>

          {/* Spoiler */}
          <group onClick={() => onPartClick('body')}>
            <mesh position={[-1.7, 0.95, 0]}>
              <boxGeometry args={[0.08, 0.22, 1.4]} />
              <meshStandardMaterial color={COLORS.body} roughness={0.15} metalness={0.85} />
            </mesh>
            <mesh position={[-1.7, 1.1, 0]}>
              <boxGeometry args={[0.6, 0.06, 1.5]} />
              <meshStandardMaterial color={COLORS.body} roughness={0.15} metalness={0.85} />
            </mesh>
          </group>
        </group>
      </Float>
    </group>
  );
}

export function Car3D({ onPartClick }: { onPartClick: (partId: string) => void; view: string }) {
  return (
    <div className="w-full h-full min-h-[450px] relative bg-[#050505] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <span className="bg-yellow-600/20 text-yellow-500 text-[10px] px-3 py-1.5 rounded-full border border-yellow-500/30 uppercase tracking-[0.2em] font-black">
          Veloce RS-500 Edition
        </span>
      </div>
      
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#0d0d0d']} />
        <fog attach="fog" args={['#0d0d0d', 10, 20]} />
        <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={40} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 4]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-6, 3, -3]} intensity={1.2} color="#c8a96e" />
        <pointLight position={[-3, 1, 5]} intensity={0.6} color="#4466ff" />

        <Suspense fallback={null}>
          <VeloceRS onPartClick={onPartClick} />
          <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          minDistance={4} 
          maxDistance={10} 
          target={[0, 0.5, 0]}
          makeDefault 
        />
      </Canvas>
    </div>
  );
}
