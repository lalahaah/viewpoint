import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { adminDashboardMock } from "@/lib/mockData"
import StatsGrid from "@/components/admin/StatsGrid"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const { stats, pendingChannels } = adminDashboardMock

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const formattedStats = [
    { label: "총 사용자", value: `${stats.totalUsers}명` },
    { label: "오늘 심사 대기", value: `${stats.pendingToday}건` },
    { label: "이번달 거래액", value: formatCurrency(stats.monthlyVolume) },
    { label: "플랫폼 수수료 수익", value: formatCurrency(stats.platformRevenue) },
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">관리자 대시보드</h1>
        <p className="text-gray-500 text-sm">플랫폼 상태 요약 및 즉시 심사가 필요한 신규 채널 내역입니다.</p>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold mb-4 font-sans">플랫폼 지표 요약</h2>
        <StatsGrid stats={formattedStats} />
      </div>

      {/* Pending Channels Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold font-sans">심사 대기 채널</h2>
          <Link
            href="/admin/channels"
            className="text-xs uppercase font-black underline hover:text-gray-600 transition-colors"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="border border-black bg-white">
          {pendingChannels.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">대기 중인 신규 채널이 없습니다.</div>
          ) : (
            <div className="divide-y divide-black">
              {pendingChannels.map((ch) => (
                <div key={ch.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-bold text-lg">{ch.channelName}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span>크리에이터: <strong className="text-black">{ch.creatorName}</strong></span>
                      <span>|</span>
                      <span>카테고리: <strong className="text-black">{ch.category}</strong></span>
                      <span>|</span>
                      <span>유형: <strong className="text-black uppercase">{ch.type}</strong></span>
                      <span>|</span>
                      <span>등록일: {ch.createdAt}</span>
                    </div>
                  </div>
                  <Link
                    href="/admin/channels"
                    className="border border-black bg-white text-black hover:bg-black hover:text-white px-4 py-2 text-xs uppercase font-bold tracking-widest transition-colors w-full sm:w-auto text-center"
                  >
                    심사하기
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
