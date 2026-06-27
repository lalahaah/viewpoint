/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Channel } from "@/lib/mockData"

interface ChannelCardProps {
  channel: Channel
  onClick: () => void
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

export default function ChannelCard({ channel, onClick }: ChannelCardProps) {
  const isUpcoming = channel.channelType === "UPCOMING"
  
  const progressPercent = isUpcoming 
    ? Math.min(100, Math.round(((channel.fundingCurrent || 0) / (channel.fundingGoal || 1)) * 100))
    : 0

  const thumbnailSrc = channel.portfolioImages?.[0]
  const adPrices = (channel.adPrices || {}) as any
  const integratedPrice = adPrices?.integrated?.price !== undefined ? adPrices.integrated.price : adPrices?.integrated
  const shortsPrice = adPrices?.shorts?.price !== undefined ? adPrices.shorts.price : adPrices?.shorts
  const earlyBirdPrice = adPrices?.earlyBird?.price !== undefined ? adPrices.earlyBird.price : adPrices?.earlyBird

  return (
    <div
      onClick={onClick}
      className="bg-white border border-black rounded-none cursor-pointer flex flex-col h-full hover:border-l-4 hover:border-l-blue-600 transition-all text-black"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-black">
        {thumbnailSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumbnailSrc}
            alt={channel.name}
            className="w-full h-full object-cover rounded-none"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold">
            이미지 없음
          </div>
        )}
        {isUpcoming && (
          <div className="absolute top-3 right-3">
            <span className="bg-black text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-full border border-black tracking-wider">
              UPCOMING
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Tag & Category */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="rounded-full border border-black text-[10px] font-black px-2.5 py-0.5 uppercase tracking-wider text-black bg-white">
              {channel.category}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-black uppercase text-lg text-black mb-3 line-clamp-1">
            {channel.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {channel.description}
          </p>

          {/* Channel stats (ACTIVE) or Funding info (UPCOMING) */}
          {!isUpcoming ? (
            <div className="grid grid-cols-2 gap-4 border border-black p-3 bg-gray-50 rounded-none mb-4">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  구독자수
                </span>
                <span className="font-black text-sm text-black">
                  {formatNumber(channel.subscriberCount || 0)}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  평균 조회수
                </span>
                <span className="font-black text-sm text-black">
                  {formatNumber(channel.avgViews || 0)}
                </span>
              </div>
            </div>
          ) : (
            <div className="border border-black p-3 bg-gray-50 rounded-none mb-4 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  얼리버드 펀딩
                </span>
                <span className="font-black text-black">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 border-none rounded-none overflow-hidden">
                <div 
                  className="h-full bg-black rounded-none" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                <span>모금액 {(channel.fundingCurrent || 0).toLocaleString()}원</span>
                <span className="text-blue-600 font-black">{channel.earlyBirdDeadline ? getDDay(channel.earlyBirdDeadline) : "–"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Ad Prices */}
        <div className="border-t border-black pt-4 mt-auto">
          <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black mb-2">
            AD PRICES
          </span>
          <div className="flex flex-col space-y-1">
            {!isUpcoming ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="uppercase text-[10px] tracking-wider text-gray-500">통합 광고</span>
                  <span className="font-black text-sm text-black">
                    {integratedPrice ? `₩${Number(integratedPrice).toLocaleString()}` : "협의"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="uppercase text-[10px] tracking-wider text-gray-500">쇼츠 광고</span>
                  <span className="font-black text-sm text-black">
                    {shortsPrice ? `₩${Number(shortsPrice).toLocaleString()}` : "협의"}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span className="uppercase text-[10px] tracking-wider text-blue-600 font-black">얼리버드 단가</span>
                <span className="font-black text-sm text-black">
                  {earlyBirdPrice ? `₩${Number(earlyBirdPrice).toLocaleString()}` : "협의"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
