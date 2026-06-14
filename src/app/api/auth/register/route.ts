/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json()

    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "필수 항목이 누락되었습니다." },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "이미 가입된 이메일 주소입니다." },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        creditBalance: role === "SPONSOR" ? {
          create: {
            balance: 3,
          },
        } : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err: any) {
    console.error("Register Error:", err)
    return NextResponse.json(
      { success: false, error: "회원가입 처리 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
