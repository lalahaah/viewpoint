"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { channels as mockChannels } from "@/lib/mockData"
import { StatusBadge } from "@/components/shared/StatusBadge"

interface SponsorCaseInput {
  brandName: string
  videoUrl: string
  adType: string
  year: number
}

interface AdPriceInput {
  price: string
  period: string
  description: string
}

export default function CreatorChannelPage() {
  const [channels, setChannels] = useState(mockChannels.slice(0, 2)) // Mocking creator's channels
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Basic info states
  const [name, setName] = useState("")
  const [channelType, setChannelType] = useState<"ACTIVE" | "UPCOMING">("ACTIVE")
  const [category, setCategory] = useState("테크")
  const [tagsInput, setTagsInput] = useState("")
  const [description, setDescription] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [uploadFrequency, setUploadFrequency] = useState("")

  // Active channel metrics
  const [subscriberCount, setSubscriberCount] = useState("")
  const [avgViews, setAvgViews] = useState("")
  const [totalVideos, setTotalVideos] = useState("")
  const [recentMonthViews, setRecentMonthViews] = useState("")
  const [subscriberGrowth, setSubscriberGrowth] = useState("")
  const [engagementRate, setEngagementRate] = useState("")

  // Upcoming channel metrics
  const [launchDate, setLaunchDate] = useState("")
  const [fundingGoal, setFundingGoal] = useState("")
  const [earlyBirdDeadline, setEarlyBirdDeadline] = useState("")

  // Audience demographics
  const [genderMale, setGenderMale] = useState("")
  const [genderFemale, setGenderFemale] = useState("")

  const [age13_17, setAge13_17] = useState("")
  const [age18_24, setAge18_24] = useState("")
  const [age25_34, setAge25_34] = useState("")
  const [age35_44, setAge35_44] = useState("")
  const [age45_plus, setAge45_plus] = useState("")

  const [countries, setCountries] = useState([
    { country: "", percentage: "" },
    { country: "", percentage: "" },
    { country: "", percentage: "" },
  ])

  const [deviceMobile, setDeviceMobile] = useState("")
  const [deviceDesktop, setDeviceDesktop] = useState("")
  const [deviceTablet, setDeviceTablet] = useState("")

  // Ad prices (7 types)
  const adTypes = [
    { key: "integrated", name: "통합광고" },
    { key: "review", name: "제품리뷰" },
    { key: "mention", name: "스폰서언급" },
    { key: "shorts", name: "쇼츠광고" },
    { key: "community", name: "커뮤니티포스트" },
    { key: "earlyBird", name: "얼리버드" },
    { key: "package", name: "패키지" },
  ]

  const [adPrices, setAdPrices] = useState<Record<string, AdPriceInput>>({
    integrated: { price: "", period: "", description: "" },
    review: { price: "", period: "", description: "" },
    mention: { price: "", period: "", description: "" },
    shorts: { price: "", period: "", description: "" },
    community: { price: "", period: "", description: "" },
    earlyBird: { price: "", period: "", description: "" },
    package: { price: "", period: "", description: "" },
  })

  const handleAdPriceChange = (key: string, field: keyof AdPriceInput, value: string) => {
    setAdPrices((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }))
  }

  // Media kit PDF
  const [pdfFileName, setPdfFileName] = useState<string | null>(null)

  // Sponsor Cases (dynamic)
  const [sponsorCases, setSponsorCases] = useState<SponsorCaseInput[]>([])

  const addSponsorCase = () => {
    if (sponsorCases.length >= 5) return
    setSponsorCases((prev) => [
      ...prev,
      { brandName: "", videoUrl: "", adType: "integrated", year: new Date().getFullYear() },
    ])
  }

  const removeSponsorCase = (index: number) => {
    setSponsorCases((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSponsorCaseChange = (index: number, field: keyof SponsorCaseInput, value: string | number) => {
    setSponsorCases((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleCountryChange = (index: number, field: "country" | "percentage", value: string) => {
    setCountries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Transform and sanitize tags
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    // Format audience country object
    const audienceCountry: Record<string, number> = {}
    countries.forEach((c) => {
      if (c.country && c.percentage) {
        audienceCountry[c.country] = parseFloat(c.percentage)
      }
    })

    // Format ad prices output
    const formattedAdPrices: Record<
      string,
      { price: number | null; period: number | null; description: string }
    > = {}
    Object.entries(adPrices).forEach(([key, value]) => {
      formattedAdPrices[key] = {
        price: value.price ? parseInt(value.price, 10) : null,
        period: value.period ? parseInt(value.period, 10) : null,
        description: value.description || "",
      }
    })

    // Final payload
    const payload = {
      name,
      channelType,
      category,
      tags,
      description,
      youtubeUrl,
      uploadFrequency,
      metrics: channelType === "ACTIVE" ? {
        subscriberCount: subscriberCount ? parseInt(subscriberCount, 10) : null,
        avgViews: avgViews ? parseInt(avgViews, 10) : null,
        totalVideos: totalVideos ? parseInt(totalVideos, 10) : null,
        recentMonthViews: recentMonthViews ? parseInt(recentMonthViews, 10) : null,
        subscriberGrowth: subscriberGrowth ? parseInt(subscriberGrowth, 10) : null,
        engagementRate: engagementRate ? parseFloat(engagementRate) : null,
      } : null,
      upcoming: channelType === "UPCOMING" ? {
        launchDate,
        fundingGoal: fundingGoal ? parseInt(fundingGoal, 10) : null,
        earlyBirdDeadline,
      } : null,
      demographics: {
        gender: {
          male: genderMale ? parseFloat(genderMale) : null,
          female: genderFemale ? parseFloat(genderFemale) : null,
        },
        age: {
          "13-17": age13_17 ? parseFloat(age13_17) : null,
          "18-24": age18_24 ? parseFloat(age18_24) : null,
          "25-34": age25_34 ? parseFloat(age25_34) : null,
          "35-44": age35_44 ? parseFloat(age35_44) : null,
          "45+": age45_plus ? parseFloat(age45_plus) : null,
        },
        countries: audienceCountry,
        device: {
          mobile: deviceMobile ? parseFloat(deviceMobile) : null,
          desktop: deviceDesktop ? parseFloat(deviceDesktop) : null,
          tablet: deviceTablet ? parseFloat(deviceTablet) : null,
        }
      },
      adPrices: formattedAdPrices,
      pdfFileName,
      sponsorCases,
    }

    console.log("Submit Form Data:", JSON.stringify(payload, null, 2))
    alert("채널 정보가 콘솔에 출력되었습니다. (개발자 도구를 확인하세요)")
  }

  const handleDelete = (id: string) => {
    if (confirm("채널을 삭제하시겠습니까?")) {
      setChannels((prev) => prev.filter((ch) => ch.id !== id))
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-black pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider">내 채널</h1>
          <p className="text-gray-500 text-sm mt-1">등록된 채널을 관리하고 새로운 채널을 홍보하세요.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="border border-black uppercase px-4 py-2 text-xs tracking-widest font-bold hover:bg-black hover:text-white transition-colors"
        >
          {isFormOpen ? "닫기" : "새 채널 등록"}
        </button>
      </div>

      {/* Inline Form (Slide Down) */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border border-black bg-white"
          >
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10 divide-y divide-black">
              {/* Section 1: Basic Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-black uppercase tracking-wider">기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider">채널명</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-none border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="채널 이름을 입력하세요"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider">채널 유형</label>
                    <div className="flex border border-black">
                      <button
                        type="button"
                        onClick={() => setChannelType("ACTIVE")}
                        className={`flex-1 py-3 text-xs tracking-widest uppercase font-bold transition-colors ${
                          channelType === "ACTIVE" ? "bg-black text-white" : "bg-white text-black"
                        }`}
                      >
                        Active (운영중)
                      </button>
                      <button
                        type="button"
                        onClick={() => setChannelType("UPCOMING")}
                        className={`flex-1 py-3 text-xs tracking-widest uppercase font-bold transition-colors ${
                          channelType === "UPCOMING" ? "bg-black text-white" : "bg-white text-black"
                        }`}
                      >
                        Upcoming (오픈 예정)
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider">카테고리</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="rounded-none border border-black p-3 text-sm focus:outline-none bg-white"
                    >
                      <option value="뷰티">뷰티</option>
                      <option value="테크">테크</option>
                      <option value="게임">게임</option>
                      <option value="라이프">라이프</option>
                      <option value="푸드">푸드</option>
                      <option value="여행">여행</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider">태그 (쉼표 구분)</label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="rounded-none border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="예: 기기리뷰, 스마트폰, 전자기기"
                    />
                  </div>

                  <div className="flex flex-col space-y-1 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider">YouTube 채널 URL</label>
                    <input
                      type="url"
                      required
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="rounded-none border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="https://www.youtube.com/@channel_handle"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider">업로드 주기</label>
                    <input
                      type="text"
                      required
                      value={uploadFrequency}
                      onChange={(e) => setUploadFrequency(e.target.value)}
                      className="rounded-none border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="예: 주 2회, 격주 1회 등"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider">채널 소개</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="rounded-none border border-black p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
                    placeholder="채널의 성격과 주요 콘텐츠 내용을 자세히 설명해주세요."
                  />
                </div>
              </div>

              {/* Section 2-A: Active Channel Metrics */}
              {channelType === "ACTIVE" && (
                <div className="space-y-6 pt-10">
                  <h3 className="text-lg font-black uppercase tracking-wider">채널 지표</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">구독자수</label>
                      <input
                        type="number"
                        required
                        value={subscriberCount}
                        onChange={(e) => setSubscriberCount(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">평균조회수</label>
                      <input
                        type="number"
                        required
                        value={avgViews}
                        onChange={(e) => setAvgViews(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">총영상수</label>
                      <input
                        type="number"
                        required
                        value={totalVideos}
                        onChange={(e) => setTotalVideos(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">최근 30일 조회수</label>
                      <input
                        type="number"
                        required
                        value={recentMonthViews}
                        onChange={(e) => setRecentMonthViews(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">구독자 증가 (30일)</label>
                      <input
                        type="number"
                        required
                        value={subscriberGrowth}
                        onChange={(e) => setSubscriberGrowth(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">참여율 (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={engagementRate}
                        onChange={(e) => setEngagementRate(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 2-B: Upcoming Channel Metrics */}
              {channelType === "UPCOMING" && (
                <div className="space-y-6 pt-10">
                  <h3 className="text-lg font-black uppercase tracking-wider">오픈 예정 전용 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">오픈 예정일</label>
                      <input
                        type="date"
                        required
                        value={launchDate}
                        onChange={(e) => setLaunchDate(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none bg-white"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">펀딩 목표 (원)</label>
                      <input
                        type="number"
                        required
                        value={fundingGoal}
                        onChange={(e) => setFundingGoal(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider">얼리버드 마감일</label>
                      <input
                        type="date"
                        required
                        value={earlyBirdDeadline}
                        onChange={(e) => setEarlyBirdDeadline(e.target.value)}
                        className="rounded-none border border-black p-3 text-sm focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Audience Demographics */}
              <div className="space-y-8 pt-10">
                <h3 className="text-lg font-black uppercase tracking-wider">시청자 인구통계</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Gender */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-2">성별 비율</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">남성 (%)</label>
                        <input
                          type="number"
                          value={genderMale}
                          onChange={(e) => setGenderMale(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">여성 (%)</label>
                        <input
                          type="number"
                          value={genderFemale}
                          onChange={(e) => setGenderFemale(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Device */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-2">기기 비율</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">모바일 (%)</label>
                        <input
                          type="number"
                          value={deviceMobile}
                          onChange={(e) => setDeviceMobile(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">데스크탑 (%)</label>
                        <input
                          type="number"
                          value={deviceDesktop}
                          onChange={(e) => setDeviceDesktop(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">태블릿 (%)</label>
                        <input
                          type="number"
                          value={deviceTablet}
                          onChange={(e) => setDeviceTablet(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-2">연령대 분포</h4>
                    <div className="grid grid-cols-5 gap-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">13-17세 (%)</label>
                        <input
                          type="number"
                          value={age13_17}
                          onChange={(e) => setAge13_17(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">18-24세 (%)</label>
                        <input
                          type="number"
                          value={age18_24}
                          onChange={(e) => setAge18_24(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">25-34세 (%)</label>
                        <input
                          type="number"
                          value={age25_34}
                          onChange={(e) => setAge25_34(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">35-44세 (%)</label>
                        <input
                          type="number"
                          value={age35_44}
                          onChange={(e) => setAge35_44(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-xs text-gray-500">45세+ (%)</label>
                        <input
                          type="number"
                          value={age45_plus}
                          onChange={(e) => setAge45_plus(e.target.value)}
                          className="rounded-none border border-black p-2 text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Countries */}
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider border-b border-black pb-2">주요 국가 (TOP 3)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {countries.map((c, i) => (
                        <div key={i} className="flex space-x-2">
                          <div className="flex-1 flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">국가명 {i + 1}</label>
                            <input
                              type="text"
                              value={c.country}
                              onChange={(e) => handleCountryChange(i, "country", e.target.value)}
                              className="rounded-none border border-black p-2 text-sm"
                              placeholder="예: KR"
                            />
                          </div>
                          <div className="w-24 flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">비율 (%)</label>
                            <input
                              type="number"
                              value={c.percentage}
                              onChange={(e) => handleCountryChange(i, "percentage", e.target.value)}
                              className="rounded-none border border-black p-2 text-sm"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Ad Pricing & Production Period */}
              <div className="space-y-6 pt-10">
                <h3 className="text-lg font-black uppercase tracking-wider">광고 유형별 단가 및 제작기간</h3>
                <p className="text-xs text-gray-500">각 광고 유형의 단가, 소요 일수 및 세부 구성 사항을 기입해주세요.</p>
                
                <div className="space-y-4 border border-black divide-y divide-black">
                  {adTypes.map((type) => (
                    <div key={type.key} className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <div className="w-full md:w-36 flex-shrink-0">
                        <span className="font-bold text-sm">{type.name}</span>
                      </div>
                      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase">단가 (원)</label>
                          <input
                            type="number"
                            value={adPrices[type.key].price}
                            onChange={(e) => handleAdPriceChange(type.key, "price", e.target.value)}
                            className="rounded-none border border-black p-2 text-sm w-full"
                            placeholder="단가 입력"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase">제작기간 (일)</label>
                          <input
                            type="number"
                            value={adPrices[type.key].period}
                            onChange={(e) => handleAdPriceChange(type.key, "period", e.target.value)}
                            className="rounded-none border border-black p-2 text-sm w-full"
                            placeholder="제작기간 입력"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase">설명</label>
                          <input
                            type="text"
                            value={adPrices[type.key].description}
                            onChange={(e) => handleAdPriceChange(type.key, "description", e.target.value)}
                            className="rounded-none border border-black p-2 text-sm w-full"
                            placeholder="설명글 입력"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Media Kit */}
              <div className="space-y-6 pt-10">
                <h3 className="text-lg font-black uppercase tracking-wider">미디어킷</h3>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider">PDF 파일 업로드</label>
                  <div className="border border-black p-4 flex flex-col md:flex-row items-center gap-4 bg-gray-50">
                    <input
                      type="file"
                      accept=".pdf"
                      id="mediaKitUpload"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="mediaKitUpload"
                      className="border border-black bg-white px-4 py-2 text-xs uppercase tracking-wider font-bold cursor-pointer hover:bg-black hover:text-white transition-colors"
                    >
                      파일 선택
                    </label>
                    <span className="text-sm text-gray-500">
                      {pdfFileName ? `선택된 파일: ${pdfFileName}` : "업로드된 파일 없음 (PDF 포맷만 지원)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 6: Sponsor Cases */}
              <div className="space-y-6 pt-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black uppercase tracking-wider">협찬 사례 (최대 5개)</h3>
                  <button
                    type="button"
                    onClick={addSponsorCase}
                    disabled={sponsorCases.length >= 5}
                    className="border border-black px-4 py-2 text-xs uppercase font-bold tracking-widest hover:bg-black hover:text-white disabled:opacity-50 transition-colors"
                  >
                    사례 추가
                  </button>
                </div>

                {sponsorCases.length === 0 ? (
                  <div className="border border-black p-8 text-center text-gray-500 text-sm bg-gray-50">
                    등록된 협찬 사례가 없습니다. 우측 상단 버튼을 눌러 사례를 추가하세요.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {sponsorCases.map((sc, i) => (
                      <div key={i} className="border border-black p-4 relative space-y-4 bg-white">
                        <div className="absolute top-4 right-4">
                          <button
                            type="button"
                            onClick={() => removeSponsorCase(i)}
                            className="text-xs uppercase border border-black px-2 py-1 font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                        <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400">협찬 사례 #{i + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">브랜드명</label>
                            <input
                              type="text"
                              required
                              value={sc.brandName}
                              onChange={(e) => handleSponsorCaseChange(i, "brandName", e.target.value)}
                              className="rounded-none border border-black p-2 text-sm"
                              placeholder="예: 삼성전자"
                            />
                          </div>
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">영상 URL</label>
                            <input
                              type="url"
                              required
                              value={sc.videoUrl}
                              onChange={(e) => handleSponsorCaseChange(i, "videoUrl", e.target.value)}
                              className="rounded-none border border-black p-2 text-sm"
                              placeholder="https://youtube.com/watch?v=..."
                            />
                          </div>
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">광고 유형</label>
                            <select
                              value={sc.adType}
                              onChange={(e) => handleSponsorCaseChange(i, "adType", e.target.value)}
                              className="rounded-none border border-black p-2 text-sm bg-white"
                            >
                              <option value="integrated">통합광고</option>
                              <option value="review">제품리뷰</option>
                              <option value="mention">스폰서언급</option>
                              <option value="shorts">쇼츠광고</option>
                              <option value="community">커뮤니티포스트</option>
                              <option value="earlyBird">얼리버드</option>
                              <option value="package">패키지</option>
                            </select>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">진행 연도</label>
                            <input
                              type="number"
                              required
                              value={sc.year}
                              onChange={(e) => handleSponsorCaseChange(i, "year", parseInt(e.target.value, 10))}
                              className="rounded-none border border-black p-2 text-sm"
                              placeholder={new Date().getFullYear().toString()}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="bg-black text-white w-full py-4 uppercase text-sm font-bold tracking-widest border border-black hover:bg-white hover:text-black transition-colors"
                >
                  채널 등록하기
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Channel List */}
      <div className="space-y-4">
        <h2 className="uppercase text-xs tracking-widest text-gray-400 font-bold">등록된 채널 목록</h2>
        <div className="border border-black bg-white divide-y divide-black">
          {channels.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">등록된 채널이 없습니다.</div>
          ) : (
            channels.map((channel) => (
              <div key={channel.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Thumbnail */}
                <div className="w-24 h-24 border border-black flex-shrink-0 bg-gray-100 relative">
                  {channel.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={channel.thumbnailUrl}
                      alt={channel.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
                      NO IMAGE
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-black">{channel.name}</h3>
                    <StatusBadge status={channel.status} />
                    <span className="text-xs uppercase font-bold border border-black px-2 py-0.5 bg-gray-50">
                      {channel.channelType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{channel.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {channel.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border border-black rounded-full bg-white text-black">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => alert("수정 기능은 API 연동 단계에서 활성화됩니다.")}
                    className="flex-1 sm:flex-none border border-black px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-gray-50 transition-colors text-center"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(channel.id)}
                    className="flex-1 sm:flex-none border border-red-500 text-red-500 px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-red-50 transition-colors text-center"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
