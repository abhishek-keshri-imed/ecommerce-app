import React, { useState, useEffect, useRef } from "react";

const AdminLiveChat = () => {
  const initialUsers = [
    {
      id: 1,
      name: "Arjun Sharma",
      status: "online",
      messages: [
        {
          id: 1,
          text: "Is my order ready?",
          sender: "user",
          time: "2:00 PM",
          date: "Jan 29, 2026",
        },
        {
          id: 2,
          text: "Yes, it is being packed.",
          sender: "admin",
          time: "2:05 PM",
          date: "Jan 29, 2026",
        },
        {
          id: 3,
          text: "Thank You",
          sender: "user",
          time: "2:08 PM",
          date: "Jan 29, 2026",
        },
        {
          id: 4,
          text: "Welcome",
          sender: "admin",
          time: "1:05 PM",
          date: "Jan 31, 2026",
        },
        {
          id: 5,
          text: "Is my order ready?",
          sender: "user",
          time: "2:00 PM",
          date: "Feb 28, 2026",
        },
        {
          id: 6,
          text: "Yes, it is being packed.",
          sender: "admin",
          time: "2:05 PM",
          date: "Mar 29, 2026",
        },
        {
          id: 7,
          text: "Thank You",
          sender: "user",
          time: "2:08 PM",
          date: "Mar 29, 2026",
        },
        {
          id: 8,
          text: "Welcome",
          sender: "admin",
          time: "1:05 PM",
          date: "Mar 31, 2026",
        },
        {
          id: 9,
          text: "Yes, it is being packed.",
          sender: "admin",
          time: "2:05 PM",
          date: "Apr 29, 2026",
        },
        {
          id: 10,
          text: "Thank You",
          sender: "user",
          time: "2:08 PM",
          date: "Apr 29, 2026",
        },
        {
          id: 11,
          text: "Welcome",
          sender: "admin",
          time: "1:05 PM",
          date: "Apr 31, 2026",
        },
      ],
    },
    {
      id: 2,
      name: "Sneha Verma",
      status: "offline",
      messages: [
        {
          id: 1,
          text: "Thank you for the fast delivery!",
          sender: "user",
          time: "1:45 PM",
          date: "Jan 29, 2026",
        },
      ],
    },
    {
      id: 3,
      name: "Vikram Gupta",
      status: "online",
      messages: [
        {
          id: 1,
          text: "I need help with a return.",
          sender: "user",
          time: "1:30 PM",
          date: "Jan 28, 2026",
        },
      ],
    },
  ];

  const extraNames = [
    "Priya",
    "Amit",
    "Anjali",
    "Rohan",
    "Ishita",
    "Suresh",
    "Meera",
    "Rahul",
    "Kavita",
    "Aditya",
    "Pooja",
    "Manish",
    "Sonia",
    "Deepak",
    "Neha",
    "Sunil",
    "Tanya",
  ];
  const extraUsers = extraNames.map((name, index) => ({
    id: index + 4,
    name: `${name} ${index % 2 === 0 ? "Singh" : "Reddy"}`,
    status: index % 3 === 0 ? "online" : "offline",
    messages: [
      {
        id: 1,
        text: "Hello, I have a query about the stock.",
        sender: "user",
        time: "10:00 AM",
        date: "Jan 29, 2026",
      },
    ],
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
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: "Jan 29, 2026",
    };
    setUsers((prev) =>
      prev.map((u) =>
        u.id === activeChatId
          ? { ...u, messages: [...u.messages, newMessage] }
          : u,
      ),
    );
    setInputText("");
  };

  return (
    <div className="flex w-full bg-transparent font-sans overflow-hidden py-3">
      {/* FIX: h-[calc(100vh-140px)] "pops" the chat up. 
         Adjust the 140px if you need it higher or lower.
      */}
      <div className="flex w-full max-w-7xl mx-auto bg-white shadow-2xl overflow-hidden h-[calc(100vh-130px)] md:rounded-1xl border border-gray-200">
        {/* --- SIDEBAR --- */}
        <div
          className={`${activeChatId ? "hidden" : "flex"} md:flex w-full md:w-80 lg:w-96 border-r flex-col bg-white`}
        >
          <div className="p-4 border-b shrink-0 bg-white">
            <h2 className="text-xl font-bold text-gray-800">Messages</h2>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full mt-3 bg-gray-100 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setActiveChatId(user.id)}
                className={`p-4 border-b cursor-pointer flex items-center gap-3 transition-colors ${activeChatId === user.id ? "bg-blue-50 border-l-4 border-l-blue-600" : "hover:bg-gray-50"}`}
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name[0]}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                  ></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate text-sm">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.messages[user.messages.length - 1].text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- CHAT WINDOW --- */}
        <div
          className={`${!activeChatId ? "hidden" : "flex"} flex-1 md:flex flex-col bg-[#F0F2F5] h-full`}
        >
          {activeChat ? (
            <>
              {/* Header */}
              <div className="p-3 border-b bg-white flex items-center gap-3 shrink-0 shadow-sm">
                <button
                  onClick={() => setActiveChatId(null)}
                  className="md:hidden text-blue-600 p-2"
                >
                  ←
                </button>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {activeChat.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm leading-none">
                    {activeChat.name}
                  </h3>
                  <span className="text-[10px] text-green-500 font-bold uppercase">
                    {activeChat.status}
                  </span>
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 custom-scrollbar bg-[#F0F2F5]"
              >
                {activeChat.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === "admin" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`p-2.5 rounded-lg shadow-sm max-w-[85%] text-sm ${msg.sender === "admin" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none"}`}
                    >
                      {msg.text}
                      <div className="text-[9px] mt-1 text-right opacity-70">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area (Visible now) */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white border-t shrink-0"
              >
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1 border focus-within:border-blue-400 transition-all">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none outline-none py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="text-blue-600 hover:scale-110 transition-transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 hidden md:flex items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AdminLiveChat;
