"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

const mockFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "크레딧은 어떻게 사용하나요?",
    answer: "스폰서(광고주)는 가입 시 무료로 3크레딧을 제공받습니다. 마켓플레이스에서 마음에 드는 크리에이터에게 광고 협찬 제안서(브리프)를 1건 발송할 때마다 1크레딧이 차감됩니다. 크레딧을 모두 소진한 후에는 추가 크레딧 패키지(STARTER/GROWTH/PRO)를 결제하여 충전하실 수 있습니다."
  },
  {
    id: "faq-2",
    question: "채널 심사는 얼마나 걸리나요?",
    answer: "크리에이터가 채널 정보를 입력하여 등록하면, 플랫폼 내 거래 생태계 보호 및 허위 채널 필터링을 위해 운영진이 1차 심사를 진행합니다. 심사는 신청 시점으로부터 영업일 기준 최대 24시간 이내에 처리되며, 심사 결과(승인/반려)는 회원 정보에 등록된 이메일로 즉시 안내됩니다."
  },
  {
    id: "faq-3",
    question: "결제는 안전한가요? (에스크로 설명)",
    answer: "예, 매우 안전합니다. ViewPoint는 에스크로(Escrow) 안전 결제 시스템을 채택하고 있습니다. 광고주가 제안 수락 후 결제한 협찬금은 크리에이터에게 바로 지급되지 않고 플랫폼 내에 안전하게 예치됩니다. 콘텐츠 제작이 완료되고 최종 납품이 승인된 이후에 크리에이터에게 정산되는 구조이므로 먹튀나 어뷰징 피해를 완벽히 예방할 수 있습니다."
  },
  {
    id: "faq-4",
    question: "정산은 언제 이루어지나요?",
    answer: "크리에이터가 최종 제작된 콘텐츠를 업로드하고 광고주 또는 어드민이 '완료 확인' 버튼을 누르면 협찬 거래 상태가 COMPLETED로 전환됩니다. COMPLETED 처리된 거래의 정산금(플랫폼 수수료 10% 제외 금액)은 매주 정해진 정산일(예: 매주 목요일)에 크리에이터가 지정한 계좌 또는 글로벌 결제 수단으로 정확하게 일괄 송금됩니다."
  },
  {
    id: "faq-5",
    question: "얼리버드 스폰서십이 뭔가요?",
    answer: "얼리버드 스폰서십은 ViewPoint만의 독창적인 시스템으로, 아직 대중적으로 노출되지 않았거나 '오픈 예정(UPCOMING)' 상태인 유망 크리에이터 채널의 기획안을 보고 광고주가 저렴한 단가로 선점 스폰서십을 후원하는 기능입니다. 크리에이터는 콘텐츠 초기 제작 자금을 확보할 수 있고, 광고주는 합리적인 비용으로 채널 성장 전후의 고효율 마케팅을 선점할 수 있습니다."
  },
  {
    id: "faq-6",
    question: "수수료는 얼마인가요?",
    answer: "크리에이터의 채널 등록 및 스폰서의 검색/탐색 기능은 100% 무료로 이용하실 수 있습니다. 협찬 거래가 성공적으로 매칭 및 완료될 시, 크리에이터의 최종 수령 정산금에서 플랫폼 수수료 10%가 제해집니다. 별도의 대행사 수수료나 중개료는 발생하지 않습니다. (얼리버드 후원 거래의 경우 후원금의 5% 수수료가 적용됩니다.)"
  },
  {
    id: "faq-7",
    question: "채널 정보를 수정할 수 있나요?",
    answer: "예, 가능합니다. 크리에이터 대시보드의 '채널 관리' 탭에서 최근 구독자 수, 평균 조회수, 단가 및 오디언스 인구통계 지표를 자유롭게 수정하실 수 있습니다. 다만, 신뢰도 높은 데이터를 제공하기 위해 주요 지표(구독자수, 조회수 등)를 허위로 수정하거나 과장 입력할 경우 운영 정책에 따라 채널이 정지(SUSPENDED) 처리될 수 있습니다."
  },
  {
    id: "faq-8",
    question: "환불 정책이 어떻게 되나요?",
    answer: "구매한 크레딧은 사용하지 않은 경우 결제일로부터 7일 이내에 전액 환불이 가능합니다. 단, 일부라도 사용하여 브리프를 발송한 후에는 환불이 불가능합니다. 에스크로 예치된 협찬금의 경우, 크리에이터가 브리프를 최종 거절(REJECTED)하거나, 정해진 기한 내에 답변이 없어 자동 취소된 경우 결제액 전액이 광고주에게 즉시 환불 및 취소 처리됩니다."
  }
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-20 bg-white min-h-[70vh] space-y-12">
      {/* Header */}
      <section className="pb-8 border-b border-black">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-4 text-black">
          FAQ
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed max-w-2xl">
          자주 묻는 질문에 대한 답변을 찾아보세요
        </p>
      </section>

      {/* Accordion FAQ List */}
      <section className="space-y-4 max-w-4xl">
        {mockFAQs.map((faq) => {
          const isOpen = openId === faq.id
          return (
            <div 
              key={faq.id} 
              className="border border-black bg-white rounded-none overflow-hidden transition-all duration-300"
            >
              {/* Question Trigger */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <span className="font-bold text-black text-base md:text-lg">
                  {faq.question}
                </span>
                <span className="border border-black p-1 bg-white text-black shrink-0 ml-4 rounded-none">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {/* Answer Box */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="p-6 border-t border-black bg-gray-50 text-gray-700 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </section>
    </div>
  )
}
