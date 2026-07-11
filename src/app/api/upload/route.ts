// src/app/api/upload/route.ts
// 파일 업로드 API — Supabase Storage 사용
// CREATOR 권한 필요

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase"

const BUCKET_NAME = "channel-assets"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "인증이 필요합니다" }, { status: 401 })
    }
    if (session.user.role !== "CREATOR") {
      return NextResponse.json({ success: false, error: "크리에이터 권한이 필요합니다" }, { status: 403 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const fileType = (formData.get("fileType") as string) || "thumbnail" // "mediakit" | "thumbnail"

    if (!supabaseAdmin) {
      return NextResponse.json(
        { success: false, error: "Supabase Storage가 설정되지 않았습니다 (SUPABASE 환경변수 누락)" },
        { status: 503 }
      )
    }

    if (!file) {
      return NextResponse.json({ success: false, error: "파일이 없습니다" }, { status: 400 })
    }

    // 파일 타입별 폴더 분리
    let folder = "thumbnails"
    if (fileType === "mediakit") {
      folder = "mediakits"
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        return NextResponse.json({ success: false, error: "미디어킷은 PDF 파일만 지원합니다" }, { status: 400 })
      }
    } else {
      const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
      if (!allowedImageTypes.includes(file.type)) {
        return NextResponse.json({ success: false, error: "이미지는 JPEG/PNG/WEBP/GIF만 지원합니다" }, { status: 400 })
      }
    }

    // 파일 크기 제한 (미디어킷 20MB, 이미지 5MB)
    const maxSize = fileType === "mediakit" ? 20 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      const limitLabel = fileType === "mediakit" ? "20MB" : "5MB"
      return NextResponse.json({ success: false, error: `파일 크기는 ${limitLabel} 이하여야 합니다` }, { status: 400 })
    }

    const timestamp = Date.now()
    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const filePath = `${folder}/${session.user.id}/${timestamp}_${safeFileName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("Supabase Storage 업로드 오류:", uploadError)
      return NextResponse.json(
        { success: false, error: `업로드 실패: ${uploadError.message}` },
        { status: 500 }
      )
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath)

    return NextResponse.json({
      success: true,
      data: { url: publicUrlData.publicUrl },
    })
  } catch (err) {
    console.error("upload route error:", err)
    return NextResponse.json({ success: false, error: "서버 오류가 발생했습니다" }, { status: 500 })
  }
}
