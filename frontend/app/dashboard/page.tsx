"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [ranking, setRanking] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    gsap.fromTo(".dash-panel", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );

    // Feeds
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : null).then(data => data && setProfile(data)).catch(() => {});
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/posts`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : []).then(data => Array.isArray(data) ? setPosts(data) : setPosts([])).catch(() => {});
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/teams`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : []).then(data => Array.isArray(data) ? setTeams(data) : setTeams([])).catch(() => {});
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/ranking/recalculate`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : null).then(data => setRanking(data)).catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-32 max-w-[1800px] mx-auto min-h-screen">
      
      {/* LEFT COLUMN: Profile Visibility & Team Finder */}
      <div className="md:col-span-4 flex flex-col gap-8 h-full">
        
        {/* Profile Visibility Panel */}
        <div className="dash-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-[#00e6e6]/40 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex flex-col justify-between" style={{ minHeight: '300px' }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white font-bold tracking-widest text-[13px]">PROFILE VISIBILITY</h2>
            <span className="text-gray-500 cursor-pointer hover:text-white transition text-lg">⚙️</span>
          </div>
          <div className="flex justify-between items-center flex-1">
            <div className="flex flex-col gap-8 justify-center h-full">
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-[#00e6e6] text-3xl">👁️</span>
                  <span className="text-4xl font-black text-white tracking-widest">{ranking?.score * 8 || 350}</span>
                </div>
                <span className="text-gray-400 text-sm tracking-wider mt-2 block">Profile Views</span>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <span className="text-[#00e6e6] text-2xl">👥</span>
                  <span className="text-3xl font-black text-white tracking-widest">{ranking?.score || 12}</span>
                </div>
                <span className="text-gray-400 text-sm tracking-wider mt-2 block">Connections</span>
              </div>
              <div className="w-full h-2 bg-[#060b13] rounded mt-2 overflow-hidden shadow-[inset_0_0_5px_rgba(0,0,0,1)]">
                <div className="h-full bg-gradient-to-r from-[#BC13FE] to-[#00e6e6] w-[60%] shadow-[0_0_15px_#00e6e6]"></div>
              </div>
            </div>
            
            <div className="w-48 h-56 bg-gradient-to-t from-[#00e6e6]/20 to-transparent border-[3px] border-[#00e6e6]/60 rounded-3xl flex flex-col items-center justify-end p-2 relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,230,230,0.4)]">
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#00e6e6] shadow-[0_0_10px_#00e6e6] z-30"></div>
              <img src="/avatar_1.png" alt="Avatar" className="w-40 h-40 object-cover absolute top-0 z-10 scale-125" />
              
              <div className="w-full bg-[#0d1424]/90 backdrop-blur-md rounded-2xl border border-[#00e6e6]/50 py-3 text-center z-20 mb-1">
                <p className="text-xs font-bold text-white tracking-wider truncate px-1">ARYAN SHARMA</p>
                <p className="text-[10px] text-gray-400 mt-1 font-mono">(CSE, 2026)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Finder Panel */}
        <div className="dash-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-bold tracking-widest text-[13px]">TEAM FINDER</h2>
            <span className="text-[#00e6e6] text-xs cursor-pointer hover:text-white transition">View More ˅</span>
          </div>
          <p className="text-sm text-gray-400 mb-6 px-1">Active Competitions</p>
          
          <div className="space-y-4">
            {posts.slice(0, 3).map((post, i) => (
              <div key={post.id || i} className="bg-[#060b13]/60 border border-white/5 rounded-2xl p-5 flex items-center gap-6 hover:border-[#BC13FE]/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <div className="w-20 h-20 bg-gradient-to-br from-[#111928] to-[#060b13] rounded-2xl border-2 border-[#111928] flex justify-center items-center font-black text-[#00e6e6] text-4xl shadow-[inset_0_0_20px_rgba(0,230,230,0.2)]">
                  {post.title?.charAt(0) || 'S'}
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-white truncate">{post.title || 'SIH Hackathon 2024'}</h3>
                  <p className="text-[11px] text-gray-500 mt-1">Competition: Details</p>
                  <p className="text-[11px] text-gray-500">Competition: 2024</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-[11px] text-gray-400">Members needed</span>
                    <span className="text-[11px] text-white font-bold font-mono">2/4</span>
                  </div>
                  <div className="w-full h-1 bg-[#060b13] rounded mt-1 overflow-hidden">
                    <div className="h-full bg-[#00e6e6] w-[50%] shadow-[0_0_5px_#00e6e6]"></div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 py-1.5 bg-transparent border-[1.5px] border-[#00e6e6] rounded-md text-[10px] font-black tracking-wider text-[#00e6e6] hover:bg-[#00e6e6]/10 transition">VIEW DETAILS</button>
                    <button className="flex-1 py-1.5 bg-[#00e6e6] text-[#060b13] rounded-md text-[10px] font-black tracking-wider shadow-[0_0_15px_rgba(0,230,230,0.5)] hover:bg-[#00c2c2] transition">CREATE TEAM</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CENTER COLUMN: Students Directory & Open Teams */}
      <div className="md:col-span-5 flex flex-col gap-8 h-full">
        
        {/* Students Directory Panel */}
        <div className="dash-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]" style={{ minHeight: '340px' }}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white font-bold tracking-widest text-[13px]">STUDENTS DIRECTORY</h2>
            <button className="text-[10px] font-bold tracking-widest bg-[#111928] border border-white/10 px-4 py-2 rounded-lg text-gray-400">ANIMATED ˅</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 css-scrollbar">
            {/* Student Card 1 */}
            <div className="min-w-[160px] bg-[#060b13]/60 border-2 border-[#00e6e6]/40 rounded-[2rem] p-4 flex flex-col shadow-[0_0_25px_rgba(0,230,230,0.15)] relative">
               <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#00e6e6] shadow-[0_0_8px_#00e6e6] z-20"></div>
               <div className="w-full h-32 bg-gradient-to-b from-[#111928] to-transparent rounded-[1.5rem] flex justify-center items-end relative overflow-hidden">
                 <img src="/avatar_1.png" alt="Ananya" className="w-[120%] h-[120%] object-cover relative top-4" />
               </div>
               <h3 className="text-[15px] font-bold text-center mt-4 text-white">Ananya Rai</h3>
               <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 px-1">
                 <span className="font-mono">CSE</span>
                 <span className="text-[#00e6e6] font-bold">Python</span>
               </div>
               <div className="flex gap-2 mt-5">
                 <button className="flex-1 py-1.5 rounded-md border border-white/10 text-[9px] font-black tracking-wider text-gray-300 hover:bg-white/10">VIEW PROFILE</button>
                 <button className="flex-1 py-1.5 rounded-md bg-[#00e6e6] text-[#060b13] text-[9px] font-black tracking-wider shadow-[0_0_15px_rgba(0,230,230,0.4)] hover:bg-[#00c2c2]">CONNECT</button>
               </div>
            </div>

            {/* Student Card 2 */}
            <div className="min-w-[160px] bg-[#060b13]/60 border border-white/5 rounded-[2rem] p-4 flex flex-col shadow-[0_0_25px_rgba(0,0,0,0.5)] relative">
               <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#00e6e6] shadow-[0_0_8px_#00e6e6] z-20"></div>
               <div className="w-full h-32 bg-gradient-to-b from-[#111928] to-transparent rounded-[1.5rem] flex justify-center items-end relative overflow-hidden border border-white/5">
                 <img src="/avatar_1.png" alt="Rohan" className="w-[120%] h-[120%] object-cover relative top-4 opacity-80" />
               </div>
               <h3 className="text-[15px] font-bold text-center mt-4 text-white hover:text-[#00e6e6] transition-colors">Rohan Gupta</h3>
               <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 px-1">
                 <span className="font-mono">ME</span>
                 <span className="text-white font-bold">UI/UX</span>
               </div>
               <div className="flex gap-2 mt-5">
                 <button className="flex-1 py-1.5 rounded-md border border-white/10 text-[9px] font-black tracking-wider text-gray-300 hover:bg-white/10">VIEW PROFILE</button>
                 <button className="flex-1 py-1.5 rounded-md bg-[#00e6e6] text-[#060b13] text-[9px] font-black tracking-wider shadow-[0_0_15px_rgba(0,230,230,0.4)]">CONNECT</button>
               </div>
            </div>
            
            {/* Student Card 3 */}
            <div className="min-w-[160px] bg-[#060b13]/60 border border-white/5 rounded-[2rem] p-4 flex flex-col shadow-[0_0_25px_rgba(0,0,0,0.5)] relative">
               <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#00e6e6] shadow-[0_0_8px_#00e6e6] z-20"></div>
               <div className="w-full h-32 bg-gradient-to-b from-[#111928] to-transparent rounded-[1.5rem] flex justify-center items-end relative overflow-hidden border border-white/5">
                 <img src="/avatar_1.png" alt="Priya" className="w-[120%] h-[120%] object-cover relative top-4 opacity-80" />
               </div>
               <h3 className="text-[15px] font-bold text-center mt-4 text-white hover:text-[#00e6e6] transition-colors">Priya Singh</h3>
               <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 px-1">
                 <span className="font-mono">ECE</span>
                 <span className="text-white font-bold">Java</span>
               </div>
               <div className="flex gap-2 mt-5">
                 <button className="flex-1 py-1.5 rounded-md border border-white/10 text-[9px] font-black tracking-wider text-gray-300 hover:bg-white/10">VIEW PROFILE</button>
                 <button className="flex-1 py-1.5 rounded-md bg-[#00e6e6] text-[#060b13] text-[9px] font-black tracking-wider shadow-[0_0_15px_rgba(0,230,230,0.4)]">CONNECT</button>
               </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="w-12 h-1.5 bg-[#00e6e6] rounded-full drop-shadow-[0_0_5px_#00e6e6]"></div>
            <div className="w-3 h-1.5 bg-white/10 rounded-full ml-2"></div>
          </div>
        </div>

        {/* Open Teams Panel */}
        <div className="dash-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#BC13FE] rounded-full filter blur-[150px] opacity-[0.08] pointer-events-none"></div>
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-white font-bold tracking-widest uppercase text-[13px]">OPEN TEAMS</h2>
            <div className="flex gap-3">
              <button className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex justify-center items-center text-sm font-bold text-gray-400 hover:bg-white/10 transition">&lt;</button>
              <button className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex justify-center items-center text-sm font-bold text-gray-400 hover:bg-white/10 transition">&gt;</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 relative z-10">
            {/* Team Card 1 */}
            <div className="bg-gradient-to-b from-[#0e1628] to-[#060b13] border-2 border-[#00e6e6]/30 rounded-[2rem] p-6 shadow-[0_0_30px_rgba(0,230,230,0.1)] flex flex-col relative overflow-hidden hover:-translate-y-1 transition-transform">
               <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
               <div className="h-32 flex justify-center items-center">
                 <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="#00e6e6" strokeWidth="3" fill="#00e6e6" fillOpacity="0.1"/>
                    <path d="M50 20L75.9808 35V65L50 80L24.0192 65V35L50 20Z" stroke="#00e6e6" strokeWidth="2" filter="drop-shadow(0 0 10px #00e6e6)"/>
                    <path d="M50 10L50 90M30 40L70 40M30 60L70 60" stroke="#00e6e6" strokeWidth="1" strokeOpacity="0.5"/>
                 </svg>
               </div>
               <h3 className="font-bold text-white text-[15px] mt-2">Tech Titans</h3>
               <div className="flex justify-between items-center text-[11px] text-gray-400 mt-1 pb-4 border-b border-white/10">
                 <span className="font-mono text-gray-500">SIH</span>
                 <span className="font-bold text-white tracking-widest text-[13px]">3/4</span>
               </div>
               
               <div className="flex gap-3 mt-6">
                 <button className="flex-1 py-2 rounded-lg border border-white/20 text-[10px] font-black tracking-wider text-gray-300 hover:bg-white/10 transition">VIEW TEAM</button>
                 <button className="flex-[1.5] py-2 rounded-lg bg-transparent border border-[#00e6e6] text-[#00e6e6] text-[10px] font-black tracking-wider hover:bg-[#00e6e6] hover:text-[#060b13] transition shadow-[0_0_15px_rgba(0,230,230,0.2)]">REQUEST JOIN</button>
               </div>
            </div>

            {/* Team Card 2 */}
            <div className="bg-gradient-to-b from-[#1c0828] to-[#060b13] border-2 border-[#BC13FE]/30 rounded-[2rem] p-6 shadow-[0_0_30px_rgba(188,19,254,0.1)] flex flex-col relative overflow-hidden hover:-translate-y-1 transition-transform">
               <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
               <div className="h-32 flex justify-center items-center relative">
                 <div className="absolute inset-0 bg-[#BC13FE] filter blur-[40px] opacity-20"></div>
                 <div className="w-20 h-20 bg-gradient-to-br from-[#111928] to-[#060b13] rounded-2xl shadow-[inset_0_0_20px_rgba(188,19,254,0.3)] flex justify-center items-center font-black text-5xl text-white border border-[#BC13FE]/30 relative z-10 tracking-tighter">
                   P<span className="text-[#BC13FE]">P</span>
                 </div>
               </div>
               <h3 className="font-bold text-white text-[15px] mt-2">Pixel Perfect</h3>
               <div className="flex justify-between items-center text-[11px] text-gray-400 mt-1 pb-4 border-b border-white/10">
                 <span className="font-mono text-gray-500">Design</span>
                 <span className="font-bold text-white tracking-widest text-[13px]">2/4</span>
               </div>
               
               <div className="flex gap-3 mt-6">
                 <button className="flex-1 py-2 rounded-lg border border-white/20 text-[10px] font-black tracking-wider text-gray-300 hover:bg-white/10 transition">VIEW TEAM</button>
                 <button className="flex-[1.5] py-2 rounded-lg bg-[#00e6e6] border border-[#00e6e6] text-[#060b13] text-[10px] font-black tracking-wider hover:bg-[#00c2c2] transition shadow-[0_0_20px_rgba(0,230,230,0.5)]">REQUEST JOIN</button>
               </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
            <div className="w-3 h-1.5 bg-white/10 rounded-full ml-2"></div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Upcoming Events & Recent Messages */}
      <div className="md:col-span-3 flex flex-col gap-8 h-full">
        
        {/* Upcoming Events Panel */}
        <div className="dash-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] h-fit">
          <h2 className="text-white font-bold tracking-widest uppercase text-[13px] mb-8">UPCOMING EVENTS</h2>
          <div className="flex flex-col gap-5">
            <div className="bg-transparent border border-[#00e6e6]/60 rounded-2xl p-5 shadow-[inset_0_0_20px_rgba(0,230,230,0.1)] border-l-[6px] border-l-[#00e6e6] hover:bg-white/5 transition-colors cursor-pointer">
              <h3 className="font-bold text-white text-[15px]">Tech Expo</h3>
              <p className="text-xs text-gray-400 mt-2 font-mono">Saturday at 11:00 PM</p>
            </div>
            <div className="bg-transparent border border-[#BC13FE]/60 rounded-2xl p-5 shadow-[inset_0_0_20px_rgba(188,19,254,0.1)] border-l-[6px] border-l-[#BC13FE] hover:bg-white/5 transition-colors cursor-pointer">
              <h3 className="font-bold text-white text-[15px]">Workshop</h3>
              <p className="text-xs text-gray-400 mt-2 font-mono">Join Cwlp at 12:00 PM</p>
            </div>
            {posts.length > 0 && (
               <div className="bg-transparent border border-white/20 rounded-2xl p-5 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border-l-[6px] border-l-gray-500 hover:bg-white/5 transition-colors cursor-pointer">
                 <h3 className="font-bold text-white text-[15px] truncate">{posts[0].title}</h3>
                 <p className="text-xs text-gray-400 mt-2 font-mono">Just Announced</p>
               </div>
            )}
          </div>
        </div>

        {/* Recent Messages Panel */}
        <div className="dash-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1 overflow-y-auto css-scrollbar">
          <h2 className="text-white font-bold tracking-widest uppercase text-[13px] mb-8">RECENT MESSAGES</h2>
          
          <div className="flex flex-col gap-6">
            {/* Msg 1 */}
            <div className="flex items-center gap-5 cursor-pointer group">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00e6e6] flex-shrink-0 relative bg-[#060b13] shadow-[0_0_15px_rgba(0,230,230,0.3)]">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1" />
                <div className="absolute right-0 bottom-0 w-3 h-3 border-2 border-black bg-[#BC13FE] rounded-full z-10 shadow-[0_0_5px_#BC13FE]"></div>
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-4 group-hover:border-[#00e6e6]/60 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[15px] font-bold text-white">Aryan Sharma</h4>
                  <span className="text-[10px] text-gray-500 font-mono">1 activity</span>
                </div>
                <p className="text-xs text-gray-400 truncate">Department, and insuranced!</p>
              </div>
            </div>

            {/* Msg 2 */}
            <div className="flex items-center gap-5 cursor-pointer group mt-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 relative bg-[#111928]">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1 opacity-80" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-4 group-hover:border-[#00e6e6]/60 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[15px] font-bold text-white">Rohan Gupta</h4>
                  <span className="text-[10px] text-gray-500 font-mono">2 hours ago</span>
                </div>
                <p className="text-xs text-gray-400 truncate">Hey!</p>
              </div>
            </div>

            {/* Msg 3 */}
            <div className="flex items-center gap-5 cursor-pointer group mt-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#BC13FE] flex-shrink-0 relative bg-[#060b13] shadow-[0_0_15px_rgba(188,19,254,0.3)]">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1" />
                <div className="absolute right-0 bottom-0 w-3 h-3 border-2 border-black bg-green-500 rounded-full z-10 shadow-[0_0_5px_#22c55e]"></div>
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-4 group-hover:border-[#00e6e6]/60 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[15px] font-bold text-white">Aryan Sharma</h4>
                  <span className="text-[10px] text-gray-500 font-mono">1 hours ago</span>
                </div>
                <p className="text-xs text-gray-400 truncate">Do you want reverberation!</p>
              </div>
            </div>

            {/* Msg 4 */}
            <div className="flex items-center gap-5 cursor-pointer group mt-2">
              <div className="w-14 h-14 rounded-full bg-[#111928] overflow-hidden border-2 border-white/20 flex-shrink-0 relative">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1 opacity-80" />
                <div className="absolute right-0 bottom-0 w-3 h-3 border-2 border-black bg-green-500 rounded-full z-10 shadow-[0_0_5px_#22c55e]"></div>
              </div>
              <div className="flex-1 truncate pb-2 group-hover:border-[#00e6e6]/60 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[15px] font-bold text-white">Priya Singh</h4>
                  <span className="text-[10px] text-gray-500 font-mono">3 month by</span>
                </div>
                <p className="text-xs text-gray-400 truncate">How</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
