"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, Suspense } from "react"

function MockCheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const session = searchParams.get("session")
  const amount = searchParams.get("amount")
  const [simulating, setSimulating] = useState(false)
  const [done, setDone] = useState(false)
  const [eventType, setEventType] = useState<"payment.completed" | "credit.completed">("credit.completed")

  const formatCurrency = (val: string | null) => {
    if (!val) return "-"
    return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(Number(val))
  }

  const handleSimulate = async () => {
    if (!session) return
    setSimulating(true)
    try {
      const mockPayload = {
        type: eventType,
        data: {
          metadata: {
            // credit.completed 시뮬레이션 기본값
            userId: "mock-user-id",
            quantity: 5,
            amount: amount || 49000,
            package: "STARTER",
            // payment.completed 시뮬레이션 기본값
            paymentId: "mock-payment-id",
            briefId: "mock-brief-id",
          },
          dodoPaymentId: "mock_dodo_" + session,
        },
      }

      const res = await fetch("/api/payments/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "dodo-signature": "mock-signature",
        },
        body: JSON.stringify(mockPayload),
      })
      const result = await res.json()
      if (result.success) {
        setDone(true)
      } else {
        alert("시뮬레이션 실패: " + (result.error || "알 수 없는 오류"))
      }
    } catch (err) {
      console.error("simulation error:", err)
      alert("시뮬레이션 중 오류가 발생했습니다.")
    } finally {
      setSimulating(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg border border-black bg-white">
        {/* Header */}
        <div className="border-b border-black p-6 bg-black text-white">
          <p className="text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">
            개발 전용 — MOCK CHECKOUT
          </p>
          <h1 className="text-2xl font-black uppercase tracking-wider">
            결제 시뮬레이터
          </h1>
        </div>

        {/* Notice */}
        <div className="border-b border-black p-4 bg-yellow-50">
          <p className="text-xs font-bold uppercase tracking-wider text-yellow-800">
            ⚠️ 이 페이지는 DODO_API_KEY가 없을 때만 표시되는 개발/테스트용 페이지입니다.
          </p>
          <p className="text-xs text-yellow-700 mt-1 leading-relaxed">
            실제 결제가 이루어지지 않습니다. &quot;결제 완료 시뮬레이션&quot; 버튼으로 Webhook을 직접 트리거하여 DB 업데이트를 테스트할 수 있습니다.
          </p>
        </div>

        {/* Session Info */}
        <div className="p-6 space-y-4 border-b border-black">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="block text-gray-400 uppercase tracking-wider font-bold mb-1">Session ID</span>
              <span className="font-black text-sm break-all">{session || "없음"}</span>
            </div>
            <div>
              <span className="block text-gray-400 uppercase tracking-wider font-bold mb-1">결제 금액</span>
              <span className="font-black text-sm">{formatCurrency(amount)}</span>
            </div>
          </div>
        </div>

        {/* Event Type Selector */}
        <div className="p-6 border-b border-black space-y-3">
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">시뮬레이션 이벤트 타입</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
              <input
                type="radio"
                name="eventType"
                value="credit.completed"
                checked={eventType === "credit.completed"}
                onChange={() => setEventType("credit.completed")}
                className="accent-black"
              />
              크레딧 구매 (credit.completed)
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
              <input
                type="radio"
                name="eventType"
                value="payment.completed"
                checked={eventType === "payment.completed"}
                onChange={() => setEventType("payment.completed")}
                className="accent-black"
              />
              협찬 결제 (payment.completed)
            </label>
          </div>
        </div>

        {/* Action */}
        <div className="p-6 space-y-4">
          {done ? (
            <div className="border border-black p-4 bg-gray-50 text-center">
              <p className="font-black text-sm uppercase tracking-wider">✅ 시뮬레이션 완료</p>
              <p className="text-xs text-gray-500 mt-1">Webhook이 트리거되었습니다. Supabase에서 DB 변경을 확인하세요.</p>
              <div className="flex gap-3 mt-4 justify-center">
                <button
                  onClick={() => router.push("/dashboard/sponsor/billing")}
                  className="border border-black px-4 py-2 text-xs uppercase font-bold hover:bg-black hover:text-white transition-colors"
                >
                  결제 페이지로
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="bg-black text-white border border-black px-4 py-2 text-xs uppercase font-bold hover:bg-white hover:text-black transition-colors"
                >
                  홈으로
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={handleSimulate}
                disabled={simulating || !session}
                className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-black border border-black hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {simulating ? "시뮬레이션 중..." : "결제 완료 시뮬레이션"}
              </button>
              <button
                onClick={() => router.back()}
                className="w-full border border-black py-3 uppercase tracking-widest text-xs font-bold hover:bg-black hover:text-white transition-colors"
              >
                취소 — 이전 페이지로
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MockCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
      <MockCheckoutContent />
    </Suspense>
  )
}
