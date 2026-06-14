# AGENT.md — ViewPoint SaaS 마스터 문서 v2.0
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
ORM           : Prisma
Auth          : NextAuth.js v5 — auth.config.ts (Edge-safe) + auth.ts (Node.js) 분리 필수
Payment       : Dodo Payments (Webhook 기반 정산)
File Storage  : Supabase Storage
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
    const globalForPrisma = global as unknown as { prisma: PrismaClient }
    export const prisma = globalForPrisma.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

[4] Dodo Payments bearerToken:
    sk_live_XXXX 형태의 키에서 "sk_live_" prefix를 제거하지 말고 그대로 사용
    단, SDK bearerToken 파라미터에는 전체 키를 그대로 전달

[5] Tailwind 금지 클래스:
    p-4.5, px-4.5 등 .5 단위 커스텀 패딩 — zero padding 렌더링됨 (사용 금지)

[6] 환경변수 — .env.local만 사용, .env 파일 절대 커밋 금지
```

---

## 2. 폴더 구조 (절대 준수)

```
viewpoint/
├── next.config.js                     # ⚠️ .js (CommonJS) 필수
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx               # / 메인 랜딩
│   │   │   ├── guide/
│   │   │   │   ├── creator/page.tsx
│   │   │   │   └── sponsor/page.tsx
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
│   │   │       │   ├── proposals/page.tsx
│   │   │       │   └── earnings/page.tsx
│   │   │       └── sponsor/
│   │   │           ├── layout.tsx
│   │   │           ├── page.tsx
│   │   │           ├── proposals/page.tsx
│   │   │           └── billing/page.tsx
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── channels/page.tsx
│   │   │       ├── users/page.tsx
│   │   │       ├── proposals/page.tsx
│   │   │       └── settlements/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── channels/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── proposals/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       ├── route.ts
│   │       │       └── accept/route.ts
│   │       ├── admin/
│   │       │   ├── channels/[id]/approve/route.ts
│   │       │   ├── channels/[id]/reject/route.ts
│   │       │   └── stats/route.ts
│   │       ├── payments/
│   │       │   ├── create-checkout/route.ts
│   │       │   ├── buy-credits/route.ts
│   │       │   └── webhook/route.ts
│   │       └── upload/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── landing/
│   │   │   ├── ShuffleHero.tsx
│   │   │   ├── ChannelGrid.tsx
│   │   │   └── ChannelCard.tsx
│   │   ├── modals/
│   │   │   └── ChannelModal.tsx
│   │   ├── shared/
│   │   │   ├── BentoGridShowcase.tsx
│   │   │   └── StatusBadge.tsx
│   │   └── admin/
│   │       ├── AdminSidebar.tsx
│   │       └── StatsGrid.tsx
│   ├── lib/
│   │   ├── mockData.ts
│   │   ├── prisma.ts                  # ⚠️ 싱글톤 패턴 필수
│   │   ├── auth.config.ts             # ⚠️ Edge-safe (NEW)
│   │   ├── auth.ts                    # ⚠️ Node.js only (PrismaAdapter)
│   │   ├── dodo.ts
│   │   └── utils.ts
│   ├── middleware.ts                  # ⚠️ auth.config.ts import (auth.ts 금지)
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

enum ProposalStatus {
  SENT
  VIEWED
  ACCEPTED
  REJECTED
  CANCELLED
  COMPLETED
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

model User {
  id               String            @id @default(cuid())
  email            String            @unique
  emailVerified    DateTime?
  name             String?
  avatarUrl        String?
  role             UserRole          @default(CREATOR)
  subscriptionTier SubscriptionTier  @default(FREE)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt

  channels          Channel[]
  proposals         Proposal[]       @relation("SponsorProposals")
  receivedProposals Proposal[]       @relation("CreatorProposals")
  payments          Payment[]
  creditBalance     CreditBalance?
  accounts          Account[]
  sessions          Session[]
}

model Channel {
  id              String        @id @default(cuid())
  creatorId       String
  creator         User          @relation(fields: [creatorId], references: [id])
  name            String
  description     String        @db.Text
  youtubeUrl      String?
  thumbnailUrl    String?
  channelType     ChannelType   @default(ACTIVE)
  status          ChannelStatus @default(PENDING)
  subscriberCount Int?
  avgViews        Int?
  uploadFrequency String?
  launchDate      DateTime?
  fundingGoal     Int?
  fundingCurrent  Int           @default(0)
  earlyBirdDeadline DateTime?
  category        String
  tags            String[]
  adPrices        Json?
  portfolioImages String[]
  adminNote       String?
  approvedAt      DateTime?
  approvedBy      String?
  isPremium       Boolean       @default(false)
  viewCount       Int           @default(0)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  proposals         Proposal[]
  earlyBirdSponsors EarlyBirdSponsor[]
}

model Proposal {
  id             String         @id @default(cuid())
  channelId      String
  channel        Channel        @relation(fields: [channelId], references: [id])
  sponsorId      String
  sponsor        User           @relation("SponsorProposals", fields: [sponsorId], references: [id])
  creatorId      String
  creator        User           @relation("CreatorProposals", fields: [creatorId], references: [id])
  title          String
  message        String         @db.Text
  adType         String
  proposedAmount Int
  deadline       DateTime?
  status         ProposalStatus @default(SENT)
  viewedAt       DateTime?
  respondedAt    DateTime?
  completedAt    DateTime?
  payment        Payment?
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
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
  proposalId     String?       @unique
  proposal       Proposal?     @relation(fields: [proposalId], references: [id])
  amount         Int
  platformFee    Int
  netAmount      Int
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

### 5.2 제안서 API
| Method | Endpoint | Auth | 설명 |
|---|---|---|---|
| POST | `/api/proposals` | SPONSOR | 제안서 발송 (크레딧 1 차감) |
| GET | `/api/proposals` | 로그인 | 본인의 제안서 목록 |
| GET | `/api/proposals/[id]` | 관계자 | 제안서 상세. viewedAt 업데이트 |
| PATCH | `/api/proposals/[id]` | CREATOR | status 변경 (ACCEPTED/REJECTED) |
| POST | `/api/proposals/[id]/accept` | CREATOR | 수락 + 결제 링크 생성 |

### 5.3 어드민 API
| Method | Endpoint | Auth | 설명 |
|---|---|---|---|
| GET | `/api/admin/channels` | ADMIN | PENDING 채널 목록 |
| POST | `/api/admin/channels/[id]/approve` | ADMIN | 채널 승인 |
| POST | `/api/admin/channels/[id]/reject` | ADMIN | 채널 반려 (body: `{ reason }`) |
| GET | `/api/admin/stats` | ADMIN | 대시보드 통계 |

### 5.4 결제 API
| Method | Endpoint | Auth | 설명 |
|---|---|---|---|
| POST | `/api/payments/create-checkout` | SPONSOR | 협찬금 결제 세션 생성 |
| POST | `/api/payments/buy-credits` | SPONSOR | 크레딧 구매 결제 세션 |
| POST | `/api/payments/webhook` | Public(서명 검증) | Dodo Webhook 수신 및 정산 처리 |

### 5.5 결제 흐름

```
[협찬 결제]
광고주 → 제안서 수락 확인
  → POST /api/payments/create-checkout
  → Dodo Checkout Session 생성
  → 리다이렉트
  → POST /api/payments/webhook (Dodo → 서버)
  → 서명 검증 → Payment COMPLETED
  → platformFee = amount * 0.10
  → netAmount = amount - platformFee
  → Proposal status: COMPLETED
  → 크리에이터 이메일 알림 (Resend)

[크레딧 구매]
광고주 → POST /api/payments/buy-credits
  → Dodo Checkout Session (metadata: { type: "credits", quantity: N })
  → webhook → CreditBalance.balance += N
```

---

## 6. 인증 아키텍처 (NextAuth v5 — 절대 준수)

### 6.1 파일 분리 구조

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

#### `src/lib/auth.ts` (Node.js Only — PrismaAdapter)
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

> ⚠️ User 모델에 `password String?` 필드 추가 필요 (Credentials 로그인용)

#### `src/middleware.ts`
```typescript
import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"  // auth.ts 절대 금지
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

### 6.2 Role 기반 접근 제어
```
PUBLIC    : /, /guide/*, /notice, /faq, /terms, /privacy
AUTH      : /login, /signup
CREATOR   : /dashboard/creator/*
SPONSOR   : /dashboard/sponsor/*
ADMIN     : /admin/*
```

---

## 7. 핵심 컴포넌트 코드 (Reference)

### 7.1 ShuffleHero.tsx
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
          검증된 유튜브 채널에 직접 협찬 제안을 보내세요.
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

const SquareGrid = ({ squares }: { squares: { id: number; src: string }[] }) =>
  squares.map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full bg-gray-200 border border-black"
      style={{ backgroundImage: `url(${sq.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
    />
  ))

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
      <SquareGrid squares={squares} />
    </div>
  )
}
```

### 7.2 BentoGridShowcase.tsx
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

export const BentoGridShowcase = ({
  integration, trackers, statistic, focus, productivity, shortcuts, className,
}: BentoGridShowcaseProps) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-3 md:grid-rows-3 auto-rows-[minmax(180px,auto)] border border-black",
        className
      )}
    >
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

## 8. 수익 모델 및 결제 구조

### 8.1 수익 스트림
| 수익원 | 구조 | 금액 |
|---|---|---|
| **플랫폼 수수료** | 협찬 성사 금액의 10% | 거래 기반 |
| **크리에이터 프리미엄** | 채널 검색 상단 고정 노출 | 월 29,000원 / $19 |
| **광고주 크레딧** | 가입 시 3크레딧 무료, 이후 유료 | 1크레딧 = 제안서 1건 |
| **크레딧 패키지** | 5크레딧 49,000원 / 20크레딧 149,000원 / 50크레딧 299,000원 | 번들 할인 |
| **얼리버드 수수료** | 오픈 예정 채널 후원금의 5% | 거래 기반 |

### 8.2 크레딧 시스템 로직
```
신규 가입(SPONSOR) → CreditBalance 생성 (balance: 3)
제안서 발송 → balance -= 1 (잔액 0이면 /dashboard/sponsor/billing 리다이렉트)
크레딧 구매 → Dodo Checkout → Webhook → balance += 구매량
```

### 8.3 얼리버드 플로우
```
UPCOMING 채널 등록 (fundingGoal, earlyBirdDeadline 설정)
  → 광고주 얼리버드 참여 → Dodo 결제
  → EarlyBirdSponsor 레코드 생성, fundingCurrent += amount
  → fundingCurrent >= fundingGoal 달성 시 → 크리에이터 알림 이메일
  → earlyBirdDeadline 초과 + 미달성 → 자동 환불 (Dodo Refund API)
```

---

## 9. 환경변수

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="xxx"
GOOGLE_CLIENT_SECRET="xxx"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"
SUPABASE_SERVICE_ROLE_KEY="xxx"

# Dodo Payments
DODO_API_KEY="xxx"
DODO_WEBHOOK_SECRET="xxx"
NEXT_PUBLIC_DODO_PUBLISHABLE_KEY="xxx"

# Resend (Email)
RESEND_API_KEY="xxx"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
PLATFORM_FEE_RATE="0.10"
EARLY_BIRD_FEE_RATE="0.05"
```

---

## 10. Antigravity CLI 실행 Step 명령

> **사용법**: 프로젝트 루트에서 AGENT.md를 먼저 읽힌 후 아래 Step을 순서대로 입력하라.
> `AGENT.md 읽고 시작해줘` → 각 Step 프롬프트 입력 → 빌드 오류 확인 → 다음 Step

---

### STEP 1 — 프로젝트 초기화 & 기반 구축

```
Read AGENT.md carefully. This is your source of truth.

Execute Step 1 only. Stop after completing Step 1.

1. Initialize Next.js 14 project with TypeScript and App Router at current directory.
   Use: npx create-next-app@14 . --typescript --app --tailwind --eslint --src-dir --import-alias "@/*"

2. Install dependencies:
   npm install framer-motion zustand lucide-react @prisma/client prisma next-auth@beta @auth/prisma-adapter bcryptjs resend clsx tailwind-merge
   npm install -D @types/bcryptjs

3. Create next.config.js (CommonJS format — NOT next.config.ts):
   /** @type {import('next').NextConfig} */
   const nextConfig = {}
   module.exports = nextConfig

4. Delete next.config.ts if it exists.

5. Write prisma/schema.prisma exactly as in AGENT.md Section 4.
   IMPORTANT: Add `password String?` field to User model for Credentials login.

6. Create src/lib/prisma.ts with singleton pattern (AGENT.md Section 1 주의사항 [3]).

7. Create src/lib/utils.ts:
   import { clsx, type ClassValue } from "clsx"
   import { tailwindMerge } from "tailwind-merge"
   export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

8. Create src/lib/mockData.ts with 12 mock channels: 8 ACTIVE, 4 UPCOMING.
   Each ACTIVE channel: id, name, category, tags[], channelType:"ACTIVE", subscriberCount, avgViews, uploadFrequency, adPrices:{integrated, shorts}, portfolioImages:[3 unsplash urls], description
   Each UPCOMING channel: id, name, category, tags[], channelType:"UPCOMING", fundingGoal, fundingCurrent, earlyBirdDeadline(ISO string), adPrices:{earlyBird}, portfolioImages:[3 unsplash urls], description

9. Create src/components/layout/Navigation.tsx:
   Editorial style: border-b border-black, bg-white, no shadows.
   Left: "VIEWPOINT" uppercase font-black tracking-widest
   Center: nav links (홈, 채널탐색, 크리에이터 가이드, 광고주 가이드) — uppercase text-xs tracking-widest
   Right: "로그인" (border border-black px-4 py-2) + "시작하기" (bg-black text-white px-4 py-2)

10. Create src/components/layout/Footer.tsx:
    border-t border-black, grid layout, company: (주)라운드미디어

11. Create src/app/layout.tsx wrapping children with Navigation and Footer.

When done, report: "Step 1 완료. 다음 Step을 요청하세요."
```

---

### STEP 2 — 인증 시스템 구축 (Auth — Step 1 직후 필수)

```
Read AGENT.md Section 6 carefully before starting.

Execute Step 2 only. Stop after completing Step 2.

1. Create src/lib/auth.config.ts — EXACTLY as in AGENT.md Section 6.1 (Edge-safe, NO Prisma import).

2. Create src/lib/auth.ts — EXACTLY as in AGENT.md Section 6.1 (Node.js, PrismaAdapter).

3. Create src/app/api/auth/[...nextauth]/route.ts:
   import { handlers } from "@/lib/auth"
   export const { GET, POST } = handlers

4. Create src/middleware.ts — EXACTLY as in AGENT.md Section 6.1.
   CRITICAL: Import from "@/lib/auth.config" NOT "@/lib/auth"

5. Create src/store/authStore.ts with Zustand:
   Store: { user: null | { id, email, name, role }, setUser, clearUser }

6. Create src/app/(auth)/login/page.tsx:
   - "use client"
   - Editorial form: border border-black inputs, labels uppercase tracking-widest
   - Email + Password fields (rounded-none border border-black)
   - "이메일로 로그인" button (bg-black text-white w-full py-3 uppercase border border-black)
   - "구글로 로그인" button (border border-black w-full py-3 uppercase)
   - Divider: border-b border-black with "OR" label
   - After login: redirect by role → /dashboard/creator or /dashboard/sponsor
   - Link to /signup

7. Create src/app/(auth)/signup/page.tsx:
   - "use client"
   - Role selector at top: two large boxes side by side (each border border-black p-8 cursor-pointer)
     Left: "CREATOR" with icon, Right: "SPONSOR" — selected state: bg-black text-white
   - Fields below: name, email, password, confirm password (all rounded-none border border-black)
   - Submit button: bg-black text-white w-full py-3 uppercase
   - On submit: POST /api/auth/register (create User + CreditBalance if SPONSOR)
   - Accept ?role=creator or ?role=sponsor query param to pre-select role

8. Create src/app/api/auth/register/route.ts:
   POST handler: hash password with bcrypt, create User, if role=SPONSOR create CreditBalance{balance:3}
   Return: { success: true, user: { id, email, role } }

When done, report: "Step 2 완료. 다음 Step을 요청하세요."
```

---

### STEP 3 — 메인 랜딩 페이지

```
Read AGENT.md Section 3 (Design System) and Section 7 (Components).

Execute Step 3 only. Stop after completing Step 3.

1. Create src/components/landing/ShuffleHero.tsx — EXACTLY as in AGENT.md Section 7.1.

2. Create src/store/filterStore.ts with Zustand:
   state: { category: "", channelType: "ALL", searchQuery: "" }
   actions: setCategory, setChannelType, setSearchQuery

3. Create src/components/landing/ChannelCard.tsx:
   Props: channel (from mockData type)
   - No shadows, rounded-none, border border-black, cursor-pointer
   - Thumbnail: aspect-video object-cover border-b border-black (use portfolioImages[0])
   - Category tag: rounded-full border border-black text-xs px-2 py-0.5 uppercase
   - Channel name: font-black uppercase text-lg px-4 pt-3
   - ACTIVE: subscriber count (formatted: "12.5만"), avg views
   - UPCOMING: "UPCOMING" badge (bg-black text-white text-xs uppercase px-2 py-0.5 rounded-full)
     + fundingCurrent/fundingGoal progress (h-1 bg-black, container h-1 bg-gray-200 border-none)
     + earlyBirdDeadline countdown (D-N 형식)
   - Ad prices: top 2 prices listed (uppercase text-xs text-gray-500 + font-black text-sm)
   - Hover: border-l-4 border-blue-600 (transition-all)
   - onClick: open ChannelModal

4. Create src/components/landing/ChannelGrid.tsx:
   - "use client", uses filterStore
   - Filter bar (border-b border-black py-4):
     * Category pills: ALL + 뷰티, 테크, 게임, 라이프, 푸드, 여행 (border border-black, active: bg-black text-white)
     * Type toggle: ALL / 운영중 / 오픈예정 (border border-black group, active: bg-black text-white)
     * Search input: border border-black rounded-none px-4 py-2
   - Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, each cell border-r border-b border-black
   - Filter logic applies to channels from mockData

5. Create src/components/modals/ChannelModal.tsx:
   - "use client", Framer Motion AnimatePresence
   - Backdrop: fixed inset-0 bg-black/60
   - Panel: slides from right (x: "100%" → 0), bg-white border-l border-black, max-w-2xl w-full, rounded-none
   - Sections (divide-y divide-black):
     * Header: channel name font-black uppercase text-2xl + X close button (border border-black p-2)
     * Thumbnail scroll: horizontal, each image border border-black
     * Stats row: grid-cols-3 divide-x divide-black, label uppercase text-xs text-gray-500, value font-black text-xl
     * Ad price table: border border-black, thead bg-black text-white, tbody divide-y divide-black
     * UPCOMING only: fundingGoal progress section + earlyBird CTA
   - CTA: "제안서 보내기" bg-black text-white w-full py-4 uppercase tracking-widest border border-black hover:bg-white hover:text-black

6. Create src/app/(public)/page.tsx:
   - ShuffleHero at top
   - Section header "CHANNELS" uppercase font-black border-b border-black px-8 py-4
   - ChannelGrid below
   - ChannelModal (rendered globally, triggered by card click)

When done, report: "Step 3 완료. 다음 Step을 요청하세요."
```

---

### STEP 4 — 안내 & 고객지원 페이지

```
Execute Step 4 only. Stop after completing Step 4.

1. Create src/components/shared/BentoGridShowcase.tsx — EXACTLY as in AGENT.md Section 7.2.

2. Create src/components/shared/StatusBadge.tsx:
   Props: status (string)
   Map: PENDING→"심사중", APPROVED→"승인", REJECTED→"반려", SENT→"발송", VIEWED→"열람", ACCEPTED→"수락", COMPLETED→"완료"
   All: uppercase text-xs tracking-widest px-2 py-0.5 rounded-full border border-black

3. Create src/app/(public)/guide/creator/page.tsx:
   - Hero: "CREATOR GUIDE" editorial h1, border-b border-black
   - BentoGridShowcase: 6 creator benefits
   - Process steps (numbered 01-06, divide-y border-black): 채널등록 → 심사 → 승인 → 제안수신 → 수락 → 정산
   - Pricing: PREMIUM subscription box (border border-black)
   - CTA: "지금 채널 등록하기" → /signup?role=creator

4. Create src/app/(public)/guide/sponsor/page.tsx:
   - Similar structure
   - Explain credit system + earlyBird
   - CTA: "광고주로 시작하기" → /signup?role=sponsor

5. Create src/app/(public)/notice/page.tsx, faq/page.tsx, terms/page.tsx, privacy/page.tsx:
   - All: editorial header uppercase font-black border-b border-black
   - FAQ: accordion with border border-black (no rounded), click-to-expand with Framer Motion
   - Terms/Privacy: company info (주)라운드미디어

When done, report: "Step 4 완료. 다음 Step을 요청하세요."
```

---

### STEP 5 — 크리에이터 대시보드

```
Execute Step 5 only. Stop after completing Step 5.

Create src/app/(dashboard)/dashboard/creator/ pages:

1. layout.tsx: sidebar (border-r border-black w-64) + main content
   Sidebar links: 홈(/dashboard/creator), 내 채널(/dashboard/creator/channel),
                  받은 제안서(/dashboard/creator/proposals), 수익/정산(/dashboard/creator/earnings)
   Each link: uppercase text-xs tracking-widest border-b border-black px-6 py-4
   Active: border-l-4 border-black font-black

2. page.tsx (홈):
   Stats grid: grid grid-cols-2 md:grid-cols-4 border border-black divide-x divide-y divide-black
   Stats: 총 채널 수, 총 제안 수신, 이번달 수익(₩), 채널 총 조회수
   Recent proposals: divide-y divide-black list

3. channel/page.tsx:
   "새 채널 등록" button (border border-black uppercase)
   Channel list (divide-y divide-black): status badge + name + edit/delete
   Registration: inline form (toggle show/hide) — all Channel schema fields
   channelType toggle (ACTIVE/UPCOMING), conditional fields for UPCOMING

4. proposals/page.tsx:
   Table: border border-black, thead bg-black text-white, divide-y divide-black
   Columns: 광고주, 채널명, 광고유형, 제안금액, 상태, 날짜, 액션
   Actions: "수락" (bg-black text-white border border-black) | "거절" (border border-black)

5. earnings/page.tsx:
   Summary grid (border border-black)
   Payment history table: 날짜, 광고주, 금액, 수수료(10%), 수령액, 상태

When done, report: "Step 5 완료. 다음 Step을 요청하세요."
```

---

### STEP 6 — 광고주 대시보드

```
Execute Step 6 only. Stop after completing Step 6.

Create src/app/(dashboard)/dashboard/sponsor/ pages:

1. layout.tsx: same sidebar pattern
   Links: 홈, 보낸 제안서, 크레딧/결제, 얼리버드 후원내역

2. page.tsx: stats (잔여 크레딧, 보낸 제안서, 성사된 협찬, 총 집행금액)

3. proposals/page.tsx:
   Table: 채널명, 제안제목, 금액, 상태(chip), 날짜
   Click row → ChannelModal

4. billing/page.tsx:
   Current balance: large number in border border-black box
   Credit packages (3 cards, border border-black):
   - STARTER: 5크레딧 / ₩49,000
   - GROWTH: 20크레딧 / ₩149,000 (BEST VALUE badge rounded-full)
   - PRO: 50크레딧 / ₩299,000
   Each card "구매하기" → POST /api/payments/buy-credits → redirect Dodo
   Payment history table (divide-y divide-black)

When done, report: "Step 6 완료. 다음 Step을 요청하세요."
```

---

### STEP 7 — 어드민 패널

```
Execute Step 7 only. Stop after completing Step 7.

Create src/app/(admin)/admin/ pages. ADMIN role only (enforced by middleware).

1. layout.tsx: admin sidebar (border-r border-black bg-white)
   Links: 대시보드, 채널 심사, 회원 관리, 제안서 현황, 정산 관리
   Header: "VIEWPOINT ADMIN" uppercase border-b border-black

2. page.tsx: stats grid + PENDING channels list (latest 5)

3. channels/page.tsx:
   Tab: PENDING | APPROVED | REJECTED (border border-black, active: bg-black text-white)
   Table: 채널명, 크리에이터, 카테고리, 유형, 구독자수, 등록일, 액션
   PENDING: "승인" | "반려" buttons
   반려 → inline textarea for reason

4. users/page.tsx: search bar + table

5. settlements/page.tsx: payment records table + total summary

When done, report: "Step 7 완료. 다음 Step을 요청하세요."
```

---

### STEP 8 — API 라우트 구현

```
Read AGENT.md Section 5 carefully.

Execute Step 8 only. Stop after completing Step 8.

Implement all API routes. Rules for all:
- Check session and role before executing
- Return: { success: boolean, data?: any, error?: string }
- Use Prisma transactions for multiple DB writes
- Webhook: verify Dodo signature before processing

Priority:
1. src/app/api/channels/route.ts — GET(list, APPROVED only, with filters), POST(create, status:PENDING)
2. src/app/api/channels/[id]/route.ts — GET(detail + viewCount++), PATCH, DELETE
3. src/app/api/proposals/route.ts — POST(send, deduct 1 credit), GET(by role)
4. src/app/api/proposals/[id]/route.ts — GET(+ viewedAt update), PATCH
5. src/app/api/proposals/[id]/accept/route.ts — POST(accept + trigger payment)
6. src/app/api/admin/channels/[id]/approve/route.ts — POST
7. src/app/api/admin/channels/[id]/reject/route.ts — POST (body: { reason })
8. src/app/api/admin/stats/route.ts — GET
9. src/app/api/payments/create-checkout/route.ts — Dodo checkout session for sponsorship
10. src/app/api/payments/buy-credits/route.ts — Dodo checkout for credit purchase (metadata: {type:"credits", quantity:N})
11. src/app/api/payments/webhook/route.ts — verify signature, handle payment.completed + credit.purchased events
    platformFee = amount * parseFloat(process.env.PLATFORM_FEE_RATE!)
    netAmount = amount - platformFee
12. src/app/api/upload/route.ts — Supabase Storage upload, return public URL

When done, report: "Step 8 완료. 다음 Step을 요청하세요."
```

---

### STEP 9 — 마무리 & 품질 검사

```
Execute Step 9 (Final QA). Stop after completing Step 9.

1. Run: npx tsc --noEmit → fix ALL TypeScript errors
2. Run: npx next build → fix ALL build errors
3. Design system audit:
   - grep -r "shadow" src/ --include="*.tsx" (must be zero results except StatusBadge color dots)
   - grep -r "rounded-lg\|rounded-xl\|rounded-2xl" src/ --include="*.tsx" (must be zero)
   - grep -r "border-gray-200\|border-gray-300" src/ --include="*.tsx" → replace with border-black
4. Verify middleware.ts imports from auth.config (not auth.ts)
5. Verify next.config.js is CommonJS format
6. Create README.md: project overview, env setup, npm run dev, npx prisma migrate dev
7. Create .env.local.example with all keys from AGENT.md Section 9 (no real values)

When done, report: "Step 9 완료. ViewPoint MVP 빌드 완료."
```

---

## 11. MVP 개발 우선순위

```
Phase 1 (즉시 수익 가능)
  ✅ Step 1: 프로젝트 초기화
  ✅ Step 2: 인증 (Auth 선행 필수)
  ✅ Step 3: 랜딩 + 채널 탐색 + 모달
  ✅ Step 6 billing: 크레딧 구매 (Dodo Payments)
  ✅ Step 8: 핵심 API

Phase 2 (운영 안정화)
  🔶 Step 5: 크리에이터 대시보드
  🔶 Step 7: 어드민 패널
  🔶 얼리버드 자동 환불 로직

Phase 3 (성장)
  🔷 크리에이터 PREMIUM 구독
  🔷 다국어(i18n) — next-intl
  🔷 YouTube Data API v3 연동 (구독자수 자동 인증)
  🔷 채널 리뷰/평점 시스템
```

---

*문서 버전: v2.0 | 작성: (주)라운드미디어 + Next Engine | Antigravity CLI 최적화*
