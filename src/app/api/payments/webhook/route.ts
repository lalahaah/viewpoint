// src/app/api/payments/webhook/route.ts
// Dodo Payments Webhook 수신 엔드포인트
// 서명 검증 후 이벤트 타입에 따라 DB 업데이트

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyWebhookSignature } from "@/lib/dodo"

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text()
    const signature = req.headers.get("dodo-signature") || req.headers.get("x-dodo-signature") || ""

    const isValid = await verifyWebhookSignature(payload, signature)
    if (!isValid) {
      console.error("Webhook 서명 검증 실패")
      return NextResponse.json({ success: false, error: "서명 검증 실패" }, { status: 401 })
    }

    const event = JSON.parse(payload)
    const { type, data } = event

    if (type === "payment.completed") {
      // 브리프 협찬금 결제 완료 처리
      const { paymentId, briefId } = data.metadata || data

      if (!paymentId || !briefId) {
        return NextResponse.json({ success: false, error: "paymentId 또는 briefId가 없습니다" }, { status: 400 })
      }

      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: paymentId },
          data: {
            status: "COMPLETED",
            paidAt: new Date(),
            dodoPaymentId: data.dodoPaymentId || data.payment_id || null,
          },
        })

        await tx.brief.update({
          where: { id: briefId },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
          },
        })
      })

      console.log(`[Webhook] payment.completed — paymentId: ${paymentId}, briefId: ${briefId}`)
    } else if (type === "credit.completed") {
      // 크레딧 구매 완료 처리
      const { userId, quantity } = data.metadata || data

      if (!userId || !quantity) {
        return NextResponse.json({ success: false, error: "userId 또는 quantity가 없습니다" }, { status: 400 })
      }

      const qty = Number(quantity)

      await prisma.$transaction(async (tx) => {
        await tx.creditBalance.upsert({
          where: { userId },
          create: {
            userId,
            balance: qty,
            totalPurchased: qty,
            totalUsed: 0,
          },
          update: {
            balance: { increment: qty },
            totalPurchased: { increment: qty },
          },
        })
      })

      console.log(`[Webhook] credit.completed — userId: ${userId}, quantity: ${qty}`)
    } else {
      // 알 수 없는 이벤트 타입은 무시
      console.log(`[Webhook] 처리하지 않는 이벤트 타입: ${type}`)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("webhook error:", err)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다" }, { status: 500 })
  }
}
