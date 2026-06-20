"use client"

import React from "react"
import { BentoGridShowcase } from "@/components/shared/BentoGridShowcase"
import { 
  DollarSign, 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Sparkles,
  ArrowRight
} from "lucide-react"

export default function CreatorGuidePage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-20 space-y-16 md:space-y-24 bg-white">
      {/* Hero Section */}
      <section className="pb-8 border-b border-black">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-4 text-black">
          CREATOR GUIDE
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed max-w-2xl">
          검증된 브랜드와 직접 연결되는 가장 빠른 방법
        </p>
      </section>

      {/* Bento Grid Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black uppercase tracking-wider text-black">CREATOR BENEFITS</h2>
        <BentoGridShowcase
          className="bg-white"
          integration={
            <div className="flex flex-col h-full justify-between space-y-8">
              <div>
                <div className="w-12 h-12 border border-black flex items-center justify-center mb-6 bg-black text-white rounded-none">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-black">투명한 단가 공개</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  더 이상 번거로운 이메일 협상이나 광고 단가 밀당이 필요 없습니다. 
                  크리에이터가 직접 설정한 상세 단가와 제작 기간을 투명하게 공개하여 신뢰할 수 있는 비즈니스 관계를 구축합니다.
                </p>
              </div>
              <div className="text-xs tracking-widest uppercase font-bold text-gray-400">01 / TRANSPARENCY</div>
            </div>
          }
          trackers={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black text-black">플랫폼 내 안전한 거래</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  모든 커뮤니케이션과 브리프 송수신이 플랫폼 내에서 기록되며, 분쟁 발생 시 운영진이 신속하게 중재합니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mt-4">02 / SAFETY</div>
            </div>
          }
          statistic={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black text-black">에스크로 결제 보호</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  광고주가 결제한 협찬금은 에스크로에 안전하게 예치되며, 콘텐츠가 성공적으로 제작 및 인도된 후 약속된 일정에 맞추어 정확하게 정산됩니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mt-4">03 / ESCROW</div>
            </div>
          }
          focus={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black text-black">운영진 모니터링</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  비즈니스 전 과정을 운영사인 라운드미디어가 모니터링하여, 어뷰징과 먹튀 등을 사전에 방지하고 안전하고 쾌적한 마켓플레이스를 유지합니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mt-4">04 / MONITORING</div>
            </div>
          }
          productivity={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5 text-black" />
                  <h3 className="text-lg font-black text-black">미디어킷 자동 노출</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">
                  채널 프로필에 업로드한 PDF 미디어킷이 광고주 검색 시 자동으로 노출되어, 별도의 자료 전송 없이도 채널의 가치를 매력적으로 브랜딩합니다.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-400 mt-4">05 / MEDIA KIT</div>
            </div>
          }
          shortcuts={
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-bold bg-zinc-950 px-2 py-0.5 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-xl font-black mb-2 text-white">프리미엄 노출 서비스</h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  우수 크리에이터와 급성장 채널을 광고주 탐색 화면 최상단 및 추천 섹션에 우선 노출하는 프리미엄 멤버십 제도를 곧 선보입니다. 브랜드의 러브콜을 더 많이 받아보세요.
                </p>
              </div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mt-4">06 / PREMIUM BENEFITS</div>
            </div>
          }
        />
      </section>

      {/* Process Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-black uppercase tracking-wider text-black">HOW IT WORKS</h2>
        <div className="border-t border-black divide-y divide-black">
          {[
            { step: "01", title: "채널 등록", desc: "유튜브 채널의 주요 지표와 상세 시청자 인구통계(연령, 성별, 기기 등), 광고 유형별 상세 단가를 입력합니다." },
            { step: "02", title: "운영진 심사", desc: "실제 유효 채널 여부 및 데이터 신뢰성 확보를 위해 운영사(라운드미디어)가 24시간 이내 신속하게 심사를 진행합니다." },
            { step: "03", title: "승인 및 공개", desc: "심사 통과 즉시 마켓플레이스에 전체 공개되어 수많은 검증된 스폰서(광고주)들에게 채널이 노출됩니다." },
            { step: "04", title: "브리프 수신", desc: "브랜드로부터 제작 요청, 예산, 영상 방향성이 상세히 작성된 공식 협찬 브리프를 대시보드에서 수신합니다." },
            { step: "05", title: "수락 및 협상", desc: "제안받은 브리프의 상세 조건과 광고주 정보, 예산을 검토한 뒤 수락 혹은 조건 조율을 진행합니다." },
            { step: "06", title: "콘텐츠 제작 후 정산", desc: "콘텐츠를 최종 제작 및 업로드하고, 약속된 지급 조건과 에스크로 정산 일정에 따라 안전하게 정산금을 지급받습니다." }
          ].map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 py-8 gap-4 items-start">
              <div className="text-4xl font-black tracking-tighter text-black md:col-span-1">
                {item.step}
              </div>
              <div className="text-xl font-bold md:col-span-1 text-black">
                {item.title}
              </div>
              <div className="text-gray-600 text-sm md:col-span-2 leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border border-black p-8 md:p-12 bg-white flex flex-col md:flex-row items-center justify-between gap-8 rounded-none">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-black uppercase text-black">START EARNING TODAY</h3>
          <p className="text-gray-600 text-sm">
            복잡한 대행사 과정 없이, 당신만의 조건과 단가로 비즈니스를 주도하세요.
          </p>
        </div>
        <a 
          href="/signup?role=creator" 
          className="bg-black text-white px-8 py-4 uppercase font-bold tracking-widest text-sm hover:bg-white hover:text-black border border-black transition-colors rounded-none flex items-center gap-2 whitespace-nowrap"
        >
          지금 채널 등록하기
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  )
}
