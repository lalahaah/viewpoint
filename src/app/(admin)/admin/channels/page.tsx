/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Creator {
  id: string
  name: string | null
  email: string
}

interface ChannelItem {
  id: string
  name: string
  creator?: Creator
  category: string
  channelType: "ACTIVE" | "UPCOMING"
  subscriberCount: number
  createdAt: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  adminNote?: string | null
}

export default function AdminChannelsPage() {
  const [channels, setChannels] = useState<ChannelItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING")
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const fetchChannels = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/channels")
      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.error || "채널 목록을 가져오는데 실패했습니다.")
      }
      setChannels(result.data.channels)
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChannels()
  }, [])

  const filteredChannels = channels.filter((ch) => ch.status === activeTab)
  const pendingCount = channels.filter((ch) => ch.status === "PENDING").length

  const handleApprove = async (id: string) => {
    if (confirm("이 채널을 승인하시겠습니까?")) {
      try {
        const res = await fetch(`/api/admin/channels/${id}/approve`, {
          method: "POST"
        })
        const result = await res.json()
        if (!res.ok || !result.success) {
          throw new Error(result.error || "채널 승인에 실패했습니다.")
        }
        alert("채널이 승인되었습니다.")
        fetchChannels()
      } catch (err: any) {
        alert(err.message)
      }
    }
  }

  const handleRejectStart = (id: string) => {
    setRejectingId(rejectingId === id ? null : id)
    setRejectReason("")
  }

  const handleRejectConfirm = async (id: string) => {
    if (!rejectReason.trim()) {
      alert("반려 사유를 입력해주세요.")
      return
    }
    try {
      const res = await fetch(`/api/admin/channels/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason.trim() })
      })
      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.error || "채널 반려에 실패했습니다.")
      }
      alert("채널 심사가 반려 처리되었습니다.")
      setRejectingId(null)
      setRejectReason("")
      fetchChannels()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num)
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    } catch {
      return dateStr
    }
  }

  if (loading && channels.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="font-bold text-sm tracking-wider uppercase">Loading channels...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border border-black p-6 bg-red-50 text-center max-w-xl mx-auto rounded-none">
        <p className="text-red-600 font-bold mb-4">{error}</p>
        <button
          onClick={fetchChannels}
          className="bg-black text-white px-4 py-2 text-xs font-bold border border-black hover:bg-white hover:text-black transition-colors rounded-none"
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">채널 심사 관리</h1>
        <p className="text-gray-500 text-sm">크리에이터가 신청한 유튜브 채널을 심사하고 승인 또는 반려 처리합니다.</p>
      </div>

      {/* Tabs */}
      <div className="flex border border-black max-w-md bg-white">
        {(["PENDING", "APPROVED", "REJECTED"] as const).map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setRejectingId(null)
              }}
              className={`flex-1 py-3 text-xs tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-2 border-r last:border-r-0 border-black ${
                isActive ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              {tab === "PENDING" && "대기중"}
              {tab === "APPROVED" && "승인됨"}
              {tab === "REJECTED" && "반려됨"}
              {tab === "PENDING" && pendingCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black border ${
                  isActive ? "bg-white text-black border-white" : "bg-black text-white border-black"
                }`}>
                  {pendingCount}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="border border-black overflow-x-auto bg-white">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-black text-white text-xs uppercase tracking-widest font-black border-b border-black">
            <tr>
              <th className="px-6 py-4">채널명</th>
              <th className="px-6 py-4">크리에이터</th>
              <th className="px-6 py-4">카테고리</th>
              <th className="px-6 py-4">유형</th>
              <th className="px-6 py-4 text-right">구독자수</th>
              <th className="px-6 py-4">등록일</th>
              <th className="px-6 py-4 text-center">액션 / 상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black text-sm">
            {filteredChannels.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  해당하는 채널 심사 내역이 없습니다.
                </td>
              </tr>
            ) : (
              filteredChannels.map((ch) => {
                const isRejecting = rejectingId === ch.id
                return (
                  <React.Fragment key={ch.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold">{ch.name}</td>
                      <td className="px-6 py-4">{ch.creator?.name || ch.creator?.email || "–"}</td>
                      <td className="px-6 py-4">{ch.category}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs uppercase font-bold border border-black px-2 py-0.5 bg-gray-50">
                          {ch.channelType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {ch.channelType === "ACTIVE" ? formatNumber(ch.subscriberCount || 0) : "–"}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{formatDate(ch.createdAt)}</td>
                      <td className="px-6 py-4 text-center">
                        {ch.status === "PENDING" ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleApprove(ch.id)}
                              className="bg-black text-white border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors rounded-none"
                            >
                              승인
                            </button>
                            <button
                              onClick={() => handleRejectStart(ch.id)}
                              className="bg-white text-black border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors rounded-none"
                            >
                              반려
                            </button>
                          </div>
                        ) : ch.status === "APPROVED" ? (
                          <span className="text-blue-600 font-bold uppercase text-xs tracking-wider">승인 완료</span>
                        ) : (
                          <div className="text-center space-y-1">
                            <span className="text-red-500 font-bold uppercase text-xs tracking-wider block">반려됨</span>
                            {ch.adminNote && (
                              <span className="text-[10px] text-gray-400 block max-w-xs mx-auto truncate" title={ch.adminNote}>
                                사유: {ch.adminNote}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>

                    {/* Inline Reject Input Field */}
                    <AnimatePresence initial={false}>
                      {isRejecting && ch.status === "PENDING" && (
                        <tr>
                          <td colSpan={7} className="bg-gray-50 p-0 border-t border-black">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 space-y-3 border-b border-black">
                                <label className="text-xs font-bold uppercase tracking-wider block">반려 사유 입력</label>
                                <textarea
                                  value={rejectReason}
                                  onChange={(e) => setRejectReason(e.target.value)}
                                  rows={3}
                                  required
                                  className="w-full rounded-none border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none bg-white font-bold"
                                  placeholder="크리에이터에게 전달할 명확한 반려 사유를 기입하세요."
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleRejectConfirm(ch.id)}
                                    className="bg-black text-white border border-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-none"
                                  >
                                    반려 확정
                                  </button>
                                  <button
                                    onClick={() => setRejectingId(null)}
                                    className="bg-white text-black border border-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors rounded-none"
                                  >
                                    취소
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
