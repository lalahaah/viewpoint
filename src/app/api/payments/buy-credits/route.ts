// src/app/api/payments/buy-credits/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createCheckoutSession } from "@/lib/dodo"

const CREDIT_PACKAGES = {
  STARTER: { credits: 5, amount: 49000 },
  GROWTH: { credits: 20, amount: 149000 },
  PRO: { credits: 50, amount: 299000 },
} as const

type PackageKey = keyof typeof CREDIT_PACKAGES

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "인증이 필요합니다" }, { status: 401 })
    }
    if (session.user.role !== "SPONSOR") {
      return NextResponse.json({ success: false, error: "광고주 권한이 필요합니다" }, { status: 403 })
    }

    const body = await req.json()
    const { package: pkg } = body as { package: PackageKey }

    if (!pkg || !CREDIT_PACKAGES[pkg]) {
      return NextResponse.json(
        { success: false, error: "유효하지 않은 패키지입니다. STARTER | GROWTH | PRO 중 하나를 선택하세요." },
        { status: 400 }
      )
    }

    const { credits: quantity, amount } = CREDIT_PACKAGES[pkg]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const checkout = await createCheckoutSession({
      amount,
      metadata: {
        type: "credits",
        userId: session.user.id,
        package: pkg,
        quantity,
        amount,
      },
      successUrl: `${appUrl}/dashboard/sponsor/billing?credit=success`,
      cancelUrl: `${appUrl}/dashboard/sponsor/billing?credit=cancelled`,
    })

    return NextResponse.json({
      success: true,
      data: { checkoutUrl: checkout.checkoutUrl },
    })
  } catch (err) {
    console.error("buy-credits error:", err)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다" }, { status: 500 })
  }
}
