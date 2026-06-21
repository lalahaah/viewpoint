"use client"

import { useState, useEffect } from "react"
import { ShuffleHero } from "@/components/landing/ShuffleHero"
import ChannelGrid from "@/components/landing/ChannelGrid"
import ChannelModal from "@/components/modals/ChannelModal"
import BriefModal from "@/components/modals/BriefModal"
import { Channel } from "@/lib/mockData"

export default function HomePage() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [showBriefModal, setShowBriefModal] = useState(false)

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/channels")
        const json = await res.json()
        if (json.success) {
          setChannels(json.data.channels)
        }
      } catch (err) {
        console.error("Failed to load channels", err)
      } finally {
        setLoading(false)
      }
    }
    fetchChannels()
  }, [])

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
        {loading ? (
          <div className="text-center py-24 border border-black max-w-screen-xl mx-auto px-6">
            <p className="uppercase tracking-widest font-black text-sm text-gray-500">
              로딩중...
            </p>
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-24 border border-black max-w-screen-xl mx-auto px-6">
            <p className="uppercase tracking-widest font-black text-sm text-gray-500">
              등록된 채널이 없습니다.
            </p>
          </div>
        ) : (
          <ChannelGrid channels={channels} onChannelClick={setSelectedChannel} />
        )}
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
