import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface UserData {
  id: string
  [key: string]: unknown
}

export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref<string | null>(null)
    const user = ref<UserData | null>(null)
    const token = ref<string>('')
    const isAuthenticated = computed(() => {
      return id.value !== null && id.value !== undefined && id.value !== ''
    })

    const setUser = (userData: UserData) => {
      id.value = userData.id
      user.value = userData
    }

    const setToken = (tokenValue: string) => {
      token.value = tokenValue
    }

    const clearUser = () => {
      id.value = null
      user.value = null
      token.value = ''
    }

    return { id, user, isAuthenticated, token, setUser, setToken, clearUser }
  },
  {
    persist: {
      storage: localStorage,
      key: 'user-store',
    },
  },
)
