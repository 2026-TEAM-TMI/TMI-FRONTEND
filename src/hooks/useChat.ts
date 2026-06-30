import { useChatStore, ROOMS, MESSAGES_BY_ROOM } from "../store/chatStore";

export function useChat() {
  const { selectedRoom, inputByRoom, setSelectedRoom, setInput } = useChatStore();
  const activeRoom = ROOMS[selectedRoom];
  const messages = MESSAGES_BY_ROOM[activeRoom.id] ?? [];
  const inputVal = inputByRoom[activeRoom.id] ?? "";

  const handleSend = () => {
    if (inputVal.trim()) setInput(activeRoom.id, "");
  };

  return {
    rooms: ROOMS,
    selectedRoom,
    activeRoom,
    messages,
    inputVal,
    setSelectedRoom,
    onInputChange: (v: string) => setInput(activeRoom.id, v),
    onSend: handleSend,
  };
}
