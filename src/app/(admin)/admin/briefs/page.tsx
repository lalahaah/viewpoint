"use client"

import React, { useState } from "react"
import { adminDashboardMock } from "@/lib/mockData"
import { StatusBadge } from "@/components/shared/StatusBadge"

export default function AdminBriefsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL")
  const { allBriefs } = adminDashboardMock

  const filters = [
    { key: "ALL", label: "전체" },
    { key: "SENT", label: "발송" },
    { key: "ACCEPTED", label: "수락" },
    { key: "COMPLETED", label: "완료" },
    { key: "REJECTED", label: "반려" }
  ]

  const filteredBriefs = allBriefs.filter((brief) => {
    if (activeFilter === "ALL") return true
    return brief.status === activeFilter
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const adTypeMap: Record<string, string> = {
    integrated: "통합광고",
    review: "제품리뷰",
    mention: "스폰서언급",
    shorts: "쇼츠광고",
    community: "커뮤니티포스트",
    earlyBird: "얼리버드",
    package: "패키지",
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">브리프 모니터링</h1>
        <p className="text-gray-500 text-sm">광고주가 발송한 모든 협찬 브리프 제안서들의 상태와 세부 내역을 모니터링합니다.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.key
          return (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`border border-black px-4 py-2 text-xs uppercase font-bold tracking-widest transition-colors ${
                isActive ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="border border-black overflow-x-auto bg-white">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-black text-white text-xs uppercase tracking-widest font-black border-b border-black">
            <tr>
              <th className="px-6 py-4">광고주(스폰서)</th>
              <th className="px-6 py-4">크리에이터</th>
              <th className="px-6 py-4">대상 채널명</th>
              <th className="px-6 py-4">광고 유형</th>
              <th className="px-6 py-4 text-right">제안 예산</th>
              <th className="px-6 py-4 text-center">상태</th>
              <th className="px-6 py-4">발송일자</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black text-sm">
            {filteredBriefs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  선택한 상태에 해당하는 브리프 내역이 없습니다.
                </td>
              </tr>
            ) : (
              filteredBriefs.map((brief) => (
                <tr key={brief.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold">{brief.sponsorName}</td>
                  <td className="px-6 py-4 font-bold">{brief.creatorName}</td>
                  <td className="px-6 py-4 text-gray-600">{brief.channelName}</td>
                  <td className="px-6 py-4">{adTypeMap[brief.adType] || brief.adType}</td>
                  <td className="px-6 py-4 text-right font-black">{formatCurrency(brief.budget)}</td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={brief.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(brief.sentAt).toLocaleDateString("ko-KR")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
