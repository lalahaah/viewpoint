/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Channel } from "@/lib/mockData"
import { X, Check } from "lucide-react"

interface BriefModalProps {
  channel: Channel | null
  onClose: () => void
}

const AD_TYPES = [
  { key: "integrated", label: "통합 광고" },
  { key: "review", label: "제품 리뷰" },
  { key: "mention", label: "스폰서 언급" },
  { key: "shorts", label: "쇼츠 광고" },
  { key: "community", label: "커뮤니티 포스트" },
  { key: "earlyBird", label: "얼리버드 단가" },
  { key: "package", label: "패키지 광고" },
]

export default function BriefModal({ channel, onClose }: BriefModalProps) {
  const [brandName, setBrandName] = useState("")
  const [productInfo, setProductInfo] = useState("")
  const [adType, setAdType] = useState("integrated")
  const [budget, setBudget] = useState("")
  const [contentDirection, setContentDirection] = useState("")
  const [desiredDate, setDesiredDate] = useState("")
  const [referenceUrl, setReferenceUrl] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!channel) return null

  const adPrices = channel.adPrices as any
  const selectedAdDetail = adPrices?.[adType]
  const priceLabel = selectedAdDetail?.price !== null && selectedAdDetail?.price !== undefined
    ? `₩${selectedAdDetail.price.toLocaleString()}`
    : "협의"
  const periodLabel = selectedAdDetail?.period !== null && selectedAdDetail?.period !== undefined
    ? `${selectedAdDetail.period}일`
    : "협의"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const briefData = {
      channelId: channel.id,
      brandName,
      productInfo,
      adType,
      budget: parseInt(budget, 10),
      contentDirection,
      desiredDate: desiredDate || null,
      referenceUrl: referenceUrl || null,
    }

    console.log("Submitting brief:", briefData)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      onClose()
      setBrandName("")
      setProductInfo("")
      setAdType("integrated")
      setBudget("")
      setContentDirection("")
      setDesiredDate("")
      setReferenceUrl("")
      setSuccess(false)
    }, 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 cursor-pointer"
        />

        {/* Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
          className="relative w-full max-w-2xl bg-white border-l border-black h-full overflow-y-auto z-10 flex flex-col justify-between rounded-none shadow-none text-black"
        >
          {success ? (
            /* Success Screen */
            <div className="flex flex-col items-center justify-center flex-grow p-12 text-center bg-white">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center border border-black mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest mb-4">
                SENT SUCCESSFULLY
              </h3>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                브리프가 성공적으로 발송되었습니다.<br />
                크리에이터의 답변을 기다려 주세요.
              </p>
            </div>
          ) : (
            /* Form Screen */
            <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full divide-y divide-black">
              {/* Header */}
              <div className="flex items-center justify-between p-6">
                <div>
                  <span className="uppercase text-[10px] tracking-widest text-gray-400 font-black block mb-1">
                    SUBMIT BRIEF
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-widest text-black">
                    BRIEF 보내기 — {channel.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-black p-2 hover:bg-black hover:text-white transition-colors rounded-none bg-white text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-6 overflow-y-auto flex-grow max-h-[calc(100vh-180px)]">
                {/* Brand name */}
                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-xs font-black text-black">
                    브랜드 / 회사명 *
                  </label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="예: (주)라운드미디어"
                    className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black font-bold"
                  />
                </div>

                {/* Product info */}
                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-xs font-black text-black">
                    제품 / 서비스 소개 *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={productInfo}
                    onChange={(e) => setProductInfo(e.target.value)}
                    placeholder="홍보하고자 하는 브랜드 제품 혹은 서비스의 주요 특징을 작성해주세요."
                    className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black font-bold resize-none"
                  />
                </div>

                {/* Ad Type selection */}
                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-xs font-black text-black">
                    원하는 광고 유형 *
                  </label>
                  <select
                    required
                    value={adType}
                    onChange={(e) => setAdType(e.target.value)}
                    className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black font-bold"
                  >
                    {AD_TYPES.map((t) => (
                      <option key={t.key} value={t.key}>
                        {t.label}
                      </option>
                    ))}
                  </select>

                  {/* Selected Pricing Preview */}
                  <div className="border border-black p-4 bg-gray-50 rounded-none text-xs font-black text-black flex justify-between">
                    <span>선택 단가: <span className="text-blue-600">{priceLabel}</span></span>
                    <span>희망 제작기간: <span className="text-blue-600">{periodLabel}</span></span>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-xs font-black text-black">
                    제안 예산 (원) *
                  </label>
                  <input
                    type="number"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="예: 3500000"
                    className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black font-bold"
                  />
                </div>

                {/* Content Direction */}
                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-xs font-black text-black">
                    희망 콘텐츠 방향 *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contentDirection}
                    onChange={(e) => setContentDirection(e.target.value)}
                    placeholder="크리에이터가 영상에서 전달해 주었으면 하는 핵심 메시지나 아이디어를 기입해 주세요."
                    className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black font-bold resize-none"
                  />
                </div>

                {/* Desired Date */}
                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-xs font-black text-black">
                    희망 집행일 (선택)
                  </label>
                  <input
                    type="date"
                    value={desiredDate}
                    onChange={(e) => setDesiredDate(e.target.value)}
                    className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black font-bold"
                  />
                </div>

                {/* Reference URL */}
                <div className="flex flex-col space-y-2">
                  <label className="uppercase tracking-widest text-xs font-black text-black">
                    참고 자료 URL (선택)
                  </label>
                  <input
                    type="url"
                    value={referenceUrl}
                    onChange={(e) => setReferenceUrl(e.target.value)}
                    placeholder="예: https://example.com"
                    className="border border-black rounded-none px-4 py-3 text-sm focus:outline-none focus:border-blue-600 bg-white text-black font-bold"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 bg-white border-t border-black">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-black border border-black hover:bg-white hover:text-black transition-colors rounded-none disabled:opacity-50"
                >
                  {loading ? "발송 중..." : "브리프 발송하기 (크레딧 1 차감)"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
