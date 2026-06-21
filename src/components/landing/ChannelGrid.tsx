/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useFilterStore } from "@/store/filterStore"
import { Channel } from "@/lib/mockData"
import ChannelCard from "./ChannelCard"

interface ChannelGridProps {
  channels: Channel[]
  onChannelClick: (channel: Channel) => void
}

const CATEGORIES = ["ALL", "뷰티", "테크", "게임", "라이프", "푸드", "여행"]
const TYPES = [
  { label: "ALL", value: "ALL" },
  { label: "운영중", value: "ACTIVE" },
  { label: "오픈예정", value: "UPCOMING" },
]

export default function ChannelGrid({ channels, onChannelClick }: ChannelGridProps) {
  const { category, channelType, searchQuery, setCategory, setChannelType, setSearchQuery } = useFilterStore()

  const filteredChannels = channels.filter((channel) => {
    const matchesCategory = category === "" || category === "ALL" || channel.category === category
    const matchesType = channelType === "ALL" || channel.channelType === channelType

    const searchLower = searchQuery.toLowerCase().trim()
    const matchesSearch =
      searchLower === "" ||
      channel.name.toLowerCase().includes(searchLower) ||
      channel.category.toLowerCase().includes(searchLower) ||
      channel.tags.some((tag) => tag.toLowerCase().includes(searchLower))

    return matchesCategory && matchesType && matchesSearch
  })

  return (
    <div className="max-w-screen-xl mx-auto px-6 bg-white">
      {/* Filter Bar */}
      <div className="border border-black py-6 px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 overflow-hidden w-full lg:w-auto">
          {/* Categories - Mobile horizontal scroll */}
          <div className="flex overflow-x-auto flex-nowrap gap-2 pb-2 sm:pb-0 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === "ALL" ? "" : cat)}
                className={`flex-shrink-0 px-4 py-2 text-xs uppercase tracking-widest font-black border border-black rounded-none transition-colors ${
                  (cat === "ALL" && category === "") || category === cat
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-px sm:h-6 w-full sm:w-px bg-black hidden sm:block" />

          {/* Types - Mobile horizontal scroll */}
          <div className="flex overflow-x-auto flex-nowrap gap-2 pb-2 sm:pb-0 scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setChannelType(t.value as any)}
                className={`flex-shrink-0 px-4 py-2 text-xs uppercase tracking-widest font-black border border-black rounded-none transition-colors ${
                  channelType === t.value
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full lg:max-w-xs">
          <input
            type="text"
            placeholder="채널명, 카테고리 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-black rounded-none px-4 py-2.5 text-xs font-bold uppercase tracking-wider placeholder-gray-400 focus:outline-none focus:border-blue-600 bg-white text-black"
          />
        </div>
      </div>

      {/* Grid Content */}
      {filteredChannels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel) => (
            <div key={channel.id} className="w-full">
              <ChannelCard
                channel={channel}
                onClick={() => onChannelClick(channel)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-black">
          <p className="uppercase tracking-widest font-black text-sm text-gray-500">
            일치하는 채널이 없습니다.
          </p>
        </div>
      )}
    </div>
  )
}
