/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { channels } from "@/lib/mockData"

export const ShuffleHero = () => {
  return (
    <section className="w-full border-b border-black bg-white">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col justify-center py-16 md:py-24 md:pr-8 border-b md:border-b-0 md:border-r border-black">
          <p className="uppercase tracking-widest text-[10px] sm:text-xs text-gray-500 mb-4 border border-black inline-block px-2.5 py-1 w-fit font-black bg-white">
            크리에이터 × 브랜드 협찬 마켓플레이스
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none uppercase mb-6 text-black">
            VIEW<br />POINT
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-sm leading-relaxed">
            검증된 유튜브 채널에 직접 협찬 제안을 보내세요.
            오픈 예정 채널을 가장 먼저 선점하는 얼리버드 스폰서십.
          </p>
          <div className="flex gap-0 border border-black w-fit rounded-none">
            <a href="/signup?role=sponsor" className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm font-black hover:bg-white hover:text-black transition-colors border-r border-black rounded-none">
              광고주로 시작
            </a>
            <a href="/signup?role=creator" className="px-6 py-3 uppercase tracking-widest text-sm font-black hover:bg-black hover:text-white transition-colors bg-white text-black rounded-none">
              채널 등록
            </a>
          </div>
        </div>
        
        {/* Right Shuffle Grid (Hidden on Mobile) */}
        <div className="hidden md:grid items-center justify-center p-8 md:pl-8">
          <ShuffleGrid />
        </div>
      </div>
    </section>
  )
}

const generateSquares = () => {
  const images = channels.flatMap((c) => c.portfolioImages).slice(0, 16)
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    src: images[i % images.length],
  }))
}

const SquareGrid = ({ squares }: { squares: { id: number; src: string }[] }) =>
  squares.map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full bg-gray-200 border border-black"
      style={{ backgroundImage: `url(${sq.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
    />
  ))

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [squares, setSquares] = useState(generateSquares)

  const shuffleSquares = () => {
    setSquares(generateSquares())
    timeoutRef.current = setTimeout(shuffleSquares, 3000)
  }

  useEffect(() => {
    shuffleSquares()
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <div className="grid grid-cols-4 grid-rows-4 w-full aspect-square max-w-[450px] gap-0 border border-black">
      <SquareGrid squares={squares} />
    </div>
  )
}
