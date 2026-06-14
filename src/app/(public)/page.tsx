"use client"

import { useState } from "react"
import { ShuffleHero } from "@/components/landing/ShuffleHero"
import ChannelGrid from "@/components/landing/ChannelGrid"
import ChannelModal from "@/components/modals/ChannelModal"
import BriefModal from "@/components/modals/BriefModal"
import { Channel } from "@/lib/mockData"

export default function HomePage() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [showBriefModal, setShowBriefModal] = useState(false)

  return (
    <div className="w-full min-h-screen bg-white">
      <ShuffleHero />

      <div id="channels" className="border-b border-black bg-white">
        <div className="container-main py-6">
          <h2 className="text-4xl font-black uppercase tracking-widest text-black">
            CHANNELS
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">
            현재 모집 중인 얼리버드 및 활성 채널 목록
          </p>
        </div>
      </div>

      <div className="w-full bg-white py-8">
        <ChannelGrid onChannelClick={setSelectedChannel} />
      </div>

      <ChannelModal
        channel={selectedChannel}
        onClose={() => setSelectedChannel(null)}
        onBriefClick={() => setShowBriefModal(true)}
      />

      {showBriefModal && selectedChannel && (
        <BriefModal
          channel={selectedChannel}
          onClose={() => setShowBriefModal(false)}
        />
      )}
    </div>
  )
}
