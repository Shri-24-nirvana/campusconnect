"use client";

import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    if (!userStr || !token) {
      router.push('/login');
    } else {
      setMounted(true);
    }
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#060b13] flex justify-center items-center text-[#00e6e6]">Initializing Node...</div>;

  return (
    <div className="h-screen w-screen bg-[#060b13] overflow-hidden relative font-sans text-white">
      {/* Absolute Isometric Background Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: 'url(/server_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="absolute inset-0 border-b-[200px] border-[#060b13]/80 fixed bottom-0 z-10 pointer-events-none filter blur-3xl"></div>

      {/* Top Navbar */}
      <TopNav />

      {/* Main App Container */}
      <div className="flex h-full w-full relative z-20 pt-28 pb-8 pr-8">
        {/* Sidebar Frame */}
        <div className="h-full">
          <Sidebar />
        </div>

        {/* Dynamic Page Content */}
        <main className="flex-1 h-full pl-8 overflow-y-auto overflow-x-hidden relative css-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
