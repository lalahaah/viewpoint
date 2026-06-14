import { create } from "zustand"

export interface UserState {
  id: string
  email: string
  name: string | null
  role: string
}

interface AuthStore {
  user: UserState | null
  setUser: (user: UserState) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
