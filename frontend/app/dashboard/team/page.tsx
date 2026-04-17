"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function TeamsView() {
  const [showModal, setShowModal] = useState(false);
  const [joinRequests, setJoinRequests] = useState<Record<string, boolean>>({});

  useEffect(() => {
    gsap.fromTo(".team-item", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const handleJoinTeam = async (teamId: string) => {
      setJoinRequests(prev => ({ ...prev, [teamId]: true }));
      try {
          const token = localStorage.getItem('access_token');
          await fetch(`http://localhost:5000/teams/join/${teamId}`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` }
          });
      } catch (e) {
          setJoinRequests(prev => ({ ...prev, [teamId]: false }));
      }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20 max-w-[1700px] mx-auto min-h-screen relative">
      
      {/* LEFT COLUMN: Your Teams & Problem Statement */}
      <div className="md:col-span-4 flex flex-col gap-6">
        
        {/* Your Teams Panel */}
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]">
          <h2 className="text-white font-bold tracking-widest text-[14px] mb-6">Your Teams</h2>
          <div className="bg-[#111928]/60 border border-white/10 rounded-2xl p-6 flex flex-col items-center border-dashed">
            <div className="w-20 h-20 bg-gradient-to-t from-[#111928] to-transparent rounded-[1rem] flex justify-center items-end relative overflow-hidden mb-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
               <img src="/avatar_1.png" alt="Avatar" className="w-[120%] h-[120%] object-cover relative top-2 opacity-50" />
            </div>
            <button onClick={() => setShowModal(true)} className="w-[80%] py-3 bg-[#00e6e6] text-[#060b13] font-black tracking-widest rounded-xl shadow-[0_0_15px_rgba(0,230,230,0.4)] hover:bg-white transition-colors text-xs">CREATE TEAM</button>
          </div>
        </div>

        {/* Problem Statement Panel */}
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1">
          <h2 className="text-white font-bold tracking-widest text-[16px] mb-6">CODEFEST '24</h2>
          <h3 className="text-gray-300 font-bold text-sm mb-2">Problem Statement</h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            hxey from ereivo make a mdondly tech prohiemes exrurstive. Santeren-oia specae occreves that ricrs iinc furascal dade degas indeorent thewit and vrine arino.
          </p>
          <h3 className="text-gray-300 font-bold text-sm mb-2">Problem Startement</h3>
          <ul className="text-xs text-gray-400 leading-relaxed list-disc pl-4 space-y-2">
             <li>Exolute enthvaliem preinera shlives in as problem statement, (commented tteronly tumgextority deccmouiputer).</li>
             <li>Arctater after environment careerers used for viotal competes oeirnen environmoitzions (liberalfy workl evento ass tnoilus (lnevtiamale tem Blenikom)</li>
          </ul>
        </div>
      </div>

      {/* CENTER COLUMN: Directory & Modules */}
      <div className="md:col-span-5 flex flex-col gap-6">
        
        {/* Student Directory Panel (Reversed structure) */}
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] border-t border-t-[#00e6e6]/30">
          <h2 className="text-white font-bold tracking-widest text-[14px] mb-6">Student Directory</h2>
          
          <div className="flex gap-4 overflow-x-auto pb-2 css-scrollbar">
            {/* Student Card */}
            <div className="min-w-[130px] bg-[#060b13]/60 border border-white/10 rounded-[1.5rem] p-3 flex flex-col items-center">
               <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00e6e6] z-20"></div>
               <div className="w-16 h-16 bg-gradient-to-b from-[#111928] to-transparent rounded-xl flex justify-center items-end relative overflow-hidden mb-3">
                 <img src="/avatar_1.png" alt="Ananya" className="w-[120%] h-[120%] object-cover relative top-2 opacity-50" />
               </div>
               <h3 className="text-[12px] font-bold text-white text-center">Priye Singh</h3>
               <span className="text-[10px] text-gray-500 mb-2">CSE Offline</span>
               <div className="flex gap-2 w-full">
                 <span className="flex-1 py-1 text-center bg-[#111928] rounded border border-white/10 text-[8px] text-gray-300">Code Offer</span>
                 <span className="flex-1 py-1 text-center bg-[#00e6e6] text-[#060b13] rounded text-[8px] font-bold shadow-[0_0_10px_rgba(0,230,230,0.3)]">Bastlove</span>
               </div>
            </div>
             {/* Student Card 2 */}
            <div className="min-w-[130px] bg-[#060b13]/60 border border-white/10 rounded-[1.5rem] p-3 flex flex-col items-center">
               <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00e6e6] z-20"></div>
               <div className="w-16 h-16 bg-gradient-to-b from-[#111928] to-transparent rounded-xl flex justify-center items-end relative overflow-hidden mb-3">
                 <img src="/avatar_1.png" alt="Rohan" className="w-[120%] h-[120%] object-cover relative top-2 opacity-50" />
               </div>
               <h3 className="text-[12px] font-bold text-white text-center">Aryan Rai</h3>
               <span className="text-[10px] text-gray-500 mb-2">ECE Online</span>
               <div className="flex gap-2 w-full">
                 <span className="flex-1 py-1 text-center bg-[#111928] rounded border border-white/10 text-[8px] text-gray-300">Code Offer</span>
                 <span className="flex-1 py-1 text-center bg-[#00e6e6] text-[#060b13] rounded text-[8px] font-bold shadow-[0_0_10px_rgba(0,230,230,0.3)]">Bastlove</span>
               </div>
            </div>
          </div>
        </div>

        {/* Missing Block Mockup for structural alignment */}
        <div className="flex gap-6 mt-6 opacity-30 pointer-events-none">
           <div className="flex-1 h-32 bg-[#111928] rounded-2xl border border-white/5"></div>
           <div className="flex-[1.2] h-48 bg-[#BC13FE]/20 rounded-2xl border border-[#BC13FE]/30"></div>
        </div>
      </div>

      {/* RIGHT COLUMN: Teams / Active */}
      <div className="md:col-span-3 flex flex-col gap-6">
        
        {/* Teams Active Panel */}
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-bold tracking-widest text-[15px]">Teams</h2>
          </div>
          <div className="bg-[#111928]/40 border border-white/10 rounded-2xl p-5 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] relative overflow-hidden">
             <div className="absolute top-4 right-4 text-gray-500 text-xs">✕</div>
             <h3 className="font-bold text-white text-[16px] mb-2">Alpha Pack</h3>
             <p className="text-xs text-gray-400 mb-4 pr-4">Problem statement: Fi for the problem slatenent in trackk...</p>
             <div className="flex justify-between items-center">
                 <span className="text-[11px] text-gray-500">Members <span className="text-white">2/4</span></span>
                 <button className="py-1.5 px-4 bg-[#00e6e6] text-[#060b13] rounded text-[10px] font-bold shadow-[0_0_15px_rgba(0,230,230,0.4)]">View Team</button>
             </div>
          </div>
        </div>

        {/* Global Teams Feed */}
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1 overflow-y-auto css-scrollbar">
          <h2 className="text-white font-bold tracking-widest text-[15px] mb-6">Teams</h2>
          <div className="flex flex-col gap-4">
            
            {/* User 1 */}
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#BC13FE] flex-shrink-0 relative bg-[#060b13] shadow-[0_0_15px_rgba(188,19,254,0.3)]">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[14px] font-bold text-white">Aryan Sharma</h4>
                  <span className="text-[10px] text-gray-500 font-mono">Offline</span>
                </div>
                <p className="text-[11px] text-gray-400 truncate">Raastum Dane Competitions</p>
              </div>
            </div>

            {/* User 2 */}
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 relative bg-[#111928] opacity-70">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-white">Algorithm Junkies</h4>
                  <span className="text-[10px] text-gray-500 font-mono">Members: 3/4</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[11px] text-gray-400 truncate w-3/4">We are looking for a UI designer</p>
                    <button 
                       disabled={joinRequests['mock_team_2']}
                       onClick={() => handleJoinTeam('mock_team_2')}
                       className={`px-3 py-1 rounded text-[9px] font-bold transition shadow-[0_0_10px_rgba(0,230,230,0.2)] ${
                           joinRequests['mock_team_2'] 
                           ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 cursor-not-allowed'
                           : 'bg-[#00e6e6]/20 text-[#00e6e6] hover:bg-[#00e6e6] hover:text-[#060b13]'
                       }`}
                    >
                       {joinRequests['mock_team_2'] ? 'REQUESTED ✓' : 'JOIN TEAM'}
                    </button>
                </div>
              </div>
            </div>

            {/* User 3 */}
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 relative bg-[#111928] opacity-70">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[14px] font-bold text-white">Aryan Sharma</h4>
                  <span className="text-[10px] text-gray-500 font-mono">Nonline</span>
                </div>
                <p className="text-[11px] text-gray-400 truncate">Department, Pymethon</p>
              </div>
            </div>

            {/* User 4 */}
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-neon-purple)] flex-shrink-0 relative bg-[#111928]">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1" />
              </div>
              <div className="flex-1 truncate">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-white">Frontend Masters</h4>
                  <span className="text-[10px] text-gray-500 font-mono">Members: 2/5</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[11px] text-gray-400 truncate w-3/4">Seeking react devs</p>
                    <button 
                       disabled={joinRequests['mock_team_4']}
                       onClick={() => handleJoinTeam('mock_team_4')}
                       className={`px-3 py-1 rounded text-[9px] font-bold transition shadow-[0_0_10px_rgba(0,230,230,0.2)] ${
                           joinRequests['mock_team_4'] 
                           ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 cursor-not-allowed'
                           : 'bg-[#00e6e6]/20 text-[#00e6e6] hover:bg-[#00e6e6] hover:text-[#060b13]'
                       }`}
                    >
                       {joinRequests['mock_team_4'] ? 'REQUESTED ✓' : 'JOIN TEAM'}
                    </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* CENTRAL REGISTRATION MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/40">
          <div className="w-[500px] bg-[#0d1424]/90 backdrop-blur-3xl border border-[#00e6e6]/50 rounded-[2rem] p-8 shadow-[0_0_50px_rgba(0,230,230,0.2)] relative">
            <h2 className="text-white text-xl font-bold tracking-widest mb-8">CODEFEST'24 - REGISTRATION</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-300 block mb-2">Step 1: Team Name</label>
                <input type="text" className="w-full bg-[#111928]/60 border border-[#00e6e6]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6] transition" autoFocus />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-2">Step 2: Member Invite</label>
                <div className="w-full bg-[#111928]/60 border border-[#00e6e6]/30 rounded-xl px-4 py-2 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                         <div className="w-8 h-8 rounded-full border border-[#00e6e6] overflow-hidden bg-[#060b13] relative z-20"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150" /></div>
                         <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-[#111928] relative z-10"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 opacity-60" /></div>
                      </div>
                      <span className="text-xs text-white">Rohan Raii, Rohan Gu...</span>
                   </div>
                   <button className="bg-[#00e6e6] text-[#060b13] font-bold text-[10px] px-4 py-1.5 rounded-lg shadow-[0_0_10px_rgba(0,230,230,0.5)]">Invite</button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-2">Step 3: Rules Acceptance</label>
                <div className="w-full bg-[#111928]/60 border border-[#00e6e6]/30 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer">
                   <div className="w-48 h-2 bg-[#00e6e6]/10 rounded overflow-hidden"><div className="w-[30%] h-full bg-[#00e6e6]"></div></div>
                   <span className="text-[#00e6e6] text-xs font-bold">✓</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button onClick={() => setShowModal(false)} className="w-[200px] bg-[#00e6e6] text-[#060b13] font-black tracking-widest text-[13px] py-4 rounded-2xl shadow-[0_0_30px_rgba(0,230,230,0.5)] hover:bg-white hover:shadow-white/50 transition-all">
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
