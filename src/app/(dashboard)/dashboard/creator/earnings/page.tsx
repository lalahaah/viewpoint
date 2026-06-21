import { creatorDashboardMock } from "@/lib/mockData"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CreatorEarningsPage() {
  const session = await auth()

  if (!session || (session.user.role !== "CREATOR" && session.user.role !== "ADMIN")) {
    redirect("/login")
  }

  const { earnings } = creatorDashboardMock

  // Calculate stats from mock earnings data
  const totalNetEarnings = earnings
    .filter((e) => e.status === "COMPLETED")
    .reduce((acc, curr) => acc + curr.netAmount, 0)

  const pendingEarnings = earnings
    .filter((e) => e.status === "PENDING")
    .reduce((acc, curr) => acc + curr.netAmount, 0)

  const thisMonthEarnings = creatorDashboardMock.stats.monthlyEarnings

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">수익 / 정산</h1>
        <p className="text-gray-500 text-sm">진행 완료된 캠페인의 수익 수취 내역 및 정산 프로세스를 확인할 수 있습니다.</p>
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-black divide-y md:divide-y-0 md:divide-x divide-black bg-white">
        <div className="p-6">
          <p className="uppercase text-xs font-bold tracking-wider text-gray-500 mb-1">총 누적 수령액</p>
          <p className="text-2xl font-black">{formatCurrency(totalNetEarnings)}</p>
        </div>
        <div className="p-6">
          <p className="uppercase text-xs font-bold tracking-wider text-gray-500 mb-1">이번달 총 수익</p>
          <p className="text-2xl font-black">{formatCurrency(thisMonthEarnings)}</p>
        </div>
        <div className="p-6">
          <p className="uppercase text-xs font-bold tracking-wider text-gray-500 mb-1">정산 대기중</p>
          <p className="text-2xl font-black text-blue-600">{formatCurrency(pendingEarnings)}</p>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="space-y-4">
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold">정산 내역</h2>
        <div className="border border-black overflow-x-auto bg-white">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-black text-white text-xs uppercase tracking-widest font-black border-b border-black">
              <tr>
                <th className="px-6 py-4">날짜</th>
                <th className="px-6 py-4">광고주</th>
                <th className="px-6 py-4 text-right">금액</th>
                <th className="px-6 py-4 text-right">플랫폼 수수료 (10%)</th>
                <th className="px-6 py-4 text-right">실수령액</th>
                <th className="px-6 py-4 text-center">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black text-sm">
              {earnings.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 font-bold">{item.sponsor}</td>
                  <td className="px-6 py-4 text-right">{formatCurrency(item.amount)}</td>
                  <td className="px-6 py-4 text-right text-gray-500">{formatCurrency(item.fee)}</td>
                  <td className="px-6 py-4 text-right font-black text-black">{formatCurrency(item.netAmount)}</td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
