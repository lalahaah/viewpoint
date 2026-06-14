"use client"

import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="w-full bg-white border-b border-black rounded-none">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="font-black uppercase tracking-widest text-black text-xl rounded-none">
            VIEWPOINT
          </Link>
        </div>

        {/* Center: Nav links (Hidden on mobile) */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="uppercase text-xs tracking-widest text-gray-500 hover:text-black transition-colors rounded-none">
            홈
          </Link>
          <Link href="/#channels" className="uppercase text-xs tracking-widest text-gray-500 hover:text-black transition-colors rounded-none">
            채널탐색
          </Link>
          <Link href="/guide/creator" className="uppercase text-xs tracking-widest text-gray-500 hover:text-black transition-colors rounded-none">
            크리에이터 가이드
          </Link>
          <Link href="/guide/sponsor" className="uppercase text-xs tracking-widest text-gray-500 hover:text-black transition-colors rounded-none">
            광고주 가이드
          </Link>
        </div>

        {/* Right: Auth buttons (Login hidden on mobile, only Start/시작하기 shown) */}
        <div className="flex items-center space-x-3">
          <Link href="/login" className="hidden md:inline-block border border-black px-4 py-2 text-xs uppercase font-bold text-black hover:bg-black hover:text-white transition-colors rounded-none">
            로그인
          </Link>
          <Link href="/signup" className="bg-black text-white px-4 py-2 text-xs uppercase font-bold border border-black hover:bg-white hover:text-black transition-colors rounded-none">
            시작하기
          </Link>
        </div>
      </div>
    </nav>
  )
}
