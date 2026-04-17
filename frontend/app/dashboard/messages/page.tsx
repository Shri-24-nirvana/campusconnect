"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function MessagesView() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [activePartner, setActivePartner] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [msgInput, setMsgInput] = useState('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    gsap.fromTo(".msg-panel", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );

    const userStr = localStorage.getItem('user');
    if (userStr) setUserId(JSON.parse(userStr).id);

    const fetchContacts = async () => {
        const token = localStorage.getItem('access_token');
        if(!token) return;
        try {
            // Because connections endpoint might return mock or be empty, we just default
            const res = await fetch('http://localhost:5000/connections', { headers: { Authorization: `Bearer ${token}` } });
            if(res.ok) {
                const data = await res.json();
                // Filter connections to extract the actual partner user object
                const parsedContacts = data.map((conn: any) => {
                    const uStr = localStorage.getItem('user');
                    const myId = uStr ? JSON.parse(uStr).id : '';
                    return (conn.senderId === myId) ? conn.receiver : conn.sender;
                });
                setContacts(parsedContacts);
            }
        } catch(e) {}
    };
    fetchContacts();
  }, []);

  // Polling logic for Active Chat
  useEffect(() => {
      let interval: NodeJS.Timeout;
      const fetchHistory = async () => {
          if(!activePartner) return;
          const token = localStorage.getItem('access_token');
          try {
             const res = await fetch(`http://localhost:5000/messages/${activePartner.id}`, { headers: { Authorization: `Bearer ${token}` } });
             if(res.ok) {
                 const data = await res.json();
                 setMessages(data);
             }
          } catch(e) {}
      };

      if (activePartner) {
          fetchHistory(); // initial fetch
          interval = setInterval(fetchHistory, 3000); // Poll every 3 seconds
      }
      return () => clearInterval(interval);
  }, [activePartner]);

  const handleSend = async () => {
      if(!msgInput.trim() || !activePartner) return;
      const content = msgInput;
      setMsgInput(''); // Clear input optimistically

      // Optimistic locally
      setMessages(prev => [...prev, { senderId: userId, content }]);

      const token = localStorage.getItem('access_token');
      await fetch(`http://localhost:5000/messages/${activePartner.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ content })
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-32 max-w-[1700px] mx-auto min-h-screen">
      
      {/* LEFT COLUMN: Contacts / Search */}
      <div className="md:col-span-4 flex flex-col gap-6 h-[85vh]">
        <div className="msg-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] flex flex-col h-full overflow-hidden">
          
          <div className="relative mb-6">
            <input type="text" placeholder="Search Connections" className="w-full bg-[#111928]/60 border border-white/10 rounded-2xl px-12 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors" />
            <span className="absolute left-4 top-3 text-gray-500">🔍</span>
          </div>

          <div className="flex-1 overflow-y-auto css-scrollbar pr-2 flex flex-col gap-2">
            
            {contacts.length === 0 && <p className="text-gray-500 text-xs text-center mt-10 font-bold uppercase">No Active Connections Yet</p>}
            
            {contacts.map((contact, i) => (
                <div key={i} onClick={() => setActivePartner(contact)} className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-colors ${activePartner?.id === contact.id ? 'bg-gradient-to-r from-[#00e6e6]/20 to-transparent border border-[#00e6e6]/30 shadow-[0_0_15px_rgba(0,230,230,0.1)]' : 'hover:bg-white/5 border border-transparent'}`}>
                  <div className="w-12 h-12 flex-shrink-0 relative">
                    <div className="w-full h-full rounded-full border border-white/20 bg-[#111928] overflow-hidden">
                        <img src="/avatar_1.png" className={`w-full h-full object-cover scale-150 top-1 relative ${activePartner?.id !== contact.id ? 'opacity-70' : ''}`} />
                    </div>
                  </div>
                  <div className="flex-1 border-b border-white/5 pb-2">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className={`text-[14px] font-bold ${activePartner?.id === contact.id ? 'text-white' : 'text-gray-300'}`}>{contact.name || 'Unknown'}</h4>
                      <span className={`text-[9px] font-mono ${activePartner?.id === contact.id ? 'text-[#00e6e6]' : 'text-gray-500'}`}>Online</span>
                    </div>
                    <div className="flex justify-end"><div className={`w-2 h-2 rounded-full ${activePartner?.id === contact.id ? 'bg-[#00e6e6]' : 'bg-green-500'}`}></div></div>
                  </div>
                </div>
            ))}

            {/* Fallback mock UI for visual if empty (as requested) */}
            {contacts.length === 0 && (
              <div 
                 onClick={() => setActivePartner({ id: 'mock_partner', name: 'Aanya Agrawal' })} 
                 className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-colors mt-auto ${activePartner?.id === 'mock_partner' ? 'bg-gradient-to-r from-[#00e6e6]/20 to-transparent border border-[#00e6e6]/30' : 'hover:bg-white/5 opacity-50'}`}>
                <div className="w-12 h-12 flex-shrink-0 relative">
                  <div className="w-full h-full rounded-full border border-white/20 bg-[#111928] overflow-hidden"><img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative opacity-70" /></div>
                </div>
                <div className="flex-1 border-b border-white/5 pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`text-[14px] font-bold ${activePartner?.id === 'mock_partner' ? 'text-white' : 'text-gray-300'}`}>Aanya Agrawal (MOCK)</h4>
                    <span className="text-[9px] text-gray-500 font-mono">Offline</span>
                  </div>
                  <div className="flex justify-end"><div className="w-2 h-2 rounded-full bg-red-500"></div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: Chat Interface */}
      <div className="md:col-span-5 h-[85vh]">
        <div className="msg-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-[#00e6e6]/30 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] h-full flex flex-col relative overflow-hidden">
          
          <div className="flex justify-between items-center pb-6 border-b border-white/10 shrink-0">
            <h2 className="text-white font-bold tracking-widest uppercase text-sm">
                {activePartner ? `CHAT: ${activePartner.name}` : `MESSAGING HUB`}
            </h2>
            <button className="w-6 h-6 rounded-full bg-white/10 flex justify-center items-center text-xs text-gray-400 hover:bg-white hover:text-black transition">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-6 css-scrollbar flex flex-col gap-6">
             
             {!activePartner && <p className="text-gray-500 m-auto text-xs font-bold uppercase tracking-widest text-center">Select a contact from<br/>your connections to begin.</p>}

             {activePartner && messages.length === 0 && <p className="text-[#00e6e6]/60 m-auto text-[10px] uppercase tracking-widest text-center">Start the conversation</p>}

             {activePartner && messages.map((msg, i) => {
                 const isMine = msg.senderId === userId;
                 return (
                     <div key={i} className={`flex gap-4 ${isMine ? 'flex-row-reverse' : ''}`}>
                         <div className="w-10 h-10 flex-shrink-0">
                             <div className={`w-full h-full rounded-full border overflow-hidden bg-[#060b13] ${isMine ? 'border-[#BC13FE]' : 'border-[#00e6e6]'}`}>
                                 <img src="/avatar_1.png" className="w-full h-full object-cover scale-150 top-1 relative" />
                             </div>
                         </div>
                         <div className={`flex flex-col gap-1 max-w-[80%] ${isMine ? 'items-end' : ''}`}>
                            <span className={`text-xs text-gray-500 font-bold ${isMine ? 'mr-2' : 'ml-2'}`}>
                                {isMine ? 'You' : activePartner.name}
                            </span>
                            <div className={`p-4 text-sm shadow-[0_5px_15px_rgba(0,0,0,0.3)] ${
                                isMine 
                                ? 'bg-gradient-to-r from-[#00e6e6]/20 to-[#00e6e6]/10 border border-[#00e6e6]/30 rounded-2xl rounded-tr-sm text-white shadow-[0_5px_15px_rgba(0,230,230,0.1)]' 
                                : 'bg-[#111928] border border-white/10 rounded-2xl rounded-tl-sm text-gray-300'
                            }`}>
                                {msg.content}
                            </div>
                         </div>
                     </div>
                 )
             })}
          </div>

          <div className="pt-4 shrink-0 mt-auto relative z-10 w-full mb-2">
            <div className="relative w-full">
              <input 
                  type="text" 
                  disabled={!activePartner}
                  value={msgInput}
                  onChange={e => setMsgInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={activePartner ? "Type a message..." : "Select connection first..."} 
                  className="w-full bg-[#111928]/80 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-sm text-white focus:outline-none focus:border-[#00e6e6] transition-colors disabled:opacity-50" />
              <button onClick={handleSend} disabled={!activePartner} className="absolute right-3 top-2.5 w-9 h-9 bg-[#00e6e6] text-[#060b13] rounded-xl flex justify-center items-center font-bold text-lg hover:bg-[#00c2c2] shadow-[0_0_15px_rgba(0,230,230,0.4)] transition-all disabled:opacity-50">➤</button>
            </div>
          </div>
          
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00e6e6] rounded-full filter blur-[150px] opacity-[0.15] pointer-events-none"></div>
        </div>
      </div>

      {/* RIGHT COLUMN: Events & Global Messages (Matching Home Layout Sidebar Logic) */}
      <div className="md:col-span-3 flex flex-col gap-8 h-[85vh]">
        {/* Same Static structure */}
        <div className="msg-panel bg-[#0d1424]/70 backdrop-blur-2xl border border-[var(--color-neon-purple)]/20 rounded-3xl p-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] h-fit">
          <h2 className="text-white font-bold tracking-widest uppercase text-[12px] mb-6">UPCOMING EVENTS</h2>
          <div className="flex flex-col gap-4">
            <div className="bg-transparent border border-[#00e6e6]/60 rounded-xl p-4 shadow-[inset_0_0_15px_rgba(0,230,230,0.1)] border-l-[4px] border-l-[#00e6e6] cursor-pointer">
              <h3 className="font-bold text-white text-[13px]">Tech Expo</h3>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">Saturday at 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
