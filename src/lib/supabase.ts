// src/lib/supabase.ts
// Supabase 서버사이드 클라이언트 (Storage 업로드용)
// SUPABASE_SERVICE_ROLE_KEY 사용 — 절대 클라이언트에 노출 금지

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// 서버사이드 전용 Supabase 클라이언트 (Service Role — RLS 우회 가능)
// 환경변수가 없으면 null을 반환 (빌드 타임에 크래시 방지)
export const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null
