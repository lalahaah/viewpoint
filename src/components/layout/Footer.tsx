import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-black rounded-none">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Company Information */}
        <div className="flex flex-col space-y-4">
          <span className="font-black uppercase tracking-widest text-black text-lg">
            VIEWPOINT
          </span>
          <div className="text-xs text-gray-600 space-y-1">
            <p className="font-bold">(주)라운드미디어 | Round Media Inc.</p>
            <p>대표자: 홍길동 | 사업자등록번호: 000-00-00000</p>
            <p>서울특별시 강남구 테헤란로 123, 4층</p>
            <p>고객지원: support@roundmedia.co.kr | 1660-0000</p>
            <p className="pt-2 text-gray-400">© 2026 Round Media Inc. All rights reserved.</p>
          </div>
        </div>

        {/* Right: Help & Policy links */}
        <div className="flex flex-col md:items-end justify-between space-y-6 md:space-y-0">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-gray-500 font-bold md:justify-end">
            <Link href="/notice" className="hover:text-black transition-colors rounded-none">
              공지사항
            </Link>
            <Link href="/faq" className="hover:text-black transition-colors rounded-none">
              FAQ
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors rounded-none">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-black transition-colors rounded-none">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
