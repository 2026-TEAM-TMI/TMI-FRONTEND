# 구조 정렬 변경 요약 (0630 설계 → 현재)

> **기준**: 2026-06-30 최초 설계 명세 vs 2026-07-01 정렬 완료 상태  
> **커밋**: `0ff2516` — "Feat: 프로젝트 원래 설계 의도에 맞춰 구조 정렬"

---

## 변경 분류 한눈에 보기

| 분류 | 파일 수 |
|---|---|
| ✅ 설계대로 이미 구현됨 (변경 없음) | 38개 |
| 🔨 빈 파일 → 구현 완료 | 7개 |
| ➕ 누락 파일 새로 생성 | 1개 |
| ♻️ 의도와 다르게 구현 → 수정 | 4개 |
| 📁 신규 디렉토리/파일 추가 | api/ 4개, assets 구조 |

---

## 1. 빈 파일 → 구현 완료 (7개)

### `components/common/Modal.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | 팝업창 wrapper (필요시 사용) |
| **변경 전** | 파일 존재, 내용 없음 (0줄) |
| **변경 후** | `createPortal`로 `document.body`에 마운트하는 오버레이. `isOpen / onClose / title / children` props |
| **바꿔야 했던 이유** | 다른 컴포넌트에서 Modal을 import해도 아무것도 렌더되지 않는 상태였음 |

---

### `components/layout/Header.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | 상단 로고(Cupoli) + 우측 프로필 아이콘 영역 |
| **변경 전** | 파일 존재, 내용 없음 (0줄) |
| **변경 후** | 좌측 Cupoli 로고 + 우측 Avatar + 이름. `user?: User` prop으로 비로그인 시 로고만 표시 |
| **바꿔야 했던 이유** | 모든 페이지에 NavTabs만 있고 상단 Header가 없어 로고 영역이 누락된 상태였음 |

---

### `components/layout/Sidebar.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | (필요시) 좌측 네비게이션 |
| **변경 전** | 파일 존재, 내용 없음 (0줄) |
| **변경 후** | `currentRoute / onNavigate` props 기반 수직 네비게이션. NavTabs와 동일한 AppRoute 타입 재사용 |
| **바꿔야 했던 이유** | 필요시 사용 가능한 컴포넌트로 설계됐지만 껍데기만 있어 실제로 쓸 수 없는 상태였음 |

---

### `components/layout/Footer.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | "© 2024 Cupoli Crafting Labs" 하단 카피라이트 |
| **변경 전** | 파일 존재, 내용 없음 (0줄) |
| **변경 후** | `© 2024 Cupoli Crafting Labs` 텍스트, props 없는 순수 정적 컴포넌트 |
| **바꿔야 했던 이유** | 어떤 페이지에서도 Footer를 렌더할 수 없는 상태였음 |

---

### `components/auth/LoginForm.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | 전체 로그인 폼 — 로고, "Welcome Back" 타이틀, 소셜 버튼, 제출 버튼 조합 |
| **변경 전** | 파일 존재, 내용 없음 (0줄) |
| **변경 후** | 로고 + 카드("Welcome Back ✨") + `SocialLoginButton` + `AuthFooterLinks` 조합. `onGithubLogin` prop |
| **바꿔야 했던 이유** | 로그인 UI 전체가 LoginPage.tsx에 184줄로 직접 구현되어 있어 컴포넌트 분리 의도가 무효였음 |

---

### `components/auth/SocialLoginButton.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | 소셜 로그인 전용 버튼 (아이콘+텍스트) |
| **변경 전** | 파일 존재, 내용 없음 (0줄) |
| **변경 후** | GitHub SVG 아이콘 + "Continue with GitHub" 버튼. `onClick / disabled` props |
| **바꿔야 했던 이유** | 버튼 코드가 LoginPage에 인라인으로 박혀 있어 재사용 불가했음. 추후 카카오/네이버 등 추가 시에도 이 컴포넌트를 확장하면 됨 |

---

### `components/builder/ExtraExperienceStep.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | Step2 전체 레이아웃 — Awards & Honors, External Education 섹션을 포함하는 컨테이너 |
| **변경 전** | 파일 존재, 내용 없음 (0줄) |
| **변경 후** | `AwardsSection` + `EducationSection` 위임 컨테이너. awards/educations + CRUD 콜백 props |
| **바꿔야 했던 이유** | `BuilderStep2Page`가 `AwardsSection`, `EducationSection`을 직접 import해 Step2 레이아웃 추상화가 없었음. ExtraExperienceStep이 없으면 Step2 로직이 페이지에 노출되어 재사용·테스트가 어려움 |

---

## 2. 누락 파일 → 신규 생성 (1개)

### `components/auth/AuthFooterLinks.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | "Find ID / Find Password / Sign Up" 하단 텍스트 링크 |
| **변경 전** | 파일 자체 없음 |
| **변경 후** | `onFindAccount / onResetPassword / onSignUp` 콜백 props를 받는 텍스트 버튼 3개 |
| **바꿔야 했던 이유** | 설계 명세에 존재하는 파일이 아예 빠진 채로 LoginPage에 익명 버튼 배열로 처리되어 있었음. 각 링크에 실제 기능(비밀번호 찾기 페이지 이동 등) 연결 시 이 컴포넌트의 props를 채우면 됨 |

---

## 3. 의도와 다르게 구현된 것 → 수정 (4개)

### `pages/LoginPage.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | `<LoginForm/>`을 화면 중앙에 배치하는 페이지 wrapper |
| **변경 전** | 184줄. 로고·카드·버튼·풋터 링크를 모두 직접 구현. LoginForm 미사용 |
| **변경 후** | 48줄. 배경 orbs + `<LoginForm onGithubLogin={loginWithGithub} />` wrapper |
| **바꿔야 했던 이유** | 페이지가 UI 조립 책임까지 떠맡아 컴포넌트 분리 원칙 위반. LoginForm을 수정하려면 LoginPage를 열어야 하는 구조였음 |

---

### `store/authStore.ts`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | 로그인한 유저 정보, 토큰 전역 저장 |
| **변경 전** | 라우팅 상태(`currentRoute / navigate`)만 존재. 유저 정보·토큰 없음 |
| **변경 후** | 라우팅 유지 + `user / token / isLoggedIn / setUser / setToken / logout` 추가 |
| **바꿔야 했던 이유** | 인증 상태가 없어 로그인 여부를 판단할 방법이 없었음. `useAuth` 훅이 실제 인증 로직을 제공할 수 없었고, 백엔드 연동 시 토큰을 저장할 곳도 없었음 |

---

### `hooks/useAuth.ts`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | 로그인 상태/유저 정보 가져오는 커스텀 훅, login/logout 함수 제공 |
| **변경 전** | 7줄. `authStore`의 `navigate`와 `currentRoute`만 래핑 |
| **변경 후** | `login(email, password)` / `loginWithGithub()` / `logout()` 함수 + `user / isLoggedIn` 반환 |
| **바꿔야 했던 이유** | 훅이 navigate 래퍼에 불과해 존재 의미가 없었음. 컴포넌트들이 authStore를 직접 호출해야 했고, 백엔드 연동 시 API 호출 로직을 심을 곳이 없었음 |

---

### `pages/builder/BuilderStep2Page.tsx`

| 항목 | 내용 |
|---|---|
| **0630 설계 의도** | `BuilderStepper` + `ExtraExperienceStep` 조합 |
| **변경 전** | `AwardsSection`과 `EducationSection`을 직접 import해서 렌더. ExtraExperienceStep 미사용 |
| **변경 후** | `<ExtraExperienceStep awards={…} educations={…} />` 위임으로 변경 |
| **바꿔야 했던 이유** | Step2 로직이 ExtraExperienceStep 없이 페이지에 직접 노출되어 컴포넌트 계층이 설계와 달랐음 |

---

## 4. 신규 추가 (설계에 없었지만 필요해서 추가)

### `src/api/` 디렉토리 (4개 파일)

| 파일 | 역할 |
|---|---|
| `authApi.ts` | `loginWithEmail`, `loginWithGithub`, `signUp` 스켈레톤 |
| `portfolioApi.ts` | `getPortfolioFeed`, `getPortfolioDetail`, `createPortfolio`, `deletePortfolio` 스켈레톤 |
| `chatApi.ts` | `getChatRooms`, `getMessages`, `sendMessage` 스켈레톤 |
| `analysisApi.ts` | `getMatchingJobs`, `getFeedback`, `getAnalysis` 스켈레톤 |

**추가 이유**: 설계 명세에 api/ 폴더가 명시돼 있었으나 디렉토리 자체가 없었음. 현재 백엔드가 없어 실제 fetch는 TODO 주석으로 표시하고, `VITE_API_BASE_URL` 환경변수 구조만 잡아둠. 백엔드 연동 시 TODO 부분만 채우면 됨.

---

### `src/assets/images/`, `src/assets/icons/` 서브폴더

| 항목 | 내용 |
|---|---|
| **변경 전** | `src/assets/` 루트에 `hero.png` 직접 배치 |
| **변경 후** | `src/assets/images/hero.png`로 이동, `icons/` 폴더 생성 |
| **추가 이유** | 설계 명세의 폴더 구조와 일치시킴. 이미지/아이콘 파일이 늘어날 때 루트가 오염되는 것을 방지 |

---

### `ARCHITECTURE.md`

설계 의도에는 없었으나 프로젝트 구조 파악을 위해 추가.  
라우팅 방식, 상태관리 구조, API 연동 가이드, 스타일 가이드, 데이터 플로우 포함.

---

## 5. 변경하지 않은 것 (38개 — 설계대로 이미 구현됨)

아래 파일들은 설계 의도대로 이미 구현되어 있어 이번 정렬 작업에서 건드리지 않았습니다.

```
components/common/     Button, Input, Avatar, Badge, Card, ProgressBar
components/layout/     NavTabs
components/dashboard/  WelcomeBanner, StatCard, PortfolioListItem, CreatePortfolioCard
components/builder/    BuilderStepper, GithubConnectStep, AwardsSection, EducationSection,
                       FinishStep, VisibilitySettings, PublishingProgress
components/portfolio/  PortfolioCard, PortfolioGrid, PortfolioFilterTabs, ProfileSummary,
                       SkillRadarChart, MasterpieceCard, RequestCoffeeChatButton
components/analysis/   MatchingResultCard, SkillAnalysisChart, AnalysisInsight,
                       ImprovementInsightCard, ScoreCircle
components/coffeechat/ ChatRoomList, ChatRoomItem, ChatWindow, ChatBubble,
                       ChatInput, ChatSidebarProfile
pages/                 DashboardPage, PortfolioFeedPage, PortfolioDetailPage,
                       PortfolioAnalysisPage, PortfolioFeedbackPage, CoffeeChatPage,
                       builder/BuilderStep1Page, builder/BuilderStep3Page,
                       builder/PublishingProgressPage
routes/                AppRouter
hooks/                 useBuilderStep, useChat
store/                 builderStore, chatStore
types/                 user, portfolio, chat, analysis
```

---

## 6. 설계 명세 vs 현재 구현 차이점 (유지 중인 변경사항)

설계 명세에 기술된 일부 항목은 구현 과정에서 의도적으로 다르게 결정되었으며 현재도 유지 중입니다.

| 설계 명세 | 현재 구현 | 결정 이유 |
|---|---|---|
| React Router 기반 라우팅 (`<Routes>`) | Zustand switch 기반 커스텀 라우팅 | 초기 구현에서 이미 Zustand 방식으로 굳어짐. react-router-dom은 설치만 된 상태 |
| Google 소셜 로그인 | GitHub 소셜 로그인으로 변경 | 개발자 포트폴리오 서비스 특성상 GitHub 로그인이 더 적합 |
| 이메일/비밀번호 Input + "Remember my essence" 체크박스 | 소셜 로그인만 구현 | 소셜 로그인 단일 방식으로 단순화. 이메일 로그인은 `authApi.loginWithEmail` 스켈레톤으로 준비됨 |
| `PortfolioFeedPage` 외 pages만 | `PortfolioMasterpiecesPage`, `PortfolioPreviewPage` 추가 | 설계 이후 기능 확장으로 추가된 페이지 |

---

## 7. 백엔드 연동 시 추가로 수정이 필요한 파일

현재 mock 데이터를 사용 중인 파일들로, 백엔드 연동 시 수정이 필요합니다.

| 파일 | 현재 상태 | 연동 방법 |
|---|---|---|
| `store/chatStore.ts` | ROOMS, MESSAGES_BY_ROOM 하드코딩 | `chatApi.getChatRooms()` / `getMessages()`로 교체 |
| `pages/DashboardPage.tsx` | stats, portfolios 상수 하드코딩 | `portfolioApi.getPortfolioFeed()` 호출로 교체 |
| `hooks/useAuth.ts` | mock User 객체 반환 | `authApi.loginWithGithub()` 응답으로 교체 (TODO 주석 위치) |
| `pages/PortfolioAnalysisPage.tsx` | 분석 데이터 인라인 정의 | `analysisApi.getAnalysis()` / `getMatchingJobs()` 호출로 교체 |
| `pages/PortfolioFeedbackPage.tsx` | feedback 데이터 인라인 정의 | `analysisApi.getFeedback()` 호출로 교체 |
