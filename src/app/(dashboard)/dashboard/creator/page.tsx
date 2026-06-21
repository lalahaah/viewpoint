import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { creatorDashboardMock } from "@/lib/mockData"
import { StatusBadge } from "@/components/shared/StatusBadge"

export default async function CreatorDashboardPage() {
  const session = await auth()

  if (!session || (session.user.role !== "CREATOR" && session.user.role !== "ADMIN")) {
    redirect("/login")
  }

  const { stats, recentBriefs } = creatorDashboardMock

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num)
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
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">대시보드</h1>
        <p className="text-gray-500 text-sm">{session.user.name || session.user.email} 크리에이터님, 환영합니다.</p>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold mb-4">채널 요약</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 border border-black divide-x divide-y md:divide-y-0 divide-black">
          <div className="p-6 bg-white">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">총 채널 수</p>
            <p className="text-2xl font-black">{stats.totalChannels}개</p>
          </div>
          <div className="p-6 bg-white border-t border-black md:border-t-0">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">받은 브리프 수</p>
            <p className="text-2xl font-black">{stats.totalBriefs}건</p>
          </div>
          <div className="p-6 bg-white border-t border-black md:border-t-0">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">이번달 수익</p>
            <p className="text-2xl font-black">{formatCurrency(stats.monthlyEarnings)}</p>
          </div>
          <div className="p-6 bg-white border-t border-black md:border-t-0">
            <p className="uppercase text-xs tracking-wider text-gray-500 mb-1">채널 총 조회수</p>
            <p className="text-2xl font-black">{formatNumber(stats.totalViews)}회</p>
          </div>
        </div>
      </div>

      {/* Recent Briefs Section */}
      <div>
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold mb-4">최근 브리프</h2>
        <div className="border border-black bg-white">
          {recentBriefs.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">받은 브리프가 없습니다.</div>
          ) : (
            <div className="divide-y divide-black">
              {recentBriefs.map((brief) => (
                <div key={brief.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-bold text-lg">{brief.brandName}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span>광고 유형: <strong className="text-black">{adTypeMap[brief.adType] || brief.adType}</strong></span>
                      <span className="hidden md:inline">|</span>
                      <span>제안 예산: <strong className="text-black">{formatCurrency(brief.budget)}</strong></span>
                      <span className="hidden md:inline">|</span>
                      <span>수신일: {new Date(brief.createdAt).toLocaleDateString("ko-KR")}</span>
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
