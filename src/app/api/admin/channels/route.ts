/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "인증되지 않은 사용자입니다." }, { status: 401 })
  }

  const role = (session.user as any).role
  if (role !== "ADMIN") {
    return NextResponse.json({ success: false, error: "관리자 권한이 필요합니다." }, { status: 403 })
  }

  try {
    const channels = await prisma.channel.findMany({
      include: {
        creator: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({ success: true, data: { channels } })

  } catch (error) {
    console.error("Admin channel list fetch error:", error)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
