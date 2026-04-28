"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function TeamsView() {
  const [showModal, setShowModal] = useState(false);
  const [joinRequests, setJoinRequests] = useState<Record<string, boolean>>({});
  
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [teamNameInput, setTeamNameInput] = useState('');
  const [myTeams, setMyTeams] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [managingTeam, setManagingTeam] = useState<any>(null);

  const mockConnections = [
      { id: 'u1', name: 'Rohan Rai', branch: 'CSE' },
      { id: 'u2', name: 'Priya Singh', branch: 'ECE' },
      { id: 'u3', name: 'Ananya Sharma', branch: 'IT' },
      { id: 'u4', name: 'Karan Patel', branch: 'ME' }
  ];

  const upcomingEvents = [
    { id: 'ev1', name: "CODEFEST '24", date: 'May 15', type: 'Hackathon', desc: '48-hour global hackathon. Build the future of web tech.' },
    { id: 'ev2', name: 'AI SUMMIT', date: 'June 2', type: 'Competition', desc: 'Build generative AI models and intelligent agents.' },
    { id: 'ev3', name: 'WEB3 BUILD', date: 'July 10', type: 'Hackathon', desc: 'Decentralized app building and smart contracts.' },
  ];

  useEffect(() => {
    gsap.fromTo(".team-item", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );

    const token = localStorage.getItem('access_token');
    if (token) {
       fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/teams`, {
          headers: { Authorization: `Bearer ${token}` }
       })
       .then(res => res.json())
       .then(data => {
           // Mapping mock data logic
       }).catch(() => {});
    }
  }, []);

  const handleJoinTeam = async (teamId: string) => {
      setJoinRequests(prev => ({ ...prev, [teamId]: true }));
      try {
          const token = localStorage.getItem('access_token');
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/teams/join/${teamId}`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` }
          });
      } catch (e) {
          setJoinRequests(prev => ({ ...prev, [teamId]: false }));
      }
  };

  const handleRegisterTeam = () => {
      if(!teamNameInput) return;
      const newTeam = {
         id: Math.random().toString(),
         name: teamNameInput,
         event: activeEvent?.name || 'Unknown Event',
         members: 1 + invitedMembers.length
      };
      setMyTeams(prev => [...prev, newTeam]);
      setShowModal(false);
      setTeamNameInput('');
      setInvitedMembers([]);
      setSearchQuery('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-20 max-w-[1700px] mx-auto min-h-screen relative">
      
      {/* LEFT COLUMN: Your Teams */}
      <div className="md:col-span-3 flex flex-col gap-6">
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] h-fit min-h-[300px]">
          <h2 className="text-white font-bold tracking-widest text-[14px] mb-6 uppercase">Your Active Teams</h2>
          
          {myTeams.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-center py-8 opacity-50">
               <div className="w-16 h-16 border border-dashed border-white/20 rounded-full flex justify-center items-center text-2xl mb-4">👻</div>
               <p className="text-gray-400 text-xs italic leading-relaxed px-4">
                 You haven't created or joined any teams yet.<br/><br/>Click an upcoming event on the right to participate!
               </p>
             </div>
          ) : (
             <div className="flex flex-col gap-4">
               {myTeams.map(t => (
                  <div key={t.id} className="bg-[#111928]/40 border border-[#00e6e6]/30 rounded-2xl p-5 shadow-[inset_0_0_15px_rgba(0,230,230,0.05)] relative overflow-hidden group hover:border-[#00e6e6] transition-colors">
                     <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00e6e6]/20 to-transparent rounded-bl-full"></div>
                     <h3 className="font-bold text-white text-[16px] mb-1">{t.name}</h3>
                     <p className="text-[10px] text-[#00e6e6] font-mono mb-5 uppercase tracking-wider bg-[#00e6e6]/10 w-fit px-2 py-0.5 rounded border border-[#00e6e6]/20">{t.event}</p>
                     <div className="flex justify-between items-center mt-2">
                         <span className="text-[11px] text-gray-500">Members <span className="text-white font-bold">{t.members}/4</span></span>
                         <button onClick={() => setManagingTeam(t)} className="py-1.5 px-4 bg-[#00e6e6] text-[#060b13] rounded text-[10px] font-bold shadow-[0_0_15px_rgba(0,230,230,0.4)] hover:bg-white transition-colors">Manage</button>
                     </div>
                  </div>
               ))}
             </div>
          )}
        </div>
      </div>

      {/* CENTER COLUMN: Community & Global Feed */}
      <div className="md:col-span-6 flex flex-col gap-6">
        
        {/* Student Directory Panel */}
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] border-t border-t-[#00e6e6]/30">
          <h2 className="text-white font-bold tracking-widest text-[14px] mb-6 uppercase">Student Directory (Quick Add)</h2>
          
          <div className="flex gap-4 overflow-x-auto pb-2 css-scrollbar">
            <div className="min-w-[130px] bg-[#060b13]/60 border border-white/10 rounded-[1.5rem] p-3 flex flex-col items-center hover:border-white/20 transition-colors cursor-pointer">
               <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00e6e6] z-20"></div>
               <div className="w-16 h-16 bg-gradient-to-b from-[#111928] to-transparent rounded-xl flex justify-center items-end relative overflow-hidden mb-3">
                 <img src="/avatar_1.png" alt="Ananya" className="w-[120%] h-[120%] object-cover relative top-2 opacity-50" />
               </div>
               <h3 className="text-[12px] font-bold text-white text-center">Priye Singh</h3>
               <span className="text-[10px] text-gray-500 mb-2">CSE Offline</span>
            </div>
            
            <div className="min-w-[130px] bg-[#060b13]/60 border border-white/10 rounded-[1.5rem] p-3 flex flex-col items-center hover:border-white/20 transition-colors cursor-pointer">
               <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00e6e6] z-20"></div>
               <div className="w-16 h-16 bg-gradient-to-b from-[#111928] to-transparent rounded-xl flex justify-center items-end relative overflow-hidden mb-3">
                 <img src="/avatar_1.png" alt="Rohan" className="w-[120%] h-[120%] object-cover relative top-2 opacity-50" />
               </div>
               <h3 className="text-[12px] font-bold text-white text-center">Aryan Rai</h3>
               <span className="text-[10px] text-gray-500 mb-2">ECE Online</span>
            </div>
          </div>
        </div>

        {/* Global Teams Feed */}
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1 overflow-y-auto css-scrollbar min-h-[400px]">
          <h2 className="text-white font-bold tracking-widest text-[14px] mb-6 uppercase">Global Teams Looking For Members</h2>
          <div className="flex flex-col gap-4">
            
            {/* Team 1 */}
            <div className="flex items-center gap-4 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 relative bg-[#111928] opacity-70">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-white">Algorithm Junkies</h4>
                  <span className="text-[10px] text-gray-500 font-mono">Members: 3/4</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[11px] text-[#00e6e6] truncate w-3/4">CODEFEST '24 <span className="text-gray-500 ml-2">— Looking for UI designer</span></p>
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

            {/* Team 2 */}
            <div className="flex items-center gap-4 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-neon-purple)] flex-shrink-0 relative bg-[#111928] shadow-[0_0_15px_rgba(188,19,254,0.3)]">
                <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-1 pb-1" />
              </div>
              <div className="flex-1 truncate border-b border-white/5 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-[14px] font-bold text-white">Frontend Masters</h4>
                  <span className="text-[10px] text-gray-500 font-mono">Members: 2/5</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[11px] text-[#BC13FE] truncate w-3/4">WEB3 BUILD <span className="text-gray-500 ml-2">— Seeking react devs</span></p>
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

      {/* RIGHT COLUMN: Upcoming Events */}
      <div className="md:col-span-3 flex flex-col gap-6">
        <div className="team-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1">
          <h2 className="text-white font-bold tracking-widest text-[14px] mb-6 uppercase">Upcoming Events</h2>
          
          <div className="flex flex-col gap-4">
             {upcomingEvents.map(ev => (
                <div key={ev.id} className="bg-[#111928]/60 border border-white/10 rounded-2xl p-5 hover:border-[#BC13FE]/50 transition-colors cursor-pointer group shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold text-sm tracking-wider group-hover:text-[#BC13FE] transition-colors uppercase">{ev.name}</h3>
                      <span className="text-[9px] font-bold bg-[#BC13FE]/20 text-[#BC13FE] px-2 py-0.5 rounded">{ev.date}</span>
                   </div>
                   <p className="text-[11px] text-gray-400 mb-6 leading-relaxed">{ev.desc}</p>
                   <button onClick={() => { setActiveEvent(ev); setShowModal(true); }} className="w-full py-2.5 bg-[#111928] border border-white/10 group-hover:bg-[#BC13FE] text-gray-300 group-hover:text-white rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all shadow-[0_0_10px_rgba(188,19,254,0)] group-hover:shadow-[0_0_15px_rgba(188,19,254,0.3)]">
                      Participate
                   </button>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* CENTRAL REGISTRATION MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/60 p-4">
          <div className="w-[500px] bg-[#0d1424]/90 backdrop-blur-3xl border border-[#00e6e6]/50 rounded-[2rem] p-8 shadow-[0_0_50px_rgba(0,230,230,0.2)] relative animate-fade-in">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl z-20">✕</button>
            <h2 className="text-white text-xl font-bold tracking-widest mb-8 uppercase">Register for {activeEvent?.name}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">Step 1: Team Name</label>
                <input 
                   type="text" 
                   value={teamNameInput}
                   onChange={e => setTeamNameInput(e.target.value)}
                   className="w-full bg-[#111928]/60 border border-[#00e6e6]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00e6e6] transition shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" 
                   autoFocus 
                   placeholder="E.g., Algorithm Junkies"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">Step 2: Member Invite</label>
                <div className="w-full bg-[#111928]/60 border border-[#00e6e6]/30 rounded-xl p-4 flex flex-col gap-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                   
                   <div className="relative">
                      <input 
                         type="text" 
                         placeholder="Search connections to invite..." 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="w-full bg-[#060b13]/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00e6e6] transition shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]"
                      />
                      <span className="absolute right-4 top-3 text-gray-500">🔍</span>
                   </div>
                   
                   <div className="flex flex-col gap-2 max-h-36 overflow-y-auto css-scrollbar pr-2 mt-2">
                      {mockConnections.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(conn => {
                          const isAdded = invitedMembers.includes(conn.id);
                          return (
                             <div key={conn.id} className={`flex items-center justify-between p-2 rounded-lg transition-colors border ${isAdded ? 'bg-[#00e6e6]/5 border-[#00e6e6]/20' : 'bg-[#111928]/40 border-white/5 hover:border-white/20'}`}>
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full overflow-hidden bg-[#060b13] border border-white/20">
                                      <img src="/avatar_1.png" className="w-full h-full object-cover scale-150" />
                                   </div>
                                   <div className="flex flex-col">
                                      <span className="text-sm text-white font-bold leading-tight">{conn.name}</span>
                                      <span className="text-[10px] text-gray-500 font-mono">{conn.branch}</span>
                                   </div>
                                </div>
                                
                                {isAdded ? (
                                   <button onClick={() => setInvitedMembers(invitedMembers.filter(id => id !== conn.id))} className="bg-transparent border border-[#00e6e6]/50 text-[#00e6e6] font-bold text-[10px] px-3 py-1.5 rounded uppercase tracking-wider hover:bg-[#00e6e6]/10 transition-colors">Added ✓</button>
                                ) : (
                                   <button onClick={() => setInvitedMembers([...invitedMembers, conn.id])} className="bg-[#00e6e6]/20 border border-[#00e6e6]/50 text-[#00e6e6] font-bold text-[10px] px-4 py-1.5 rounded shadow-[0_0_10px_rgba(0,230,230,0.2)] hover:bg-[#00e6e6] hover:text-black transition-colors uppercase tracking-wider">Add</button>
                                )}
                             </div>
                          );
                      })}
                      {mockConnections.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                          <div className="text-center text-xs text-gray-500 py-4">No connections found matching "{searchQuery}"</div>
                      )}
                   </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">Step 3: Rules Acceptance</label>
                <div className="w-full bg-[#111928]/60 border border-[#00e6e6]/30 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                   <div className="text-gray-400 text-xs">I agree to the competition rules</div>
                   <div className="w-5 h-5 rounded border-2 border-[#00e6e6] flex justify-center items-center bg-[#00e6e6]/20">
                      <span className="text-[#00e6e6] text-xs font-bold">✓</span>
                   </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white px-6 py-2 text-sm transition font-bold tracking-widest">CANCEL</button>
                <button onClick={handleRegisterTeam} className="bg-[#00e6e6] text-[#060b13] font-black tracking-widest text-[13px] px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(0,230,230,0.4)] hover:bg-white transition-all">
                  CREATE TEAM
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEAM MANAGEMENT MODAL */}
      {managingTeam && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/60 p-4">
          <div className="w-[450px] bg-[#0d1424]/95 backdrop-blur-3xl border border-[#00e6e6]/30 rounded-[2rem] p-8 shadow-[0_0_50px_rgba(0,230,230,0.2)] relative animate-fade-in flex flex-col items-center">
             <button onClick={() => setManagingTeam(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl z-20">✕</button>
             
             <div className="w-20 h-20 bg-gradient-to-t from-[#111928] to-transparent border border-white/10 rounded-[1.5rem] flex justify-center items-end relative overflow-hidden mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                 <img src="/avatar_1.png" className="w-[120%] h-[120%] object-cover relative top-2 opacity-70" />
             </div>
             
             <h2 className="text-white text-2xl font-black tracking-widest uppercase mb-1">{managingTeam.name}</h2>
             <span className="bg-[#00e6e6]/10 text-[#00e6e6] border border-[#00e6e6]/30 px-3 py-1 rounded text-xs font-mono uppercase tracking-widest mb-8">{managingTeam.event}</span>
             
             <div className="w-full bg-[#111928]/60 border border-white/5 rounded-xl p-5 mb-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
                   <span className="text-sm text-gray-400">Team Status</span>
                   <span className="text-[#00e6e6] text-xs font-bold px-2 py-0.5 bg-[#00e6e6]/10 rounded">Active</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-sm text-gray-400">Total Members</span>
                   <span className="text-white text-sm font-bold">{managingTeam.members} / 4</span>
                </div>
             </div>
             
             <div className="w-full flex gap-3">
                <button onClick={() => setManagingTeam(null)} className="flex-1 border border-white/10 text-white font-bold text-xs py-3 rounded-xl hover:bg-white/5 transition-colors tracking-widest uppercase">
                  Close
                </button>
                <button onClick={() => {
                   setMyTeams(prev => prev.filter(t => t.id !== managingTeam.id));
                   setManagingTeam(null);
                }} className="flex-1 bg-red-500/20 border border-red-500/50 text-red-400 font-bold text-xs py-3 rounded-xl hover:bg-red-500 hover:text-white transition-colors tracking-widest uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  Disband Team
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
