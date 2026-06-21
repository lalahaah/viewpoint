import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { adminDashboardMock } from "@/lib/mockData"
import { StatusBadge } from "@/components/shared/StatusBadge"

export default async function AdminSettlementsPage() {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const { settlements } = adminDashboardMock

  const totalVolume = settlements.reduce((acc, curr) => acc + curr.amount, 0)
  const totalRevenue = settlements
    .filter((s) => s.status === "COMPLETED")
    .reduce((acc, curr) => acc + curr.fee, 0)
  const completedCount = settlements.filter((s) => s.status === "COMPLETED").length
  const pendingCount = settlements.filter((s) => s.status === "PENDING").length

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">정산 관리</h1>
        <p className="text-gray-500 text-sm">에스크로 거래 대금 흐름 모니터링 및 완료된 캠페인의 크리에이터 정산 내역을 관리합니다.</p>
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 border border-black divide-x divide-y md:divide-y-0 divide-black bg-white">
        <div className="p-6">
          <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500 block mb-1">총 거래 대금</span>
          <p className="text-xl font-black">{formatCurrency(totalVolume)}</p>
        </div>
        <div className="p-6">
          <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500 block mb-1">수수료 수익 (확정)</span>
          <p className="text-xl font-black text-blue-600">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="p-6">
          <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500 block mb-1">정산 완료 건수</span>
          <p className="text-xl font-black">{completedCount}건</p>
        </div>
        <div className="p-6">
          <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500 block mb-1">정산 대기 건수</span>
          <p className="text-xl font-black text-gray-500">{pendingCount}건</p>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="space-y-4">
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold">정산 내역 목록</h2>
        <div className="border border-black overflow-x-auto bg-white">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-black text-white text-xs uppercase tracking-widest font-black border-b border-black">
              <tr>
                <th className="px-6 py-4">일자</th>
                <th className="px-6 py-4">광고주</th>
                <th className="px-6 py-4">크리에이터</th>
                <th className="px-6 py-4 text-right">거래 대금</th>
                <th className="px-6 py-4 text-right">수수료 (10%)</th>
                <th className="px-6 py-4 text-right">실수령액</th>
                <th className="px-6 py-4 text-center">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black text-sm">
              {settlements.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 font-bold">{item.sponsor}</td>
                  <td className="px-6 py-4 font-bold">{item.creator}</td>
                  <td className="px-6 py-4 text-right font-medium">{formatCurrency(item.amount)}</td>
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
