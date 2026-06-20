"use client"

import React from "react"
import { BentoGridShowcase } from "@/components/shared/BentoGridShowcase"
import { 
  Search, 
  DollarSign, 
  BarChart2, 
  Coins, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react"

export default function SponsorGuidePage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-20 space-y-16 md:space-y-24 bg-white">
      {/* Hero Section */}
      <section className="pb-8 border-b border-black">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-4 text-black">
          SPONSOR GUIDE
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed max-w-2xl">
          에이전시 없이, 크리에이터에게 직접 제안하세요
        </p>
      </section>

      {/* Bento Grid Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black uppercase tracking-wider text-black">SPONSOR BENEFITS</h2>
        <BentoGridShowcase
          className="bg-white"
          integration={
            <div className="flex flex-col h-full justify-between space-y-8">
              <div>
                <div className="w-12 h-12 border border-black flex items-center justify-center mb-6 bg-black text-white rounded-none">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-black">직접 채널 탐색</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  중간 에이전시나 수수료 거품 없이 플랫폼 내의 모든 승인된 크리에이터를 직접 검색하고 지표를 확인하며 소통할 수 있습니다. 카테고리별 맞춤 필터로 최적의 파트너를 찾으세요.
                </p>
              </div>
              <div className="text-xs tracking-widest uppercase font-bold text-gray-400">01 / DISCOVERY</div>
            </div>
          }
          trackers={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black text-black">투명한 광고 단가</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  유형별(통합 광고, 전체 리뷰, 쇼츠 등) 단가와 평균 제작 기간이 사전에 투명하게 명시되어 있어 예산 수립이 쉽습니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mt-4">02 / PRICING</div>
            </div>
          }
          statistic={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <BarChart2 className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black text-black">인구통계 데이터 확인</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  구독자들의 성별, 연령대, 국가, 시청 기기 등 채널의 상세 오디언스 분석 데이터를 투명하게 확인하고 타겟팅합니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mt-4">03 / DEMOGRAPHICS</div>
            </div>
          }
          focus={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Coins className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black text-black">크레딧 기반 간편 시스템</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  복잡한 계약 절차 없이 크레딧을 충전하여 원하는 크리에이터에게 간편하게 협찬 브리프를 발송할 수 있습니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mt-4">04 / CREDIT SYSTEM</div>
            </div>
          }
          productivity={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black text-black">에스크로 안전 결제</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  협찬비는 에스크로 방식으로 보관되어 크리에이터가 최종 납품을 완료할 때까지 안전하게 보호받습니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mt-4">05 / ESCROW PAYMENT</div>
            </div>
          }
          shortcuts={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-bold bg-zinc-950 px-2 py-0.5 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-xl font-black mb-2 text-white">얼리버드 선점 기능</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  &quot;오픈 예정 채널(UPCOMING)&quot;의 독창적인 아이디어와 콘텐츠 기획을 보고, 가장 저렴한 얼리버드 단가로 스폰서십 권한을 선점하는 혁신적인 기회를 곧 제공합니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mt-4">06 / EARLY BIRD</div>
            </div>
          }
        />
      </section>

      {/* Credit System Section */}
      <section className="space-y-8">
        <div className="border-b border-black pb-4">
          <h2 className="text-2xl font-black uppercase tracking-wider text-black">CREDIT SYSTEM</h2>
          <p className="text-gray-600 text-sm mt-1">
            가입 시 무료 3크레딧 제공 / 1크레딧 = 브리프 1건 발송
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tier: "STARTER", price: "₩ 49,000", qty: "5 Credits", desc: "초기 탐색 및 가벼운 제안을 원하는 광고주", features: ["1크레딧 당 9,800원 꼴", "30일간 유효", "기본 서포트 제공"] },
            { tier: "GROWTH", price: "₩ 149,000", qty: "20 Credits", desc: "본격적으로 여러 채널과 협업을 원하는 광고주", features: ["1크레딧 당 7,450원 (24% 할인)", "무제한 유효 기간", "우선 응답 모니터링", "정산 리포트 제공"] },
            { tier: "PRO", price: "₩ 299,000", qty: "50 Credits", desc: "대규모 캠페인과 상시 협찬을 집행하는 브랜드", features: ["1크레딧 당 5,980원 (39% 할인)", "무제한 유효 기간", "전담 매니저 배정", "인구통계 데이터 원본 제공", "무제한 미디어킷 다운로드"] },
          ].map((pkg, idx) => (
            <div key={idx} className="border border-black p-6 flex flex-col justify-between rounded-none bg-white">
              <div className="space-y-4">
                <div className="border-b border-black pb-4">
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">{pkg.tier} PACKAGE</span>
                  <h3 className="text-3xl font-black text-black mt-1">{pkg.qty}</h3>
                  <p className="text-xl font-bold text-black mt-1">{pkg.price}</p>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{pkg.desc}</p>
                <ul className="space-y-2 pt-2">
                  {pkg.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-xs text-gray-700">
                      <Check className="w-3.5 h-3.5 mt-0.5 text-black shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="/signup?role=sponsor"
                className="w-full bg-black text-white hover:bg-white hover:text-black border border-black text-center py-3 uppercase tracking-widest text-xs font-bold mt-8 transition-colors inline-block rounded-none"
              >
                선택하기
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border border-black p-8 md:p-12 bg-white flex flex-col md:flex-row items-center justify-between gap-8 rounded-none">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-black uppercase text-black">FIND YOUR PARTNERS NOW</h3>
          <p className="text-gray-600 text-sm">
            광고 대행사 수수료 없이 직접 소통하여 마케팅 효율을 극대화하세요.
          </p>
        </div>
        <a 
          href="/signup?role=sponsor" 
          className="bg-black text-white px-8 py-4 uppercase font-bold tracking-widest text-sm hover:bg-white hover:text-black border border-black transition-colors rounded-none flex items-center gap-2 whitespace-nowrap"
        >
          광고주로 시작하기
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  )
}
