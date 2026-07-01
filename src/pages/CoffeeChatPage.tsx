// src/pages/CoffeeChatPage.tsx
import { useNavigate } from "react-router-dom";
import NavTabs from "../components/layout/NavTabs";
import ChatRoomList from "../components/coffeechat/ChatRoomList";
import ChatWindow from "../components/coffeechat/ChatWindow";
import ChatSidebarProfile from "../components/coffeechat/ChatSidebarProfile";
import { useChat } from "../hooks/useChat";

export default function CoffeeChatPage() {
  const navigate = useNavigate();
  const { rooms, selectedRoom, activeRoom, messages, inputVal, setSelectedRoom, onInputChange, onSend } = useChat();

  return (
    <div className="min-h-svh bg-[#f0f2f8] font-sans flex flex-col">
      <NavTabs />
      <div
        className="flex flex-1 w-full max-w-7xl mx-auto px-6 py-5 gap-4 h-[calc(100svh-64px)] box-border"
      >
        <ChatRoomList rooms={rooms} selectedIndex={selectedRoom} onSelect={setSelectedRoom} />

        <ChatWindow
          room={activeRoom}
          messages={messages}
          inputVal={inputVal}
          onInputChange={onInputChange}
          onSend={onSend}
          onViewPortfolio={() => navigate("/portfolio/masterpieces")}
        />

        <ChatSidebarProfile
          room={activeRoom}
          onViewPortfolio={() => navigate("/portfolio/masterpieces")}
          onViewAnalysis={() => navigate("/portfolio/analysis")}
        />
      </div>
    </div>
  );
}
