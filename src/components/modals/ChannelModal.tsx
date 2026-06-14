"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Channel } from "@/lib/mockData"
import { X } from "lucide-react"

interface ChannelModalProps {
  channel: Channel | null
  onClose: () => void
}

const formatNumber = (num: number) => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1).replace(/\.0$/, "")}만`
  }
  return num.toLocaleString()
}

const getDDay = (dateStr: string) => {
  const targetDate = new Date(dateStr)
  const today = new Date()
  
  targetDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  
  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "D-Day"
  if (diffDays < 0) return "마감"
  return `D-${diffDays}`
}

export default function ChannelModal({ channel, onClose }: ChannelModalProps) {
  if (!channel) return null

  const isUpcoming = channel.channelType === "UPCOMING"
  const progressPercent = isUpcoming 
    ? Math.min(100, Math.round((channel.fundingCurrent / channel.fundingGoal) * 100))
    : 0

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
          className="relative w-full max-w-2xl bg-white border-l border-black h-full overflow-y-auto z-10 flex flex-col justify-between rounded-none shadow-none"
        >
          <div className="divide-y divide-black">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <div>
                <span className="bg-black text-white text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-black tracking-wider inline-block mb-2">
                  {channel.channelType}
                </span>
                <h2 className="text-3xl font-black uppercase tracking-widest text-black">
                  {channel.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="border border-black p-2 hover:bg-black hover:text-white transition-colors rounded-none bg-white text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="p-6">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black mb-3">
                PORTFOLIO GALLERY
              </span>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-black">
                {channel.portfolioImages.map((img, idx) => (
                  <div key={idx} className="flex-shrink-0 w-64 aspect-video border border-black overflow-hidden rounded-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${channel.name} portfolio ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="p-6">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black mb-2">
                ABOUT CHANNEL
              </span>
              <p className="text-sm text-gray-800 leading-relaxed">
                {channel.description}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 divide-x divide-black bg-gray-50 border-t border-b border-black">
              {!isUpcoming ? (
                <>
                  <div className="p-6 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                      구독자수
                    </span>
                    <span className="font-black text-2xl text-black">
                      {formatNumber(channel.subscriberCount || 0)}
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                      평균 조회수
                    </span>
                    <span className="font-black text-2xl text-black">
                      {formatNumber(channel.avgViews || 0)}
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                      업로드 주기
                    </span>
                    <span className="font-black text-xl text-black">
                      {channel.uploadFrequency}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-6 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                      목표 펀딩
                    </span>
                    <span className="font-black text-2xl text-black">
                      ₩{channel.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                      현재 모집
                    </span>
                    <span className="font-black text-2xl text-black">
                      ₩{channel.fundingCurrent.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                      남은 기한
                    </span>
                    <span className="font-black text-2xl text-blue-600">
                      {getDDay(channel.earlyBirdDeadline)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Upcoming progress logic */}
            {isUpcoming && (
              <div className="p-6 space-y-3">
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black">
                  EARLYBIRD SPONSORSHIP FUNDING PROGRESS
                </span>
                <div className="flex justify-between items-center text-xs font-bold text-black">
                  <span>모집률 {progressPercent}%</span>
                  <span>{channel.fundingCurrent.toLocaleString()}원 / {channel.fundingGoal.toLocaleString()}원</span>
                </div>
                <div className="w-full h-3 bg-gray-200 border border-black rounded-none overflow-hidden">
                  <div 
                    className="h-full bg-black rounded-none" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Ad Price Table */}
            <div className="p-6">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black mb-3">
                SPONSORSHIP PRICING & AD TYPES
              </span>
              <div className="w-full overflow-hidden border border-black rounded-none">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black text-white text-[10px] uppercase tracking-widest font-black divide-x divide-white">
                      <th className="p-3">광고 유형</th>
                      <th className="p-3">단가</th>
                      <th className="p-3">설명</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-black bg-white text-black font-bold">
                    {!isUpcoming ? (
                      <>
                        <tr className="divide-x divide-black">
                          <td className="p-3">통합 광고</td>
                          <td className="p-3">₩{channel.adPrices.integrated.toLocaleString()}</td>
                          <td className="p-3 font-normal text-gray-600">영상 내 60-90초 분량의 브랜디드 광고 통합 삽입</td>
                        </tr>
                        <tr className="divide-x divide-black">
                          <td className="p-3">쇼츠 광고</td>
                          <td className="p-3">₩{channel.adPrices.shorts.toLocaleString()}</td>
                          <td className="p-3 font-normal text-gray-600">60초 이내 쇼츠 단독 기획 및 제작 송출</td>
                        </tr>
                      </>
                    ) : (
                      <tr className="divide-x divide-black">
                        <td className="p-3 text-blue-600">얼리버드 단가</td>
                        <td className="p-3">₩{channel.adPrices.earlyBird.toLocaleString()}</td>
                        <td className="p-3 font-normal text-gray-600">채널 런칭 전 선점 혜택이 적용된 파격 단가 스폰서십</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6 bg-white border-t border-black">
            <button className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-black border border-black hover:bg-white hover:text-black transition-colors rounded-none">
              제안서 보내기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
