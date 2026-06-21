"use client"

import React from "react"
import { sponsorDashboardMock } from "@/lib/mockData"
import { StatusBadge } from "@/components/shared/StatusBadge"
import Link from "next/link"

export default function SponsorEarlyBirdPage() {
  const { earlyBirdHistory } = sponsorDashboardMock

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">얼리버드 후원 내역</h1>
        <p className="text-gray-500 text-sm">오픈 예정 채널에 참여한 선점식 스폰서십 후원 내역입니다.</p>
      </div>

      {/* EarlyBird Sponsor History List */}
      {earlyBirdHistory.length === 0 ? (
        <div className="border border-black p-12 text-center bg-white space-y-6">
          <p className="text-gray-500 text-sm">아직 얼리버드 후원 내역이 없습니다.</p>
          <Link
            href="/"
            className="inline-block border border-black bg-black text-white hover:bg-white hover:text-black px-6 py-3 text-xs uppercase font-bold tracking-widest transition-colors"
          >
            채널 탐색하기
          </Link>
        </div>
      ) : (
        <div className="border border-black divide-y divide-black bg-white">
          {earlyBirdHistory.map((item) => (
            <div key={item.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Left Column: Channel Details & Backing amount */}
              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-black">{item.channelName}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <div className="text-xs text-gray-500">
                  후원 금액: <strong className="text-black">{formatCurrency(item.amount)}</strong>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 w-full max-w-md pt-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <span>펀딩 진척도</span>
                    <span className="text-black">{item.fundingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 border border-black rounded-none overflow-hidden">
                    <div
                      className="bg-black h-full transition-all duration-500"
                      style={{ width: `${item.fundingProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Actions / Status description */}
              <div className="flex flex-col gap-2 w-full md:w-auto text-right">
                <span className="text-xs text-gray-400 font-medium">
                  채널 런칭 시 광고 확정권 제공
                </span>
                <Link
                  href="/"
                  className="border border-black px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-black hover:text-white transition-colors text-center"
                >
                  채널 상세 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
