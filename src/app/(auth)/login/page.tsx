"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/store/authStore"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("이메일 또는 비밀번호가 일치하지 않습니다.")
        setLoading(false)
        return
      }

      // Fetch session to retrieve user role and set in Zustand store
      const sessionRes = await fetch("/api/auth/session")
      const session = await sessionRes.json()

      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.name || null,
          role: session.user.role,
        })

        const role = session.user.role
        if (role === "ADMIN") {
          router.push("/admin")
        } else if (role === "CREATOR") {
          router.push("/dashboard/creator")
        } else if (role === "SPONSOR") {
          router.push("/dashboard/sponsor")
        } else {
          router.push("/")
        }
      } else {
        router.push("/")
      }
    } catch (err) {
      console.error("Login Error:", err)
      setError("로그인 처리 중 에러가 발생했습니다.")
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    signIn("google")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-md bg-white border border-black p-8 rounded-none">
        <h2 className="text-3xl font-black uppercase tracking-widest text-center mb-8 text-black">
          LOGIN
        </h2>

        {error && (
          <div className="border border-black bg-red-50 text-red-600 px-4 py-2 text-xs uppercase tracking-wider mb-6 rounded-none font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleCredentialsLogin} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="uppercase tracking-widest text-xs font-black text-black">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="uppercase tracking-widest text-xs font-black text-black">
              PASSWORD
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 border border-black uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors rounded-none disabled:opacity-50"
          >
            {loading ? "LOGGING IN..." : "이메일로 로그인"}
          </button>
        </form>

        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-black"></div>
          </div>
          <span className="relative bg-white px-4 text-xs font-black tracking-widest text-black">
            OR
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-3 border border-black uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition-colors rounded-none"
        >
          구글로 로그인
        </button>

        <div className="mt-8 text-center">
          <Link
            href="/signup"
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-black font-bold border-b border-black hover:border-black transition-colors"
          >
            계정이 없으신가요? 회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}
