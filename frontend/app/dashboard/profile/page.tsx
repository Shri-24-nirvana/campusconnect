"use client";

import { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function ProfileView() {
  const [profile, setProfile] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    if (userStr) {
      const u = JSON.parse(userStr);
      setUser(u);
      setFormData((prev: any) => ({ ...prev, name: u.name, email: u.email }));
    }

    gsap.fromTo(".prof-item", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );

    if (token) {
      fetch('http://localhost:5000/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            if(data) {
                setProfile(data);
                setFormData((prev: any) => ({ ...prev, ...data }));
            }
        })
        .catch(() => {});
    }
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    const token = localStorage.getItem('access_token');
    try {
        await fetch('http://localhost:5000/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        
        // Refresh local UI copy
        const updatedReq = await fetch('http://localhost:5000/profile', { headers: { Authorization: `Bearer ${token}` } });
        if(updatedReq.ok) {
            const upData = await updatedReq.json();
            setProfile(upData);
        }
        setShowEditModal(false);
    } catch(err) {
        console.error(err);
    }
    setIsSaving(false);
  };

  const handleDataChange = (field: string, val: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-32 max-w-[1500px] mx-auto min-h-screen">
      
      {/* LEFT COLUMN: Identity & Skills */}
      <div className="md:col-span-4 flex flex-col gap-6">
        <div className="prof-item flex gap-4 w-full">
          <div onClick={() => profile?.github && window.open(profile.github.startsWith('http') ? profile.github : `https://${profile.github}`, '_blank')} className="bg-[#0d1424]/70 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex items-center gap-4 flex-1 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer hover:border-[#00e6e6]/60 transition-colors group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00e6e6]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="w-12 h-12 bg-[#111928] border border-white/10 rounded-2xl flex justify-center items-center text-xl shadow-[0_0_10px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform">🐙</div>
             <div>
                <p className="text-gray-500 text-[10px] tracking-widest uppercase font-bold">Github / Projects</p>
                <p className="text-white text-sm font-bold tracking-widest mt-1">{profile?.github ? 'Linked' : 'Not Linked'}</p>
             </div>
          </div>
          <div onClick={() => profile?.linkedin && window.open(profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`, '_blank')} className="bg-[#0d1424]/70 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex items-center gap-4 flex-1 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer hover:border-[#BC13FE]/60 transition-colors group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#BC13FE]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="w-12 h-12 bg-[#111928] border border-white/10 rounded-2xl flex justify-center items-center text-xl shadow-[0_0_10px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform">💼</div>
             <div>
                <p className="text-gray-500 text-[10px] tracking-widest uppercase font-bold">LinkedIn</p>
                <p className="text-white text-sm font-bold tracking-widest mt-1">{profile?.linkedin ? 'Linked' : 'Not Linked'}</p>
             </div>
          </div>
        </div>
        <div className="prof-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex flex-col justify-between h-full">
          
          <div className="w-full bg-gradient-to-t from-[#00e6e6]/10 to-transparent border-[3px] border-[#00e6e6]/60 rounded-3xl flex flex-col items-center justify-end pt-12 p-3 relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,230,230,0.4)]">
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#00e6e6] shadow-[0_0_10px_#00e6e6] z-30"></div>
            <img src="/avatar_1.png" alt="Avatar" className="w-[180px] h-[180px] object-cover absolute top-0 z-10 scale-125" />
            
            <div className="w-full bg-[#0d1424]/90 backdrop-blur-md rounded-2xl border border-[#00e6e6]/50 py-4 text-center z-20 mt-32 relative">
              <p className="text-sm font-bold text-white tracking-wider truncate uppercase">{user?.name || 'ARYAN SHARMA'}</p>
              <p className="text-xs text-gray-400 mt-1 font-mono uppercase">({profile?.branch || 'CSE'}, {profile?.year || '2026'})</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl text-white font-bold tracking-widest mb-6">Skills</h2>
            
            <div className="flex flex-wrap gap-2">
                {(profile?.skills || ['Python', 'Java', 'UI/UX', 'Cloud Computing']).map((skill: string, idx: number) => (
                    <div key={idx} className="bg-[#111928] border border-[#00e6e6]/30 px-4 py-2 rounded-lg text-xs font-bold text-[#00e6e6] shadow-[0_0_10px_rgba(0,230,230,0.2)]">
                        {skill}
                    </div>
                ))}
            </div>
          </div>

          <button onClick={() => setShowEditModal(true)} className="w-full mt-10 bg-[#00e6e6] text-[#060b13] font-black tracking-widest text-[14px] py-4 rounded-xl shadow-[0_0_20px_rgba(0,230,230,0.5)] hover:bg-white transition-colors uppercase">
            EDIT PROFILE
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Bio, Projects, Records */}
      <div className="md:col-span-8 flex flex-col gap-6">
        
        {/* Bio Segment */}
        <div className="prof-item bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex-1 relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-bold tracking-widest text-[16px]">Bio / Achievements</h2>
            <span onClick={() => setShowEditModal(true)} className="text-gray-500 cursor-pointer hover:text-white transition text-lg">⚙️</span>
          </div>
          <p className="text-gray-400 text-[14px] font-light leading-relaxed mb-6">
            {profile?.achievements || profile?.bio || 'Full stack web developer passionate about creating innovative web applications... Update your profile to set this!'}
          </p>
          
          <div className="w-full bg-[#111928]/60 border border-white/10 rounded-xl p-4 flex justify-between items-center mt-auto cursor-pointer hover:bg-white/5 transition-colors">
            <span className="text-gray-300 text-sm">View Social Links</span>
            <div className="flex gap-4">
                {profile?.linkedin && <span className="text-[#0077b5] font-bold">in</span>}
                {profile?.github && <span className="text-white font-bold">github</span>}
            </div>
            <span className="text-[#00e6e6]">˅</span>
          </div>
        </div>

        {/* Featured Projects Segment */}
        <div className="prof-item flex flex-col pt-4">
          <h2 className="text-white font-bold tracking-widest text-[16px] mb-6 pl-2">Featured Projects</h2>
          
          <div className="grid grid-cols-3 gap-6">
             {/* Dynamic from links? We'll just show placeholders or map array if we stored it */}
             <div className="bg-gradient-to-b from-[#111928] to-[#060b13] border border-white/10 rounded-3xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col items-center hover:border-[#00e6e6]/40 transition group cursor-pointer h-48 justify-center gap-4">
                <div className="w-16 h-16 bg-[#060b13] rounded-lg border border-white/5 shadow-[0_0_20px_rgba(0,0,0,1)] flex flex-col items-center p-1 group-hover:scale-110 transition-transform">
                  <div className="flex gap-1 w-full p-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span></div>
                  <div className="flex-1 w-full bg-[#111928] mt-1 flex flex-col gap-1 p-1">
                     <span className="w-full h-1 bg-gray-600 rounded"></span><span className="w-3/4 h-1 bg-[#00e6e6] rounded"></span><span className="w-1/2 h-1 bg-[#BC13FE] rounded"></span>
                  </div>
                </div>
                <h3 className="text-gray-300 font-bold text-[13px] text-center">{profile?.projects || 'Main Project 1'}</h3>
             </div>

             <div className="bg-gradient-to-b from-[#1c0828]/50 to-[#060b13] border border-[#BC13FE]/30 rounded-3xl p-6 shadow-[0_0_25px_rgba(188,19,254,0.15)] flex flex-col items-center hover:border-[#BC13FE] transition group cursor-pointer h-48 justify-center gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#BC13FE] opacity-[0.03] filter blur-xl"></div>
                <div className="w-20 h-16 bg-[#e0e0fd] border-[3px] border-[#6b6bf9] rounded-lg shadow-[0_0_20px_rgba(107,107,249,0.5)] flex flex-col items-center p-1 group-hover:scale-110 transition-transform relative z-10">
                   <div className="w-full h-2 bg-[#6b6bf9]/20 rounded mb-1 flex items-center px-1"><span className="w-1 h-1 bg-[#6b6bf9] rounded-full"></span></div>
                   <div className="w-full flex-1 bg-white rounded flex p-1 gap-1">
                      <div className="bg-[#6b6bf9]/30 flex-1 rounded"></div>
                      <div className="bg-[#6b6bf9]/10 flex-[2] rounded"></div>
                   </div>
                </div>
                <h3 className="text-white font-bold text-[13px] relative z-10 text-center">Project 2</h3>
             </div>

             <div className="bg-gradient-to-b from-[#111928] to-[#060b13] border border-white/10 rounded-3xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col items-center hover:border-[#00e6e6]/40 transition group cursor-pointer h-48 justify-center gap-4">
                <div className="w-16 h-16 flex flex-col items-center group-hover:scale-110 transition-transform relative">
                  <div className="w-10 h-4 rounded-[50%] bg-[#BC13FE] border-2 border-white/20 shadow-[0_0_15px_rgba(188,19,254,0.5)] absolute top-0 z-30"></div>
                  <div className="w-6 h-10 border-r-2 border-l-2 border-white/20 absolute top-2 z-20"></div>
                  <div className="flex gap-4 absolute top-10 w-[80px] justify-between">
                     <div className="w-6 h-3 rounded-[50%] bg-[#00e6e6] border border-white/20 shadow-[0_0_10px_rgba(0,230,230,0.5)]"></div>
                     <div className="w-6 h-3 rounded-[50%] bg-[#00e6e6] border border-white/20 shadow-[0_0_10px_rgba(0,230,230,0.5)]"></div>
                  </div>
                </div>
                <h3 className="text-gray-300 font-bold text-[13px] mt-2">Project 3</h3>
             </div>
          </div>
        </div>

        {/* Academic Record Segment */}
        <div className="prof-item flex flex-col pt-4">
          <h2 className="text-white font-bold tracking-widest text-[16px] mb-6 pl-2">Academic Record</h2>
          
          <div className="w-full bg-[#111928]/80 backdrop-blur-md border border-[#00e6e6]/30 shadow-[0_0_15px_rgba(0,230,230,0.15)] rounded-2xl p-6 flex justify-between items-center text-gray-300">
             <span className="text-[15px] font-mono">{profile?.branch || 'CSE'}</span>
             <span className="text-[15px] font-mono">{profile?.branch || 'CSE'}, {profile?.year || '2026'}</span>
             <span className="text-[15px] pr-4">GPA: <span className="text-[#00e6e6] font-bold text-lg">9.1</span></span>
          </div>
        </div>

      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md bg-black/60 p-4">
          <div className="w-[1200px] bg-[#0d1424]/90 backdrop-blur-3xl border border-[#00e6e6]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,230,230,0.15)] relative flex flex-col h-[75vh]">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <h2 className="text-white text-xl font-bold tracking-widest uppercase flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00e6e6] to-blue-500 flex justify-center items-center text-black font-black">C</span>
                 EDIT YOUR PROFILE
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>

            <div className="flex gap-2 mb-6">
              <div onClick={() => setActiveTab(1)} className={`flex-1 cursor-pointer font-bold text-center py-3 text-[12px] tracking-widest clipper transition-colors ${activeTab === 1 ? 'bg-[#00e6e6] text-[#060b13]' : 'bg-[#111928] text-gray-400 hover:bg-[#111928]/80'}`}>1. Basic Info</div>
              <div onClick={() => setActiveTab(2)} className={`flex-1 cursor-pointer font-bold text-center py-3 text-[12px] tracking-widest clipper transition-colors ${activeTab === 2 ? 'bg-[#00e6e6] text-[#060b13]' : 'bg-[#111928] text-gray-400 hover:bg-[#111928]/80'}`}>2. Skills & Ranks</div>
              <div onClick={() => setActiveTab(3)} className={`flex-1 cursor-pointer font-bold text-center py-3 text-[12px] tracking-widest rounded-r-lg transition-colors ${activeTab === 3 ? 'bg-[#00e6e6] text-[#060b13]' : 'bg-[#111928] text-gray-400 hover:bg-[#111928]/80'}`}>3. Links & Projects</div>
            </div>
            
            <div className="flex-1 overflow-y-auto css-scrollbar pr-2 mt-4">
               
               {activeTab === 1 && (
               <div className="flex flex-col gap-6 max-w-[600px] mx-auto animate-fade-in relative z-10">
                  <div className="flex flex-col gap-2">
                     <label className="text-xs text-gray-400 uppercase tracking-wider">Full Name</label>
                     <input type="text" value={formData.name || ''} onChange={e => handleDataChange('name', e.target.value)} placeholder="FULL NAME" className="w-full bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#00e6e6] transition text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-xs text-gray-400 uppercase tracking-wider">College Email</label>
                     <input type="email" disabled value={formData.email || ''} placeholder="Email" className="w-full bg-[#111928]/30 border border-white/5 opacity-50 rounded-xl px-4 py-4 text-white outline-none text-sm cursor-not-allowed" />
                  </div>
                  <div className="flex gap-4">
                     <div className="flex-1 flex flex-col gap-2">
                        <label className="text-xs text-gray-400 uppercase tracking-wider">Branch</label>
                        <select value={formData.branch || ''} onChange={e => handleDataChange('branch', e.target.value)} className="w-full bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#00e6e6] text-sm">
                           <option value="">Select Branch</option>
                           <option value="CSE">Computer Science (CSE)</option>
                           <option value="IT">Info Tech (IT)</option>
                           <option value="AI">Artificial Intelligence (AI)</option>
                           <option value="ECE">Electronics (ECE)</option>
                        </select>
                     </div>
                     <div className="flex-1 flex flex-col gap-2">
                        <label className="text-xs text-gray-400 uppercase tracking-wider">Year of Graduation</label>
                        <select value={formData.year || ''} onChange={e => handleDataChange('year', e.target.value)} className="w-full bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-[#00e6e6] text-sm">
                           <option value="">Select Year</option>
                           <option value="2024">2024</option>
                           <option value="2025">2025</option>
                           <option value="2026">2026</option>
                           <option value="2027">2027</option>
                        </select>
                     </div>
                  </div>
               </div>
               )}

               {activeTab === 2 && (
               <div className="flex flex-col gap-6 max-w-[600px] mx-auto animate-fade-in relative z-10">
                  <div className="flex flex-col gap-2 relative">
                     <label className="text-xs text-gray-400 uppercase tracking-wider relative z-10 bg-[#0d1424] w-fit px-2 -mb-4 ml-2">SKILLS (Comma separated)</label>
                     <input type="text" value={Array.isArray(formData.skills) ? formData.skills.join(', ') : (formData.skills || '')} onChange={e => handleDataChange('skills', e.target.value)} placeholder="e.g. Python, React, UI/UX" className="w-full bg-[#111928]/60 border border-white/20 rounded-xl px-4 pt-6 pb-4 text-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] focus:border-[#00e6e6] outline-none" />
                  </div>
                  <div className="flex flex-col gap-2 relative">
                     <label className="text-xs text-gray-400 uppercase tracking-wider relative z-10 bg-[#0d1424] w-fit px-2 -mb-4 ml-2">ACHIEVEMENTS / BIO</label>
                     <textarea value={formData.achievements || formData.bio || ''} onChange={e => handleDataChange('achievements', e.target.value)} placeholder="Write about your achievements and bio..." className="w-full bg-[#111928]/60 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-white/20 rounded-xl px-4 pt-6 pb-4 min-h-[120px] text-white focus:outline-none focus:border-[#00e6e6] transition text-sm"></textarea>
                  </div>
                  
                  <div className="mt-4 border border-white/10 rounded-2xl p-6 bg-[#111928]/40 relative">
                     <div className="absolute top-0 right-4 -translate-y-1/2 bg-[#00e6e6] text-[#060b13] px-2 rounded font-bold text-[10px]">Select badges here</div>
                     <label className="text-xs text-white font-bold uppercase tracking-wider block mb-4">SELECT POTENTIAL BADGES</label>
                     <div className="grid grid-cols-2 gap-3 mb-2">
                         <span className="bg-[#111928] border border-[#00e6e6]/30 text-gray-300 text-center py-3 rounded-lg text-xs hover:bg-[#00e6e6]/10 cursor-pointer transition">Top Builder 🏅</span>
                         <span className="bg-[#111928] border border-white/10 text-gray-300 text-center py-3 rounded-lg text-xs hover:border-[#00e6e6]/50 cursor-pointer transition">HackathonPro 🚀</span>
                     </div>
                  </div>
               </div>
               )}

               {activeTab === 3 && (
               <div className="flex flex-col gap-6 max-w-[600px] mx-auto animate-fade-in relative z-10">
                  <div className="flex flex-col gap-2 border border-white/10 rounded-2xl p-6 relative pt-6 bg-transparent">
                     <label className="text-[10px] text-gray-400 uppercase tracking-wider absolute -top-2 left-4 bg-[#0d1424] px-1">SOCIAL & PROJECT LINKS</label>
                     
                     <div className="flex flex-col gap-4 mt-2">
                         <div className="flex items-center gap-3 bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-3 shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]">
                            <span className="text-[#0077B5] font-bold">in</span>
                            <input type="text" value={formData.linkedin || ''} onChange={e => handleDataChange('linkedin', e.target.value)} placeholder="LINKEDIN PROFILE URL" className="flex-1 bg-transparent text-white outline-none text-xs" />
                         </div>
                         <div className="flex items-center gap-3 bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-3 shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]">
                            <span className="text-white font-bold bg-black rounded-full px-1">github</span>
                            <input type="text" value={formData.github || ''} onChange={e => handleDataChange('github', e.target.value)} placeholder="GITHUB PROFILE URL" className="flex-1 bg-transparent text-white outline-none text-xs" />
                         </div>
                         <div className="flex items-center gap-3 bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-3 shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]">
                            <span className="text-white font-black">X</span>
                            <input type="text" value={formData.xProfile || ''} onChange={e => handleDataChange('xProfile', e.target.value)} placeholder="X PROFILE URL" className="flex-1 bg-transparent text-white outline-none text-xs" />
                         </div>
                         <div className="flex items-center gap-3 bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-3 shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]">
                            <span className="text-[#E1306C] font-bold">Insta</span>
                            <input type="text" value={formData.instagram || ''} onChange={e => handleDataChange('instagram', e.target.value)} placeholder="INSTAGRAM PROFILE URL" className="flex-1 bg-transparent text-white outline-none text-xs" />
                         </div>
                         <div className="flex items-center gap-3 bg-[#111928]/60 border border-white/10 rounded-xl px-4 py-3 shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)]">
                            <span className="text-green-400 font-bold">Proj</span>
                            <input type="text" value={formData.projects || ''} onChange={e => handleDataChange('projects', e.target.value)} placeholder="MAIN PROJECT TITLE OR URL" className="flex-1 bg-transparent text-white outline-none text-xs" />
                         </div>
                     </div>
                  </div>
               </div>
               )}

            </div>
            
            <div className="pt-6 border-t border-white/5 flex justify-end gap-4 mt-6">
               <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white px-6 py-2 text-sm transition font-bold tracking-widest">CANCEL</button>
               <button onClick={handleSaveProfile} disabled={isSaving} className="bg-[#00e6e6] text-[#060b13] px-10 py-3 rounded-xl text-sm font-black tracking-widest shadow-[0_0_15px_rgba(0,230,230,0.4)] hover:bg-white transition-colors uppercase disabled:opacity-50">
                   {isSaving ? 'UPLOADING...' : 'SAVE PROFILE'}
               </button>
            </div>

            <style>{`
               .clipper { clip-path: polygon(0 0, 95% 0, 100% 100%, 0% 100%); margin-right: -10px; padding-right: 20px; }
               .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
               @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
          </div>
        </div>
      )}

    </div>
  );
}
