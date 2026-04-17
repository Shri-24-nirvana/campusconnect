"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import Link from 'next/link';

export default function Home() {
  const contentRef = useRef(null);
  
  useEffect(() => {
    // GSAP Landing entry animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Canvas>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={1} />
          <Sphere args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color="#00f3ff"
              attach="material"
              distort={0.5}
              speed={1.5}
              roughness={0.2}
              transparent
              opacity={0.3}
            />
          </Sphere>
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
        <div ref={contentRef} className="glass-panel p-12 max-w-3xl transform transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight neon-text uppercase">
            Campus Connect
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light max-w-xl mx-auto">
            The premier networking ecosystem for students. Find teammates for hackathons, share your technical projects, and climb the global leaderboards.
          </p>
          
          <div className="flex gap-6 justify-center">
            <Link href="/login" className="px-8 py-3 rounded-full bg-[var(--color-neon-blue)] text-[var(--color-dark-bg)] font-bold hover:bg-white transition-colors duration-300 shadow-[0_0_15px_#00f3ff]">
              Access Portal
            </Link>
            <Link href="/register" className="px-8 py-3 rounded-full border border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] font-bold hover:bg-[var(--color-neon-blue)] hover:text-[var(--color-dark-bg)] transition-colors duration-300">
              Initialize Profile
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
