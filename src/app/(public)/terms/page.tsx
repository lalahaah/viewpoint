import React from "react"

export default function TermsPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-20 bg-white min-h-[70vh] space-y-12">
      {/* Header */}
      <section className="pb-8 border-b border-black">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-black">
          이용약관
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          ViewPoint 마켓플레이스 서비스 이용약관입니다. 서비스를 이용하시기 전에 본 약관을 주의 깊게 읽어주시기 바랍니다.
        </p>
      </section>

      {/* Terms Content */}
      <section className="border border-black p-8 md:p-12 space-y-8 text-sm md:text-base text-gray-800 leading-relaxed rounded-none bg-white">
        <div>
          <h2 className="text-xl font-bold text-black mb-3">제1조 (목적)</h2>
          <p>
            본 약관은 (주)라운드미디어(이하 &quot;회사&quot;)가 운영하는 온라인 크리에이터 협찬 마켓플레이스 플랫폼 &quot;ViewPoint&quot;(이하 &quot;서비스&quot;)의 이용과 관련하여, 회사와 회원(크리에이터 및 스폰서) 간의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제2조 (정의)</h2>
          <p className="mb-2">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>회원:</strong> 플랫폼에 가입하여 서비스를 이용하는 모든 자를 의미하며, &quot;크리에이터&quot;와 &quot;스폰서&quot;로 구분됩니다.</li>
            <li><strong>크리에이터:</strong> 채널 정보를 등록하고, 스폰서로부터 제안(브리프)을 수신하여 콘텐츠 제작 협찬을 진행하는 회원을 말합니다.</li>
            <li><strong>스폰서 (광고주):</strong> 플랫폼에 가입하여 크리에이터 채널을 검색하고, 크레딧을 사용하여 제안(브리프)을 발송하며 광고 협찬을 집행하는 개인 또는 법인 회원을 말합니다.</li>
            <li><strong>브리프:</strong> 스폰서가 크리에이터에게 발송하는 광고 제작 및 협찬 제안서를 의미합니다.</li>
            <li><strong>크레딧:</strong> 스폰서가 크리에이터에게 브리프를 발송할 때 차감되는 플랫폼 내의 가상 도구를 의미합니다.</li>
            <li><strong>에스크로 (Escrow):</strong> 스폰서가 결제한 협찬 금액을 플랫폼이 임시 보관하며, 콘텐츠 인도 완료 확인 시 크리에이터에게 정산해주는 안전 거래 시스템을 말합니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제3조 (회원가입 및 계정)</h2>
          <p>
            회원가입은 이용자가 본 약관에 동의하고 가입 양식을 작성하여 신청한 후 회사가 이를 승인함으로써 성립합니다. 회원은 자신의 계정 정보(이메일, 비밀번호 등)에 대한 철저한 관리 책임이 있으며, 계정 도용 등으로 인해 발생하는 불이익에 대해 회사는 책임을 지지 않습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제4조 (서비스의 이용 및 제한)</h2>
          <p>
            회사는 회원에게 채널 탐색, 브리프 발송, 안전 정산 시스템 등의 기능을 제공합니다. 회원은 타인의 명예를 훼손하거나 유해 정보를 게시하여서는 안 되며, 허위 정보를 입력(예: 크리에이터 지표 과장 등)하여 거래의 신뢰를 깨뜨리는 경우 회사는 사전 통보 없이 서비스 이용을 정지하거나 계정을 해지할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제5조 (결제 및 환불 정책)</h2>
          <p>
            스폰서가 수락된 협찬 거래에 대한 비용을 결제하면 플랫폼의 에스크로 시스템에 보관됩니다. 해당 거래가 진행되지 못하고 최종 거절되거나 기한 만료로 자동 취소될 경우 결제액은 전액 환불됩니다. 단, 크리에이터가 제작을 개시한 이후의 단순 변심에 의한 환불은 원칙적으로 불가하며, 양사 간 합의 또는 분쟁 조정을 통해서만 부분 환불 또는 환불 처리가 가능합니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제6조 (크레딧 정책)</h2>
          <p>
            1크레딧은 1건의 브리프 발송 권한을 제공합니다. 가입 시 제공되는 무료 크레딧 외에 추가 구매한 크레딧은 구매 후 7일 이내에 미사용분에 한해 전액 환불 가능합니다. 사용한 크레딧은 크리에이터의 응답 여부(수락/거절)와 관계없이 소진되는 것을 원칙으로 하나, 크리에이터 측의 귀책으로 거래가 취소된 경우 운영진 검토 후 크레딧이 복구될 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제7조 (콘텐츠 제작 및 양 당사자의 책임)</h2>
          <p>
            크리에이터는 광고주와 합의한 브리프 사양 및 기한에 맞추어 콘텐츠를 신의성실하게 제작 및 게시할 의무가 있습니다. 제작된 콘텐츠의 저작권과 초상권, 제3자 지식재산권 침해 여부 등에 대한 모든 법적 책임은 콘텐츠를 직접 제작한 크리에이터와 의뢰한 광고주(스폰서)에게 귀속되며, 회사는 중개 플랫폼으로서 이에 대해 어떠한 대리 책임도 지지 않습니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제8조 (면책조항)</h2>
          <p>
            회사는 천재지변, 기간통신사업자의 서비스 중단, 또는 기타 서비스 운영상의 통제할 수 없는 불가항력적 사유로 인하여 서비스를 제공할 수 없는 경우 이에 대한 책임을 면합니다. 또한 회사는 거래 과정에서 발생하는 회원 상호 간의 분쟁, 또는 회원에 의해 등록된 정보의 허위성으로 인한 손해에 대하여 직접적인 책임을 부담하지 않습니다.
          </p>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="border-t border-black pt-8 space-y-4 text-xs md:text-sm text-gray-500 font-mono">
        <h3 className="font-bold text-black text-sm uppercase">ROUND MEDIA CO., LTD.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p>상호: (주)라운드미디어 | 대표이사: 홍길동</p>
            <p>주소: 서울특별시 강남구 테헤란로 123, 7층</p>
            <p>사업자등록번호: 120-88-00000</p>
          </div>
          <div className="space-y-1">
            <p>통신판매업신고: 제 2026-서울강남-0000호</p>
            <p>고객지원 이메일: support@roundmedia.co</p>
            <p>© 2026 (주)라운드미디어. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
