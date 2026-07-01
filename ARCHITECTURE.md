# TMI Frontend — 프로젝트 구조 문서

> **프로젝트명**: Cupoli (TMI-FRONTEND)
> **스택**: React 19 · TypeScript 6 · Tailwind CSS 4 · Zustand 5 · Vite 8
> **최종 업데이트**: 2026-07-01

---

## 목차

1. [기술 스택](#1-기술-스택)
2. [디렉토리 구조](#2-디렉토리-구조)
3. [라우팅 아키텍처](#3-라우팅-아키텍처)
4. [상태 관리](#4-상태-관리)
5. [API 레이어](#5-api-레이어)
6. [파일별 역할 상세](#6-파일별-역할-상세)
   - [components/common](#componentsc ommon--범용-ui-원자-컴포넌트)
   - [components/layout](#componentslayout--레이아웃)
   - [components/auth](#componentsauth--인증-ui)
   - [components/dashboard](#componentsdashboard--대시보드-위젯)
   - [components/builder](#componentsbuilder--포트폴리오-빌더)
   - [components/portfolio](#componentsportfolio--포트폴리오-뷰)
   - [components/analysis](#componentsanalysis--ai-분석)
   - [components/coffeechat](#componentscoffeechat--채팅)
   - [pages](#pages--라우트-단위-페이지)
   - [store](#store--전역-상태-zustand)
   - [hooks](#hooks--커스텀-훅)
   - [types](#types--타입-정의)
   - [api](#api--서버-통신-스켈레톤)
7. [스타일 가이드](#7-스타일-가이드)
8. [데이터 플로우](#8-데이터-플로우)
9. [백엔드 연동 가이드](#9-백엔드-연동-가이드)

---

## 1. 기술 스택

| 항목 | 버전 | 용도 |
|---|---|---|
| React | 19 | UI 렌더링 |
| TypeScript | 6 | 타입 안전성 |
| Tailwind CSS | 4 | 유틸리티 스타일링 |
| Zustand | 5 | 전역 상태 관리 + 커스텀 라우팅 |
| Vite | 8 | 번들러 / 개발 서버 |
| react-router-dom | 7 | (설치됨, 미사용 — 추후 전환 가능) |
| oxlint | — | 린트 |

---

## 2. 디렉토리 구조

```
src/
├── api/                        # 서버 통신 함수 (axios 스켈레톤)
│   ├── authApi.ts
│   ├── portfolioApi.ts
│   ├── chatApi.ts
│   └── analysisApi.ts
│
├── assets/
│   ├── images/                 # hero.png 등 이미지
│   └── icons/                  # SVG 아이콘
│
├── components/
│   ├── common/                 # 원자 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx           # TextInput + Textarea named export
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ProgressBar.tsx
│   │
│   ├── layout/                 # 레이아웃
│   │   ├── Header.tsx
│   │   ├── NavTabs.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx       # 로그인 전체 폼
│   │   ├── SocialLoginButton.tsx
│   │   └── AuthFooterLinks.tsx
│   │
│   ├── dashboard/
│   │   ├── WelcomeBanner.tsx
│   │   ├── StatCard.tsx
│   │   ├── PortfolioListItem.tsx
│   │   └── CreatePortfolioCard.tsx
│   │
│   ├── builder/
│   │   ├── BuilderStepper.tsx
│   │   ├── GithubConnectStep.tsx   # Step 1
│   │   ├── ExtraExperienceStep.tsx # Step 2 컨테이너
│   │   ├── AwardsSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── FinishStep.tsx          # Step 3
│   │   ├── VisibilitySettings.tsx
│   │   └── PublishingProgress.tsx
│   │
│   ├── portfolio/
│   │   ├── PortfolioCard.tsx
│   │   ├── PortfolioGrid.tsx
│   │   ├── PortfolioFilterTabs.tsx
│   │   ├── ProfileSummary.tsx
│   │   ├── SkillRadarChart.tsx
│   │   ├── MasterpieceCard.tsx
│   │   └── RequestCoffeeChatButton.tsx
│   │
│   ├── analysis/
│   │   ├── MatchingResultCard.tsx
│   │   ├── SkillAnalysisChart.tsx
│   │   ├── AnalysisInsight.tsx
│   │   ├── ImprovementInsightCard.tsx
│   │   └── ScoreCircle.tsx
│   │
│   └── coffeechat/
│       ├── ChatRoomList.tsx
│       ├── ChatRoomItem.tsx
│       ├── ChatWindow.tsx
│       ├── ChatBubble.tsx
│       ├── ChatInput.tsx
│       └── ChatSidebarProfile.tsx
│
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── PortfolioFeedPage.tsx
│   ├── PortfolioDetailPage.tsx
│   ├── PortfolioMasterpiecesPage.tsx
│   ├── PortfolioPreviewPage.tsx
│   ├── PortfolioAnalysisPage.tsx
│   ├── PortfolioFeedbackPage.tsx
│   ├── CoffeeChatPage.tsx
│   └── builder/
│       ├── BuilderStep1Page.tsx
│       ├── BuilderStep2Page.tsx
│       ├── BuilderStep3Page.tsx
│       └── PublishingProgressPage.tsx
│
├── routes/
│   └── AppRouter.tsx           # switch 기반 라우터
│
├── hooks/
│   ├── useAuth.ts
│   ├── useBuilderStep.ts
│   └── useChat.ts
│
├── store/
│   ├── authStore.ts            # 라우팅 + 인증 상태 겸용
│   ├── builderStore.ts
│   └── chatStore.ts
│
├── types/
│   ├── user.ts
│   ├── portfolio.ts
│   ├── chat.ts
│   └── analysis.ts
│
├── styles/
│   └── globals.css
│
├── App.tsx
└── main.tsx
```

---

## 3. 라우팅 아키텍처

React Router를 사용하지 않고 **Zustand 기반 커스텀 라우팅**을 사용합니다.

```ts
// store/authStore.ts
type AppRoute =
  | "login" | "dashboard"
  | "builder-step1" | "builder-step2" | "builder-step3" | "publishing"
  | "portfolio-preview" | "portfolio-feed" | "portfolio-masterpieces"
  | "portfolio-detail" | "portfolio-analysis" | "portfolio-feedback"
  | "coffee-chat";
```

```ts
// routes/AppRouter.tsx — switch로 현재 route에 맞는 page 렌더
switch (currentRoute) {
  case "login":     return <LoginPage />;
  case "dashboard": return <DashboardPage />;
  // ...
}
```

**페이지 이동**은 어디서든 `navigate()` 함수 하나로 처리합니다.

```ts
const navigate = useAuthStore((s) => s.navigate);
navigate("dashboard");
```

> **참고**: `react-router-dom`이 설치돼 있어 추후 URL 기반 라우팅으로 마이그레이션 가능합니다.

---

## 4. 상태 관리

### authStore

```ts
// 라우팅 + 인증 상태 겸용
{
  currentRoute: AppRoute       // 현재 페이지
  navigate(route): void        // 페이지 이동

  user: User | null            // 로그인한 유저 정보
  token: string | null         // 인증 토큰
  isLoggedIn: boolean

  setUser(user): void
  setToken(token): void
  logout(): void               // 상태 초기화 + "login"으로 이동
}
```

### builderStore

```ts
// Builder 전 단계의 폼 데이터 유지
{
  githubId, selectedCategory,
  repos: RepoEntry[]           // CRUD: addRepo / removeRepo / updateRepo
  awards: Award[]              // CRUD: addAward / removeAward / updateAward
  educations: Education[]      // CRUD: addEducation / removeEducation / updateEducation
  direction, tags, selectedStyle, customStyleDesc,
  visibility: "public" | "private"
}
```

### chatStore

```ts
// 채팅 상태 + mock 데이터
{
  selectedRoom: number | null
  inputByRoom: Record<number, string>
  setSelectedRoom(id): void
  setInput(roomId, value): void
  sendMessage(roomId): void    // mock: store 내부에 메시지 추가
}
// ROOMS, MESSAGES_BY_ROOM — mock 데이터 상수로 export
```

---

## 5. API 레이어

`src/api/` 폴더에 함수 시그니처만 정의된 스켈레톤입니다.  
백엔드 엔드포인트가 준비되면 각 함수 내부의 `// TODO` 부분을 채웁니다.

```ts
// 환경변수 설정 (.env)
VITE_API_BASE_URL=https://api.example.com
```

### authApi.ts

| 함수 | 메서드 | 설명 |
|---|---|---|
| `loginWithEmail(email, password)` | POST `/auth/login` | 이메일 로그인 |
| `loginWithGoogle()` | POST `/auth/google` | Google OAuth |
| `signUp(email, password, name)` | POST `/auth/signup` | 회원가입 |

### portfolioApi.ts

| 함수 | 메서드 | 설명 |
|---|---|---|
| `getPortfolioFeed(category?)` | GET `/portfolios` | 피드 목록 |
| `getPortfolioDetail(id)` | GET `/portfolios/:id` | 상세 조회 |
| `createPortfolio(data)` | POST `/portfolios` | 생성 |
| `deletePortfolio(id)` | DELETE `/portfolios/:id` | 삭제 |

### chatApi.ts

| 함수 | 메서드 | 설명 |
|---|---|---|
| `getChatRooms()` | GET `/chat/rooms` | 채팅방 목록 |
| `getMessages(roomId)` | GET `/chat/rooms/:id/messages` | 메시지 조회 |
| `sendMessage(roomId, content)` | POST `/chat/rooms/:id/messages` | 전송 |

### analysisApi.ts

| 함수 | 메서드 | 설명 |
|---|---|---|
| `getMatchingJobs(portfolioId)` | GET `/analysis/:id/matching` | 매칭 직무 |
| `getFeedback(portfolioId)` | GET `/analysis/:id/feedback` | 개선점 |
| `getAnalysis(portfolioId)` | GET `/analysis/:id` | 종합 분석 |

---

## 6. 파일별 역할 상세

### components/common — 범용 UI 원자 컴포넌트

| 파일 | 줄수 | Props | 역할 |
|---|---|---|---|
| `Button.tsx` | 46 | `variant(primary/secondary/ghost)`, `size(sm/md/lg)`, `fullWidth` | 재사용 버튼 |
| `Input.tsx` | 44 | `label?`, `error?` + HTML input 속성 | `TextInput` / `Textarea` named export |
| `Avatar.tsx` | 23 | `letter`, `color`, `size?`, `fontSize?` | 원형 이니셜 아바타 |
| `Badge.tsx` | 19 | `children`, `color?` | 알약형 태그 |
| `Card.tsx` | 18 | HTML div 속성 + `hover?` | 흰 배경 + 그림자 래퍼 |
| `Modal.tsx` | 40 | `isOpen`, `onClose`, `children`, `title?` | `createPortal` 오버레이 |
| `ProgressBar.tsx` | 51 | `value(0-1)`, `label?`, `accentColor?`, `height?` | 진행률 바 |

### components/layout — 레이아웃

| 파일 | 줄수 | Props | 역할 |
|---|---|---|---|
| `Header.tsx` | 36 | `user?: User` | Cupoli 로고 + Avatar 우측 배치 |
| `NavTabs.tsx` | 59 | 없음 (authStore 직접 구독) | Dashboard/Builder/Feed/CoffeeChat 탭 |
| `Sidebar.tsx` | 52 | `currentRoute`, `onNavigate` | 좌측 수직 네비게이션 (필요시 사용) |
| `Footer.tsx` | 7 | 없음 | © 2024 Cupoli Crafting Labs |

### components/auth — 인증 UI

| 파일 | 줄수 | Props | 역할 |
|---|---|---|---|
| `LoginForm.tsx` | 95 | `onGoogleLogin()` | 로고 + 카드 + Google 버튼 + 풋터 링크 조합 |
| `SocialLoginButton.tsx` | 50 | `onClick()`, `disabled?` | Google SVG 아이콘 버튼 |
| `AuthFooterLinks.tsx` | 36 | `onFindAccount?`, `onResetPassword?`, `onSignUp?` | 3개 텍스트 링크 |

### components/dashboard — 대시보드 위젯

| 파일 | 줄수 | Props | 역할 |
|---|---|---|---|
| `WelcomeBanner.tsx` | 27 | 없음 | 보라색 그라디언트 배너 |
| `StatCard.tsx` | 25 | `label`, `value`, `icon?`, `change?` | 단일 통계 카드 |
| `PortfolioListItem.tsx` | 47 | `PortfolioListItem` 타입 | 제목 + 태그 + 상태 리스트 아이템 |
| `CreatePortfolioCard.tsx` | 22 | `count`, `onCreate()` | 점선 "+ 새 포트폴리오" 카드 |

### components/builder — 포트폴리오 빌더

| 파일 | 줄수 | 역할 |
|---|---|---|
| `BuilderStepper.tsx` | 51 | 1-2-3 진행 표시, `currentStep` prop |
| `GithubConnectStep.tsx` | 197 | Step1 — GitHub ID / 카테고리 / 레포 CRUD |
| `ExtraExperienceStep.tsx` | 42 | Step2 컨테이너 — AwardsSection + EducationSection 위임 |
| `AwardsSection.tsx` | 88 | 수상 경력 CRUD 폼 |
| `EducationSection.tsx` | 88 | 교육/부트캠프 CRUD 폼 |
| `FinishStep.tsx` | 134 | Step3 — 방향성 / 태그 / 스타일 입력 |
| `VisibilitySettings.tsx` | 36 | Public / Private 라디오 선택 |
| `PublishingProgress.tsx` | 63 | 퍼블리싱 로딩 애니메이션 |

### components/portfolio — 포트폴리오 뷰

| 파일 | 줄수 | 역할 |
|---|---|---|
| `PortfolioCard.tsx` | 91 | Feed 카드 — 아바타/이름/직무/태그/Coffee Chat 버튼 |
| `PortfolioGrid.tsx` | 23 | PortfolioCard 반응형 그리드 컨테이너 |
| `PortfolioFilterTabs.tsx` | 28 | ALL / AI / 백엔드 / 프론트엔드 필터 탭 |
| `ProfileSummary.tsx` | 77 | 상세 좌측 — 아바타/이름/직함/소개/Coffee Chat |
| `SkillRadarChart.tsx` | 75 | SVG 육각형 레이더 차트 |
| `MasterpieceCard.tsx` | 46 | 작품 카드 — 그라디언트 배경/좋아요/댓글 수 |
| `RequestCoffeeChatButton.tsx` | 14 | Button 래핑, 여러 페이지 재사용 |

### components/analysis — AI 분석

| 파일 | 줄수 | 역할 |
|---|---|---|
| `MatchingResultCard.tsx` | 58 | 회사/직무/매칭률/이유/갭 카드 |
| `SkillAnalysisChart.tsx` | 41 | 내 스킬 vs 평균 바 차트 비교 |
| `AnalysisInsight.tsx` | 45 | AI 코멘트 텍스트 박스 + 성과 통계 |
| `ImprovementInsightCard.tsx` | 35 | Critical/High/Medium 심각도별 개선점 |
| `ScoreCircle.tsx` | 25 | SVG stroke-dasharray 원형 점수 게이지 |

### components/coffeechat — 채팅

| 파일 | 줄수 | 역할 |
|---|---|---|
| `ChatRoomList.tsx` | 33 | 채팅방 목록 컨테이너 |
| `ChatRoomItem.tsx` | 45 | 아바타/이름/마지막 메시지/안읽음 뱃지 |
| `ChatWindow.tsx` | 61 | 중앙 채팅창 — 메시지 목록 + 입력창 |
| `ChatBubble.tsx` | 38 | 개별 말풍선, 내/상대 방향 분기 |
| `ChatInput.tsx` | 33 | 메시지 입력창 + 전송 버튼 |
| `ChatSidebarProfile.tsx` | 99 | 우측 상대방 프로필 + 레이더 차트 + 스킬 바 |

### pages — 라우트 단위 페이지

| 파일 | 줄수 | 역할 |
|---|---|---|
| `LoginPage.tsx` | 48 | 배경 orbs + `LoginForm` wrapper |
| `DashboardPage.tsx` | 46 | NavTabs + WelcomeBanner + StatCard×3 + 포트폴리오 목록 |
| `PortfolioFeedPage.tsx` | 50 | 필터탭 + PortfolioGrid |
| `PortfolioDetailPage.tsx` | 192 | 프로필 + 레이더차트 + Masterpiece 그리드 |
| `PortfolioMasterpiecesPage.tsx` | 52 | 작품 전체 목록 |
| `PortfolioPreviewPage.tsx` | 198 | 포트폴리오 미리보기 |
| `PortfolioAnalysisPage.tsx` | 283 | 레이더차트 + 매칭 목록 + AI 인사이트 |
| `PortfolioFeedbackPage.tsx` | 227 | ScoreCircle + ImprovementInsightCard 목록 |
| `CoffeeChatPage.tsx` | 38 | ChatRoomList + ChatWindow + ChatSidebarProfile 3단 |
| `builder/BuilderStep1Page.tsx` | 53 | BuilderStepper + GithubConnectStep |
| `builder/BuilderStep2Page.tsx` | 53 | BuilderStepper + ExtraExperienceStep |
| `builder/BuilderStep3Page.tsx` | 76 | BuilderStepper + FinishStep + VisibilitySettings |
| `builder/PublishingProgressPage.tsx` | 196 | 퍼블리싱 로딩 + 완료 자동 라우팅 |

### store — 전역 상태 (Zustand)

| 파일 | 줄수 | 역할 |
|---|---|---|
| `authStore.ts` | 39 | 라우팅 + 인증(`user/token/isLoggedIn`) 겸용 |
| `builderStore.ts` | 82 | Builder 전 단계 폼 데이터 + CRUD 메서드 |
| `chatStore.ts` | 87 | 채팅방/메시지 mock 데이터 + 선택 상태 |

### hooks — 커스텀 훅

| 파일 | 줄수 | 반환값 | 역할 |
|---|---|---|---|
| `useAuth.ts` | 38 | `login`, `loginWithGoogle`, `logout`, `user`, `isLoggedIn` | 인증 액션 + 상태 |
| `useBuilderStep.ts` | 34 | Step3 태그 핸들러 | Enter 추가 / Backspace 삭제 |
| `useChat.ts` | 23 | `rooms`, `selectedRoom`, `messages`, `send` 등 | 채팅 UI 로직 |

### types — 타입 정의

| 파일 | 주요 타입 |
|---|---|
| `user.ts` | `User` |
| `portfolio.ts` | `PortfolioCard`, `PortfolioListItem`, `Masterpiece`, `SkillScore`, `RepoEntry`, `Award`, `Education`, `JobCategory` |
| `chat.ts` | `ChatRoom`, `ChatMessage`, `SkillItem` |
| `analysis.ts` | `SkillComparison`, `MatchJob`, `InsightCard`, `PerformanceStat` |

---

## 7. 스타일 가이드

### 스타일링 방식

프로젝트는 두 가지 방식을 혼용합니다.

| 영역 | 방식 | 이유 |
|---|---|---|
| 대부분의 컴포넌트 | **Tailwind CSS** | 일관성, 디자인 토큰 활용 |
| auth 영역 (LoginPage, LoginForm 등) | **인라인 CSS** | glassmorphism, 세밀한 hover 제어 |

### 색상 팔레트

```
Primary Purple   : #6347d1
Secondary Purple : #9c48ea
Dark Purple      : #4b2ab8  (타이틀)
Muted Text       : #797585
Body Text        : #484554
Background       : #f8f9ff
Border           : #c9c4d6
```

### Tailwind 커스텀 토큰 (index.css)

```
bg-surface               배경 흰색 계열
bg-surface-container     카드 배경
text-on-surface          본문 텍스트
text-on-surface-variant  보조 텍스트
text-outline             비활성 텍스트
text-primary             보라색 강조
border-outline-variant   연한 보더
```

### 반복 디자인 패턴

```css
/* 그라디언트 */
background: linear-gradient(135deg, #6347d1, #9c48ea);

/* Glassmorphism */
background: rgba(255,255,255,0.85);
backdrop-filter: blur(20px);

/* 소프트 섀도우 */
box-shadow: 0 4px 16px rgba(99,71,209,0.3);
```

---

## 8. 데이터 플로우

```
사용자 액션
    │
    ▼
Page (LoginPage 등)
    │  useAuth() / useAuthStore()
    ▼
Hook (useAuth.ts)
    │  login() / loginWithGoogle()
    ▼
Store (authStore.ts)
    │  setUser() / setToken() / navigate()
    ▼
AppRouter.tsx → 해당 Page 렌더
```

**Builder 폼 플로우**

```
BuilderStep1Page → BuilderStep2Page → BuilderStep3Page
        │                 │                  │
        └─────────────────▼──────────────────┘
                    builderStore
              (모든 단계 데이터 누적)
                          │
                 PublishingProgressPage
                  (완료 후 자동 이동)
```

---

## 9. 백엔드 연동 가이드

현재 `chatStore`, 각 Page 내 상수로 mock 데이터가 하드코딩되어 있습니다.  
백엔드 준비 시 아래 순서로 연동합니다.

### 1단계 — 환경변수 설정

```bash
# .env.local
VITE_API_BASE_URL=https://api.cupoli.io
```

### 2단계 — api/ 함수 구현

각 `api/*.ts` 파일의 `// TODO` 주석 부분에 실제 fetch/axios 코드를 채웁니다.

```ts
// 예시: authApi.ts
export async function loginWithEmail(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}
```

### 3단계 — useAuth 훅 연결

```ts
// hooks/useAuth.ts
async function login(email: string, password: string) {
  const { user, token } = await loginWithEmail(email, password); // api 호출
  setUser(user);
  setToken(token);
  navigate("dashboard");
}
```

### 4단계 — 각 Page의 mock 데이터를 api 호출로 교체

```ts
// 예시: PortfolioFeedPage.tsx
useEffect(() => {
  getPortfolioFeed(selectedCategory).then(setPortfolios);
}, [selectedCategory]);
```

---

## 전체 통계

| 항목 | 수치 |
|---|---|
| 총 TS/TSX 파일 수 | 72개 |
| 총 코드 줄수 | 약 4,400줄 |
| 컴포넌트 수 | 49개 |
| 페이지 수 | 13개 |
| 최대 파일 | PortfolioAnalysisPage.tsx (283줄) |
