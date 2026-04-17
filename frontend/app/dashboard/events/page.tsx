"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function JobsInternshipsView() {
  const [opportunities, setOpportunities] = useState<any[]>([]);

  useEffect(() => {
    gsap.fromTo(".opp-card", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
    
    const token = localStorage.getItem('access_token');
    fetch('http://localhost:5000/posts', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : [])
      .then(data => Array.isArray(data) ? setOpportunities(data) : setOpportunities([]))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full h-[85vh] flex flex-col pb-10 max-w-[1700px] mx-auto min-h-screen">
       <div className="flex justify-between items-center mb-8 pr-8">
          <h1 className="text-white text-xl font-bold tracking-widest uppercase flex items-center gap-4">
             JOBS & INTERNSHIPS
          </h1>
          <button className="bg-transparent border-2 border-[#00e6e6] text-[#00e6e6] font-bold tracking-widest px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(0,230,230,0.3)] hover:bg-[#00e6e6] hover:text-[#060b13] transition-colors">
             CREATE OPPORTUNITY
          </button>
       </div>

       <div className="flex gap-4 mb-8">
          <span className="bg-[#00e6e6]/20 border border-[#00e6e6] text-[#00e6e6] px-4 py-1.5 rounded-lg text-xs font-bold shadow-[0_0_10px_rgba(0,230,230,0.2)]">INTERNSHIP</span>
          <span className="bg-[#111928]/80 border border-white/10 text-gray-300 px-4 py-1.5 rounded-lg text-xs hover:border-[#BC13FE] transition-colors cursor-pointer">FULL-TIME</span>
          <span className="bg-[#BC13FE]/20 border border-[#BC13FE] text-[#BC13FE] px-4 py-1.5 rounded-lg text-xs font-bold shadow-[0_0_10px_rgba(188,19,254,0.2)] hover:bg-[#BC13FE]/40 transition-colors cursor-pointer">COMPETITION</span>
          <select className="bg-[#111928] border border-white/10 text-gray-300 px-4 py-1.5 rounded-lg text-xs outline-none ml-4">
             <option>TAG ▼</option>
             <option>SWE</option>
             <option>Data Science</option>
             <option>Hackathon</option>
          </select>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-8 overflow-y-auto css-scrollbar pb-16">
          
          {/* Card 1: Internship */}
          <div className="opp-card bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 hover:border-[#00e6e6]/50 rounded-[2rem] p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col relative transition-all">
             <div className="absolute top-6 right-6 text-gray-500 cursor-pointer hover:text-white">⋮</div>
             <div className="flex items-center gap-3 mb-6">
                <img src="/avatar_1.png" className="w-10 h-10 rounded-full border border-white/20 object-cover bg-[#111928]" />
                <div className="flex flex-col">
                   <h3 className="text-sm font-bold text-white">Aryan Sharma</h3>
                   <span className="text-[10px] text-gray-500 font-mono">(CSE, 2026)</span>
                </div>
             </div>
             
             <h2 className="text-xl font-bold text-white mb-6">INTERNSHIP: SWE @ Microsoft</h2>
             
             <div className="flex gap-6 mb-8">
                <div className="w-20 h-20 bg-black rounded-2xl flex flex-wrap flex-col justify-center items-center py-2 relative overflow-hidden">
                   {/* Fake Microsoft Logo */}
                   <div className="w-12 h-12 flex flex-wrap gap-1">
                      <div className="w-5 h-5 bg-[#F25022]"></div><div className="w-5 h-5 bg-[#7FBA00]"></div>
                      <div className="w-5 h-5 bg-[#00A4EF]"></div><div className="w-5 h-5 bg-[#FFB900]"></div>
                   </div>
                </div>
                <div className="flex flex-col flex-1">
                   <div className="flex items-center gap-2 mb-2">
                       <span className="text-[#00e6e6] text-xs">Tag: SWE</span>
                   </div>
                   <p className="text-xs text-gray-400 mb-2 leading-relaxed">Internship SWE et Internsoft: SWE @ Microsoft</p>
                   <p className="text-[11px] text-gray-300">Contact info: <span className="text-[#00e6e6]">Microsoft.com</span></p>
                </div>
             </div>
             
             <p className="text-xs text-gray-400 mb-6">Contact info@contactiri.co / <span className="text-[#00e6e6] font-bold cursor-pointer">Apply</span></p>
             
             <div className="flex gap-3 justify-between border-t border-white/5 pt-4 mt-auto">
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">👍 Like</button>
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">💬 Comment</button>
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">🔖 Save</button>
             </div>
          </div>

          {/* Card 2: Job */}
          <div className="opp-card bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 hover:border-white/20 rounded-[2rem] p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col relative transition-all">
             <div className="absolute top-6 right-6 text-gray-500 cursor-pointer hover:text-white">⋮</div>
             <div className="flex items-center gap-3 mb-6">
                <img src="/avatar_1.png" className="w-10 h-10 rounded-full border border-white/20 object-cover bg-[#111928] opacity-80" />
                <div className="flex flex-col">
                   <h3 className="text-sm font-bold text-white">Aryan Sharma</h3>
                   <span className="text-[10px] text-gray-500 font-mono">(CSE, 2026)</span>
                </div>
             </div>
             
             <h2 className="text-xl font-bold text-white mb-6">JOB: Data Analyst @ AnalyticsCo</h2>
             
             <div className="flex gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#111928] to-[#060b13] rounded-2xl flex justify-center items-center shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-white/5">
                   <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-[#00e6e6] rounded-xl flex justify-center items-center font-black text-white text-2xl" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>A</div>
                </div>
                <div className="flex flex-col flex-1">
                   <div className="flex items-center gap-2 mb-2">
                       <span className="text-gray-300 text-xs">Tag: Data Science</span>
                   </div>
                   <p className="text-xs text-gray-400 mb-2 leading-relaxed">Data Analyst markeout to anaalysanad analytics are intarannuted.</p>
                   <p className="text-[11px] text-gray-300">Contact info: <span className="text-[#00e6e6]">AnalyticsCo</span></p>
                </div>
             </div>
             
             <p className="text-xs text-gray-400 mb-6">Contact info@contact.com / <span className="text-white font-bold cursor-pointer">Apply</span></p>
             
             <div className="flex gap-3 justify-between border-t border-white/5 pt-4 mt-auto">
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">👍 Like</button>
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">💬 Comment</button>
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">🔖 Save</button>
             </div>
          </div>

          {/* Card 3: Hackathon */}
          <div className="opp-card bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 hover:border-[#BC13FE]/50 rounded-[2rem] p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col relative transition-all">
             <div className="absolute top-6 right-6 text-gray-500 cursor-pointer hover:text-white">⋮</div>
             <div className="flex items-center gap-3 mb-6">
                <img src="/avatar_1.png" className="w-10 h-10 rounded-full border border-[#BC13FE] object-cover bg-[#111928]" />
                <div className="flex flex-col">
                   <h3 className="text-sm font-bold text-white">Aryan Sharma</h3>
                   <span className="text-[10px] text-gray-500 font-mono">(CSE, 2026)</span>
                </div>
             </div>
             
             <h2 className="text-xl font-bold text-white mb-6">COMPETITION: Codefest '24</h2>
             
             <div className="flex gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#111928] to-[#060b13] rounded-2xl flex justify-center items-center shadow-[0_0_15px_rgba(188,19,254,0.2)] border border-[#BC13FE]/30">
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="#00e6e6" strokeWidth="3" fill="#00e6e6" fillOpacity="0.1"/>
                      <path d="M50 20L75.9808 35V65L50 80L24.0192 65V35L50 20Z" stroke="#BC13FE" strokeWidth="2" filter="drop-shadow(0 0 10px #BC13FE)"/>
                    </svg>
                </div>
                <div className="flex flex-col flex-1">
                   <div className="flex items-center gap-2 mb-2">
                       <span className="text-[#BC13FE] text-xs">Tag: Hackathon</span>
                   </div>
                   <p className="text-xs text-gray-400 mb-2 leading-relaxed">Codefest '24 team released inventunt composition of pemer evenumrs, moesing comertrons Codefest 24.</p>
                </div>
             </div>
             
             <p className="text-xs text-gray-400 mb-6">Contact info@contacto / <span className="text-[#BC13FE] font-bold cursor-pointer">Apply</span></p>
             
             <div className="flex gap-3 justify-between border-t border-white/5 pt-4 mt-auto">
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">👍 Like</button>
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">💬 Comment</button>
                 <button className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5">🔖 Save</button>
             </div>
          </div>
          
       </div>
    </div>
  );
}
