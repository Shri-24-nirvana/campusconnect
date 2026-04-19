"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function JobsInternshipsView() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [activeCommentPost, setActiveCommentPost] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [interactions, setInteractions] = useState<Record<string, { liked: boolean, saved: boolean }>>({});

  useEffect(() => {
    gsap.fromTo(".opp-card", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
    
    // We mock the fetched opportunities with the 3 visually stunning hard-coded blocks
    // so the logic matches the user's UI request exactly. Real data would populate this instead.
    const mockFeed = [
       { id: 'post_1', type: 'INTERNSHIP', title: 'SWE @ Microsoft', description: 'Internship SWE et Internsoft: SWE @ Microsoft. Contact info: Microsoft.com', tag: 'SWE', user: { name: 'Aryan Sharma', branch: 'CSE', year: '2026' } },
       { id: 'post_2', type: 'JOB', title: 'Data Analyst @ AnalyticsCo', description: 'Data Analyst markeout to anaalysanad analytics are intarannuted. Contact info: AnalyticsCo', tag: 'Data Science', user: { name: 'Aryan Sharma', branch: 'CSE', year: '2026' } },
       { id: 'post_3', type: 'HACKATHON', title: 'Codefest \'24', description: 'Codefest \'24 team released inventunt composition of pemer evenumrs, moesing comertrons Codefest 24.', tag: 'Hackathon', user: { name: 'Aryan Sharma', branch: 'CSE', year: '2026' } }
    ];
    setOpportunities(mockFeed);
  }, []);

  const handleLike = async (id: string) => {
      setInteractions(prev => ({ ...prev, [id]: { ...prev[id], liked: !prev[id]?.liked } }));
      // Normally would POST to a like endpoint, simulating for now or catching to /like 
  };

  const handleSave = async (id: string) => {
      setInteractions(prev => ({ ...prev, [id]: { ...prev[id], saved: !prev[id]?.saved } }));
      try {
          const token = localStorage.getItem('access_token');
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/posts/${id}/save`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` }
          });
      } catch (e) {}
  };

  const submitComment = async () => {
      if(!commentText.trim() || !activeCommentPost) return;
      const cachedText = commentText;
      const targetId = activeCommentPost.id;
      
      setCommentText('');
      setActiveCommentPost(null);

      try {
          const token = localStorage.getItem('access_token');
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/posts/${targetId}/comment`, {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}` 
              },
              body: JSON.stringify({ content: cachedText })
          });
      } catch(e) {}
  };

  const renderCardVisuals = (opp: any) => {
      if(opp.type === 'INTERNSHIP') return (
         <div className="w-20 h-20 bg-black rounded-2xl flex flex-wrap flex-col justify-center items-center py-2 relative overflow-hidden">
            <div className="w-12 h-12 flex flex-wrap gap-1">
               <div className="w-5 h-5 bg-[#F25022]"></div><div className="w-5 h-5 bg-[#7FBA00]"></div>
               <div className="w-5 h-5 bg-[#00A4EF]"></div><div className="w-5 h-5 bg-[#FFB900]"></div>
            </div>
         </div>
      );
      if(opp.type === 'JOB') return (
         <div className="w-20 h-20 bg-gradient-to-br from-[#111928] to-[#060b13] rounded-2xl flex justify-center items-center shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-white/5">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-[#00e6e6] rounded-xl flex justify-center items-center font-black text-white text-2xl" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>A</div>
         </div>
      );
      return (
         <div className="w-20 h-20 bg-gradient-to-br from-[#111928] to-[#060b13] rounded-2xl flex justify-center items-center shadow-[0_0_15px_rgba(188,19,254,0.2)] border border-[#BC13FE]/30">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="#00e6e6" strokeWidth="3" fill="#00e6e6" fillOpacity="0.1"/>
               <path d="M50 20L75.9808 35V65L50 80L24.0192 65V35L50 20Z" stroke="#BC13FE" strokeWidth="2" filter="drop-shadow(0 0 10px #BC13FE)"/>
             </svg>
         </div>
      );
  }

  return (
    <div className="w-full h-[85vh] flex flex-col pb-10 max-w-[1700px] mx-auto min-h-screen relative">
       <div className="flex justify-between items-center mb-8 pr-8">
          <h1 className="text-white text-xl font-bold tracking-widest uppercase flex items-center gap-4">
             JOBS & INTERNSHIPS
          </h1>
          <button className="bg-transparent border-2 border-[#00e6e6] text-[#00e6e6] font-bold tracking-widest px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(0,230,230,0.3)] hover:bg-[#00e6e6] hover:text-[#060b13] transition-colors cursor-pointer">
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

       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pr-8 overflow-y-auto css-scrollbar pb-16">
          <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {opportunities.map((opp, i) => (
              <div key={opp.id} className={`opp-card bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 hover:border-${opp.type === 'HACKATHON' ? '[#BC13FE]' : '[#00e6e6]'}/50 rounded-[2rem] p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col relative transition-all`}>
                 <div className="absolute top-6 right-6 text-gray-500 cursor-pointer hover:text-white">⋮</div>
                 <div className="flex items-center gap-3 mb-6">
                    <img src="/avatar_1.png" className={`w-10 h-10 rounded-full border ${opp.type === 'HACKATHON' ? 'border-[#BC13FE]' : 'border-white/20'} object-cover bg-[#111928]`} />
                    <div className="flex flex-col">
                       <h3 className="text-sm font-bold text-white">{opp.user.name}</h3>
                       <span className="text-[10px] text-gray-500 font-mono">({opp.user.branch}, {opp.user.year})</span>
                    </div>
                 </div>
                 
                 <h2 className="text-xl font-bold text-white mb-6">{opp.type}: {opp.title}</h2>
                 
                 <div className="flex gap-6 mb-8">
                    {renderCardVisuals(opp)}
                    <div className="flex flex-col flex-1">
                       <div className="flex items-center gap-2 mb-2">
                           <span className={`text-${opp.type === 'HACKATHON' ? '[#BC13FE]' : opp.type === 'INTERNSHIP' ? '[#00e6e6]' : 'gray-300'} text-xs`}>Tag: {opp.tag}</span>
                       </div>
                       <p className="text-xs text-gray-400 mb-2 leading-relaxed">{opp.description}</p>
                    </div>
                 </div>
                 
                 <p className="text-xs text-gray-400 mb-6">Contact info@contact.com / <span className={`font-bold cursor-pointer text-${opp.type === 'HACKATHON' ? '[#BC13FE]' : opp.type === 'INTERNSHIP' ? '[#00e6e6]' : 'white'}`}>Apply</span></p>
                 
                 <div className="flex gap-3 justify-between border-t border-white/5 pt-4 mt-auto">
                     <button onClick={() => handleLike(opp.id)} className={`flex-1 border rounded-xl py-2 flex items-center justify-center gap-2 text-xs transition-colors ${interactions[opp.id]?.liked ? 'bg-[#00e6e6]/20 border-[#00e6e6]/50 text-[#00e6e6]' : 'border-white/10 text-gray-300 hover:bg-white/5'}`}>
                         {interactions[opp.id]?.liked ? '👍 Liked' : '👍 Like'}
                     </button>
                     <button onClick={() => setActiveCommentPost(opp)} className="flex-1 border border-white/10 rounded-xl py-2 flex items-center justify-center gap-2 text-xs text-gray-300 hover:bg-white/5 transition-colors">
                         💬 Comment
                     </button>
                     <button onClick={() => handleSave(opp.id)} className={`flex-1 border rounded-xl py-2 flex items-center justify-center gap-2 text-xs transition-colors ${interactions[opp.id]?.saved ? 'bg-[#BC13FE]/20 border-[#BC13FE]/50 text-[#BC13FE]' : 'border-white/10 text-gray-300 hover:bg-white/5'}`}>
                         {interactions[opp.id]?.saved ? '🔖 Saved' : '🔖 Save'}
                     </button>
                 </div>
              </div>
          ))}
          </div>

           {/* Upcoming Events Module */}
           <div className="md:col-span-1 flex flex-col gap-6">
              <div className="bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] h-fit sticky top-0">
                 <h2 className="text-white font-bold tracking-widest uppercase text-[12px] mb-6">UPCOMING EVENTS</h2>
                 
                 <div className="flex flex-col gap-4">
                    <div onClick={() => setActiveEvent({ title: 'Tech Expo 2024' })} className="border border-[#00e6e6]/30 rounded-xl p-4 bg-gradient-to-r from-[#00e6e6]/5 to-transparent hover:from-[#00e6e6]/20 transition-all cursor-pointer">
                       <h3 className="text-white font-bold text-sm">Tech Expo 2024</h3>
                       <p className="text-[10px] text-gray-400 mt-1">Saturday at 11:00 PM</p>
                    </div>
                    
                    <div onClick={() => setActiveEvent({ title: 'System Design Workshop' })} className="border border-[#BC13FE]/30 rounded-xl p-4 bg-gradient-to-r from-[#BC13FE]/5 to-transparent hover:from-[#BC13FE]/20 transition-all cursor-pointer">
                       <h3 className="text-white font-bold text-sm">Workshop</h3>
                       <p className="text-[10px] text-gray-400 mt-1">Join Cwlp at 12:00 PM</p>
                    </div>
                 </div>
              </div>   
           </div>
       </div>

       {/* Event Details Modal */}
       {activeEvent && (
          <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/60 p-4">
             <div className="w-[600px] bg-[#0d1424]/90 backdrop-blur-3xl border border-[#00e6e6]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,230,230,0.15)] relative animate-fade-in">
                <button onClick={() => setActiveEvent(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl z-20">✕</button>
                
                <div className="w-16 h-16 bg-gradient-to-br from-[#111928] to-[#060b13] rounded-2xl border border-white/10 flex justify-center items-center text-3xl shadow-[0_0_15px_rgba(0,0,0,0.5)] mb-6">
                  📆
                </div>
                <h2 className="text-white text-2xl font-black mb-2">{activeEvent.title}</h2>
                <div className="flex gap-4 mb-6 text-xs font-mono text-[#00e6e6]">
                   <span>Saturday, 11:00 PM</span>
                   <span>Ojas Conference Hall</span>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                   Join us for this massive upcoming event on campus! We will be covering exactly what tech stacks are leading the current global enterprise architectures. You can register your team straight from your dashboard.
                </p>

                <button onClick={() => setActiveEvent(null)} className="w-full bg-[#00e6e6] text-[#060b13] font-black tracking-widest px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(0,230,230,0.4)] hover:bg-white transition-colors uppercase text-sm">
                   REGISTER NOW
                </button>
             </div>
          </div>
       )}

       {/* Interactive Comment Modal overlay */}
       {activeCommentPost && (
         <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/60 p-4">
           <div className="w-[600px] bg-[#0d1424]/90 backdrop-blur-3xl border border-[#00e6e6]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,230,230,0.15)] relative flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-white font-bold tracking-widest text-sm uppercase">Add Comment to {activeCommentPost.title}</h2>
                <button onClick={() => setActiveCommentPost(null)} className="text-gray-400 hover:text-white text-xl">✕</button>
             </div>
             
             <textarea 
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Share your thoughts or ask a question..." 
                className="w-full bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00e6e6] transition text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] min-h-[120px] mb-6"
             ></textarea>
             
             <div className="flex justify-end gap-3">
                <button onClick={() => setActiveCommentPost(null)} className="text-gray-400 hover:text-white px-6 py-2 text-sm transition font-bold tracking-widest">CANCEL</button>
                <button onClick={submitComment} className="bg-[#00e6e6] text-[#060b13] px-8 py-3 rounded-xl text-sm font-black tracking-widest shadow-[0_0_15px_rgba(0,230,230,0.4)] hover:bg-white transition-colors">
                    PUBLISH 
                </button>
             </div>
           </div>
         </div>
       )}
    </div>
  );
}
