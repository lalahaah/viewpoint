"use client"

import React, { useState } from "react"
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

const initialBriefs: Brief[] = [
  {
    id: "b-1",
    brandName: "삼성전자",
    adType: "integrated",
    budget: 3500000,
    status: "SENT",
    createdAt: "2026-06-20",
    productInfo: "새로 출시된 플래그십 스마트폰 홍보",
    contentDirection: "테크 리뷰 영상 중간에 60~90초 동안 자연스럽게 신기능과 실사용 컷을 연출하여 PPL을 진행해 주시길 바랍니다. 주 타겟은 2030 얼리어답터층입니다.",
    referenceUrl: "https://www.samsung.com/sec/smartphones/",
    desiredDate: "2026-07-20"
  },
  {
    id: "b-2",
    brandName: "올리브영",
    adType: "review",
    budget: 4800000,
    status: "ACCEPTED",
    createdAt: "2026-06-18",
    productInfo: "여름 맞이 수분 선크림 단독 리뷰",
    contentDirection: "제품의 제형, 백탁 현상 유무, 메이크업과의 조화 등을 꼼꼼하게 테스트해 주시고, 10분 내외의 단독 영상으로 업로드해 주십시오.",
    referenceUrl: "https://www.oliveyoung.co.kr",
    desiredDate: "2026-07-10"
  },
  {
    id: "b-3",
    brandName: "로지텍",
    adType: "mention",
    budget: 1500000,
    status: "REJECTED",
    createdAt: "2026-06-15",
    productInfo: "무선 버티컬 마우스 소개",
    contentDirection: "영상 도입부 혹은 마지막 부분에 15~30초간 신제품 로지텍 리프트 버티컬 마우스의 편안한 그립감과 손목 통증 예방에 대해 간단히 언급해주시면 됩니다.",
    referenceUrl: "https://www.logitech.com",
    desiredDate: "2026-07-05"
  },
  {
    id: "b-4",
    brandName: "넷마블",
    adType: "shorts",
    budget: 2500000,
    status: "COMPLETED",
    createdAt: "2026-06-10",
    productInfo: "신작 캐주얼 RPG 모바일 게임 출시",
    contentDirection: "모바일 게임의 유머러스한 플레이 장면이나 독특한 연출을 활용하여 시청자들의 다운로드를 유도하는 60초 이내 쇼츠를 제작해 주세요.",
    referenceUrl: "https://netmarble.com",
    desiredDate: "2026-06-25"
  },
  {
    id: "b-5",
    brandName: "CJ제일제당",
    adType: "community",
    budget: 450000,
    status: "SENT",
    createdAt: "2026-06-08",
    productInfo: "간편 조리 불고기 밀키트 출시 기념 이벤트",
    contentDirection: "유튜브 커뮤니티 탭에 밀키트 사진 및 구매 링크와 함께 구독자 대상 댓글 이벤트 내용을 포스팅해주시길 바랍니다.",
    referenceUrl: "https://www.cj.co.kr",
    desiredDate: "2026-06-30"
  }
]

export default function CreatorBriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>(initialBriefs)
  const [expandedBriefId, setExpandedBriefId] = useState<string | null>(null)

  const handleRowClick = (id: string) => {
    setExpandedBriefId(expandedBriefId === id ? null : id)
  }

  const handleAccept = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm("이 제안을 수락하시겠습니까? 수락 후 광고주에게 알림이 전송됩니다.")) {
      setBriefs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "ACCEPTED" } : b))
      )
      alert("브리프 제안을 수락했습니다. (에스크로 결제 흐름은 API 연동 시 동작합니다)")
    }
  }

  const handleReject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm("이 제안을 거절하시겠습니까? 거절 사유가 광고주에게 전달됩니다.")) {
      setBriefs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "REJECTED" } : b))
      )
      alert("브리프 제안을 거절했습니다.")
    }
  }

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
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">받은 브리프</h1>
        <p className="text-gray-500 text-sm">광고주가 제안한 스폰서십 브리프를 검토하고 수락/거절할 수 있습니다.</p>
      </div>

      {/* Briefs Table */}
      <div className="border border-black overflow-x-auto bg-white">
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
                    onClick={() => handleRowClick(brief.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-bold">{brief.brandName}</td>
                    <td className="px-6 py-4">{adTypeMap[brief.adType] || brief.adType}</td>
                    <td className="px-6 py-4 text-right font-black">{formatCurrency(brief.budget)}</td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={brief.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">{brief.createdAt}</td>
                    <td className="px-6 py-4 text-center">
                      {brief.status === "SENT" ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={(e) => handleAccept(e, brief.id)}
                            className="bg-black text-white border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
                          >
                            수락
                          </button>
                          <button
                            onClick={(e) => handleReject(e, brief.id)}
                            className="bg-white text-black border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
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
                                    <p className="text-gray-800 font-medium">{brief.desiredDate}</p>
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
      </div>
    </div>
  )
}
