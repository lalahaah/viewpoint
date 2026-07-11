"use client"

import React, { useState } from "react"
import { sponsorDashboardMock } from "@/lib/mockData"
import { StatusBadge } from "@/components/shared/StatusBadge"

export default function SponsorBillingPage() {
  const { stats, billingHistory } = sponsorDashboardMock

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const [purchasing, setPurchasing] = useState<string | null>(null)

  const handlePurchase = async (packageName: string) => {
    setPurchasing(packageName)
    try {
      const res = await fetch("/api/payments/buy-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package: packageName }),
      })
      const result = await res.json()
      if (!result.success) {
        alert(`결제 요청 실패: ${result.error}`)
        return
      }
      window.location.href = result.data.checkoutUrl
    } catch (err) {
      console.error("purchase error:", err)
      alert("결제 요청 중 네트워크 오류가 발생했습니다.")
    } finally {
      setPurchasing(null)
    }
  }

  const packages = [
    {
      name: "STARTER",
      credits: 5,
      price: 49000,
      description: "기본 테스트용 플랜",
      isBest: false
    },
    {
      name: "GROWTH",
      credits: 20,
      price: 149000,
      description: "대부분의 성장하는 브랜드에 추천",
      isBest: true
    },
    {
      name: "PRO",
      credits: 50,
      price: 299000,
      description: "대규모 마케팅 대행사 최적화 플랜",
      isBest: false
    }
  ]

  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-wider mb-2">크레딧 / 결제</h1>
        <p className="text-gray-500 text-sm">브리프 발송에 필요한 크레딧을 구매하고 결제 영수증 내역을 검토할 수 있습니다.</p>
      </div>

      {/* Balance Box */}
      <div className="border border-black p-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="uppercase text-xs tracking-wider text-gray-500 font-bold block mb-1">현재 잔여 크레딧</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{stats.creditBalance}</span>
            <span className="text-sm font-bold text-gray-500">크레딧</span>
          </div>
        </div>
        <div className="border border-black p-4 bg-gray-50 max-w-xs w-full text-xs space-y-1">
          <p className="font-bold uppercase tracking-wider">💡 크레딧 정책 안내</p>
          <p className="text-gray-500 leading-relaxed">
            1크레딧으로 원하는 유튜브 크리에이터 채널 1곳에 광고 스폰서십 제안 브리프를 발송할 수 있습니다.
          </p>
        </div>
      </div>

      {/* Credit Packages */}
      <div>
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold mb-4">크레딧 충전 패키지</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-black divide-y md:divide-y-0 md:divide-x divide-black bg-white">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-6 flex flex-col justify-between min-h-[300px] ${
                pkg.isBest ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black tracking-wide">{pkg.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{pkg.description}</p>
                  </div>
                  {pkg.isBest && (
                    <span className="border border-black rounded-full text-[9px] tracking-widest font-black uppercase px-2 py-0.5 bg-black text-white">
                      Best Value
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{pkg.credits}</span>
                    <span className="text-xs font-bold text-gray-500">크레딧</span>
                  </div>
                  <p className="text-lg font-black text-gray-900">{formatCurrency(pkg.price)}</p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handlePurchase(pkg.name)}
                  disabled={purchasing === pkg.name}
                  className={`w-full py-3 text-xs uppercase font-bold tracking-widest border border-black transition-colors ${
                    pkg.isBest
                      ? "bg-black text-white hover:bg-white hover:text-black"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {purchasing === pkg.name ? "처리 중..." : "구매하기"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="space-y-4">
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold">결제 내역</h2>
        <div className="border border-black overflow-x-auto bg-white">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-black text-white text-xs uppercase tracking-widest font-black border-b border-black">
              <tr>
                <th className="px-6 py-4">결제 일자</th>
                <th className="px-6 py-4">구매 내역</th>
                <th className="px-6 py-4 text-right">결제 금액</th>
                <th className="px-6 py-4 text-center">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black text-sm">
              {billingHistory.map((history) => (
                <tr key={history.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{history.date}</td>
                  <td className="px-6 py-4 font-bold">{history.item}</td>
                  <td className="px-6 py-4 text-right font-bold">{formatCurrency(history.amount)}</td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={history.status} />
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
