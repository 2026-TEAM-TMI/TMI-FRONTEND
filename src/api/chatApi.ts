import type { ChatRoom, ChatMessage } from "../types/chat";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function getChatRooms(): Promise<ChatRoom[]> {
  // TODO: GET ${BASE}/chat/rooms
  void BASE;
  throw new Error("Not implemented");
}

export async function getMessages(roomId: number): Promise<ChatMessage[]> {
  // TODO: GET ${BASE}/chat/rooms/{roomId}/messages
  void BASE;
  return [];
}

export async function sendMessage(
  _roomId: number,
  _content: string
): Promise<ChatMessage> {
  // TODO: POST ${BASE}/chat/rooms/{roomId}/messages { content }
  void BASE;
  throw new Error("Not implemented");
}
