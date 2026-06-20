import React from "react"

export default function PrivacyPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-20 bg-white min-h-[70vh] space-y-12">
      {/* Header */}
      <section className="pb-8 border-b border-black">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-black">
          개인정보처리방침
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          (주)라운드미디어(이하 &quot;회사&quot;)는 회원의 개인정보를 소중하게 생각하며, 개인정보보호법 등 관련 법령을 준수하고 있습니다.
        </p>
      </section>

      {/* Privacy Content */}
      <section className="border border-black p-8 md:p-12 space-y-8 text-sm md:text-base text-gray-800 leading-relaxed rounded-none bg-white">
        <div>
          <h2 className="text-xl font-bold text-black mb-3">제1조 (개인정보의 수집 및 이용 목적)</h2>
          <p className="mb-2">회사는 다음과 같은 목적을 위하여 최소한의 개인정보를 수집 및 이용하고 있습니다.</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>회원 가입 및 관리:</strong> 회원 식별, 가입 의사 확인, 불량 회원의 부정이용 방지, 분쟁 조정을 위한 기록 보존 등</li>
            <li><strong>서비스 제공 및 정산:</strong> 마켓플레이스 매칭(브리프 발송), 에스크로 결제 처리 및 정산금 지급, 본인 확인 및 연령 인증 등</li>
            <li><strong>마케팅 및 광고 활용 (선택):</strong> 신규 서비스 안내, 프로모션 및 이벤트 정보 제공 등</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제2조 (수집하는 개인정보의 항목)</h2>
          <p className="mb-2">서비스 이용 과정에서 수집되는 개인정보 항목은 다음과 같습니다.</p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li><strong>필수 수집 항목:</strong> 이름, 이메일 주소, 비밀번호, 가입 역할(크리에이터/스폰서)</li>
            <li><strong>크리에이터 추가 수집 항목:</strong> 유튜브 채널 URL, 채널명, 채널 설명, 광고 단가 정보, 오디언스 인구통계 데이터, 미디어킷 파일</li>
            <li><strong>정산 시 수집 항목 (크리에이터):</strong> 은행명, 계좌번호, 예금주명, 주민등록번호(세금 신고 목적, 관련 법령에 의함)</li>
            <li><strong>서비스 이용 중 자동 수집 항목:</strong> IP 주소, 쿠키, 서비스 이용 기록, 브라우저 유형, OS 정보 등</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제3조 (개인정보의 보유 및 이용 기간)</h2>
          <p>
            회사는 회원이 탈퇴하거나 서비스 이용 계약이 종료될 때까지 개인정보를 보유 및 이용합니다. 단, 관련 법령(전자상거래법, 통신비밀보호법 등)에 의하여 보존할 필요가 있는 경우, 해당 법령에서 규정한 기간 동안 회원의 개인정보를 보관합니다.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
            <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
            <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
            <li>웹사이트 방문 기록 (로그): 3개월 (통신비밀보호법)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제4조 (개인정보의 제3자 제공)</h2>
          <p>
            회사는 회원의 동의가 있거나 법률의 특별한 규정에 해당하는 경우를 제외하고는 개인정보를 제3자에게 제공하지 않습니다. 단, 서비스의 원활한 제공을 위해 다음과 같이 개인정보 제공 및 위탁을 시행하고 있습니다.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4 mt-2">
            <li><strong>제공 받는 자:</strong> Dodo Payments (결제 대행 및 MoR 정산 처리)</li>
            <li><strong>위탁 목적:</strong> 안전한 에스크로 결제 집행 및 정산 송금</li>
            <li><strong>제공 항목:</strong> 결제 정보, 이메일, 이름</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-black mb-3">제5조 (이용자의 권리와 그 행사방법)</h2>
          <p>
            회원은 언제든지 자신의 개인정보를 조회, 수정하거나 회원 탈퇴를 통해 개인정보의 수집 및 이용 동의를 철회할 수 있습니다. 개인정보 조회 및 수정은 플랫폼 내 &#39;설정&#39; 혹은 &#39;프로필 편집&#39; 메뉴에서 직접 가능하며, 고객지원 센터(support@roundmedia.co)를 통해 서면 또는 이메일로 요청 시 지체 없이 처리해 드립니다.
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
