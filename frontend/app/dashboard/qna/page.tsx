"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function QnAAlumniHub() {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    gsap.fromTo(".qna-item", 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="w-full pb-20 max-w-[1700px] mx-auto min-h-screen">
       <div className="flex justify-between items-center mb-8 pl-4">
          <h1 className="text-white text-[15px] font-bold tracking-widest uppercase flex items-center gap-4">
             ALUMNI & STUDENT HUB
          </h1>
       </div>

       <div className="bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex max-w-[55%] mb-8 relative">
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#00e6e6]/30 to-transparent pointer-events-none opacity-50"></div>
          <input type="text" placeholder="ASK A QUESTION" className="w-full bg-transparent border-none text-white outline-none pl-4 text-sm" />
          <button className="bg-[#00e6e6] text-[#060b13] px-8 py-3 rounded-xl font-black shadow-[0_0_20px_rgba(0,230,230,0.4)] hover:bg-white hover:text-black transition uppercase text-xs tracking-widest shrink-0 ml-4">
            ASK A QUESTION
          </button>
       </div>

       <div className="flex gap-4 mb-8 justify-end max-w-[55%]">
          <button className="border border-[#00e6e6] text-[#00e6e6] px-8 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(0,230,230,0.2)] text-xs">Q&A</button>
          <button className="bg-[#111928] border border-white/10 text-gray-400 px-8 py-2 rounded-full font-bold hover:text-white transition text-xs">MENTORSHIP</button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Q&A Thread (Left 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
             
             {/* Thread 1: Verified Alumni */}
             <div className="flex flex-col relative qna-item">
                <div className="absolute left-[38px] top-16 bottom-[-24px] w-[2px] bg-[#00e6e6]/30 shadow-[0_0_10px_rgba(0,230,230,0.5)]"></div>
                <div className="absolute left-[38px] top-16 w-[20px] h-[2px] bg-[#00e6e6]/30"></div>
                
                <div className="bg-[#111928]/60 border border-[#00e6e6]/30 rounded-3xl p-6 ml-2 flex shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                   <div className="flex flex-col items-center shrink-0 pr-6 border-r border-[#00e6e6]/10 mr-6">
                      <button className="text-[#00e6e6] text-xl mb-2 hover:scale-125 transition">▲</button>
                      <span className="text-white font-black text-xl mb-2">10</span>
                      <button className="text-[#00e6e6]/50 text-xl hover:text-[#00e6e6] hover:scale-125 transition">▼</button>
                   </div>
                   <div className="flex-1">
                      <div className="flex gap-4 mb-4 items-center">
                         <img src="/avatar_1.png" className="w-12 h-12 rounded-full border border-white/20 object-cover bg-black" />
                         <div>
                            <h3 className="text-[14px] font-bold text-gray-200">How to prepare for Google SWE?</h3>
                            <p className="text-[10px] text-gray-500 font-mono mt-1">14 hours ago</p>
                         </div>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">How do the active Google SWE ends how to prepare for Google SWE?</p>
                      <button className="text-[#00e6e6] text-[10px] font-black tracking-widest uppercase hover:underline">Reply</button>
                   </div>
                </div>

                {/* Reply */}
                <div className="bg-gradient-to-r from-[#00e6e6]/10 to-transparent border border-[#00e6e6]/40 rounded-3xl p-5 ml-14 mt-4 flex shadow-[0_0_20px_rgba(0,230,230,0.1)] qna-item relative">
                   <div className="flex gap-4 mb-2 items-center">
                      <img src="/avatar_1.png" className="w-10 h-10 rounded-full border border-[#00e6e6] shadow-[0_0_10px_#00e6e6] object-cover bg-black" />
                      <div className="flex-1">
                         <div className="flex items-center gap-2">
                             <h3 className="text-[13px] font-bold text-white">[ALUMNI NAME], SDE at Amazon</h3>
                             <span className="text-[#00e6e6] text-xs" title="Verified Alumni">✓ VERIFIED ALUMNI</span>
                             <span className="bg-[#BC13FE]/20 text-[#BC13FE] px-2 py-0.5 rounded text-[9px] font-black ml-auto border border-[#BC13FE]/30 shadow-[0_0_10px_rgba(188,19,254,0.3)]">🧠 Mentorship</span>
                         </div>
                         <p className="text-[11px] text-gray-300 leading-relaxed mt-2">I alumni also the alumni SWE is someone to preparation states the their own and practically they reached the most scenario decompiling practice in their sad comprehension. Ten we kittmare handed as santimmat under thyroid common interns.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Thread 2 */}
             <div className="flex flex-col relative mt-6 qna-item">
                <div className="absolute left-[38px] top-16 bottom-[-24px] w-[2px] bg-white/10"></div>
                <div className="absolute left-[38px] top-16 w-[20px] h-[2px] bg-white/10"></div>
                
                <div className="bg-[#111928]/40 border border-[#BC13FE]/30 rounded-3xl p-6 ml-2 flex shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                   <div className="flex flex-col items-center shrink-0 pr-6 border-r border-[#BC13FE]/10 mr-6">
                      <button className="text-[#BC13FE] text-xl mb-2 hover:scale-125 transition">▲</button>
                      <span className="text-white font-black text-xl mb-2">2</span>
                      <button className="text-[#BC13FE]/50 text-xl hover:text-[#BC13FE] hover:scale-125 transition">▼</button>
                   </div>
                   <div className="flex-1">
                      <div className="flex gap-4 mb-4 items-center">
                         <img src="/avatar_1.png" className="w-12 h-12 rounded-full border border-white/20 object-cover bg-black" />
                         <div>
                            <h3 className="text-[14px] font-bold text-gray-200">Aryan Sharma</h3>
                            <p className="text-[10px] text-gray-500 font-mono mt-1">9 hours ago</p>
                         </div>
                      </div>
                      <h4 className="text-sm font-bold text-[#00e6e6] mb-2">How to prepare for Google SWE?</h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">Hey to he aware forms for mathematics profiles as a kin is an executio post of in comments, student competiting addicted threading questions. How is so due to google SWE?</p>
                      <button className="text-[#00e6e6] text-[10px] font-black tracking-widest uppercase hover:underline mt-auto">Upvote</button>
                   </div>
                </div>

                {/* Reply */}
                <div className="bg-[#111928]/80 border border-white/10 rounded-3xl p-5 ml-14 mt-4 flex shadow-[0_0_20px_rgba(0,0,0,0.3)] qna-item relative">
                   <div className="flex flex-col items-center shrink-0 pr-4 mr-4">
                      <button className="text-gray-400 text-sm mb-1 hover:text-[#00e6e6] transition">▲</button>
                      <span className="text-white font-bold text-sm mb-1">1</span>
                      <button className="text-[#00e6e6] text-sm hover:text-white transition">▼</button>
                   </div>
                   <div className="flex gap-4 mb-2 items-center flex-1">
                      <img src="/avatar_1.png" className="w-8 h-8 rounded-full border border-white/20 object-cover bg-black" />
                      <div className="flex-1">
                         <div className="flex items-center justify-between">
                             <h3 className="text-[12px] font-bold text-white">Rohan Gupta</h3>
                             <span className="text-gray-500 text-[9px] font-mono">25m ago</span>
                         </div>
                         <p className="text-[11px] text-gray-400 leading-relaxed mt-1">How heyn, prepare for how still SWE parttial to garatte to one SWE? Rohanas?</p>
                      </div>
                   </div>
                </div>
             </div>

          </div>

          {/* Sidebar Modules (Right 4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 relative">
             <div className="sticky top-28 bg-[#0d1424]/70 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-b from-[#00e6e6]/5 to-transparent rounded-[2rem] pointer-events-none"></div>
                <h2 className="text-white text-[13px] font-bold tracking-widest uppercase mb-4 z-10">ACTIVE ALUMNI MENTORS</h2>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 z-10">All threaded discussion of active alumni mentors.</p>
                
                <div className="flex flex-col gap-3 z-10 css-scrollbar overflow-y-auto max-h-[500px] pr-2">
                   {[1, 2, 3, 4].map(num => (
                      <div key={num} className="bg-[#111928]/60 border border-white/5 hover:border-[#00e6e6]/30 transition-colors rounded-xl p-4 flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden relative">
                               <img src="/avatar_1.png" className="w-full h-full object-cover relative bg-black" />
                               <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-black"></div>
                            </div>
                            <div className="flex flex-col">
                               <h3 className="text-xs font-bold text-white">[ALUMNI NAME]</h3>
                               <p className="text-[9px] text-gray-400">SDE at Amazon</p>
                            </div>
                         </div>
                         <button className="w-full bg-gradient-to-r from-[#00e6e6]/20 to-transparent border border-[#00e6e6]/50 text-[#00e6e6] py-2 rounded-lg text-[9px] font-bold tracking-widest hover:bg-[#00e6e6] hover:text-[#060b13] transition shadow-[0_0_10px_rgba(0,230,230,0.1)]">
                            REQUEST MENTORSHIP
                         </button>
                      </div>
                   ))}
                </div>
             </div>
          </div>

       </div>
    </div>
  );
}
