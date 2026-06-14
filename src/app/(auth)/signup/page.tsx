"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const initialRole = searchParams.get("role")?.toUpperCase() === "SPONSOR" ? "SPONSOR" : "CREATOR"
  
  const [role, setRole] = useState<"CREATOR" | "SPONSOR">(initialRole)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const urlRole = searchParams.get("role")?.toUpperCase()
    if (urlRole === "SPONSOR") {
      setRole("SPONSOR")
    } else if (urlRole === "CREATOR") {
      setRole("CREATOR")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || "회원가입 처리 중 에러가 발생했습니다.")
        setLoading(false)
        return
      }

      router.push("/login")
    } catch (err) {
      console.error("Signup Error:", err)
      setError("서버와의 통신에 실패했습니다.")
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg bg-white border border-black p-8 rounded-none">
      <h2 className="text-3xl font-black uppercase tracking-widest text-center mb-8 text-black">
        SIGN UP
      </h2>

      {error && (
        <div className="border border-black bg-red-50 text-red-600 px-4 py-2 text-xs uppercase tracking-wider mb-6 rounded-none font-bold">
          {error}
        </div>
      )}

      {/* Role Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div
          onClick={() => setRole("CREATOR")}
          className={`border border-black p-6 cursor-pointer rounded-none text-center transition-colors ${
            role === "CREATOR" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"
          }`}
        >
          <span className="font-black text-sm uppercase tracking-widest block">CREATOR</span>
          <span className="text-[10px] uppercase tracking-wider mt-1 block opacity-80">채널 보유자</span>
        </div>
        <div
          onClick={() => setRole("SPONSOR")}
          className={`border border-black p-6 cursor-pointer rounded-none text-center transition-colors ${
            role === "SPONSOR" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"
          }`}
        >
          <span className="font-black text-sm uppercase tracking-widest block">SPONSOR</span>
          <span className="text-[10px] uppercase tracking-wider mt-1 block opacity-80">브랜드 / 광고주</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="uppercase tracking-widest text-xs font-black text-black">
            NAME
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black"
          />
        </div>

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

        <div className="flex flex-col space-y-2">
          <label className="uppercase tracking-widest text-xs font-black text-black">
            CONFIRM PASSWORD
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 border border-black uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors rounded-none disabled:opacity-50"
        >
          {loading ? "CREATING ACCOUNT..." : "회원가입 완료"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="text-xs uppercase tracking-widest text-gray-500 hover:text-black font-bold border-b border-black hover:border-black transition-colors"
        >
          이미 계정이 있으신가요? 로그인
        </Link>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <Suspense fallback={
        <div className="w-full max-w-lg bg-white border border-black p-8 rounded-none text-center">
          <span className="uppercase text-xs tracking-widest font-black text-black">LOADING FORM...</span>
        </div>
      }>
        <SignUpForm />
      </Suspense>
    </div>
  )
}
