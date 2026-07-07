export interface SkillItem {
  label: string;
  value: number; // 0–1
}

export interface ChatMessage {
  id: number;
  isMe: boolean;
  text: string;
  time: string;
}

export interface ChatRoom {
  id: number;
  // GET /api/v1/portfolios/{memberId} 조회용. 채팅 API 연동 전까지는 목업 값
  memberId: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  color: string;
  lastMsg: string;
  time: string;
  unread: number;
  matchScore: number;
  bio: string;
  skills: SkillItem[];
}
