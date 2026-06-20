import React from "react"

interface NoticeItem {
  id: string
  date: string
  title: string
  category: string
  content: string
}

const mockNotices: NoticeItem[] = [
  {
    id: "1",
    date: "2026.06.15",
    category: "SERVICE",
    title: "ViewPoint 서비스 공식 오픈 및 정식 서비스 런칭 안내",
    content: "안녕하세요. 라운드미디어 ViewPoint 운영팀입니다. 크리에이터와 스폰서를 다이렉트로 매칭해주는 혁신적인 마켓플레이스 ViewPoint가 드디어 정식 오픈하였습니다. 투명한 단가 공개와 안전한 에스크로 거래 시스템을 통해 더욱 효율적인 협찬 비즈니스를 만나보세요. 감사합니다."
  },
  {
    id: "2",
    date: "2026.06.10",
    category: "EVENT",
    title: "스폰서 가입 시 무료 3크레딧 즉시 지급 프로모션",
    content: "신규 가입하시는 모든 광고주(스폰서) 계정에 크리에이터에게 협찬 브리프를 발송할 수 있는 '무료 3크레딧'을 충전해 드립니다. 지금 가입하시고 수수료 없이 원하시는 크리에이터 채널에 직접 제안해 보세요."
  },
  {
    id: "3",
    date: "2026.06.01",
    category: "GUIDE",
    title: "크리에이터 채널 심사 가이드라인 및 필수 지표 변경 공지",
    content: "안전하고 신뢰할 수 있는 마켓플레이스 생태계 조성을 위해 크리에이터 채널 등록 시 운영진의 1차 심사가 진행됩니다. 유튜브 스튜디오 지표 스크린샷 및 실제 오디언스 인구통계 입력의 정확성에 따라 승인 처리가 신속히 진행되오니 크리에이터 여러분들의 적극적인 협조 부탁드립니다."
  },
  {
    id: "4",
    date: "2026.05.20",
    category: "UPDATE",
    title: "미디어킷 PDF 파일 업로드 및 관리자 모니터링 개선 패치노트",
    content: "크리에이터 대시보드 내에 PDF 형태의 미디어킷(소개서) 업로드 기능이 추가되었습니다. 광고주는 크리에이터의 채널 카드 클릭 시 미디어킷을 무료로 열람 및 다운로드할 수 있어 보다 정교한 검토가 가능해졌습니다."
  }
]

export default function NoticePage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-20 bg-white min-h-[70vh] space-y-12">
      {/* Header */}
      <section className="pb-8 border-b border-black">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-4 text-black">
          NOTICE
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed max-w-2xl">
          ViewPoint의 새로운 소식과 안내 사항을 확인하세요
        </p>
      </section>

      {/* Notice List */}
      <section className="border-t border-black divide-y divide-black">
        {mockNotices.map((notice) => (
          <div key={notice.id} className="py-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            {/* Meta Info */}
            <div className="md:col-span-1 space-y-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-white bg-black px-2 py-0.5 font-bold rounded-none">
                  {notice.category}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500 tracking-wider font-mono pt-1">
                {notice.date}
              </p>
            </div>
            
            {/* Title & Content */}
            <div className="md:col-span-3 space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-black hover:text-blue-600 transition-colors cursor-pointer">
                {notice.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {notice.content}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
