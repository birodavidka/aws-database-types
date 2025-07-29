// lib/store.ts
import {create} from 'zustand'

interface User {
  id: number
  name: string
}

interface UserState {
  users: User[]
  fetchUsers: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    const res = await fetch('/api/users')
    const users: User[] = await res.json()
    set({ users })
  },
}))
