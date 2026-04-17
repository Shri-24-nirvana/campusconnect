"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export default function CreatePost() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', description: '', type: 'HACKATHON' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.fromTo(".form-container", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const submitPost = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('access_token');

    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData)
    });
    
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] p-8 text-white flex justify-center items-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-neon-blue)] rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="glass-panel p-10 max-w-xl w-full form-container relative z-10 border border-[var(--color-neon-blue)]/30">
        <h2 className="text-2xl font-bold mb-8 text-[var(--color-neon-blue)] uppercase tracking-widest text-center">Broadcast New Data Payload</h2>
        
        <form onSubmit={submitPost} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Payload Type</label>
            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)]">
              <option value="HACKATHON">HACKATHON</option>
              <option value="INTERNSHIP">INTERNSHIP</option>
              <option value="PROJECT COLLAB">PROJECT COLLABORATION</option>
              <option value="GENERAL">GENERAL ANNOUNCEMENT</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Title Directive</label>
            <input type="text" placeholder="e.g. Need 2 devs for upcoming CTF" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)]" required />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Detailed Specifications</label>
            <textarea placeholder="Describe the requirements, tech stack, and goals..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] h-32" required />
          </div>

          <div className="flex gap-4 mt-8 pt-4 border-t border-white/10">
            <button type="button" onClick={() => router.push('/dashboard')} className="flex-1 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold py-3 uppercase tracking-widest text-xs rounded transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-[var(--color-neon-blue)] text-black font-bold py-3 uppercase tracking-widest text-xs rounded hover:shadow-[0_0_20px_var(--color-neon-blue)] transition-all">
              {loading ? 'TRANSMITTING...' : 'INITIALIZE BROADCAST'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
