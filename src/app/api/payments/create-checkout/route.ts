// src/app/api/payments/create-checkout/route.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createCheckoutSession } from "@/lib/dodo"

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
    const { briefId } = body

    if (!briefId) {
      return NextResponse.json({ success: false, error: "briefId가 필요합니다" }, { status: 400 })
    }

    // Brief 조회 및 ACCEPTED 상태 확인
    const brief = await prisma.brief.findUnique({
      where: { id: briefId },
    })

    if (!brief) {
      return NextResponse.json({ success: false, error: "브리프를 찾을 수 없습니다" }, { status: 404 })
    }

    if (brief.sponsorId !== session.user.id) {
      return NextResponse.json({ success: false, error: "접근 권한이 없습니다" }, { status: 403 })
    }

    if (brief.status !== "ACCEPTED") {
      return NextResponse.json(
        { success: false, error: "수락된 브리프만 결제할 수 있습니다 (현재 상태: " + brief.status + ")" },
        { status: 400 }
      )
    }

    // 이미 Payment가 있는지 확인
    const existingPayment = await prisma.payment.findUnique({
      where: { briefId },
    })
    if (existingPayment && existingPayment.status === "COMPLETED") {
      return NextResponse.json({ success: false, error: "이미 결제 완료된 브리프입니다" }, { status: 400 })
    }

    const amount = brief.budget
    const platformFee = Math.round(amount * 0.1)
    const netAmount = amount - platformFee

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Payment 레코드 생성 (PENDING)
    const payment = await prisma.payment.upsert({
      where: { briefId },
      create: {
        userId: session.user.id,
        briefId,
        amount,
        platformFee,
        netAmount,
        status: "PENDING",
      },
      update: {
        status: "PENDING",
      },
    })

    // Dodo 체크아웃 세션 생성
    const checkout = await createCheckoutSession({
      amount,
      metadata: {
        type: "brief_payment",
        paymentId: payment.id,
        briefId,
        userId: session.user.id,
      },
      successUrl: `${appUrl}/dashboard/sponsor/briefs?payment=success`,
      cancelUrl: `${appUrl}/dashboard/sponsor/briefs?payment=cancelled`,
    })

    // dodoCheckoutId 업데이트
    await prisma.payment.update({
      where: { id: payment.id },
      data: { dodoCheckoutId: checkout.sessionId },
    })

    return NextResponse.json({
      success: true,
      data: { checkoutUrl: checkout.checkoutUrl },
    })
  } catch (err) {
    console.error("create-checkout error:", err)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다" }, { status: 500 })
  }
}
