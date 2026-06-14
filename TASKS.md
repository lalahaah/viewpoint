# TASKS.md — ViewPoint 개발 태스크 목록 v1.0

> **기준 문서**: AGENT.md v2.0, PRD.md v1.0  
> **실행 도구**: Antigravity CLI  
> **배포**: Vercel (Seoul) + Supabase  
> **업데이트 규칙**: 각 태스크 완료 시 `[ ]` → `[x]`로 변경

---

## Phase 1 — MVP (즉시 수익 가능)

### STEP 1: 프로젝트 초기화 & 기반 구축

- [x] **T-01** Next.js 14 프로젝트 초기화 (TypeScript, App Router, Tailwind)
- [x] **T-02** 의존성 패키지 설치 (framer-motion, zustand, lucide-react, prisma, next-auth@beta, @auth/prisma-adapter, bcryptjs, resend, clsx, tailwind-merge)
- [x] **T-03** `next.config.js` 생성 (CommonJS 형식 — `.ts` 파일 삭제)
- [x] **T-04** `prisma/schema.prisma` 작성 (AGENT.md 섹션 4 기준, `password String?` 포함)
- [x] **T-05** `src/lib/prisma.ts` 싱글톤 패턴 작성
- [x] **T-06** `src/lib/utils.ts` 작성 (`cn()` 헬퍼)
- [x] **T-07** `src/lib/mockData.ts` 작성 (ACTIVE 8개 + UPCOMING 4개 채널)
- [x] **T-08** `src/components/layout/Navigation.tsx` 작성 (브루탈리즘 스타일)
- [x] **T-09** `src/components/layout/Footer.tsx` 작성 ((주)라운드미디어 정보 포함)
- [x] **T-10** `src/app/layout.tsx` 작성 (Navigation + Footer 래핑)

---

### STEP 2: 인증 시스템 (Auth — Step 1 직후 필수)

- [x] **T-11** `src/lib/auth.config.ts` 작성 (Edge-safe, Prisma import 금지)
- [x] **T-12** `src/lib/auth.ts` 작성 (Node.js, PrismaAdapter, Credentials 포함)
- [x] **T-13** `src/app/api/auth/[...nextauth]/route.ts` 작성
- [x] **T-14** `src/middleware.ts` 작성 (auth.config.ts import — auth.ts 금지)
- [x] **T-15** `src/store/authStore.ts` Zustand 작성
- [x] **T-16** `src/app/(auth)/login/page.tsx` 작성 (이메일 + 구글 로그인)
- [x] **T-17** `src/app/(auth)/signup/page.tsx` 작성 (역할 선택 UI 포함)
- [x] **T-18** `src/app/api/auth/register/route.ts` 작성 (비밀번호 해싱 + SPONSOR CreditBalance 생성)

---

### STEP 3: 메인 랜딩 페이지

- [x] **T-19** `src/components/landing/ShuffleHero.tsx` 작성 (AGENT.md 섹션 7.1 기준)
- [x] **T-20** `src/store/filterStore.ts` Zustand 작성 (category, channelType, searchQuery)
- [x] **T-21** `src/components/landing/ChannelCard.tsx` 작성 (ACTIVE/UPCOMING 분기)
- [x] **T-22** `src/components/landing/ChannelGrid.tsx` 작성 (필터바 + 그리드)
- [x] **T-23** `src/components/modals/ChannelModal.tsx` 작성 (Framer Motion 슬라이드인)
- [x] **T-24** `src/app/(public)/page.tsx` 작성 (ShuffleHero + ChannelGrid + ChannelModal)

---

### STEP 4: 안내 & 고객지원 페이지

- [ ] **T-25** `src/components/shared/BentoGridShowcase.tsx` 작성 (AGENT.md 섹션 7.2 기준)
- [ ] **T-26** `src/components/shared/StatusBadge.tsx` 작성
- [ ] **T-27** `src/app/(public)/guide/creator/page.tsx` 작성
- [ ] **T-28** `src/app/(public)/guide/sponsor/page.tsx` 작성
- [ ] **T-29** `src/app/(public)/notice/page.tsx` 작성
- [ ] **T-30** `src/app/(public)/faq/page.tsx` 작성 (아코디언 컴포넌트)
- [ ] **T-31** `src/app/(public)/terms/page.tsx` 작성
- [ ] **T-32** `src/app/(public)/privacy/page.tsx` 작성

---

### STEP 5: 크리에이터 대시보드

- [ ] **T-33** `src/app/(dashboard)/dashboard/creator/layout.tsx` 작성 (사이드바)
- [ ] **T-34** `src/app/(dashboard)/dashboard/creator/page.tsx` 작성 (스탯 + 최근 제안서)
- [ ] **T-35** `src/app/(dashboard)/dashboard/creator/channel/page.tsx` 작성 (채널 등록/관리)
- [ ] **T-36** `src/app/(dashboard)/dashboard/creator/proposals/page.tsx` 작성 (수락/거절)
- [ ] **T-37** `src/app/(dashboard)/dashboard/creator/earnings/page.tsx` 작성 (정산 내역)

---

### STEP 6: 광고주 대시보드

- [ ] **T-38** `src/app/(dashboard)/dashboard/sponsor/layout.tsx` 작성 (사이드바)
- [ ] **T-39** `src/app/(dashboard)/dashboard/sponsor/page.tsx` 작성 (스탯)
- [ ] **T-40** `src/app/(dashboard)/dashboard/sponsor/proposals/page.tsx` 작성
- [ ] **T-41** `src/app/(dashboard)/dashboard/sponsor/billing/page.tsx` 작성 (크레딧 패키지 + 결제 내역)

---

### STEP 7: 어드민 패널

- [ ] **T-42** `src/app/(admin)/admin/layout.tsx` 작성 (어드민 사이드바)
- [ ] **T-43** `src/app/(admin)/admin/page.tsx` 작성 (통계 대시보드)
- [ ] **T-44** `src/app/(admin)/admin/channels/page.tsx` 작성 (채널 심사 탭)
- [ ] **T-45** `src/app/(admin)/admin/users/page.tsx` 작성
- [ ] **T-46** `src/app/(admin)/admin/proposals/page.tsx` 작성
- [ ] **T-47** `src/app/(admin)/admin/settlements/page.tsx` 작성
- [ ] **T-48** `src/components/admin/AdminSidebar.tsx` 작성
- [ ] **T-49** `src/components/admin/StatsGrid.tsx` 작성

---

### STEP 8: API 라우트 구현

- [ ] **T-50** `src/app/api/channels/route.ts` — GET(목록 + 필터), POST(채널 등록)
- [ ] **T-51** `src/app/api/channels/[id]/route.ts` — GET(상세 + viewCount++), PATCH, DELETE
- [ ] **T-52** `src/app/api/proposals/route.ts` — POST(발송 + 크레딧 차감), GET(목록)
- [ ] **T-53** `src/app/api/proposals/[id]/route.ts` — GET(+ viewedAt 업데이트), PATCH
- [ ] **T-54** `src/app/api/proposals/[id]/accept/route.ts` — POST(수락 + 결제 트리거)
- [ ] **T-55** `src/app/api/admin/channels/[id]/approve/route.ts` — POST
- [ ] **T-56** `src/app/api/admin/channels/[id]/reject/route.ts` — POST (body: { reason })
- [ ] **T-57** `src/app/api/admin/stats/route.ts` — GET
- [ ] **T-58** `src/app/api/payments/create-checkout/route.ts` — Dodo 협찬 결제 세션
- [ ] **T-59** `src/app/api/payments/buy-credits/route.ts` — Dodo 크레딧 구매 세션
- [ ] **T-60** `src/app/api/payments/webhook/route.ts` — 서명 검증 + 정산 처리 + 크레딧 충전
- [ ] **T-61** `src/app/api/upload/route.ts` — Supabase Storage 업로드

---

### STEP 9: 마무리 & 품질 검사

- [ ] **T-62** TypeScript 오류 전체 수정 (`npx tsc --noEmit`)
- [ ] **T-63** 빌드 오류 전체 수정 (`npx next build`)
- [ ] **T-64** 디자인 시스템 감사 (shadow / rounded-lg / border-gray 금지어 grep)
- [ ] **T-65** middleware.ts import 경로 검증 (auth.config.ts 확인)
- [ ] **T-66** next.config.js CommonJS 형식 확인
- [ ] **T-67** `README.md` 작성 (프로젝트 개요, 환경변수 설정, 실행 방법)
- [ ] **T-68** `.env.local.example` 작성 (실제 값 없이 키 이름만)

---

## Phase 2 — 운영 안정화 (수익 검증 후 진행)

- [ ] **T-69** 얼리버드 자동 환불 로직 (Dodo Refund API + Cron Job)
- [ ] **T-70** 크리에이터 PREMIUM 구독 결제 연동
- [ ] **T-71** 채널 isPremium 상단 노출 정렬 로직
- [ ] **T-72** Resend 이메일 템플릿 완성 (제안서 수신, 수락, 정산 완료)
- [ ] **T-73** 모바일 반응형 최적화 (햄버거 메뉴 등)
- [ ] **T-74** 채널 목록 페이지네이션 (Infinite Scroll 또는 페이지)

---

## Phase 3 — 성장 (월 거래 50건 이상 달성 후)

- [ ] **T-75** YouTube Data API v3 연동 (구독자수 자동 인증)
- [ ] **T-76** 다국어 (i18n) — next-intl 적용 (한국어 + 영어)
- [ ] **T-77** 채널 리뷰 / 평점 시스템
- [ ] **T-78** 글로벌 광고주 온보딩 (달러 결제 패키지)
- [ ] **T-79** 어드민 통계 고도화 (차트, 기간별 필터)
- [ ] **T-80** SEO 최적화 (채널별 OG 태그, sitemap.xml)

---

## 진행 현황 요약

| Phase | 전체 | 완료 | 진행률 |
|---|---|---|---|
| Phase 1 (MVP) | 68개 | 24개 | 35% |
| Phase 2 (운영) | 6개 | 0개 | 0% |
| Phase 3 (성장) | 6개 | 0개 | 0% |
| **합계** | **80개** | **24개** | **30%** |

---

## Antigravity CLI Step 실행 순서

```
Step 1: AGENT.md 읽고 시작해줘 → T-01 ~ T-10 완료 → 멈춤
Step 2: Execute Step 2          → T-11 ~ T-18 완료 → 멈춤
Step 3: Execute Step 3          → T-19 ~ T-24 완료 → 멈춤
Step 4: Execute Step 4          → T-25 ~ T-32 완료 → 멈춤
Step 5: Execute Step 5          → T-33 ~ T-37 완료 → 멈춤
Step 6: Execute Step 6          → T-38 ~ T-41 완료 → 멈춤
Step 7: Execute Step 7          → T-42 ~ T-49 완료 → 멈춤
Step 8: Execute Step 8          → T-50 ~ T-61 완료 → 멈춤
Step 9: Execute Step 9          → T-62 ~ T-68 완료 → 빌드 확인 → Vercel 배포
```

> **주의**: 각 Step 완료 후 반드시 TASKS.md의 해당 태스크를 `[x]`로 업데이트하고 다음 Step을 요청하라.

---

*TASKS 버전: v1.0 | 운영사: (주)라운드미디어*
