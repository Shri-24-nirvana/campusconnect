"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function StudentsDirectoryView() {
  const [users, setUsers] = useState<any[]>([]);
  const [connectStatus, setConnectStatus] = useState<Record<string, string>>({});
  const [viewingStudent, setViewingStudent] = useState<any>(null);

  useEffect(() => {
    gsap.fromTo(".dir-card", 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.5)" }
    );

    const token = localStorage.getItem('access_token');
    if (token) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/users/directory`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) setUsers(data);
        }).catch(err => console.error(err));

        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/connections?t=${Date.now()}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                const map: Record<string, string> = {};
                const uStr = localStorage.getItem('user');
                const myId = uStr ? JSON.parse(uStr).id : '';

                data.forEach(conn => {
                   const partnerId = conn.senderId === myId ? conn.receiverId : conn.senderId;
                   map[partnerId] = conn.status;
                });
                setConnectStatus(map);
            }
        })
        .catch(err => console.error(err));
    }
  }, []);

  const handleConnect = async (targetId: string) => {
      setConnectStatus(prev => ({ ...prev, [targetId]: 'PENDING' }));
      try {
          const token = localStorage.getItem('access_token');
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/connections/${targetId}`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` }
          });
      } catch (err) {
          setConnectStatus(prev => {
              const newMap = { ...prev };
              delete newMap[targetId];
              return newMap;
          });
      }
  };

  return (
    <div className="w-full h-[85vh] flex flex-col pb-10 max-w-[1700px] mx-auto min-h-screen">
       <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-black tracking-widest uppercase">GLOBAL NETWORK MATRIX</h1>
          <div className="flex gap-4">
             <input type="text" placeholder="Search parameters (e.g. Python, CSE)" className="w-96 bg-[#111928]/80 border border-white/10 rounded-full px-6 py-3 text-white outline-none focus:border-[#00e6e6] transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
             <button className="bg-[#00e6e6] text-[#060b13] font-black tracking-widest px-8 rounded-full shadow-[0_0_20px_rgba(0,230,230,0.4)] hover:bg-white transition-colors">QUERY</button>
          </div>
       </div>

       <div className="flex-1 bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] overflow-y-auto css-scrollbar">
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
             {/* Card Array generation */}
             {users.map((userObj) => (
                <div key={userObj.id} className="dir-card bg-[#060b13]/60 border border-white/5 hover:border-[#00e6e6]/50 transition-colors rounded-[2rem] p-4 flex flex-col shadow-[0_0_25px_rgba(0,0,0,0.5)] relative cursor-pointer group">
                   <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-[#00e6e6] shadow-[0_0_8px_#00e6e6] z-20"></div>
                   <div className="w-full h-32 bg-gradient-to-b from-[#111928] to-transparent rounded-[1.5rem] flex justify-center items-end relative overflow-hidden border border-white/5 mb-3">
                     <img src={userObj.profile?.avatarUrl || "/avatar_1.png"} className="w-[120%] h-[120%] object-cover relative top-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all rounded-t-full" />
                   </div>
                   <h3 className="text-[14px] font-bold text-center text-white group-hover:text-[#00e6e6] transition-colors">{userObj.name}</h3>
                   <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 px-2 pb-3 border-b border-white/5">
                     <span className="font-mono">{userObj.profile?.branch || 'UNKNOWN'}</span>
                     <span className="text-white font-bold">{(userObj.profile?.skills && userObj.profile.skills[0]) || 'Student'}</span>
                   </div>
                   <div className="flex gap-2 mt-4">
                     <button onClick={() => setViewingStudent(userObj)} className="flex-1 py-1.5 rounded-md border border-white/10 text-[9px] font-black tracking-wider text-gray-300 hover:bg-white/10 transition">PROFILE</button>
                     <button 
                         disabled={!!connectStatus[userObj.id]}
                         onClick={() => handleConnect(userObj.id)}
                         className={`flex-1 py-1.5 rounded-md border text-[9px] font-black tracking-wider transition shadow-[0_0_10px_rgba(0,230,230,0.2)] ${
                             connectStatus[userObj.id] === 'ACCEPTED'
                             ? "bg-[#00e6e6]/20 text-[#00e6e6] border-[#00e6e6]/50 cursor-not-allowed"
                             : connectStatus[userObj.id] === 'PENDING'
                             ? "bg-purple-500/20 text-purple-400 border-purple-500/50 cursor-not-allowed"
                             : "bg-transparent border-[#00e6e6] text-[#00e6e6] hover:bg-[#00e6e6] hover:text-[#060b13]"
                         }`}
                     >
                         {connectStatus[userObj.id] === 'ACCEPTED' ? "CONNECTED" : connectStatus[userObj.id] === 'PENDING' ? "PENDING..." : "CONNECT"}
                     </button>
                   </div>
                </div>
             ))}
          </div>

       </div>
       
       {/* View Profile Modal */}
       {viewingStudent && (
          <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/60 p-4">
             <div className="w-[500px] bg-[#0d1424]/90 backdrop-blur-3xl border border-[#00e6e6]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,230,230,0.15)] relative animate-fade-in flex flex-col items-center">
                <button onClick={() => setViewingStudent(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl z-20">✕</button>
                
                <div className="w-32 h-32 bg-gradient-to-b from-[#111928] to-transparent rounded-full flex justify-center items-center relative overflow-hidden border-2 border-[#00e6e6]/60 mb-6 shadow-[0_0_30px_rgba(0,230,230,0.2)]">
                   <img src={viewingStudent.profile?.avatarUrl || "/avatar_1.png"} className="w-full h-full object-cover" />
                </div>
                
                <h2 className="text-white text-2xl font-black tracking-widest uppercase">{viewingStudent.name}</h2>
                <p className="text-[#00e6e6] font-mono text-sm mt-1 mb-6">({viewingStudent.profile?.branch || 'N/A'}) • Top Skill: {(viewingStudent.profile?.skills && viewingStudent.profile.skills[0]) || 'N/A'}</p>
                
                <div className="w-full bg-[#111928]/60 border border-white/10 rounded-xl p-6 text-gray-300 text-sm leading-relaxed mb-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                   {viewingStudent.profile?.bio || viewingStudent.profile?.achievements || "This student hasn't added a bio yet."}
                </div>
                
                <button onClick={() => setViewingStudent(null)} className="w-full bg-[#00e6e6] text-[#060b13] font-black tracking-widest px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(0,230,230,0.4)] hover:bg-white transition-colors uppercase text-sm">
                   CLOSE PROFILE
                </button>
             </div>
          </div>
       )}
    </div>
  );
}
