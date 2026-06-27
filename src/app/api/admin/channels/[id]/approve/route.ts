/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "인증되지 않은 사용자입니다." }, { status: 401 })
  }

  const role = (session.user as any).role
  if (role !== "ADMIN") {
    return NextResponse.json({ success: false, error: "관리자 권한이 필요합니다." }, { status: 403 })
  }

  const channelId = params.id
  const adminId = session.user.id

  if (!adminId) {
    return NextResponse.json({ success: false, error: "사용자 ID를 찾을 수 없습니다." }, { status: 400 })
  }

  try {
    const updatedChannel = await prisma.channel.update({
      where: { id: channelId },
      data: {
        status: "APPROVED",
        approvedAt: new Date(),
        approvedBy: adminId
      }
    })

    return NextResponse.json({ success: true, data: { channel: updatedChannel } })

  } catch (error) {
    console.error("Admin channel approve error:", error)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
