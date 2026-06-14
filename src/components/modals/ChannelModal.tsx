/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Channel } from "@/lib/mockData"
import { X, ExternalLink, Download } from "lucide-react"
import { useRouter } from "next/navigation"

interface ChannelModalProps {
  channel: Channel | null
  onClose: () => void
  onBriefClick: () => void
}

const formatNumber = (num: number | null) => {
  if (num === null) return "0"
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1).replace(/\.0$/, "")}만`
  }
  return num.toLocaleString()
}

export default function ChannelModal({ channel, onClose, onBriefClick }: ChannelModalProps) {
  const router = useRouter()
  const [downloading, setDownloading] = useState(false)

  if (!channel) return null

  const isUpcoming = channel.channelType === "UPCOMING"
  const progressPercent = isUpcoming 
    ? Math.min(100, Math.round((channel.fundingCurrent / channel.fundingGoal) * 100))
    : 0

  const adTypeKeys = [
    { key: "integrated", label: "통합 광고" },
    { key: "review", label: "제품 리뷰" },
    { key: "mention", label: "스폰서 언급" },
    { key: "shorts", label: "쇼츠 광고" },
    { key: "community", label: "커뮤니티 포스트" },
    { key: "earlyBird", label: "얼리버드 단가" },
    { key: "package", label: "패키지 광고" },
  ]

  const handleMediaKitDownload = async () => {
    if (!channel.mediaKitUrl) return
    setDownloading(true)
    try {
      const sessionRes = await fetch("/api/auth/session")
      const session = await sessionRes.json()

      if (!session || !session.user) {
        router.push("/login")
        return
      }

      window.open(channel.mediaKitUrl, "_blank")
    } catch (err) {
      console.error("Failed to check session for media kit download", err)
    } finally {
      setDownloading(false)
    }
  }

  const topCountries = Object.entries(channel.audienceCountry || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

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
          <div className="divide-y divide-black">
            {/* Section 1: Header */}
            <div className="flex items-start justify-between p-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-black tracking-wider ${
                    isUpcoming ? "bg-black text-white" : "bg-white text-black"
                  }`}>
                    {channel.channelType}
                  </span>
                  {channel.youtubeVerified && (
                    <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border border-blue-600 text-blue-600 bg-white tracking-wider">
                      ✓ YouTube 인증
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-black uppercase tracking-widest text-black">
                  {channel.name}
                </h2>
                <div className="flex flex-wrap gap-2 mt-4">
                  {channel.youtubeUrl && (
                    <a
                      href={channel.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-black px-4 py-2 uppercase text-xs font-black flex items-center space-x-1.5 hover:bg-black hover:text-white transition-colors rounded-none"
                    >
                      <span>YouTube 채널 보기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={handleMediaKitDownload}
                    disabled={!channel.mediaKitUrl || downloading}
                    className="border border-black px-4 py-2 uppercase text-xs font-black flex items-center space-x-1.5 hover:bg-black hover:text-white transition-colors rounded-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
                  >
                    <span>{downloading ? "확인 중..." : "미디어킷 다운로드"}</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="border border-black p-2 hover:bg-black hover:text-white transition-colors rounded-none bg-white text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section 2: Channel Stats 1st row */}
            <div className="p-6">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black mb-3">
                CHANNEL METRICS (PRIMARY)
              </span>
              <div className="grid grid-cols-4 divide-x divide-black border border-black bg-gray-50 text-center">
                <div className="p-4">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    구독자수
                  </span>
                  <span className="font-black text-xl text-black">
                    {formatNumber(channel.subscriberCount)}
                  </span>
                </div>
                <div className="p-4">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    평균조회수
                  </span>
                  <span className="font-black text-xl text-black">
                    {formatNumber(channel.avgViews)}
                  </span>
                </div>
                <div className="p-4">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    참여율
                  </span>
                  <span className="font-black text-xl text-black">
                    {channel.engagementRate ? `${channel.engagementRate}%` : "-"}
                  </span>
                </div>
                <div className="p-4">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    업로드주기
                  </span>
                  <span className="font-black text-sm text-black h-7 flex items-center justify-center">
                    {channel.uploadFrequency || "-"}
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-gray-400 mt-2 text-right">
                {channel.youtubeVerified ? "* YouTube API 인증 완료 데이터" : "* 크리에이터 자체 입력 데이터"}
              </div>
            </div>

            {/* Section 3: Channel Stats 2nd row */}
            <div className="p-6 pt-0">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black mb-3">
                CHANNEL METRICS (SECONDARY)
              </span>
              <div className="grid grid-cols-3 divide-x divide-black border border-black bg-gray-50 text-center">
                <div className="p-4">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    총 영상수
                  </span>
                  <span className="font-black text-xl text-black">
                    {formatNumber(channel.totalVideos)}
                  </span>
                </div>
                <div className="p-4">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    최근 30일 조회수
                  </span>
                  <span className="font-black text-xl text-black">
                    {formatNumber(channel.recentMonthViews)}
                  </span>
                </div>
                <div className="p-4">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                    30일 구독자 증가
                  </span>
                  <span className="font-black text-xl text-black">
                    +{formatNumber(channel.subscriberGrowth)}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 4: Audience Demographics */}
            <div className="p-6">
              <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-black mb-4">
                AUDIENCE DEMOGRAPHICS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 bg-white">
                {/* Gender */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                    GENDER RATIO
                  </span>
                  <div className="flex justify-between items-center text-xs font-black">
                    <span>남성 {channel.audienceGender?.male}%</span>
                    <span>여성 {channel.audienceGender?.female}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-none overflow-hidden flex border border-black">
                    <div className="bg-black h-full" style={{ width: `${channel.audienceGender?.male || 50}%` }} />
                  </div>
                </div>

                {/* Devices */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                    DEVICES
                  </span>
                  <div className="flex justify-between text-[11px] font-black">
                    <span>모바일 {channel.audienceDevice?.mobile}%</span>
                    <span>PC {channel.audienceDevice?.desktop}%</span>
                    <span>태블릿 {channel.audienceDevice?.tablet}%</span>
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2 md:col-span-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                    AGE GROUPS
                  </span>
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-black">
                    {Object.entries(channel.audienceAge || {}).map(([age, pct]) => (
                      <div key={age} className="border border-black p-2 bg-gray-50">
                        <span className="block text-gray-500">{age}세</span>
                        <span className="block text-sm font-black text-black mt-1">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Countries */}
                <div className="space-y-2 md:col-span-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                    TOP COUNTRIES
                  </span>
                  <div className="flex space-x-6 text-xs font-black">
                    {topCountries.map(([country, pct], idx) => (
                      <div key={country} className="flex items-center space-x-2">
                        <span className="bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold">
                          0{idx + 1}
                        </span>
                        <span>{country === "KR" ? "한국" : country === "US" ? "미국" : country === "JP" ? "일본" : country}: {pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-gray-400 mt-2">
                * 크리에이터가 YouTube Studio 통계를 기반으로 직접 작성한 데이터입니다.
              </div>
            </div>

            {/* Section 5: About Channel */}
            <div className="p-6">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black mb-2">
                ABOUT CHANNEL
              </span>
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {channel.description}
              </p>
            </div>

            {/* Section 6: Ad Prices Table */}
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
                      <th className="p-3">제작기간</th>
                      <th className="p-3">설명</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-black bg-white text-black font-bold">
                    {adTypeKeys.map(({ key, label }) => {
                      const adDetail = (channel.adPrices as any)?.[key]
                      const priceVal = adDetail?.price
                      const periodVal = adDetail?.period
                      const descVal = adDetail?.description || "-"

                      return (
                        <tr key={key} className="divide-x divide-black hover:bg-gray-50">
                          <td className="p-3 uppercase tracking-wider">{label}</td>
                          <td className="p-3 text-black">
                            {priceVal !== null && priceVal !== undefined
                              ? `₩${priceVal.toLocaleString()}`
                              : "협의"}
                          </td>
                          <td className="p-3 text-gray-600">
                            {periodVal !== null && periodVal !== undefined
                              ? `${periodVal}일`
                              : "협의"}
                          </td>
                          <td className="p-3 font-normal text-gray-600">{descVal}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 7: Past Sponsors */}
            <div className="p-6">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-black mb-3">
                PAST SPONSORS
              </span>
              {channel.sponsorCases && channel.sponsorCases.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {channel.sponsorCases.map((sc: any, idx: number) => (
                    <div key={idx} className="border border-black p-4 bg-gray-50 flex flex-col justify-between rounded-none">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-black text-sm uppercase text-black">{sc.brandName}</span>
                          <span className="text-[9px] uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-full border border-black">
                            {sc.adType}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-bold block mb-3">캠페인 집행연도: {sc.year}년</span>
                      </div>
                      {sc.videoUrl && (
                        <a
                          href={sc.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs uppercase tracking-widest font-black text-blue-600 hover:text-black transition-colors flex items-center space-x-1"
                        >
                          <span>캠페인 영상 보기</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-black p-6 text-center text-xs font-bold text-gray-400 bg-gray-50 rounded-none">
                  등록된 협찬 사례가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* Section 8: CTA */}
          <div className="p-6 bg-white border-t border-black">
            <button
              onClick={onBriefClick}
              className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-black border border-black hover:bg-white hover:text-black transition-colors rounded-none"
            >
              브리프 보내기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
