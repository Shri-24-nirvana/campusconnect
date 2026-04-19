"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export default function Leaderboard() {
  const router = useRouter();
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/ranking/leaderboard`)
      .then(res => res.json())
      .then(data => {
        setLeaders(data);
        setTimeout(() => {
          gsap.fromTo(".leader-row", 
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
          );
        }, 100);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] p-8 text-white relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--color-neon-purple)] rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 glass-panel p-8 border border-[var(--color-neon-purple)]/30">
        <h2 className="text-3xl font-extrabold mb-8 text-[var(--color-neon-purple)] uppercase tracking-widest text-center">Global Node Leaderboard</h2>
        
        <div className="space-y-4">
          {leaders.map((leader, index) => (
            <div key={leader.id} className="leader-row opacity-0 flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-lg hover:border-[var(--color-neon-blue)] transition-colors">
              <div className="flex items-center gap-6">
                <span className={`text-4xl font-black ${index < 3 ? 'text-[var(--color-neon-purple)] neon-text' : 'text-gray-600'}`}>{index + 1}</span>
                <div>
                  <h3 className="font-bold text-xl">{leader.user?.name || 'Unknown Node'}</h3>
                  <span className="text-xs text-[var(--color-neon-blue)] uppercase font-mono block mt-1">[{leader.badge}]</span>
                </div>
              </div>
              <div className="text-right bg-white/5 px-4 py-2 rounded">
                <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">XP Points</span>
                <span className="text-2xl font-light tracking-wide text-white">{leader.score}</span>
              </div>
            </div>
          ))}
          
          {leaders.length === 0 && <p className="text-center text-gray-500 font-mono py-12">TRANSMITTING LEADERBOARD... NO DATA DETECTED YET.</p>}
        </div>

        <button onClick={() => router.push('/dashboard')} className="mt-8 text-[var(--color-neon-purple)] text-xs hover:text-[var(--color-neon-blue)] transition-colors uppercase tracking-widest w-full text-center p-4">
          &lt; Return to Control Center
        </button>
      </div>
    </div>
  );
}
