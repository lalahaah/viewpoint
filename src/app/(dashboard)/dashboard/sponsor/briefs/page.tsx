/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StatusBadge } from "@/components/shared/StatusBadge"

interface Brief {
  id: string
  channel?: {
    name: string
    youtubeUrl?: string
  }
  brandName: string
  adType: string
  budget: number
  status: "SENT" | "VIEWED" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED"
  createdAt: string
  productInfo: string
  contentDirection: string
  referenceUrl?: string
  desiredDate?: string
}

export default function SponsorBriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedBriefId, setExpandedBriefId] = useState<string | null>(null)

  const fetchBriefs = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/briefs")
      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.error || "브리프 내역을 가져오는데 실패했습니다.")
      }
      setBriefs(result.data.briefs)
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBriefs()
  }, [])

  const handleRowClick = (id: string) => {
    setExpandedBriefId(expandedBriefId === id ? null : id)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    } catch {
      return dateStr
    }
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

  if (loading && briefs.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="font-bold text-sm tracking-wider uppercase">Loading briefs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border border-black p-6 bg-red-50 text-center max-w-xl mx-auto rounded-none">
        <p className="text-red-600 font-bold mb-4">{error}</p>
        <button
          onClick={fetchBriefs}
          className="bg-black text-white px-4 py-2 text-xs font-bold border border-black hover:bg-white hover:text-black transition-colors rounded-none"
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">보낸 브리프 내역</h1>
        <p className="text-gray-500 text-sm">크리에이터 채널들에 발송한 스폰서십 제안서 현황입니다.</p>
      </div>

      {/* Briefs Table */}
      <div className="border border-black overflow-x-auto bg-white">
        {briefs.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-medium">
            보낸 브리프 내역이 없습니다.
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-black text-white text-xs uppercase tracking-widest font-black border-b border-black">
              <tr>
                <th className="px-6 py-4">대상 채널</th>
                <th className="px-6 py-4">브랜드명</th>
                <th className="px-6 py-4">광고 유형</th>
                <th className="px-6 py-4 text-right">제안 예산</th>
                <th className="px-6 py-4 text-center">상태</th>
                <th className="px-6 py-4">발송일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black text-sm">
              {briefs.map((brief) => {
                const isExpanded = expandedBriefId === brief.id
                return (
                  <React.Fragment key={brief.id}>
                    {/* Main Row */}
                    <tr
                      onClick={() => handleRowClick(brief.id)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 font-bold">{brief.channel?.name || "알 수 없는 채널"}</td>
                      <td className="px-6 py-4">{brief.brandName}</td>
                      <td className="px-6 py-4">{adTypeMap[brief.adType] || brief.adType}</td>
                      <td className="px-6 py-4 text-right font-black">{formatCurrency(brief.budget)}</td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={brief.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-500">{formatDate(brief.createdAt)}</td>
                    </tr>

                    {/* Expanded Detail Row */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-gray-50 p-0 border-t border-black">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 space-y-4 border-b border-black text-xs md:text-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-1">
                                    <span className="uppercase text-[10px] tracking-wider text-gray-400 font-bold">제품/서비스 소개</span>
                                    <p className="text-gray-800 font-medium leading-relaxed">{brief.productInfo}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="uppercase text-[10px] tracking-wider text-gray-400 font-bold">콘텐츠 제작 방향</span>
                                    <p className="text-gray-800 font-medium leading-relaxed">{brief.contentDirection}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                  {brief.referenceUrl && (
                                    <div className="space-y-1">
                                      <span className="uppercase text-[10px] tracking-wider text-gray-400 font-bold">참고 자료 URL</span>
                                      <div>
                                        <a
                                          href={brief.referenceUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 underline break-all font-medium"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          {brief.referenceUrl}
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                  {brief.desiredDate && (
                                    <div className="space-y-1">
                                      <span className="uppercase text-[10px] tracking-wider text-gray-400 font-bold">희망 집행일</span>
                                      <p className="text-gray-800 font-medium">{formatDate(brief.desiredDate)}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
