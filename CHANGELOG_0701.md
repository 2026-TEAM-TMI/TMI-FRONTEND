# 작업 내역 정리 (2026-07-01)

> **작업 브랜치**: `donghyeon-develop`  
> **주요 작업자**: 김동현  
> **작업 범위**: 인증 전환 / react-router 마이그레이션 / 전면 디자인 강화

---

## 변경 분류 한눈에 보기

| 분류 | 내용 |
|---|---|
| 🔀 인증 전환 | Google OAuth → GitHub OAuth |
| 🏗️ Builder Step 1 개선 | GitHub ID 입력 제거, 레포 드롭다운 |
| 🛣️ 라우팅 마이그레이션 | Zustand 인메모리 라우팅 → react-router-dom v7 |
| 🎨 디자인 강화 | 커서 glow / 3D tilt / shimmer / 페이지 전환 / 전면 Tailwind 통일 |
| 📄 신규 컴포넌트 | Pagination |
| 🐛 버그 수정 | BuilderStep2 syntax error |

---

## 1. 인증 전환 — Google → GitHub OAuth

### 변경 파일
| 파일 | 변경 내용 |
|---|---|
| `components/auth/SocialLoginButton.tsx` | Google 버튼 → GitHub 버튼 (GitHub 아이콘, `#24292e` 배경) |
| `components/auth/LoginForm.tsx` | `onGoogleLogin` prop → `onGithubLogin` |
| `pages/LoginPage.tsx` | `loginWithGoogle` → `loginWithGithub` 연결 |
| `hooks/useAuth.ts` | `loginWithGoogle` 제거, `loginWithGithub` 추가 |

### Mock 유저
```ts
{ name: "Elena Vane", role: "AI 엔지니어", avatar: "E", color: "#6347d1" }
```

---

## 2. Builder Step 1 개선

### 변경 내용
- **GitHub ID 수동 입력 폼 제거** — 백엔드 OAuth 연동 전까지 항상 연동 상태로 고정
- **레포지토리 URL 텍스트 입력 → `<select>` 드롭다운** — GitHub OAuth로 가져온 레포 목록에서 선택
- **항상 연동 상태** (`연동됨` 뱃지 고정 표시)

### Mock 데이터
```ts
const MOCK_GITHUB_REPOS = [
  { name: "nebula-os", url: "...", description: "분산 OS 작업 스케줄러" },
  { name: "lumina-ai", ... },
  { name: "pulse-api", ... },
  { name: "void-scheduler", ... },
  { name: "ethos-nlp", ... },
  { name: "fluxengine", ... },
];
```

### 변경 파일
| 파일 | 변경 내용 |
|---|---|
| `components/builder/GithubConnectStep.tsx` | 항상 연동 상태, 드롭다운 레포 선택 |
| `store/builderStore.ts` | `githubId` 상태 및 setter 제거 |
| `pages/builder/BuilderStep1Page.tsx` | `githubId` props 제거, 설명 문구 업데이트 |

---

## 3. react-router-dom v7 마이그레이션

### Before (Zustand 인메모리 라우팅)
```ts
// authStore.ts
currentRoute: AppRoute  // "dashboard" | "builder-step1" | ...
navigate: (route: AppRoute) => void
```

### After (URL 기반 라우팅)
```ts
// react-router-dom
const navigate = useNavigate();
navigate("/dashboard");
```

### URL 경로 매핑
| 구 라우트 문자열 | 새 URL |
|---|---|
| `"login"` | `/login` |
| `"dashboard"` | `/dashboard` |
| `"builder-step1"` | `/builder/step1` |
| `"builder-step2"` | `/builder/step2` |
| `"builder-step3"` | `/builder/step3` |
| `"publishing"` | `/builder/publishing` |
| `"portfolio-preview"` | `/portfolio/preview` |
| `"portfolio-feed"` | `/portfolio/feed` |
| `"portfolio-masterpieces"` | `/portfolio/masterpieces` |
| `"portfolio-detail"` | `/portfolio/detail` |
| `"portfolio-analysis"` | `/portfolio/analysis` |
| `"portfolio-feedback"` | `/portfolio/feedback` |
| `"coffee-chat"` | `/coffee-chat` |

### 변경 파일 (총 17개)
| 파일 | 변경 내용 |
|---|---|
| `App.tsx` | `<BrowserRouter>` 래핑 추가 |
| `routes/AppRouter.tsx` | switch-case → `<Routes>/<Route>` 전면 재작성 |
| `store/authStore.ts` | `AppRoute` 타입, `currentRoute`, `navigate` 완전 제거 |
| `hooks/useAuth.ts` | `useNavigate()` 적용, URL 경로로 이동 |
| `components/layout/NavTabs.tsx` | `useNavigate` + `useLocation` 기반 active 탐지 |
| `components/layout/Sidebar.tsx` | props 제거, 자체적으로 `useNavigate` + `useLocation` 사용 |
| `pages/DashboardPage.tsx` | navigate 교체 |
| `pages/builder/BuilderStep1~3Page.tsx` | navigate 교체 |
| `pages/builder/PublishingProgressPage.tsx` | navigate 교체 |
| `pages/Portfolio*.tsx` (5개) | navigate 교체 |
| `pages/CoffeeChatPage.tsx` | navigate 교체 |

---

## 4. 디자인 강화

### 4-1. CSS 애니메이션 추가 (`index.css`)
| 클래스 | 효과 |
|---|---|
| `animate-shimmer` | 버튼 빛 쓸림 효과 (2.2s 무한 반복) |
| `animate-page-in` | 페이지 fade-in + 6px translateY (0.28s) |
| `animate-float-orb` | 배경 오브 부유 효과 (8s) |
| `animate-float-orb-slow` | 배경 오브 느린 부유 (12s, 역방향) |

### 4-2. 커서 Glow 효과
- `LoginPage` — 마우스 좌표 추적, `radial-gradient` 480px 원형 glow
- `WelcomeBanner` — 배너 내부 상대 좌표로 glow 위치 계산

### 4-3. 3D Tilt 카드
- `PortfolioCard` — `rotateX(7deg)` / `rotateY(7deg)` 범위
- `PortfolioListItem` — `rotateX(5deg)` / `rotateY(5deg)` 범위
- `StatCard` — `rotateX(6deg)` / `rotateY(6deg)` 범위
- 모두 마우스 leave 시 `0.4s ease`로 원위치 복귀

### 4-4. Button 컴포넌트 전면 개선
- `rounded-xl` → `rounded-full` (pill 형태)
- Primary 버튼: shimmer 오버레이 + hover shadow 강화
- Shadow: `hover:shadow-[0_6px_24px_rgba(99,71,209,0.5)]`

### 4-5. 페이지 fade-in 전환
- `AppRouter.tsx`에서 `pathname`을 `key`로 감싸는 `div` 추가
- 라우트 변경마다 `animate-page-in` 재발동

### 4-6. 컴포넌트별 디자인 개선
| 컴포넌트 | 변경 내용 |
|---|---|
| `LoginForm` | 글로우 링 로고, glassmorphism 카드, OAuth 구분선 |
| `SocialLoginButton` | shimmer 오버레이, hover elevation (+shadow) |
| `AuthFooterLinks` | inline style → Tailwind, hover underline |
| `NavTabs` | store `user.avatar` 실제 표시, 브랜드 hover scale, active tab gradient |
| `BuilderStepper` | 큰 step 원(w-11), animated 연결선 (gradient fill), active scale-110 |
| `CreatePortfolioCard` | 직접 button → `Button` 컴포넌트 사용 |
| `PortfolioFilterTabs` | 더 매끄러운 pill 전환, "ALL" → "전체" |
| `PortfolioFeedbackPage` | 100% inline style → Tailwind 전면 재작성, 인터랙티브 탭 |
| `PublishingProgressPage` | inline style → Tailwind, 완료 시 🎉 아이콘, step dot → pill 애니메이션 |

---

## 5. 신규 컴포넌트 — Pagination

### 파일
`src/components/common/Pagination.tsx`

### 기능
- `← 1 2 3 ... 7 →` 형태
- 7페이지 초과 시 `...` 말줄임 자동 처리
- 현재 페이지: 보라색 원형 filled 버튼
- 첫/마지막 페이지에서 prev/next 버튼 비활성화

### 적용
- `PortfolioFeedPage` — 6개/페이지, 필터 변경 시 1페이지 자동 리셋
- 목 데이터 6개 → 10개로 증량 (2페이지 확인 가능)

---

## 6. 버그 수정

| 파일 | 버그 | 수정 |
|---|---|---|
| `pages/builder/BuilderStep2Page.tsx` | `className_PLACEHOLDER` syntax error (line 23) | 올바른 shadow 클래스로 교체 |

---

## 백엔드 연동 예정 항목

> 현재 mock 상태로 유지 중. 백엔드 준비되면 아래 API로 교체 필요.

| Mock 위치 | 연동 예정 API |
|---|---|
| `useAuth.loginWithGithub()` | `POST /auth/github` — GitHub OAuth 코드 → `{ token, user }` |
| `useAuth.ts` mock user | `GET /auth/me` — 로그인 유저 정보 |
| `GithubConnectStep.tsx` `MOCK_GITHUB_REPOS` | `GET /github/repos` — 연동 레포 목록 |
| `DashboardPage` mock portfolios | `GET /portfolios` — 내 포트폴리오 목록 |
| `PortfolioFeedPage` mock portfolios | `GET /portfolios/feed?category=AI` — 공개 피드 |
| `PortfolioAnalysisPage` mock data | `GET /portfolios/:id/analysis` — AI 분석 결과 |
| `CoffeeChatPage` `useChat` hook | `GET /coffee-chats`, `POST /coffee-chats/:id/messages` |
