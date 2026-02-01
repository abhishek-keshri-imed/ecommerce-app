import React, { useState, useEffect, useRef } from "react";

const AdminLiveChat = () => {
  // ... (initialUsers and extraUsers logic remains the same)
  const initialUsers = [
    {
      id: 1,
      name: "Arjun Sharma",
      status: "online",
      messages: [
        { id: 1, text: "Is my order ready?", sender: "user", time: "2:00 PM", date: "Jan 29, 2026" },
        { id: 2, text: "Yes, it is being packed.", sender: "admin", time: "2:05 PM", date: "Jan 29, 2026" },
        { id: 3, text: "Thank You", sender: "user", time: "2:08 PM", date: "Jan 29, 2026" },
      ],
    },
    {
        id: 2,
        name: "Sneha Verma",
        status: "offline",
        messages: [{ id: 1, text: "Thank you for the fast delivery!", sender: "user", time: "1:45 PM", date: "Jan 29, 2026" }],
    }
  ];

  const extraNames = ["Priya", "Amit", "Anjali", "Rohan", "Ishita", "Suresh", "Meera", "Rahul", "Kavita"];
  const extraUsers = extraNames.map((name, index) => ({
    id: index + 4,
    name: `${name} ${index % 2 === 0 ? "Singh" : "Reddy"}`,
    status: index % 3 === 0 ? "online" : "offline",
    messages: [{ id: 1, text: "Hello, I have a query about the stock.", sender: "user", time: "10:00 AM", date: "Jan 29, 2026" }],
  }));

  const [users, setUsers] = useState([...initialUsers, ...extraUsers]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef(null);

  const activeChat = users.find((u) => u.id === activeChatId);
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "admin",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: "Feb 1, 2026",
    };
    setUsers((prev) =>
      prev.map((u) =>
        u.id === activeChatId ? { ...u, messages: [...u.messages, newMessage] } : u,
      ),
    );
    setInputText("");
  };

  return (
    <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative px-4 lg:px-7 pb-4'>
      
      {/* Main Chat Container */}
      <div className="flex w-full h-full mt-5 bg-white rounded-1xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* --- SIDEBAR --- */}
        <div className={`${activeChatId ? "hidden" : "flex"} md:flex w-full md:w-80 lg:w-96 border-r border-gray-100 flex-col bg-white`}>
          <div className="p-6 border-b border-gray-50 shrink-0 bg-white">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Messages</h2>
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search sellers..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setActiveChatId(user.id)}
                className={`p-4 border-b border-gray-50 cursor-pointer flex items-center gap-4 transition-all ${
                  activeChatId === user.id ? "bg-indigo-50/50 border-l-4 border-l-indigo-600" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">
                    {user.name[0]}
                  </div>
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-300"}`}></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-bold text-gray-800 truncate text-sm">{user.name}</p>
                    <span className="text-[10px] text-gray-400 font-medium">2:00 PM</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5 font-medium">
                    {user.messages[user.messages.length - 1].text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CHAT WINDOW --- */}
        <div className={`${!activeChatId ? "hidden" : "flex"} flex-1 md:flex flex-col bg-gray-50/30 h-full`}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center gap-4 shrink-0 shadow-sm z-10">
                <button
                  onClick={() => setActiveChatId(null)}
                  className="md:hidden text-indigo-600 font-bold p-2 hover:bg-indigo-50 rounded-lg"
                >
                  Back
                </button>
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {activeChat.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">{activeChat.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${activeChat.status === "online" ? "bg-green-500" : "bg-gray-300"}`}></div>
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{activeChat.status}</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar"
              >
                {activeChat.messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === "admin" ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                        msg.sender === "admin" 
                        ? "bg-indigo-600 text-white rounded-tr-none" 
                        : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] mt-1.5 font-bold text-gray-400 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100 focus-within:border-indigo-400 focus-within:bg-white transition-all shadow-inner">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-gray-700"
                  />
                  <button type="submit" className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 hover:scale-105 transition-all shadow-lg shadow-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 hidden md:flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.855-1.246L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="font-bold text-sm uppercase tracking-widest text-gray-300">Select a seller conversation</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default AdminLiveChat;