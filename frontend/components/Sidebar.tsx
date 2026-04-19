"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', path: '/dashboard', icon: '🏠' },
    { name: 'My Profile', path: '/dashboard/profile', icon: '👤' },
    { name: 'Students Directory', path: '/dashboard/students', icon: '🫂' },
    { name: 'Teams Hub', path: '/dashboard/team', icon: '👥' },
    { name: 'Opportunities', path: '/dashboard/events', icon: '💼' },
    { name: 'Messages', path: '/dashboard/messages', icon: '✉️' },
    { name: 'Alumni Q&A', path: '/dashboard/qna', icon: '🎓' },
  ];

  return (
    <aside className="w-[300px] h-full border-r border-[#00e6e6]/10 bg-[#060b13]/80 backdrop-blur-3xl flex flex-col pt-32 z-40">
      <div className="flex flex-col gap-2 px-6">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link key={link.name} href={link.path}>
              <div
                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 ${
                  isActive 
                  ? 'bg-gradient-to-r from-[#00e6e6]/20 to-transparent border-l-4 border-[#00e6e6] text-[#00e6e6] drop-shadow-[0_0_10px_rgba(0,230,230,0.5)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xl opacity-80">{link.icon}</span>
                <span className="font-semibold tracking-wide text-[15px]">{link.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Logout Navigation */}
      <div className="mt-auto mb-10 px-6">
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-xl text-red-400 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/50 transition-all drop-shadow-[0_0_10px_rgba(255,0,0,0.1)] hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]">
          <span className="font-bold tracking-widest text-[14px] uppercase">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
