"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const formRef = useRef(null);
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'STUDENT', collegeId: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    gsap.fromTo(formRef.current, 
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Registration failed. Email might already exist.');
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
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--color-neon-purple)] rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
      
      <div ref={formRef} className="glass-panel p-10 max-w-lg w-full relative z-10 hover:neon-glow transition-shadow duration-300">
        <h2 className="text-4xl font-extrabold text-center mb-8 neon-text tracking-widest uppercase">Initialize Profile</h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-6 text-sm">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Full Name / Alias</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-colors" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Email Identifier</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-colors" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Access Key (Password)</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-black/40 border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-colors" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Node Role</label>
            <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-black/40 border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-colors">
              <option value="STUDENT">Student</option>
              <option value="ALUMNI">Alumni</option>
            </select>
          </div>
          
          <button type="submit" className="w-full bg-[var(--color-neon-blue)] text-[var(--color-dark-bg)] py-3 px-4 rounded-lg font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_#00f3ff] transition-all duration-300 mt-6">
            Register Node
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already verified? <Link href="/login" className="text-[var(--color-neon-blue)] font-semibold hover:text-white transition-colors underline decoration-[var(--color-neon-blue)] underline-offset-4">Authenticate</Link>
        </p>
      </div>
    </div>
  );
}
