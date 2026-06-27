/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "인증되지 않은 사용자입니다." }, { status: 401 })
  }

  const role = (session.user as any).role
  const userId = session.user.id
  const briefId = params.id

  try {
    const brief = await prisma.brief.findUnique({
      where: { id: briefId },
      include: {
        channel: true,
        sponsor: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
        creator: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })

    if (!brief) {
      return NextResponse.json({ success: false, error: "브리프를 찾을 수 없습니다." }, { status: 404 })
    }

    // 본인(sponsor 또는 creator)이거나 ADMIN만 조회 가능
    if (brief.sponsorId !== userId && brief.creatorId !== userId && role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "권한이 없습니다." }, { status: 403 })
    }

    // creator가 조회하면 viewedAt이 없을 경우 현재 시각으로 업데이트하고 status를 VIEWED로 변경
    // (이미 SENT보다 진행된 상태면 건드리지 않음 - 즉 status가 SENT일 때만 변경)
    if (brief.creatorId === userId && brief.status === "SENT") {
      const updatedBrief = await prisma.brief.update({
        where: { id: briefId },
        data: {
          viewedAt: new Date(),
          status: "VIEWED"
        },
        include: {
          channel: true,
          sponsor: {
            select: { id: true, email: true, name: true }
          },
          creator: {
            select: { id: true, email: true, name: true }
          }
        }
      })
      return NextResponse.json({ success: true, data: { brief: updatedBrief } })
    }

    return NextResponse.json({ success: true, data: { brief } })

  } catch (error) {
    console.error("Brief fetch error:", error)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "인증되지 않은 사용자입니다." }, { status: 401 })
  }

  const userId = session.user.id
  const briefId = params.id

  try {
    const body = await request.json()
    const { status } = body

    if (!status || (status !== "ACCEPTED" && status !== "REJECTED")) {
      return NextResponse.json({ success: false, error: "올바르지 않은 상태 값입니다." }, { status: 400 })
    }

    const brief = await prisma.brief.findUnique({
      where: { id: briefId }
    })

    if (!brief) {
      return NextResponse.json({ success: false, error: "브리프를 찾을 수 없습니다." }, { status: 404 })
    }

    // creator(본인)만 status 변경 가능
    if (brief.creatorId !== userId) {
      return NextResponse.json({ success: false, error: "권한이 없습니다." }, { status: 403 })
    }

    const updatedBrief = await prisma.brief.update({
      where: { id: briefId },
      data: {
        status,
        respondedAt: new Date()
      }
    })

    return NextResponse.json({ success: true, data: { brief: updatedBrief } })

  } catch (error) {
    console.error("Brief update error:", error)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
