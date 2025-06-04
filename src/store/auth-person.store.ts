import type { AuthPerson } from '@/model/AuthPerson'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'

interface AuthPersonState {
  auth: AuthPerson,
  updateAuth: (it: AuthPerson) => void,
  logaut: () => void,
  isAuthenticated: () => boolean
}

const personEmpty = {
  accessToken: "",
  refreshToken: "",
  id: -1,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  image: "",
}

export const useAuthStore = create<AuthPersonState>()(
  persist(
    (set, get) => ({
      auth: personEmpty,
      updateAuth: (it: AuthPerson) => set({ auth: it }),
      logaut: () => set({ auth: personEmpty }),
      isAuthenticated: () => {
        const { auth } = get();
        return auth.id >= 1;
      }
    }),
    { name: "auth-person" }
  )
)
