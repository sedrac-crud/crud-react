import type { AuthPerson } from '@/model/AuthPerson'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface AuthPersonState {
  auth: AuthPerson,
  updateAuth: (it: AuthPerson) => void
}

export const useAuthStore = create<AuthPersonState>()(
  persist(
    (set) => ({
      auth: {
        accessToken: "",
        refreshToken: "",
        id: -1,
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        image: "",
      },
      updateAuth: (it: AuthPerson) => set({ auth: it }),
    }), 
    { name: "auth-person" }
  )
)
