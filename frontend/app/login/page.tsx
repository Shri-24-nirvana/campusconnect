"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const formRef = useRef(null);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    gsap.fromTo(formRef.current, 
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[var(--color-dark-bg)] p-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-neon-blue)] rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-neon-purple)] rounded-full filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div ref={formRef} className="glass-panel p-10 max-w-md w-full relative z-10 hover:neon-glow transition-shadow duration-300">
        <h2 className="text-4xl font-extrabold text-center mb-8 neon-text tracking-widest">SYSTEM LOGIN</h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-6 text-sm flex items-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 tracking-wider uppercase">Email Identifier</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 tracking-wider uppercase">Access Key (Password)</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-colors"
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-[var(--color-neon-blue)] text-[var(--color-dark-bg)] py-3 px-4 rounded-lg font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_#00f3ff] transition-all duration-300 mt-8">
            Initialize Connection
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Unregistered node? <Link href="/register" className="text-[var(--color-neon-blue)] font-semibold hover:text-white transition-colors underline decoration-[var(--color-neon-blue)] underline-offset-4">Establish Profile</Link>
        </p>
      </div>
    </div>
  );
}
