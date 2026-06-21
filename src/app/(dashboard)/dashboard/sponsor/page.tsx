import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { sponsorDashboardMock } from "@/lib/mockData"
import { StatusBadge } from "@/components/shared/StatusBadge"
import Link from "next/link"

export default async function SponsorDashboardPage() {
  const session = await auth()

  if (!session || (session.user.role !== "SPONSOR" && session.user.role !== "ADMIN")) {
    redirect("/login")
  }

  const { stats, recentBriefs } = sponsorDashboardMock
  const isCreditLow = stats.creditBalance < 3

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
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">광고주 대시보드</h1>
        <p className="text-gray-500 text-sm">{session.user.name || session.user.email} 광고주님, 환영합니다.</p>
      </div>

      {/* Credit Low Alert Banner */}
      {isCreditLow && (
        <div className="border border-black p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p className="font-bold text-sm uppercase tracking-wider">⚠️ 크레딧이 부족합니다</p>
            <p className="text-xs text-gray-500">현재 잔여 크레딧은 {stats.creditBalance}개입니다. 원활한 브리프 발송을 위해 크레딧을 충전하세요.</p>
          </div>
          <Link
            href="/dashboard/sponsor/billing"
            className="border border-black bg-black text-white hover:bg-white hover:text-black px-4 py-2 text-xs uppercase font-bold tracking-widest transition-colors w-full sm:w-auto text-center"
          >
            충전하기
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div>
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold mb-4">캠페인 요약</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 border border-black divide-x divide-y md:divide-y-0 divide-black">
          <div className="p-6 bg-white">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">잔여 크레딧</p>
            <p className="text-2xl font-black">{stats.creditBalance}개</p>
          </div>
          <div className="p-6 bg-white border-t border-black md:border-t-0">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">보낸 브리프 수</p>
            <p className="text-2xl font-black">{stats.totalBriefs}건</p>
          </div>
          <div className="p-6 bg-white border-t border-black md:border-t-0">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">성사된 협찬</p>
            <p className="text-2xl font-black">{stats.completedDeals}건</p>
          </div>
          <div className="p-6 bg-white border-t border-black md:border-t-0">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">총 집행 금액</p>
            <p className="text-2xl font-black">{formatCurrency(stats.totalSpent)}</p>
          </div>
        </div>
      </div>

      {/* Recent Sent Briefs */}
      <div>
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold mb-4">최근 보낸 브리프</h2>
        <div className="border border-black bg-white">
          {recentBriefs.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">보낸 브리프 내역이 없습니다.</div>
          ) : (
            <div className="divide-y divide-black">
              {recentBriefs.map((brief) => (
                <div key={brief.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg">{brief.channelName}</p>
                      <span className="text-xs text-gray-400">({brief.brandName})</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span>광고 유형: <strong className="text-black">{adTypeMap[brief.adType] || brief.adType}</strong></span>
                      <span className="hidden md:inline">|</span>
                      <span>제안 예산: <strong className="text-black">{formatCurrency(brief.budget)}</strong></span>
                      <span className="hidden md:inline">|</span>
                      <span>발송일: {new Date(brief.sentAt).toLocaleDateString("ko-KR")}</span>
                    </div>
                  </div>
                  <div>
                    <StatusBadge status={brief.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
