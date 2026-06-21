"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { channels as mockActiveChannels } from "@/lib/mockData"

interface ChannelItem {
  id: string
  name: string
  creatorName: string
  category: string
  channelType: "ACTIVE" | "UPCOMING"
  subscriberCount: number
  createdAt: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  rejectReason?: string
}

// Prepare initial state from mockData + new entries
const initialChannels: ChannelItem[] = [
  // Existing approved mock channels mapped to item format
  ...mockActiveChannels.map((c) => ({
    id: c.id,
    name: c.name,
    creatorName: c.id === "ch-1" ? "김테크" : c.id === "ch-2" ? "이뷰티" : "박크리에이터",
    category: c.category,
    channelType: c.channelType,
    subscriberCount: c.subscriberCount || 0,
    createdAt: "2026-06-01",
    status: c.status as "PENDING" | "APPROVED" | "REJECTED",
  })),
  // Add some mock pending and rejected channels
  {
    id: "ch-pending-1",
    name: "시네마 헤븐 Cinema Heaven",
    creatorName: "김영화",
    category: "라이프",
    channelType: "ACTIVE",
    subscriberCount: 45000,
    createdAt: "2026-06-21",
    status: "PENDING"
  },
  {
    id: "ch-pending-2",
    name: "캠핑 마니아 Camping Mania",
    creatorName: "이캠핑",
    category: "여행",
    channelType: "ACTIVE",
    subscriberCount: 12000,
    createdAt: "2026-06-20",
    status: "PENDING"
  },
  {
    id: "ch-pending-3",
    name: "글로벌 홈 셰프",
    creatorName: "박요리",
    category: "푸드",
    channelType: "UPCOMING",
    subscriberCount: 0,
    createdAt: "2026-06-19",
    status: "PENDING"
  },
  {
    id: "ch-rejected-1",
    name: "비실용 정보 쇼츠",
    creatorName: "정대충",
    category: "테크",
    channelType: "ACTIVE",
    subscriberCount: 5000,
    createdAt: "2026-05-15",
    status: "REJECTED",
    rejectReason: "콘텐츠 퀄리티 미흡 및 스팸성 업로드 확인"
  }
]

export default function AdminChannelsPage() {
  const [channels, setChannels] = useState<ChannelItem[]>(initialChannels)
  const [activeTab, setActiveTab] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING")
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const filteredChannels = channels.filter((ch) => ch.status === activeTab)
  const pendingCount = channels.filter((ch) => ch.status === "PENDING").length

  const handleApprove = (id: string) => {
    if (confirm("이 채널을 승인하시겠습니까?")) {
      setChannels((prev) =>
        prev.map((ch) => (ch.id === id ? { ...ch, status: "APPROVED" } : ch))
      )
      alert("채널이 승인되었습니다. (API는 Step 8에서 연결됩니다)")
    }
  }

  const handleRejectStart = (id: string) => {
    setRejectingId(rejectingId === id ? null : id)
    setRejectReason("")
  }

  const handleRejectConfirm = (id: string) => {
    if (!rejectReason.trim()) {
      alert("반려 사유를 입력해주세요.")
      return
    }
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === id
          ? { ...ch, status: "REJECTED", rejectReason: rejectReason.trim() }
          : ch
      )
    )
    setRejectingId(null)
    setRejectReason("")
    alert("채널 심사가 반려 처리되었습니다.")
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num)
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
                  해당하는 채널 내역이 없습니다.
                </td>
              </tr>
            ) : (
              filteredChannels.map((ch) => {
                const isRejecting = rejectingId === ch.id
                return (
                  <React.Fragment key={ch.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold">{ch.name}</td>
                      <td className="px-6 py-4">{ch.creatorName}</td>
                      <td className="px-6 py-4">{ch.category}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs uppercase font-bold border border-black px-2 py-0.5 bg-gray-50">
                          {ch.channelType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {ch.channelType === "ACTIVE" ? formatNumber(ch.subscriberCount) : "–"}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{ch.createdAt}</td>
                      <td className="px-6 py-4 text-center">
                        {ch.status === "PENDING" ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleApprove(ch.id)}
                              className="bg-black text-white border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
                            >
                              승인
                            </button>
                            <button
                              onClick={() => handleRejectStart(ch.id)}
                              className="bg-white text-black border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
                            >
                              반려
                            </button>
                          </div>
                        ) : ch.status === "APPROVED" ? (
                          <span className="text-blue-600 font-bold uppercase text-xs tracking-wider">승인 완료</span>
                        ) : (
                          <div className="text-center space-y-1">
                            <span className="text-red-500 font-bold uppercase text-xs tracking-wider block">반려됨</span>
                            {ch.rejectReason && (
                              <span className="text-[10px] text-gray-400 block max-w-xs mx-auto truncate" title={ch.rejectReason}>
                                사유: {ch.rejectReason}
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
                                  className="w-full rounded-none border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none bg-white"
                                  placeholder="크리에이터에게 전달할 명확한 반려 사유를 기입하세요."
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleRejectConfirm(ch.id)}
                                    className="bg-black text-white border border-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                                  >
                                    반려 확정
                                  </button>
                                  <button
                                    onClick={() => setRejectingId(null)}
                                    className="bg-white text-black border border-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
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
