# AGENT.md — ViewPoint SaaS 마스터 문서 v2.1
> **이 파일은 Antigravity CLI의 최우선 진실의 원천(Source of Truth)이다.**
> 모든 코드 작성, 설계 결정, 파일 생성 시 반드시 이 문서를 먼저 참조하라.
> 문서에 명시되지 않은 임의 판단은 금지. 불명확한 사항은 반드시 질문 후 진행하라.

## ⚠️ 실행 규칙 (EXECUTION RULES — 절대 준수)

1. **ONLY do what is explicitly requested.** 요청된 Step의 내용만 정확히 실행하라.
2. **Do NOT anticipate or perform next steps.** 다음 Step을 미리 실행하지 마라.
3. **Do NOT install extra packages** unless explicitly listed in the current Step.
4. **Do NOT create extra files** beyond what is specified in the current Step.
5. **ASK before acting** if something seems missing or unclear. 임의로 판단하여 추가 작업하지 마라.
6. **One step at a time. Nothing more. Nothing less.**
7. **After completing a step, stop and report what was done.** 완료 후 즉시 멈추고 완료 보고만 하라.
8. **Commit and push to GitHub after every step.** 각 Step 완료 후 반드시 아래 순서로 깃허브에 커밋 및 푸시하라:
   - `.env`, `.env.local` 파일이 `.gitignore`에 포함되어 있는지 반드시 확인하라
   - `git add .`
   - `git commit -m "feat: Step N 완료 — [작업 내용 요약]"`
   - `git push origin main`
   - 커밋 메시지는 한국어로 작성하라. 예시: `"feat: Step 2 완료 — 인증 시스템 구축"`

---

## 0. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 서비스명 | ViewPoint (뷰포인트) |
| 서비스 정의 | 유튜브 크리에이터 ↔ 광고주/스폰서 협찬 마켓플레이스 |
| 운영사 | (주)라운드미디어 (Round Media) |
| 타겟 시장 | 한국 + 글로벌 (다국어 대응 필수) |
| 핵심 차별점 | "오픈 예정 채널" 얼리버드 스폰서십 선점 기능 |
| 수익 모델 | 플랫폼 수수료 + 크리에이터 프리미엄 구독 + 광고주 크레딧 |
| 결제 | Dodo Payments (글로벌 수취, MoR 방식) |
| 배포 | Vercel (Seoul region) + Supabase (DB + Storage) |

---

## 1. 기술 스택 (확정)

```
Frontend      : Next.js 14 (App Router, TypeScript) — next.config.js (CommonJS, NOT .ts)
Styling       : Tailwind CSS (에디토리얼/브루탈리즘 디자인 시스템)
Animation     : Framer Motion
State         : Zustand
Database      : PostgreSQL via Supabase
ORM           : Prisma 5.22.0 (v7 사용 금지)
Auth          : NextAuth.js v5 — auth.config.ts (Edge-safe) + auth.ts (Node.js) 분리 필수
Payment       : Dodo Payments (Webhook 기반 정산, 에스크로 구조)
File Storage  : Supabase Storage (미디어킷 PDF, 채널 썸네일)
Email         : Resend
Deployment    : Vercel
Icons         : lucide-react
```

### ⚠️ 주요 기술 주의사항

```
[1] next.config.js — CommonJS 형식만 사용 (next.config.ts 금지)
    module.exports = { ... }

[2] NextAuth v5 Edge Runtime 분리 패턴 (필수):
    - src/lib/auth.config.ts : Edge-safe 설정만 (Providers, callbacks 기본값)
                               Prisma import 금지, bcryptjs import 금지
    - src/lib/auth.ts        : Node.js 전용 (PrismaAdapter, bcryptjs 포함)
    - src/middleware.ts      : auth.config.ts만 import

[3] Prisma 싱글톤 패턴 (src/lib/prisma.ts):
    declare global { var prisma: PrismaClient | undefined }
    export const prisma = global.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') global.prisma = prisma

[4] Prisma 버전: 5.22.0 고정 (v7 schema 문법 충돌)
    package.json: "prisma": "5.22.0", "@prisma/client": "5.22.0"
    build script: "prisma generate && next build"

[5] Dodo Payments: bearerToken에 전체 API 키 그대로 전달

[6] Tailwind 금지 클래스: p-4.5, px-4.5 등 .5 단위 커스텀 패딩

[7] 환경변수 — .env.local만 사용, 절대 커밋 금지
```

---

## 2. 폴더 구조 (절대 준수)

```
viewpoint/
├── next.config.js
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── guide/creator/page.tsx
│   │   │   ├── guide/sponsor/page.tsx
│   │   │   ├── notice/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   └── privacy/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       ├── creator/
│   │   │       │   ├── layout.tsx
│   │   │       │   ├── page.tsx
│   │   │       │   ├── channel/page.tsx
│   │   │       │   ├── briefs/page.tsx        # 받은 브리프
│   │   │       │   └── earnings/page.tsx
│   │   │       └── sponsor/
│   │   │           ├── layout.tsx
│   │   │           ├── page.tsx
│   │   │           ├── briefs/page.tsx        # 보낸 브리프
│   │   │           └── billing/page.tsx
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── channels/page.tsx
│   │   │       ├── users/page.tsx
│   │   │       ├── briefs/page.tsx            # 브리프 모니터링
│   │   │       └── settlements/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── auth/register/route.ts
│   │       ├── channels/route.ts
│   │       ├── channels/[id]/route.ts
│   │       ├── briefs/route.ts                # POST(발송), GET(목록)
│   │       ├── briefs/[id]/route.ts           # GET, PATCH
│   │       ├── briefs/[id]/accept/route.ts    # POST(수락+결제트리거)
│   │       ├── admin/channels/[id]/approve/route.ts
│   │       ├── admin/channels/[id]/reject/route.ts
│   │       ├── admin/stats/route.ts
│   │       ├── payments/create-checkout/route.ts
│   │       ├── payments/buy-credits/route.ts
│   │       ├── payments/webhook/route.ts
│   │       └── upload/route.ts
│   ├── components/
│   │   ├── layout/Navigation.tsx
│   │   ├── layout/Footer.tsx
│   │   ├── landing/ShuffleHero.tsx
│   │   ├── landing/ChannelGrid.tsx
│   │   ├── landing/ChannelCard.tsx
│   │   ├── modals/ChannelModal.tsx
│   │   ├── modals/BriefModal.tsx              # 브리프 작성 모달
│   │   ├── shared/BentoGridShowcase.tsx
│   │   ├── shared/StatusBadge.tsx
│   │   └── admin/AdminSidebar.tsx
│   ├── lib/
│   │   ├── mockData.ts
│   │   ├── prisma.ts
│   │   ├── auth.config.ts
│   │   ├── auth.ts
│   │   ├── dodo.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   └── store/
│       ├── authStore.ts
│       └── filterStore.ts
└── AGENT.md
```

---

## 3. 디자인 시스템 (절대 규칙 — 위반 금지)

### 핵심 철학
**에디토리얼 매거진 / 브루탈리즘(Brutalism)** 스타일.
선과 타이포그래피, 흑백 대비로 모든 레이아웃을 구성한다.

### 절대 금지 규칙
```
❌ shadow, shadow-md, shadow-lg 등 모든 그림자 클래스
❌ rounded-lg, rounded-xl, rounded-2xl 등 큰 곡률
❌ gradient 배경 (bg-gradient-*)
❌ 화려한 컬러 사용 (포인트 컬러 최소화)
❌ p-4.5, px-4.5 등 Tailwind 미지원 .5 단위 spacing
```

### 반드시 사용하는 규칙
```
✅ rounded-none → 모든 버튼, 카드, 이미지, 인풋 기본값
✅ rounded-full → 태그(Tag), 뱃지(Badge)에만 허용
✅ border border-black → 모든 요소의 경계선
✅ divide-y divide-x → 리스트, 그리드 구분선
✅ bg-white → 배경 95% 이상
✅ text-black / text-gray-900 → 기본 텍스트
✅ bg-black text-white → 주요 버튼 (hover: bg-white text-black)
✅ uppercase tracking-widest → 레이블, 버튼 텍스트
```

### 색상 팔레트
```
Background  : #FFFFFF (white)
Text        : #000000 (black), #111827 (gray-900)
Border      : #000000 (black), #D1D5DB (gray-300)
Accent      : #2563EB (blue-600) — 태그 테두리, 호버 액센트 등 최소 사용
Inverse     : bg-black text-white — CTA 버튼, 특별 섹션
```

---

## 4. 데이터베이스 스키마 (Prisma)

> `prisma/schema.prisma`에 아래 내용을 그대로 작성하라.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────
// ENUM
// ─────────────────────────────────────────

enum UserRole {
  CREATOR
  SPONSOR
  ADMIN
}

enum ChannelStatus {
  PENDING
  APPROVED
  REJECTED
  SUSPENDED
}

enum ChannelType {
  ACTIVE
  UPCOMING
}

enum BriefStatus {
  SENT        // 브리프 발송
  VIEWED      // 크리에이터 열람
  ACCEPTED    // 수락
  REJECTED    // 거절
  CANCELLED   // 광고주 취소
  COMPLETED   // 협찬 완료
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum SubscriptionTier {
  FREE
  PREMIUM
}

// ─────────────────────────────────────────
// MODELS
// ─────────────────────────────────────────

model User {
  id               String           @id @default(cuid())
  email            String           @unique
  emailVerified    DateTime?
  name             String?
  password         String?
  avatarUrl        String?
  role             UserRole         @default(CREATOR)
  subscriptionTier SubscriptionTier @default(FREE)
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt

  channels          Channel[]
  sentBriefs        Brief[]          @relation("SponsorBriefs")
  receivedBriefs    Brief[]          @relation("CreatorBriefs")
  payments          Payment[]
  creditBalance     CreditBalance?
  accounts          Account[]
  sessions          Session[]
}

model Channel {
  id              String        @id @default(cuid())
  creatorId       String
  creator         User          @relation(fields: [creatorId], references: [id])

  // 기본 정보
  name            String
  description     String        @db.Text
  youtubeUrl      String?       // 모달에 링크로 노출
  thumbnailUrl    String?
  channelType     ChannelType   @default(ACTIVE)
  status          ChannelStatus @default(PENDING)

  // 채널 주요 지표 (수동 입력 — Phase 2에서 YouTube API 자동화)
  subscriberCount Int?          // 구독자수
  avgViews        Int?          // 평균 조회수
  totalVideos     Int?          // 총 영상수
  recentMonthViews Int?         // 최근 30일 조회수
  subscriberGrowth Int?         // 최근 30일 구독자 증가
  engagementRate  Float?        // 참여율 (%)
  uploadFrequency String?       // "주 2회" 등
  youtubeVerified Boolean       @default(false) // Phase 2: API 인증 여부

  // 시청자 인구통계 (크리에이터 직접 입력 — YouTube Studio에서 확인 후 기입)
  audienceGender  Json?
  // 예시: { "male": 65, "female": 35 }

  audienceAge     Json?
  // 예시: { "13-17": 5, "18-24": 40, "25-34": 35, "35-44": 15, "45+": 5 }

  audienceCountry Json?
  // 예시: { "KR": 78, "US": 8, "JP": 5, "other": 9 }

  audienceDevice  Json?
  // 예시: { "mobile": 72, "desktop": 20, "tablet": 8 }

  // 오픈 예정 채널 전용
  launchDate      DateTime?
  fundingGoal     Int?
  fundingCurrent  Int           @default(0)
  earlyBirdDeadline DateTime?

  // 카테고리 & 태그
  category        String
  tags            String[]

  // 광고 유형별 단가 + 제작기간 (JSON)
  adPrices        Json?
  // 구조:
  // {
  //   "integrated": { "price": 3500000, "period": 14, "description": "영상 내 60-90초 브랜드 광고 삽입" },
  //   "review":     { "price": 5000000, "period": 21, "description": "영상 전체 제품 리뷰" },
  //   "mention":    { "price": 1000000, "period": 7,  "description": "영상 초반/후반 15-30초 언급" },
  //   "shorts":     { "price": 1200000, "period": 5,  "description": "60초 이내 쇼츠 단독 제작" },
  //   "community":  { "price": 300000,  "period": 2,  "description": "유튜브 커뮤니티탭 홍보" },
  //   "earlyBird":  { "price": 2000000, "period": 30, "description": "UPCOMING 채널 사전 협찬" },
  //   "package":    { "price": null,    "period": null, "description": "2개 이상 유형 묶음 (협의)" }
  // }

  // 협찬 사례
  sponsorCases    Json?
  // 구조: [{ "brandName": "삼성", "logoUrl": "...", "videoThumbUrl": "...", "videoUrl": "...", "adType": "integrated", "year": 2024 }]

  // 미디어킷
  mediaKitUrl     String?       // PDF URL (Supabase Storage)

  // 관리자 액션
  adminNote       String?
  approvedAt      DateTime?
  approvedBy      String?

  isPremium       Boolean       @default(false)
  viewCount       Int           @default(0)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  briefs            Brief[]
  earlyBirdSponsors EarlyBirdSponsor[]
}

model Brief {
  id             String      @id @default(cuid())
  channelId      String
  channel        Channel     @relation(fields: [channelId], references: [id])
  sponsorId      String
  sponsor        User        @relation("SponsorBriefs", fields: [sponsorId], references: [id])
  creatorId      String
  creator        User        @relation("CreatorBriefs", fields: [creatorId], references: [id])

  // 브리프 내용 (광고주가 작성)
  brandName      String                        // 브랜드/회사명
  productInfo    String      @db.Text          // 제품/서비스 소개
  adType         String                        // 광고 유형 (integrated/review/mention/shorts/community/earlyBird/package)
  budget         Int                           // 제안 예산 (원)
  contentDirection String    @db.Text          // 희망 콘텐츠 방향
  desiredDate    DateTime?                     // 희망 집행일
  referenceUrl   String?                       // 참고 자료 URL

  status         BriefStatus @default(SENT)
  viewedAt       DateTime?
  respondedAt    DateTime?
  completedAt    DateTime?

  payment        Payment?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}

model EarlyBirdSponsor {
  id            String        @id @default(cuid())
  channelId     String
  channel       Channel       @relation(fields: [channelId], references: [id])
  sponsorId     String
  amount        Int
  paymentStatus PaymentStatus @default(PENDING)
  dodoPaymentId String?
  createdAt     DateTime      @default(now())
}

model Payment {
  id             String        @id @default(cuid())
  userId         String
  user           User          @relation(fields: [userId], references: [id])
  briefId        String?       @unique
  brief          Brief?        @relation(fields: [briefId], references: [id])
  amount         Int
  platformFee    Int           // 플랫폼 수수료 10%
  netAmount      Int           // 크리에이터 수령액
  dodoPaymentId  String?       @unique
  dodoCheckoutId String?
  status         PaymentStatus @default(PENDING)
  paidAt         DateTime?
  createdAt      DateTime      @default(now())
}

model CreditBalance {
  id             String   @id @default(cuid())
  userId         String   @unique
  user           User     @relation(fields: [userId], references: [id])
  balance        Int      @default(3)
  totalPurchased Int      @default(0)
  totalUsed      Int      @default(0)
  updatedAt      DateTime @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

---

## 5. API 라우트 명세

### 5.1 채널 API
| Method | Endpoint | Auth | 설명 |
|---|---|---|---|
| GET | `/api/channels` | Public | 승인된 채널 목록. Query: `?category=&type=&q=&page=` |
| POST | `/api/channels` | CREATOR | 채널 등록 (status: PENDING 자동) |
| GET | `/api/channels/[id]` | Public | 채널 상세 + viewCount +1 |
| PATCH | `/api/channels/[id]` | CREATOR(본인) | 채널 정보 수정 |
| DELETE | `/api/channels/[id]` | CREATOR(본인) or ADMIN | 채널 삭제 |

### 5.2 브리프 API (구 제안서)
| Method | Endpoint | Auth | 설명 |
|---|---|---|---|
| POST | `/api/briefs` | SPONSOR | 브리프 발송 (크레딧 1 차감) |
| GET | `/api/briefs` | 로그인 | 본인의 브리프 목록 (역할별) |
| GET | `/api/briefs/[id]` | 관계자 | 브리프 상세 + viewedAt 업데이트 |
| PATCH | `/api/briefs/[id]` | CREATOR | status 변경 (ACCEPTED/REJECTED) |
| POST | `/api/briefs/[id]/accept` | CREATOR | 수락 + 결제 링크 생성 |

### 5.3 어드민 API
| Method | Endpoint | Auth | 설명 |
|---|---|---|---|
| GET | `/api/admin/channels` | ADMIN | PENDING 채널 목록 |
| POST | `/api/admin/channels/[id]/approve` | ADMIN | 채널 승인 |
| POST | `/api/admin/channels/[id]/reject` | ADMIN | 채널 반려 (body: `{ reason }`) |
| GET | `/api/admin/stats` | ADMIN | 대시보드 통계 |
| GET | `/api/admin/briefs` | ADMIN | 전체 브리프 모니터링 |

### 5.4 결제 API
| Method | Endpoint | Auth | 설명 |
|---|---|---|---|
| POST | `/api/payments/create-checkout` | SPONSOR | 협찬금 에스크로 결제 세션 생성 |
| POST | `/api/payments/buy-credits` | SPONSOR | 크레딧 구매 결제 세션 |
| POST | `/api/payments/webhook` | Public(서명 검증) | Dodo Webhook 수신 및 정산 처리 |

### 5.5 결제 흐름 (에스크로 구조)

```
[협찬 결제 — 에스크로]
광고주 브리프 발송 → 크리에이터 수락
  → POST /api/payments/create-checkout
  → Dodo Checkout Session 생성 (광고주 결제)
  → 결제 완료 → Payment 레코드 생성 (status: PENDING — 에스크로 보관)
  → 크리에이터 콘텐츠 제작 + 납품
  → 어드민 또는 광고주 완료 확인
  → Brief status: COMPLETED
  → Payment status: COMPLETED
  → platformFee = amount * 0.10
  → netAmount = amount - platformFee
  → 크리에이터 정산 + 이메일 알림 (Resend)

[크레딧 구매]
광고주 → POST /api/payments/buy-credits
  → Dodo Checkout (metadata: { type: "credits", quantity: N })
  → webhook → CreditBalance.balance += N
```

---

## 6. 채널 모달 (ChannelModal) 구성 — 확정

```
섹션 1: 채널 헤더
  - 채널명 (font-black uppercase)
  - 채널 유형 뱃지 (ACTIVE / UPCOMING)
  - YouTube 채널 링크 버튼 (외부 링크, border border-black)
  - 미디어킷 다운로드 버튼 (PDF, border border-black) — 비로그인 시 로그인 유도

섹션 2: 채널 주요 지표 (1차)
  ┌──────────┬──────────┬──────────┬──────────┐
  │ 구독자수 │평균조회수│ 참여율   │업로드주기│
  └──────────┴──────────┴──────────┴──────────┘
  - 미인증 데이터: "자체 입력" 표시
  - Phase 2 인증 후: "✓ YouTube 인증" 뱃지

섹션 3: 채널 주요 지표 (2차)
  - 총 영상수, 최근 30일 조회수, 최근 30일 구독자 증가

섹션 4: 시청자 인구통계
  - 성별 비율 (예: 남성 65% / 여성 35%)
  - 연령대 분포 (예: 18-24세 40% / 25-34세 35%)
  - 주요 시청 국가 (예: 한국 78% / 미국 8%)
  - 주요 시청 기기 (예: 모바일 72% / 데스크탑 28%)
  - "크리에이터 자체 입력 데이터" 안내 문구

섹션 5: 채널 소개
  - description 텍스트

섹션 6: 광고 유형별 단가 + 제작기간
  ┌──────────────┬─────────────┬──────────┬────────────────────┐
  │ 광고 유형    │ 단가        │ 제작기간 │ 설명               │
  ├──────────────┼─────────────┼──────────┼────────────────────┤
  │ 통합 광고    │ ₩3,500,000 │ 14일     │ 영상 내 60-90초    │
  │ 제품 리뷰    │ ₩5,000,000 │ 21일     │ 영상 전체 리뷰     │
  │ 스폰서 언급  │ ₩1,000,000 │ 7일      │ 15-30초 언급       │
  │ 쇼츠 광고    │ ₩1,200,000 │ 5일      │ 쇼츠 단독 제작     │
  │ 커뮤니티     │ ₩300,000   │ 2일      │ 커뮤니티탭 홍보    │
  │ 패키지       │ 협의        │ 협의     │ 2개 이상 묶음      │
  └──────────────┴─────────────┴──────────┴────────────────────┘

섹션 7: 협찬 사례
  - 이전 협찬 브랜드명 + 영상 썸네일 + YouTube 링크

섹션 8: CTA
  - "브리프 보내기" 버튼 (bg-black text-white w-full py-4 uppercase)
  - 클릭 시 BriefModal 오픈
```

---

## 7. 브리프 폼 (BriefModal) 구성 — 확정

```
브랜드/회사명         (필수, text input)
제품/서비스 소개      (필수, textarea)
원하는 광고 유형      (필수, select — 선택 시 단가+제작기간 자동 표시)
제안 예산             (필수, number input — 크리에이터 단가 기준)
희망 콘텐츠 방향      (필수, textarea — 어떤 메시지를 전달하고 싶은지)
희망 집행일           (선택, date picker)
참고 자료 URL         (선택, text input)

제출 시:
- 크레딧 1 차감
- 크리에이터 이메일 알림 (Resend)
- 운영진(ADMIN) 알림
- Brief 레코드 생성 (status: SENT)
```

---

## 8. 인증 아키텍처 (NextAuth v5 — 절대 준수)

### 8.1 파일 분리 구조

#### `src/lib/auth.config.ts` (Edge Runtime Safe)
```typescript
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      if (isOnDashboard || isOnAdmin) {
        if (isLoggedIn) return true
        return false
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
}
```

#### `src/lib/auth.ts` (Node.js Only)
```typescript
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })
        if (!user || !user.password) return null
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        if (!isValid) return null
        return user
      },
    }),
  ],
})
```

#### `src/middleware.ts`
```typescript
import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { pathname } = req.nextUrl
  const role = (req.auth?.user as any)?.role

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (pathname.startsWith("/dashboard") && !role) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  if (pathname.startsWith("/dashboard/creator") && role !== "CREATOR" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/sponsor", req.url))
  }
  if (pathname.startsWith("/dashboard/sponsor") && role !== "SPONSOR" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/creator", req.url))
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
```

### 8.2 Role 기반 접근 제어
```
PUBLIC    : /, /guide/*, /notice, /faq, /terms, /privacy
AUTH      : /login, /signup
CREATOR   : /dashboard/creator/*
SPONSOR   : /dashboard/sponsor/*
ADMIN     : /admin/*
```

---

## 9. 핵심 컴포넌트 코드 (Reference)

### 9.1 ShuffleHero.tsx
```tsx
"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { channels } from "@/lib/mockData"

export const ShuffleHero = () => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 border-b border-black">
      <div className="flex flex-col justify-center px-8 py-16 md:py-24 border-r border-black">
        <p className="uppercase tracking-widest text-xs text-gray-500 mb-4 border border-black inline-block px-2 py-1 w-fit">
          크리에이터 × 브랜드 협찬 마켓플레이스
        </p>
        <h1 className="text-5xl md:text-7xl font-black leading-none uppercase mb-6">
          VIEW<br />POINT
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-sm">
          검증된 유튜브 채널에 직접 협찬 브리프를 보내세요.
          오픈 예정 채널을 가장 먼저 선점하는 얼리버드 스폰서십.
        </p>
        <div className="flex gap-0 border border-black w-fit">
          <a href="/signup?role=sponsor" className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors border-r border-black">
            광고주로 시작
          </a>
          <a href="/signup?role=creator" className="px-6 py-3 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors">
            채널 등록
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <ShuffleGrid />
      </div>
    </section>
  )
}

const generateSquares = () => {
  const images = channels.flatMap((c) => c.portfolioImages).slice(0, 16)
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    src: images[i % images.length],
  }))
}

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [squares, setSquares] = useState(generateSquares)

  const shuffleSquares = () => {
    setSquares(generateSquares())
    timeoutRef.current = setTimeout(shuffleSquares, 3000)
  }

  useEffect(() => {
    shuffleSquares()
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <div className="grid grid-cols-4 grid-rows-4 w-full aspect-square max-w-[450px] gap-0 border border-black">
      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          className="w-full h-full bg-gray-200 border border-black"
          style={{ backgroundImage: `url(${sq.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      ))}
    </div>
  )
}
```

### 9.2 BentoGridShowcase.tsx
```tsx
"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
}

interface BentoGridShowcaseProps {
  integration: React.ReactNode
  trackers: React.ReactNode
  statistic: React.ReactNode
  focus: React.ReactNode
  productivity: React.ReactNode
  shortcuts: React.ReactNode
  className?: string
}

export const BentoGridShowcase = ({ integration, trackers, statistic, focus, productivity, shortcuts, className }: BentoGridShowcaseProps) => {
  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible"
      className={cn("grid w-full grid-cols-1 md:grid-cols-3 md:grid-rows-3 auto-rows-[minmax(180px,auto)] border border-black", className)}>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-3 border-b md:border-b-0 md:border-r border-black p-6">{integration}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border-b md:border-r border-black p-6">{trackers}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border-b border-black p-6">{statistic}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border-b md:border-r border-black p-6">{focus}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 border-b border-black p-6">{productivity}</motion.div>
      <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 border-t border-black p-6 bg-black text-white">{shortcuts}</motion.div>
    </motion.section>
  )
}
```

---

## 10. 수익 모델

| 수익원 | 구조 | 단가 | Phase |
|---|---|---|---|
| 플랫폼 수수료 | 협찬 성사 금액의 10% (에스크로 완료 시) | 거래 기반 | 1 |
| 광고주 크레딧 | 가입 시 3크레딧 무료 / 브리프 1건당 1크레딧 | 5개 ₩49K / 20개 ₩149K / 50개 ₩299K | 1 |
| 얼리버드 수수료 | 오픈 예정 채널 후원금의 5% | 거래 기반 | 1 |
| 크리에이터 프리미엄 | 채널 검색 상단 고정 노출 | 월 ₩29,000 / $19 | 2 |

---

## 11. 환경변수

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
GOOGLE_CLIENT_ID="xxx"
GOOGLE_CLIENT_SECRET="xxx"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"
SUPABASE_SERVICE_ROLE_KEY="xxx"
DODO_API_KEY="xxx"
DODO_WEBHOOK_SECRET="xxx"
NEXT_PUBLIC_DODO_PUBLISHABLE_KEY="xxx"
RESEND_API_KEY="xxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
PLATFORM_FEE_RATE="0.10"
EARLY_BIRD_FEE_RATE="0.05"
```

---

## 12. Antigravity CLI 실행 Step

> `AGENT.md 읽고 시작해줘` → 각 Step 프롬프트 입력 → 완료 보고 → 다음 Step

### STEP 1 — 완료 ✅
### STEP 2 — 완료 ✅
### STEP 3 — 완료 ✅ (랜딩 + ChannelModal 기본 구현)

### STEP 3-1 — 레이아웃 너비 통일 + ChannelModal + BriefModal 개선

```
AGENT.md 섹션 6 (ChannelModal 구성)과 섹션 7 (BriefModal 구성)을 먼저 읽어라.

Step 3-1만 실행하라. 완료 후 반드시 멈춰라.

1. prisma/schema.prisma를 AGENT.md 섹션 4의 내용으로 전체 교체하라.
   - Proposal 모델 → Brief 모델로 교체
   - Channel 모델에 신규 필드 전부 추가
   - BriefStatus enum 추가
   - 기존 ProposalStatus enum 삭제

2. src/lib/mockData.ts의 채널 데이터에 신규 필드를 추가하라:
   - adPrices: 7개 유형 (integrated/review/mention/shorts/community/earlyBird/package) + period + description
   - audienceGender, audienceAge, audienceCountry, audienceDevice (예시 데이터)
   - totalVideos, recentMonthViews, subscriberGrowth, engagementRate
   - sponsorCases: 협찬 사례 1-2개
   - mediaKitUrl: null (Phase 1)
   - youtubeUrl: 실제 유튜브 채널 URL 형식으로 예시 입력

3. src/components/modals/ChannelModal.tsx를 AGENT.md 섹션 6 구성대로 전면 개선하라:
   - 섹션 1: 채널 헤더 (YouTube 링크 버튼 + 미디어킷 다운로드 버튼)
   - 섹션 2: 채널 주요 지표 1차 (구독자수/평균조회수/참여율/업로드주기)
   - 섹션 3: 채널 주요 지표 2차 (총영상수/최근30일조회수/구독자증가)
   - 섹션 4: 시청자 인구통계 (성별/연령/국가/기기)
   - 섹션 5: 채널 소개
   - 섹션 6: 광고 유형별 단가+제작기간 테이블 (7개 유형)
   - 섹션 7: 협찬 사례
   - 섹션 8: "브리프 보내기" CTA 버튼 → BriefModal 오픈

4. src/components/modals/BriefModal.tsx를 새로 생성하라:
   - AGENT.md 섹션 7 구성대로 작성
   - 광고 유형 선택 시 해당 단가 + 제작기간 자동 표시
   - 제출 시 POST /api/briefs 호출
   - 모든 input: rounded-none border border-black

5. src/app/(public)/page.tsx 수정:
   - BriefModal 상태 추가 (selectedChannelForBrief)
   - ChannelModal의 "브리프 보내기" 클릭 시 BriefModal 오픈

6. 전체 레이아웃 너비 통일:
   - max-w-screen-xl mx-auto px-6 컨테이너를 Navigation, ShuffleHero, ChannelGrid 전체에 적용
   - 모바일 반응형: Navigation 모바일 메뉴 숨김(md:flex), ChannelGrid 필터 overflow-x-auto

7. 커밋 및 푸시:
   git add .
   git commit -m "feat: Step 3-1 완료 — ChannelModal 전면 개선 + BriefModal 추가 + 레이아웃 통일"
   git push origin main

완료 후 보고하라: "Step 3-1 완료. Step 4를 요청하세요."
```

---

### STEP 4 — 안내 & 고객지원 페이지
### STEP 5 — 크리에이터 대시보드 (채널 등록 폼에 신규 필드 전부 포함)
### STEP 6 — 광고주 대시보드 (briefs 경로로 변경)
### STEP 7 — 어드민 패널 (briefs 모니터링 포함)
### STEP 8 — API 구현 (/api/briefs 포함)
### STEP 9 — 마무리 QA

---

## 13. MVP 개발 우선순위

```
Phase 1 (즉시 수익)
  ✅ Step 1~3: 초기화 + 인증 + 랜딩
  🔄 Step 3-1: ChannelModal 개선 + BriefModal + 레이아웃
  ⬜ Step 4~9: 나머지 전체

Phase 2 (운영 안정화)
  🔶 YouTube Data API v3 채널 지표 자동 인증
  🔶 크리에이터 프리미엄 구독
  🔶 얼리버드 자동 환불

Phase 3 (성장)
  🔷 다국어 (next-intl)
  🔷 채널 리뷰/평점
  🔷 매칭 추천 알고리즘
```

---

*문서 버전: v2.1 | 운영사: (주)라운드미디어 | Antigravity CLI 최적화*
