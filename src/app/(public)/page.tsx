"use client"

import { useState } from "react"
import { ShuffleHero } from "@/components/landing/ShuffleHero"
import ChannelGrid from "@/components/landing/ChannelGrid"
import ChannelModal from "@/components/modals/ChannelModal"
import { Channel } from "@/lib/mockData"

export default function HomePage() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)

  return (
    <div className="w-full min-h-screen bg-white">
      <ShuffleHero />

      <div id="channels" className="border-b border-black px-8 py-6 bg-white">
        <h2 className="text-4xl font-black uppercase tracking-widest text-black">
          CHANNELS
        </h2>
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">
          현재 모집 중인 얼리버드 및 활성 채널 목록
        </p>
      </div>

      <ChannelGrid onChannelClick={setSelectedChannel} />

      <ChannelModal
        channel={selectedChannel}
        onClose={() => setSelectedChannel(null)}
      />
    </div>
  )
}
