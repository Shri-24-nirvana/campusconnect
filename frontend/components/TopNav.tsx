"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';

export default function TopNav() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

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
        
        <div className="relative cursor-pointer">
          <span className="text-2xl text-gray-400 hover:text-white transition">🔔</span>
          <span className="absolute -top-1 -right-2 w-5 h-5 bg-[#BC13FE] rounded-full text-[11px] flex justify-center items-center font-bold text-white shadow-[0_0_10px_#BC13FE]">6</span>
        </div>

        <div className="relative w-72">
           <input type="text" placeholder="Search" className="w-full bg-[#111928]/80 border border-white/10 rounded-full px-6 py-3 text-white outline-none focus:border-[#00e6e6] transition-colors" />
           <span className="absolute right-6 top-[10px] text-gray-400">🔍</span>
        </div>
      </div>
    </nav>
  );
}
