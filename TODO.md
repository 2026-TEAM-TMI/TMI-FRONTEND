# TODO / 이슈 목록

## 백엔드 API 명세 오류

- [ ] **(백엔드/문서) 포트폴리오 피드 조회 API 명세 경로 오류** — Notion API 명세 문서엔 `GET /api/v1/portfolios`로 적혀 있지만, 실제 `PortfolioController`(`src/main/java/com/github/tmi/portfolio/presentation/PortfolioController.java`, develop 브랜치)의 구현은 `@RequestMapping("/api/v1/portfolios")` 클래스에 `@GetMapping("/feed")`로 매핑돼 있어 실제 경로는 `GET /api/v1/portfolios/feed`. `/api/v1/portfolios`(세그먼트 없음)엔 포트폴리오 생성용 `@PostMapping`만 있어서, 명세대로 GET을 호출하면 `Allow: POST` 헤더와 함께 빈 본문 403이 남. 프론트는 실제 경로(`/feed`)로 수정해 해결함 — **Notion 문서 쪽 경로를 `/api/v1/portfolios/feed`로 정정 필요**.
- [ ] **(백엔드) 포트폴리오 목록 응답에 `id` 필드 없음** — `GET /api/v1/portfolios/{memberId}` 및 피드 응답의 각 포트폴리오 객체에 고유 `id`가 없어, 명세상 존재하는 `DELETE /api/v1/portfolios/{id}`를 프론트에서 실제 데이터로 호출할 방법이 없음. 응답에 `id` 추가 필요.

## GitHub 레포지토리 연동

- [ ] **`repo` 스코프 추가 여부 결정** — 현재는 `read:org`만 추가한 상태라 조직 소속 레포 중 public 레포만 조회됨. 조직의 private 레포까지 목록에 나와야 한다면 `src/api/authApi.ts`의 scope에 `repo`를 추가해야 함 (레포 읽기/쓰기 전체 권한을 GitHub에 위임하게 되므로 신중히 결정).
- [ ] **기존 로그인 사용자 재로그인 필요** — scope 변경은 신규 발급 토큰부터 적용됨. 이미 로그인해서 저장된 기존 액세스 토큰은 조직 레포 조회 권한이 없으므로, 기존 사용자는 GitHub 재로그인(재동의)을 해야 조직 레포가 보임. 별도 공지나 강제 재로그인 처리 필요 여부 논의.
- [ ] **(백엔드) `GithubToken.scope` 필드가 항상 `null`로 저장됨** — `MemberLoginService.storeGithubTokenIfNeeded`에서 scope 값을 `null`로 하드코딩하고 있고, `GithubAccessTokenResponse`/`GithubSocialService`도 GitHub가 응답으로 주는 `scope` 문자열을 캡처하지 않음. 계정별로 실제 어떤 scope가 발급됐는지 추적이 안 되어 디버깅이 어려움 — scope 값을 파싱해서 저장하도록 백엔드 수정 필요.
