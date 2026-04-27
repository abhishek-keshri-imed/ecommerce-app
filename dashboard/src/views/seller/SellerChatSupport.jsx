import React, { useState, useEffect, useRef } from "react";

const SellerChatSupport = () => {
  const initialadmins = [
    {
      id: 1,
      name: "Pawan Singhania",
      status: "online",
      unreadCount: 2,
      messages: [
        {
          id: 1,
          text: "Is my order ready?",
          sender: "admin",
          time: "2:00 PM",
          date: "Jan 29, 2026",
        },
      ],
    },
    {
      id: 3,
      name: "Ram Singh",
      status: "offline",
      unreadCount: 0,
      isResolved: false,
      messages: [], // Keeping this empty as requested
    },
  ];

  const [admins, setadmins] = useState([...initialadmins]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef(null);

  const activeChat = admins.find((u) => u.id === activeChatId);
  const filteredadmins = admins.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "seller",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "Feb 1, 2026",
    };
    setadmins((prev) =>
      prev.map((u) =>
        u.id === activeChatId
          ? { ...u, messages: [...u.messages, newMessage] }
          : u,
      ),
    );
    setInputText("");
  };

  const toggleResolved = (id) => {
    setadmins((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isResolved: !u.isResolved } : u)),
    );
  };

  return (
    <div className="mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative px-4 lg:px-7 pb-4 font-sans">
      <div className="flex w-full h-full mt-5 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* --- SIDEBAR --- */}
        <div
          className={`${activeChatId ? "hidden" : "flex"} md:flex w-full md:w-80 lg:w-96 border-r border-gray-100 flex-col bg-white`}
        >
          <div className="p-6 border-b border-gray-50 shrink-0">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Support Chats
            </h2>
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search admins..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredadmins.map((admin) => {
              // Helper to safely get the last message
              const lastMsg =
                admin.messages.length > 0
                  ? admin.messages[admin.messages.length - 1]
                  : null;

              return (
                <div
                  key={admin.id}
                  onClick={() => setActiveChatId(admin.id)}
                  className={`p-4 border-b border-gray-50 cursor-pointer flex items-center gap-4 transition-all ${
                    activeChatId === admin.id
                      ? "bg-indigo-50/50 border-l-4 border-l-indigo-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">
                      {admin.name[0]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-gray-800 truncate text-sm">
                        {admin.name}
                      </p>
                      {/* FIX 1: Only show time if a message exists */}
                      <span className="text-[10px] text-gray-400 font-medium">
                        {lastMsg ? lastMsg.time : ""}
                      </span>
                    </div>
                    {/* FIX 2: Fallback text if no messages exist */}
                    <p className="text-xs text-gray-500 truncate mt-0.5 font-medium flex items-center gap-2">
                      {admin.isResolved && (
                        <span className="text-green-500 text-[10px] font-bold uppercase">
                          Resolved
                        </span>
                      )}
                      {lastMsg ? lastMsg.text : "No conversations yet"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- CHAT WINDOW --- */}
        <div
          className={`${!activeChatId ? "hidden" : "flex"} flex-1 md:flex flex-col bg-gray-50/30 h-full`}
        >
          {activeChat ? (
            <>
              <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveChatId(null)}
                    className="md:hidden text-indigo-600 font-bold p-2"
                  >
                    Back
                  </button>
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {activeChat.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">
                      {activeChat.name}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                      {activeChat.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleResolved(activeChat.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${activeChat.isResolved ? "bg-green-50 text-green-600 border-green-200" : "bg-white text-gray-500 border-gray-200"}`}
                >
                  {activeChat.isResolved ? "✓ Resolved" : "Mark as Resolved"}
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar"
              >
                {/* FIX 3: Empty state inside the message area */}
                {activeChat.messages.length > 0 ? (
                  activeChat.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.sender === "seller" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[75%] p-3.5 rounded-2xl text-sm shadow-sm ${msg.sender === "seller" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"}`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] mt-1.5 font-bold text-gray-400 px-1">
                        {msg.time}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                    <p className="text-sm font-bold uppercase tracking-widest">
                      No messages yet
                    </p>
                    <p className="text-xs">Start the conversation below</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 bg-transparent border-none outline-none py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 hidden md:flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
              <p className="font-bold text-sm uppercase tracking-widest text-gray-300">
                Select a support conversation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerChatSupport;
