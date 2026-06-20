# TASKS.md — ViewPoint 개발 태스크 목록 v2.1

> **기준 문서**: AGENT.md v2.1, PRD.md v1.0  
> **실행 도구**: Antigravity CLI  
> **배포**: Vercel (Seoul) + Supabase  
> **업데이트 규칙**: 각 태스크 완료 시 `[ ]` → `[x]`로 변경

---

## Phase 1 — MVP (즉시 수익 가능)

### STEP 1: 프로젝트 초기화 & 기반 구축 ✅ 완료

- [x] **T-01** Next.js 14 프로젝트 초기화
- [x] **T-02** 의존성 패키지 설치
- [x] **T-03** `next.config.js` 생성 (CommonJS)
- [x] **T-04** `prisma/schema.prisma` 작성 (초기 버전)
- [x] **T-05** `src/lib/prisma.ts` 싱글톤 패턴
- [x] **T-06** `src/lib/utils.ts` cn() 헬퍼
- [x] **T-07** `src/lib/mockData.ts` 12개 채널 목데이터
- [x] **T-08** `src/components/layout/Navigation.tsx`
- [x] **T-09** `src/components/layout/Footer.tsx`
- [x] **T-10** `src/app/layout.tsx`

---

### STEP 2: 인증 시스템 ✅ 완료

- [x] **T-11** `src/lib/auth.config.ts` (Edge-safe)
- [x] **T-12** `src/lib/auth.ts` (Node.js + PrismaAdapter)
- [x] **T-13** `src/app/api/auth/[...nextauth]/route.ts`
- [x] **T-14** `src/middleware.ts`
- [x] **T-15** `src/store/authStore.ts`
- [x] **T-16** `src/app/(auth)/login/page.tsx`
- [x] **T-17** `src/app/(auth)/signup/page.tsx`
- [x] **T-18** `src/app/api/auth/register/route.ts`

---

### STEP 3: 메인 랜딩 페이지 ✅ 완료

- [x] **T-19** `src/components/landing/ShuffleHero.tsx`
- [x] **T-20** `src/store/filterStore.ts`
- [x] **T-21** `src/components/landing/ChannelCard.tsx`
- [x] **T-22** `src/components/landing/ChannelGrid.tsx`
- [x] **T-23** `src/components/modals/ChannelModal.tsx` (기본 버전)
- [x] **T-24** `src/app/(public)/page.tsx`

---

### STEP 3-1: 스키마 개선 + ChannelModal 전면 개선 + BriefModal 추가 ✅ 완료

- [x] **T-25** `prisma/schema.prisma` 전면 업데이트
  - Proposal → Brief 모델 교체
  - BriefStatus enum 추가
  - Channel 신규 필드: `youtubeUrl` 노출, `mediaKitUrl`, `totalVideos`, `recentMonthViews`, `subscriberGrowth`, `engagementRate`, `youtubeVerified`, `audienceGender`, `audienceAge`, `audienceCountry`, `audienceDevice`, `sponsorCases`
  - `adPrices` JSON 구조 변경: 7개 유형 + `price` + `period` + `description`

- [x] **T-26** `src/lib/mockData.ts` 신규 필드 데이터 추가
  - adPrices 7개 유형 + period + description
  - audienceGender / audienceAge / audienceCountry / audienceDevice 예시 데이터
  - totalVideos / recentMonthViews / subscriberGrowth / engagementRate
  - sponsorCases 협찬 사례 1-2개
  - youtubeUrl 예시 URL

- [x] **T-27** `src/components/modals/ChannelModal.tsx` 전면 개선
  - 섹션 1: 채널 헤더 + YouTube 링크 버튼 + 미디어킷 다운로드
  - 섹션 2: 채널 주요 지표 1차 (4개 스탯)
  - 섹션 3: 채널 주요 지표 2차 (3개 스탯)
  - 섹션 4: 시청자 인구통계 (성별/연령/국가/기기)
  - 섹션 5: 채널 소개
  - 섹션 6: 광고 유형별 단가 + 제작기간 테이블
  - 섹션 7: 협찬 사례
  - 섹션 8: "브리프 보내기" CTA → BriefModal 오픈

- [x] **T-28** `src/components/modals/BriefModal.tsx` 신규 생성
  - 브랜드명, 제품소개, 광고유형 선택, 예산, 콘텐츠 방향, 희망일, 참고URL
  - 광고유형 선택 시 단가 + 제작기간 자동 표시
  - 제출 시 POST /api/briefs 호출 + 크레딧 1 차감

- [x] **T-29** `src/app/(public)/page.tsx` 수정
  - BriefModal 상태 추가
  - ChannelModal → BriefModal 연결

- [x] **T-30** 전체 레이아웃 너비 통일 + 모바일 반응형
  - max-w-screen-xl mx-auto 컨테이너 통일
  - Navigation 모바일 메뉴 처리
  - ChannelGrid 필터 overflow-x-auto

---

### STEP 4: 안내 & 고객지원 페이지 ✅ 완료

- [x] **T-31** `src/components/shared/BentoGridShowcase.tsx`
- [x] **T-32** `src/components/shared/StatusBadge.tsx`
- [x] **T-33** `src/app/(public)/guide/creator/page.tsx`
- [x] **T-34** `src/app/(public)/guide/sponsor/page.tsx`
- [x] **T-35** `src/app/(public)/notice/page.tsx`
- [x] **T-36** `src/app/(public)/faq/page.tsx` (아코디언)
- [x] **T-37** `src/app/(public)/terms/page.tsx`
- [x] **T-38** `src/app/(public)/privacy/page.tsx`

---

### STEP 5: 크리에이터 대시보드

- [ ] **T-39** `src/app/(dashboard)/dashboard/creator/layout.tsx` (사이드바)
- [ ] **T-40** `src/app/(dashboard)/dashboard/creator/page.tsx` (홈 스탯)
- [ ] **T-41** `src/app/(dashboard)/dashboard/creator/channel/page.tsx`
  - 채널 등록 폼에 신규 필드 전부 포함:
    * 채널 지표 (구독자수, 평균조회수, 참여율, 업로드주기, 총영상수, 최근30일조회수, 구독자증가)
    * 시청자 인구통계 (성별/연령/국가/기기 — % 입력)
    * 광고 유형별 단가 + 제작기간 입력 (7개 유형)
    * 미디어킷 PDF 업로드 (Supabase Storage)
    * 협찬 사례 등록 (브랜드명, 영상 URL)
- [ ] **T-42** `src/app/(dashboard)/dashboard/creator/briefs/page.tsx` (받은 브리프)
- [ ] **T-43** `src/app/(dashboard)/dashboard/creator/earnings/page.tsx`

---

### STEP 6: 광고주 대시보드

- [ ] **T-44** `src/app/(dashboard)/dashboard/sponsor/layout.tsx`
- [ ] **T-45** `src/app/(dashboard)/dashboard/sponsor/page.tsx`
- [ ] **T-46** `src/app/(dashboard)/dashboard/sponsor/briefs/page.tsx` (보낸 브리프)
- [ ] **T-47** `src/app/(dashboard)/dashboard/sponsor/billing/page.tsx`

---

### STEP 7: 어드민 패널

- [ ] **T-48** `src/app/(admin)/admin/layout.tsx`
- [ ] **T-49** `src/app/(admin)/admin/page.tsx` (통계)
- [ ] **T-50** `src/app/(admin)/admin/channels/page.tsx` (채널 심사)
- [ ] **T-51** `src/app/(admin)/admin/users/page.tsx`
- [ ] **T-52** `src/app/(admin)/admin/briefs/page.tsx` (브리프 모니터링)
- [ ] **T-53** `src/app/(admin)/admin/settlements/page.tsx`

---

### STEP 8: API 라우트 구현

- [ ] **T-54** `src/app/api/channels/route.ts` — GET(목록+필터), POST(등록)
- [ ] **T-55** `src/app/api/channels/[id]/route.ts` — GET(상세+viewCount++), PATCH, DELETE
- [ ] **T-56** `src/app/api/briefs/route.ts` — POST(발송+크레딧차감), GET(목록)
- [ ] **T-57** `src/app/api/briefs/[id]/route.ts` — GET(+viewedAt), PATCH
- [ ] **T-58** `src/app/api/briefs/[id]/accept/route.ts` — POST(수락+결제트리거)
- [ ] **T-59** `src/app/api/admin/channels/[id]/approve/route.ts`
- [ ] **T-60** `src/app/api/admin/channels/[id]/reject/route.ts`
- [ ] **T-61** `src/app/api/admin/stats/route.ts`
- [ ] **T-62** `src/app/api/admin/briefs/route.ts` — GET(전체 브리프 모니터링)
- [ ] **T-63** `src/app/api/payments/create-checkout/route.ts` (에스크로 구조)
- [ ] **T-64** `src/app/api/payments/buy-credits/route.ts`
- [ ] **T-65** `src/app/api/payments/webhook/route.ts` (서명검증+정산)
- [ ] **T-66** `src/app/api/upload/route.ts` (Supabase Storage — 미디어킷 PDF 포함)

---

### STEP 9: 마무리 & QA

- [ ] **T-67** TypeScript 오류 전체 수정 (`npx tsc --noEmit`)
- [ ] **T-68** 빌드 오류 전체 수정 (`npx next build`)
- [ ] **T-69** 디자인 시스템 감사 (shadow/rounded-lg/border-gray grep)
- [ ] **T-70** middleware.ts import 경로 검증
- [ ] **T-71** next.config.js CommonJS 확인
- [ ] **T-72** `README.md` 작성
- [ ] **T-73** `.env.local.example` 작성

---

## Phase 2 — 운영 안정화

- [ ] **T-74** YouTube Data API v3 연동 (채널 지표 자동 인증 + `youtubeVerified` 뱃지)
- [ ] **T-75** 크리에이터 PREMIUM 구독 결제
- [ ] **T-76** 채널 isPremium 상단 노출 정렬
- [ ] **T-77** 에스크로 완료 확인 플로우 고도화
- [ ] **T-78** Resend 이메일 템플릿 완성 (브리프 수신, 수락, 정산)
- [ ] **T-79** 모바일 반응형 고도화 (햄버거 메뉴 등)

---

## Phase 3 — 성장

- [ ] **T-80** 다국어 (next-intl)
- [ ] **T-81** 채널 리뷰/평점 시스템
- [ ] **T-82** 매칭 추천 알고리즘
- [ ] **T-83** 글로벌 광고주 달러 결제 패키지
- [ ] **T-84** 어드민 통계 고도화 (차트, 기간별 필터)
- [ ] **T-85** SEO 최적화 (채널별 OG 태그, sitemap.xml)

---

## 진행 현황 요약

| Phase | 전체 | 완료 | 진행률 |
|---|---|---|---|
| Phase 1 — Step 1 | 10개 | 10개 | 100% ✅ |
| Phase 1 — Step 2 | 8개 | 8개 | 100% ✅ |
| Phase 1 — Step 3 | 6개 | 6개 | 100% ✅ |
| Phase 1 — Step 3-1 | 6개 | 6개 | 100% ✅ |
| Phase 1 — Step 4~9 | 43개 | 8개 | 18.6% |
| Phase 2 | 6개 | 0개 | 0% |
| Phase 3 | 6개 | 0개 | 0% |
| **합계** | **85개** | **38개** | **44.7%** |

---

## Antigravity CLI 실행 순서

```
✅ Step 1 완료
✅ Step 2 완료
✅ Step 3 완료
✅ Step 3-1 완료
✅ Step 4 완료
⬜ Step 5: 크리에이터 대시보드
⬜ Step 6: 광고주 대시보드
⬜ Step 7: 어드민 패널
⬜ Step 8: API 구현
⬜ Step 9: QA + 빌드
```

---

*TASKS 버전: v2.1 | 운영사: (주)라운드미디어*
