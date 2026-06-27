/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "인증되지 않은 사용자입니다." }, { status: 401 })
  }

  const role = (session.user as any).role
  if (role !== "SPONSOR") {
    return NextResponse.json({ success: false, error: "광고주 권한이 필요합니다." }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { channelId, brandName, productInfo, adType, budget, contentDirection, desiredDate, referenceUrl } = body

    if (!channelId || !brandName || !productInfo || !adType || !budget || !contentDirection) {
      return NextResponse.json({ success: false, error: "필수 정보가 누락되었습니다." }, { status: 400 })
    }

    const sponsorId = session.user.id
    if (!sponsorId) {
      return NextResponse.json({ success: false, error: "사용자 ID를 찾을 수 없습니다." }, { status: 400 })
    }

    // 트랜잭션 처리
    const result = await prisma.$transaction(async (tx) => {
      // 1) sponsor의 CreditBalance 조회
      let creditBalance = await tx.creditBalance.findUnique({
        where: { userId: sponsorId }
      })

      // 가입 시 3크레딧 기본 생성이 누락되었을 수 있으므로 대비
      if (!creditBalance) {
        creditBalance = await tx.creditBalance.create({
          data: { userId: sponsorId, balance: 3 }
        })
      }

      if (creditBalance.balance <= 0) {
        throw new Error("크레딧이 부족합니다")
      }

      // 2) channel 조회해서 creatorId 가져오기
      const channel = await tx.channel.findUnique({
        where: { id: channelId }
      })

      if (!channel) {
        throw new Error("채널을 찾을 수 없습니다")
      }

      const creatorId = channel.creatorId

      // 3) Brief 생성
      const brief = await tx.brief.create({
        data: {
          channelId,
          sponsorId,
          creatorId,
          brandName,
          productInfo,
          adType,
          budget: Number(budget),
          contentDirection,
          desiredDate: desiredDate ? new Date(desiredDate) : null,
          referenceUrl,
          status: "SENT"
        }
      })

      // 4) CreditBalance 차감
      await tx.creditBalance.update({
        where: { userId: sponsorId },
        data: {
          balance: { decrement: 1 },
          totalUsed: { increment: 1 }
        }
      })

      return brief
    })

    return NextResponse.json({ success: true, data: { brief: result } })

  } catch (error: any) {
    console.error("Brief creation error:", error)
    if (error.message === "크레딧이 부족합니다") {
      return NextResponse.json({ success: false, error: "크레딧이 부족합니다" }, { status: 400 })
    }
    if (error.message === "채널을 찾을 수 없습니다") {
      return NextResponse.json({ success: false, error: "채널을 찾을 수 없습니다" }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "인증되지 않은 사용자입니다." }, { status: 401 })
  }

  const role = (session.user as any).role
  const userId = session.user.id

  if (!userId) {
    return NextResponse.json({ success: false, error: "사용자 ID를 찾을 수 없습니다." }, { status: 400 })
  }

  try {
    let briefs = []

    if (role === "SPONSOR") {
      briefs = await prisma.brief.findMany({
        where: { sponsorId: userId },
        include: {
          channel: {
            select: {
              name: true,
              youtubeUrl: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      })
    } else if (role === "CREATOR") {
      briefs = await prisma.brief.findMany({
        where: { creatorId: userId },
        include: {
          channel: {
            select: {
              name: true,
              youtubeUrl: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      })
    } else if (role === "ADMIN") {
      briefs = await prisma.brief.findMany({
        include: {
          channel: {
            select: {
              name: true,
              youtubeUrl: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      })
    } else {
      return NextResponse.json({ success: false, error: "권한이 없습니다." }, { status: 403 })
    }

    let balanceValue = 3
    if (role === "SPONSOR") {
      let cb = await prisma.creditBalance.findUnique({
        where: { userId }
      })
      if (!cb) {
        cb = await prisma.creditBalance.create({
          data: { userId, balance: 3 }
        })
      }
      balanceValue = cb.balance
    }

    return NextResponse.json({
      success: true,
      data: {
        briefs,
        creditBalance: balanceValue
      }
    })

  } catch (error) {
    console.error("Brief list fetch error:", error)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
