"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StatusBadge } from "@/components/shared/StatusBadge"

interface Brief {
  id: string
  channelName: string
  brandName: string
  adType: string
  budget: number
  status: "SENT" | "VIEWED" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED"
  sentAt: string
  productInfo: string
  contentDirection: string
  referenceUrl?: string
  desiredDate?: string
}

const initialBriefs: Brief[] = [
  {
    id: "sb-1",
    channelName: "테크웨이브 TechWave",
    brandName: "삼성전자",
    adType: "integrated",
    budget: 3500000,
    status: "SENT",
    sentAt: "2026-06-20",
    productInfo: "새로 출시된 플래그십 스마트폰 홍보",
    contentDirection: "테크 리뷰 영상 중간에 60~90초 동안 자연스럽게 신기능과 실사용 컷을 연출하여 PPL을 진행해 주시길 바랍니다. 주 타겟은 2030 얼리어답터층입니다.",
    referenceUrl: "https://www.samsung.com/sec/smartphones/",
    desiredDate: "2026-07-20"
  },
  {
    id: "sb-2",
    channelName: "뷰티 크러쉬 Beauty Crush",
    brandName: "올리브영",
    adType: "review",
    budget: 4800000,
    status: "ACCEPTED",
    sentAt: "2026-06-18",
    productInfo: "여름 맞이 수분 선크림 단독 리뷰",
    contentDirection: "제품의 제형, 백탁 현상 유무, 메이크업과의 조화 등을 꼼꼼하게 테스트해 주시고, 10분 내외의 단독 영상으로 업로드해 주십시오.",
    referenceUrl: "https://www.oliveyoung.co.kr",
    desiredDate: "2026-07-10"
  },
  {
    id: "sb-3",
    channelName: "겜블러 플레이 Gambler Play",
    brandName: "넷마블",
    adType: "shorts",
    budget: 2500000,
    status: "COMPLETED",
    sentAt: "2026-06-10",
    productInfo: "신작 캐주얼 RPG 모바일 게임 출시",
    contentDirection: "모바일 게임의 유머러스한 플레이 장면이나 독특한 연출을 활용하여 시청자들의 다운로드를 유도하는 60초 이내 쇼츠를 제작해 주세요.",
    referenceUrl: "https://netmarble.com",
    desiredDate: "2026-06-25"
  },
  {
    id: "sb-4",
    channelName: "도쿄 한달살기 Tokyo Live",
    brandName: "트리플",
    adType: "integrated",
    budget: 1500000,
    status: "REJECTED",
    sentAt: "2026-06-05",
    productInfo: "여행 가이드 및 숙소 예약 앱 홍보",
    contentDirection: "도쿄 브이로그 인트로에 15초가량 트리플 앱 설치 화면과 쿠폰 팩 제공 문구를 노출해주시고 더보기란에 할인 링크를 추가해주세요.",
    referenceUrl: "https://triple.guide",
    desiredDate: "2026-06-20"
  },
  {
    id: "sb-5",
    channelName: "자취생 레시피 Easy Meal",
    brandName: "오뚜기",
    adType: "shorts",
    budget: 1500000,
    status: "COMPLETED",
    sentAt: "2026-05-28",
    productInfo: "신제품 컵라면 바이럴 홍보",
    contentDirection: "컵라면을 맛있고 간편하게 조리하여 야식으로 먹는 60초 이내 쿡방 숏폼 영상을 기획 제작해주시기 바랍니다.",
    referenceUrl: "https://ottogi.co.kr",
    desiredDate: "2026-06-12"
  }
]

export default function SponsorBriefsPage() {
  const [briefs] = useState<Brief[]>(initialBriefs)
  const [expandedBriefId, setExpandedBriefId] = useState<string | null>(null)

  const handleRowClick = (id: string) => {
    setExpandedBriefId(expandedBriefId === id ? null : id)
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
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">보낸 브리프 내역</h1>
        <p className="text-gray-500 text-sm">크리에이터 채널들에 발송한 스폰서십 제안서 현황입니다.</p>
      </div>

      {/* Briefs Table */}
      <div className="border border-black overflow-x-auto bg-white">
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
                    <td className="px-6 py-4 font-bold">{brief.channelName}</td>
                    <td className="px-6 py-4">{brief.brandName}</td>
                    <td className="px-6 py-4">{adTypeMap[brief.adType] || brief.adType}</td>
                    <td className="px-6 py-4 text-right font-black">{formatCurrency(brief.budget)}</td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={brief.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">{brief.sentAt}</td>
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
