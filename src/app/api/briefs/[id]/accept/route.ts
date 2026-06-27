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

  const userId = session.user.id
  const briefId = params.id

  try {
    const brief = await prisma.brief.findUnique({
      where: { id: briefId }
    })

    if (!brief) {
      return NextResponse.json({ success: false, error: "브리프를 찾을 수 없습니다." }, { status: 404 })
    }

    // creator(본인)만 가능
    if (brief.creatorId !== userId) {
      return NextResponse.json({ success: false, error: "권한이 없습니다." }, { status: 403 })
    }

    const updatedBrief = await prisma.brief.update({
      where: { id: briefId },
      data: {
        status: "ACCEPTED",
        respondedAt: new Date()
      }
    })

    return NextResponse.json({ success: true, data: { brief: updatedBrief } })

  } catch (error) {
    console.error("Brief accept error:", error)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
