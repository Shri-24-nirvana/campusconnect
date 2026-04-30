"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';

export default function TopNav() {
  const [user, setUser] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchConnections = async (userId: string) => {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/connections?t=${Date.now()}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
              const data = await res.json();
              const pendingIncoming = data.filter((conn: any) => conn.status === 'PENDING' && conn.receiverId === userId);
              setNotifications(pendingIncoming);
          }
      } catch(e) {}
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const u = JSON.parse(userStr);
        setUser(u);
        fetchConnections(u.id);
        const interval = setInterval(() => fetchConnections(u.id), 5000);
        return () => clearInterval(interval);
    }
  }, []);

  const handleAccept = async (connId: string) => {
      const token = localStorage.getItem('access_token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/connections/${connId}/accept`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.filter(n => n.id !== connId));
  };

  return (
    <nav className="h-28 w-full flex justify-between items-center px-12 absolute top-0 left-0 z-50 pointer-events-none">
      <div className="flex items-center gap-4 drop-shadow-[0_0_15px_rgba(0,230,230,0.4)] pointer-events-auto mt-4">
        <div className="flex items-center gap-6">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50H80C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20V0Z" fill="#00e6e6"/>
            <circle cx="75" cy="25" r="8" fill="#00e6e6"/>
            <circle cx="85" cy="40" r="5" fill="#00e6e6"/>
            <circle cx="95" cy="20" r="3" fill="#00e6e6"/>
          </svg>
          <div className="flex items-center gap-3">
             <h1 className="text-2xl font-bold tracking-widest text-[#00e6e6]">CAMPUSCONNECT</h1>
             <span className="text-gray-400 text-2xl font-light tracking-widest">| DASHBOARD</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10 pointer-events-auto mt-4">
        <div className="flex items-center gap-4 drop-shadow-[0_0_15px_rgba(0,230,230,0.5)]">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#00e6e6] relative bg-[#0a1220]">
             <img src="/avatar_1.png" alt="Avatar" className="w-full h-full object-cover scale-150 relative top-2" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-lg tracking-wider uppercase">{user ? user.name : 'Unknown User'}</span>
            <span className="text-[#00e6e6] text-sm font-mono mt-1">(CSE, 2026)</span>
          </div>
        </div>
        
        <div className="relative">
          <div className="cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
             <span className="text-2xl text-gray-400 hover:text-white transition">🔔</span>
             {notifications.length > 0 && <span className="absolute -top-1 -right-2 w-5 h-5 bg-[#BC13FE] rounded-full text-[11px] flex justify-center items-center font-bold text-white shadow-[0_0_10px_#BC13FE]">{notifications.length}</span>}
          </div>
          
          {showNotifications && (
             <div className="absolute top-12 right-0 w-80 bg-[#0d1424]/95 backdrop-blur-3xl border border-[#00e6e6]/30 rounded-2xl shadow-[0_0_30px_rgba(0,230,230,0.15)] flex flex-col overflow-hidden animate-fade-in z-50">
                <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                   <h3 className="text-white font-bold tracking-widest text-sm uppercase">Notifications</h3>
                   <span className="text-[#00e6e6] text-xs font-bold cursor-pointer hover:underline">Mark all read</span>
                </div>
                
                <div className="flex flex-col max-h-96 overflow-y-auto css-scrollbar">
                   {notifications.length === 0 && <div className="p-6 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">No New Notifications</div>}
                   {notifications.map((notif: any) => (
                       <div key={notif.id} className="px-5 py-4 border-b border-white/5 hover:bg-white/5 transition flex flex-col gap-2">
                          <span className="text-white text-sm"><strong>{notif.sender.name}</strong> sent you a connection request!</span>
                          <div className="flex gap-2 mt-1">
                             <button onClick={() => handleAccept(notif.id)} className="bg-[#00e6e6] text-[#060b13] px-4 py-1.5 rounded font-bold text-xs shadow-[0_0_10px_rgba(0,230,230,0.3)] hover:bg-white transition-colors">Accept</button>
                             <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))} className="border border-white/20 text-gray-300 px-4 py-1.5 rounded font-bold text-xs hover:bg-white/10 transition-colors">Ignore</button>
                          </div>
                       </div>
                   ))}
                </div>
             </div>
          )}
        </div>

        <div className="relative w-72">
           <input type="text" placeholder="Search" className="w-full bg-[#111928]/80 border border-white/10 rounded-full px-6 py-3 text-white outline-none focus:border-[#00e6e6] transition-colors" />
           <span className="absolute right-6 top-[10px] text-gray-400">🔍</span>
        </div>
      </div>
    </nav>
  );
}
