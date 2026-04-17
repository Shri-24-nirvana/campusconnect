"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function MessagesView() {
  const [activeChat, setActiveChat] = useState('Rohan');

  useEffect(() => {
    gsap.fromTo(".msg-panel", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-32 max-w-[1700px] mx-auto min-h-screen">
      
      {/* LEFT COLUMN: Contacts / Search */}
      <div className="md:col-span-4 flex flex-col gap-6 h-[85vh]">
        <div className="msg-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex flex-col h-full overflow-hidden">
          
          <div className="relative mb-6">
            <input type="text" placeholder="Search" className="w-full bg-[#111928]/60 border border-white/10 rounded-2xl px-12 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors" />
            <span className="absolute left-4 top-3 text-gray-500">🔍</span>
          </div>

          <div className="flex-1 overflow-y-auto css-scrollbar pr-2 flex flex-col gap-2">
            
            {/* Contact 1 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-12 h-12 flex-shrink-0 relative">
                <div className="w-full h-full rounded-full border border-white/20 bg-[#111928] overflow-hidden"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative opacity-70" /></div>
              </div>
              <div className="flex-1 border-b border-white/5 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-gray-300">Ananya Rai</h4>
                  <span className="text-[9px] text-gray-500 font-mono">Offline</span>
                </div>
                <div className="flex justify-end"><div className="w-2 h-2 rounded-full bg-green-500"></div></div>
              </div>
            </div>

            {/* Contact 2 ACTIVE */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-gradient-to-r from-[#00e6e6]/20 to-transparent border border-[#00e6e6]/30 cursor-pointer shadow-[0_0_15px_rgba(0,230,230,0.1)]">
              <div className="w-12 h-12 flex-shrink-0 relative">
                <div className="w-full h-full rounded-full border border-[#00e6e6] bg-[#060b13] overflow-hidden shadow-[0_0_10px_#00e6e6]"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" /></div>
              </div>
              <div className="flex-1 border-b border-transparent pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-white">Rohan Gupta</h4>
                  <span className="text-[9px] text-[#00e6e6] font-mono">Online</span>
                </div>
                <div className="flex justify-end"><div className="w-2 h-2 rounded-full bg-[#00e6e6]"></div></div>
              </div>
            </div>

            {/* Contact 3 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-12 h-12 flex-shrink-0 relative">
                <div className="w-full h-full rounded-full border border-[#BC13FE] bg-[#060b13] overflow-hidden"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" /></div>
              </div>
              <div className="flex-1 border-b border-white/5 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-gray-300">Priya Singh</h4>
                  <span className="text-[9px] text-gray-500 font-mono">Offline</span>
                </div>
                <div className="flex justify-end"><div className="w-2 h-2 rounded-full bg-red-500"></div></div>
              </div>
            </div>

            {/* Contact 4 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-12 h-12 flex-shrink-0 relative">
                <div className="w-full h-full rounded-full border border-white/20 bg-[#111928] overflow-hidden"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative opacity-70" /></div>
              </div>
              <div className="flex-1 border-b border-white/5 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-gray-300">Rohan Sharma</h4>
                  <span className="text-[9px] text-gray-500 font-mono">Offline</span>
                </div>
                <div className="flex justify-end"><div className="w-2 h-2 rounded-full bg-red-500"></div></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CENTER COLUMN: Chat Interface */}
      <div className="md:col-span-5 h-[85vh]">
        <div className="msg-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-[#00e6e6]/30 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] h-full flex flex-col relative overflow-hidden">
          
          <div className="flex justify-between items-center pb-6 border-b border-white/10 shrink-0">
            <h2 className="text-white font-bold tracking-widest uppercase text-sm">MESSAGING</h2>
            <button className="w-6 h-6 rounded-full bg-white/10 flex justify-center items-center text-xs text-gray-400 hover:bg-white hover:text-black transition">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-6 css-scrollbar flex flex-col gap-6">
             {/* Left message block */}
             <div className="flex gap-4">
                 <div className="w-10 h-10 flex-shrink-0"><div className="w-full h-full rounded-full border border-[#00e6e6] overflow-hidden bg-[#060b13]"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" /></div></div>
                 <div className="flex flex-col gap-1 max-w-[80%]">
                    <span className="text-xs text-gray-500 font-bold ml-2">Rohan</span>
                    <div className="bg-[#111928] border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm text-gray-300 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">Hey Aryan, have you seen the SIH details?</div>
                    <span className="text-[9px] text-gray-600 font-mono ml-2 mt-1">7:33 PM</span>
                 </div>
             </div>

             {/* Right message block */}
             <div className="flex gap-4 flex-row-reverse">
                 <div className="w-10 h-10 flex-shrink-0"><div className="w-full h-full rounded-full border border-[#BC13FE] overflow-hidden bg-[#060b13]"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" /></div></div>
                 <div className="flex flex-col gap-1 max-w-[80%] items-end">
                    <span className="text-xs text-gray-500 font-bold mr-2">Aryan</span>
                    <div className="bg-gradient-to-r from-[#00e6e6]/20 to-[#00e6e6]/10 border border-[#00e6e6]/30 rounded-2xl rounded-tr-sm p-4 text-sm text-white shadow-[0_5px_15px_rgba(0,230,230,0.1)]">Yeah, looking good! Want to team up?</div>
                    <span className="text-[9px] text-[#00e6e6]/60 font-mono mr-2 mt-1">7:35 PM</span>
                 </div>
             </div>

             {/* Left message block */}
             <div className="flex gap-4">
                 <div className="w-10 h-10 flex-shrink-0"><div className="w-full h-full rounded-full border border-[#00e6e6] overflow-hidden bg-[#060b13]"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" /></div></div>
                 <div className="flex flex-col gap-1 max-w-[80%]">
                    <span className="text-xs text-gray-500 font-bold ml-2">Rohan</span>
                    <div className="bg-[#111928] border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm text-gray-300 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">Yeah, definitely! Let's do it!</div>
                    <span className="text-[9px] text-gray-600 font-mono ml-2 mt-1">7:36 PM</span>
                 </div>
             </div>
          </div>

          <div className="pt-4 shrink-0 mt-auto relative z-10 w-full mb-2">
            <div className="relative w-full">
              <input type="text" placeholder="Type a message..." className="w-full bg-[#111928]/80 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-sm text-white focus:outline-none focus:border-[#00e6e6] transition-colors" />
              <button className="absolute right-3 top-2.5 w-9 h-9 bg-[#00e6e6] text-[#060b13] rounded-xl flex justify-center items-center font-bold text-lg hover:bg-[#00c2c2] shadow-[0_0_15px_rgba(0,230,230,0.4)] transition-all">➤</button>
            </div>
          </div>
          
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00e6e6] rounded-full filter blur-[150px] opacity-[0.15] pointer-events-none"></div>
        </div>
      </div>

      {/* RIGHT COLUMN: Events & Global Messages (Matching Home Layout Sidebar Logic) */}
      <div className="md:col-span-3 flex flex-col gap-8 h-[85vh]">
        
        {/* Upcoming Events Panel */}
        <div className="msg-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-[var(--color-neon-purple)]/20 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] h-fit">
          <h2 className="text-white font-bold tracking-widest uppercase text-[12px] mb-6">UPCOMING EVENTS</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-transparent border border-[#00e6e6]/60 rounded-xl p-4 shadow-[inset_0_0_15px_rgba(0,230,230,0.1)] border-l-[4px] border-l-[#00e6e6] cursor-pointer">
              <h3 className="font-bold text-white text-[13px]">Tech Expo</h3>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">Saturday at 11:00 PM</p>
            </div>
            <div className="bg-transparent border border-[#BC13FE]/60 rounded-xl p-4 shadow-[inset_0_0_15px_rgba(188,19,254,0.1)] border-l-[4px] border-l-[#BC13FE] cursor-pointer">
              <h3 className="font-bold text-white text-[13px]">Workshop</h3>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">Sun Jane at 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* Recent Messages Activity summary */}
        <div className="msg-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1 overflow-y-auto css-scrollbar">
          <h2 className="text-white font-bold tracking-widest uppercase text-[12px] mb-6">RECENT MESSAGES</h2>
          
          <div className="flex flex-col gap-5">
            {/* Msg 1 */}
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#00e6e6] flex-shrink-0 relative bg-[#060b13]">
                <img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-3">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[13px] font-bold text-white">Aryan Sharma</h4>
                  <span className="text-[8px] text-gray-500 font-mono">Tuesday</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate">Separtment Competitions</p>
              </div>
            </div>

            {/* Msg 2 */}
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 flex-shrink-0 relative bg-[#111928] opacity-80">
                <img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-3">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[13px] font-bold text-white">Rohan Gupta</h4>
                  <span className="text-[8px] text-gray-500 font-mono">2 hours ago</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate">CSE</p>
              </div>
            </div>
            
            {/* Msg 3 */}
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 flex-shrink-0 relative bg-[#111928] opacity-80">
                <img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-3">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[13px] font-bold text-white">Rohan Sharma</h4>
                  <span className="text-[8px] text-gray-500 font-mono">1 hour ago</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate">Department Compention</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
