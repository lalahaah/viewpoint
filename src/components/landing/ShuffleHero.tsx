/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { channels } from "@/lib/mockData"

export const ShuffleHero = () => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 border-b border-black">
      <div className="flex flex-col justify-center px-8 py-16 md:py-24 border-r border-black">
        <p className="uppercase tracking-widest text-xs text-gray-500 mb-4 border border-black inline-block px-2 py-1 w-fit">
          크리에이터 × 브랜드 협찬 마켓플레이스
        </p>
        <h1 className="text-5xl md:text-7xl font-black leading-none uppercase mb-6">
          VIEW<br />POINT
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-sm">
          검증된 유튜브 채널에 직접 협찬 제안을 보내세요.
          오픈 예정 채널을 가장 먼저 선점하는 얼리버드 스폰서십.
        </p>
        <div className="flex gap-0 border border-black w-fit">
          <a href="/signup?role=sponsor" className="bg-black text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors border-r border-black rounded-none">
            광고주로 시작
          </a>
          <a href="/signup?role=creator" className="px-6 py-3 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors rounded-none bg-white text-black">
            채널 등록
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <ShuffleGrid />
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
