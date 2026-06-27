/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StatusBadge } from "@/components/shared/StatusBadge"

interface Brief {
  id: string
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

export default function CreatorBriefsPage() {
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
        throw new Error(result.error || "브리프 목록을 가져오는데 실패했습니다.")
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

  const handleRowClick = async (id: string, currentStatus: string) => {
    setExpandedBriefId(expandedBriefId === id ? null : id)

    // creator가 상세 조회(확장) 시 viewedAt이 없을 경우 현재 시각 및 status: VIEWED 로 서버에서 자동 업데이트하도록 처리
    if (currentStatus === "SENT") {
      try {
        const res = await fetch(`/api/briefs/${id}`)
        const result = await res.json()
        if (res.ok && result.success) {
          // 로컬 데이터 업데이트
          setBriefs(prev =>
            prev.map(b => b.id === id ? { ...b, status: "VIEWED" } : b)
          )
        }
      } catch (err) {
        console.error("Failed to update viewed status", err)
      }
    }
  }

  const handleAccept = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm("이 제안을 수락하시겠습니까? 수락 후 광고주에게 알림이 전송됩니다.")) {
      try {
        const res = await fetch(`/api/briefs/${id}/accept`, {
          method: "POST"
        })
        const result = await res.json()
        if (!res.ok || !result.success) {
          throw new Error(result.error || "제안 수락에 실패했습니다.")
        }
        alert("브리프 제안을 수락했습니다.")
        fetchBriefs()
      } catch (err: any) {
        alert(err.message)
      }
    }
  }

  const handleReject = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm("이 제안을 거절하시겠습니까? 거절 사유가 광고주에게 전달됩니다.")) {
      try {
        const res = await fetch(`/api/briefs/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "REJECTED" })
        })
        const result = await res.json()
        if (!res.ok || !result.success) {
          throw new Error(result.error || "제안 거절에 실패했습니다.")
        }
        alert("브리프 제안을 거절했습니다.")
        fetchBriefs()
      } catch (err: any) {
        alert(err.message)
      }
    }
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
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">받은 브리프</h1>
        <p className="text-gray-500 text-sm">광고주가 제안한 스폰서십 브리프를 검토하고 수락/거절할 수 있습니다.</p>
      </div>

      {/* Briefs Table */}
      <div className="border border-black overflow-x-auto bg-white">
        {briefs.length === 0 ? (
          <div className="py-20 text-center text-gray-500 font-medium">
            받은 브리프 제안이 없습니다.
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-black text-white text-xs uppercase tracking-widest font-black border-b border-black">
              <tr>
                <th className="px-6 py-4">광고주</th>
                <th className="px-6 py-4">광고 유형</th>
                <th className="px-6 py-4 text-right">제안 예산</th>
                <th className="px-6 py-4 text-center">상태</th>
                <th className="px-6 py-4">수신일</th>
                <th className="px-6 py-4 text-center">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black text-sm">
              {briefs.map((brief) => {
                const isExpanded = expandedBriefId === brief.id
                return (
                  <React.Fragment key={brief.id}>
                    {/* Main Row */}
                    <tr
                      onClick={() => handleRowClick(brief.id, brief.status)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 font-bold">{brief.brandName}</td>
                      <td className="px-6 py-4">{adTypeMap[brief.adType] || brief.adType}</td>
                      <td className="px-6 py-4 text-right font-black">{formatCurrency(brief.budget)}</td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={brief.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-500">{formatDate(brief.createdAt)}</td>
                      <td className="px-6 py-4 text-center">
                        {brief.status === "SENT" || brief.status === "VIEWED" ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={(e) => handleAccept(e, brief.id)}
                              className="bg-black text-white border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors rounded-none"
                            >
                              수락
                            </button>
                            <button
                              onClick={(e) => handleReject(e, brief.id)}
                              className="bg-white text-black border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors rounded-none"
                            >
                              거절
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">–</span>
                        )}
                      </td>
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
