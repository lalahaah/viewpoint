import { create } from "zustand"

interface FilterStore {
  category: string
  channelType: "ALL" | "ACTIVE" | "UPCOMING"
  searchQuery: string
  setCategory: (category: string) => void
  setChannelType: (channelType: "ALL" | "ACTIVE" | "UPCOMING") => void
  setSearchQuery: (query: string) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  category: "",
  channelType: "ALL",
  searchQuery: "",
  setCategory: (category) => set({ category }),
  setChannelType: (channelType) => set({ channelType }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}))
