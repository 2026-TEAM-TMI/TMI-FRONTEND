import { create } from "zustand";
import type { ChatRoom, ChatMessage } from "../types/chat";

export const ROOMS: ChatRoom[] = [
  {
    id: 1, name: "Elena Vane", role: "AI 엔지니어", company: "Nebula Systems",
    avatar: "E", color: "#6347d1", lastMsg: "Would you be interested in joining?",
    time: "2m", unread: 2, matchScore: 89,
    bio: "생성형 AI 파이프라인 설계 전문. LLM fine-tuning & 프로덕션 배포 경험 3년.",
    skills: [
      { label: "알고리즘", value: 0.85 }, { label: "시스템 설계", value: 0.9 },
      { label: "ML 모델링", value: 0.95 }, { label: "API 설계", value: 0.78 },
      { label: "협업/Git", value: 0.82 }, { label: "문서화", value: 0.7 },
    ],
  },
  {
    id: 2, name: "Caleb Turner", role: "백엔드 리드", company: "Nebula Lab",
    avatar: "C", color: "#8127cf", lastMsg: "Great portfolio! Let's chat.",
    time: "1h", unread: 0, matchScore: 76,
    bio: "분산 시스템 & 고가용성 아키텍처. Kafka·Redis 기반 대용량 트래픽 처리 전문.",
    skills: [
      { label: "알고리즘", value: 0.9 }, { label: "시스템 설계", value: 0.95 },
      { label: "DB / SQL", value: 0.88 }, { label: "API 설계", value: 0.8 },
      { label: "협업/Git", value: 0.75 }, { label: "문서화", value: 0.65 },
    ],
  },
  {
    id: 3, name: "Maya Sterling", role: "프론트엔드 개발자", company: "Polis Studio",
    avatar: "M", color: "#4b2ab8", lastMsg: "How was your time at Polis?",
    time: "3h", unread: 1, matchScore: 82,
    bio: "React·TypeScript 기반 복잡한 상태 관리 & 성능 최적화 전문. WebGL 경험 보유.",
    skills: [
      { label: "React/TS", value: 0.95 }, { label: "성능 최적화", value: 0.85 },
      { label: "UI 설계", value: 0.88 }, { label: "상태 관리", value: 0.9 },
      { label: "협업/Git", value: 0.8 }, { label: "테스팅", value: 0.72 },
    ],
  },
  {
    id: 4, name: "Jin Park", role: "풀스택 엔지니어", company: "Cupoli Lab",
    avatar: "J", color: "#0d6efd", lastMsg: "Loved your Nebula OS project!",
    time: "1d", unread: 0, matchScore: 71,
    bio: "Node.js·Next.js 풀스택. 스타트업 초기 멤버로 제품 전반 설계·개발 경험.",
    skills: [
      { label: "Node.js", value: 0.82 }, { label: "프론트엔드", value: 0.78 },
      { label: "DB / SQL", value: 0.75 }, { label: "API 설계", value: 0.85 },
      { label: "협업/Git", value: 0.88 }, { label: "문서화", value: 0.8 },
    ],
  },
];

export const MESSAGES_BY_ROOM: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, isMe: false, text: "Hi! I saw your portfolio — the AI pipeline project is incredible.", time: "10:24 AM" },
    { id: 2, isMe: true, text: "감사합니다! LangChain 기반으로 3개월 작업했어요.", time: "10:26 AM" },
    { id: 3, isMe: false, text: "프로덕션 트래픽은 어떻게 핸들링하셨나요?", time: "10:28 AM" },
    { id: 4, isMe: true, text: "Ray Serve + Redis 캐싱으로 p99 지연을 80ms 이하로 유지했어요.", time: "10:30 AM" },
    { id: 5, isMe: false, text: "Would you be interested in joining our team at Nebula Systems?", time: "10:32 AM" },
  ],
  2: [
    { id: 1, isMe: false, text: "Great portfolio! Let's chat about your backend experience.", time: "9:00 AM" },
    { id: 2, isMe: true, text: "물론이죠! 어떤 부분이 궁금하신가요?", time: "9:05 AM" },
  ],
  3: [
    { id: 1, isMe: false, text: "How was your time at Polis Design Studio?", time: "7:30 AM" },
    { id: 2, isMe: true, text: "정말 좋았어요. 협업 문화가 훌륭했습니다.", time: "7:35 AM" },
    { id: 3, isMe: false, text: "저도 지원을 고민 중인데 팁을 주실 수 있을까요?", time: "7:40 AM" },
  ],
  4: [
    { id: 1, isMe: false, text: "Loved your Nebula OS project!", time: "Yesterday" },
    { id: 2, isMe: true, text: "감사합니다 :)", time: "Yesterday" },
  ],
};

interface ChatState {
  selectedRoom: number;
  inputByRoom: Record<number, string>;
  setSelectedRoom: (i: number) => void;
  setInput: (roomId: number, val: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  selectedRoom: 0,
  inputByRoom: {},
  setSelectedRoom: (i) => set({ selectedRoom: i }),
  setInput: (roomId, val) =>
    set((state) => ({ inputByRoom: { ...state.inputByRoom, [roomId]: val } })),
}));
