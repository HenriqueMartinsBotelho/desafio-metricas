import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from './../services/axios'
import router from '../router'

interface User {
  id: number
  name: string
  email: string
  phone: string
  cpf: string
}

interface AuthResponse {
  accessToken: string
  user: User
}

export const useAuth = defineStore('auth', () => {
  const token: Ref<string | null> = ref(localStorage.getItem('token'))
  const user: Ref<User | null> = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const isAuth: Ref<boolean> = ref(false)

  function setToken(tokenValue: string): void {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser(userValue: User): void {
    localStorage.setItem('user', JSON.stringify(userValue))
    user.value = userValue
  }

  function setIsAuth(auth: boolean): void {
    isAuth.value = auth
  }

  const isAuthenticated = computed((): boolean => {
    return !!token.value && !!user.value
  })

  const fullName = computed((): string => {
    if (user.value) {
      return `${user.value.name}`
    }
    return ''
  })

  async function checkToken(): Promise<AuthResponse | void> {
    try {
      const tokenAuth = 'Bearer ' + token.value
      const { data } = await axios.get<AuthResponse>('/auth/', {
        headers: {
          Authorization: tokenAuth,
        },
      })
      return data
    } catch (error) {
      console.log('error', error)
      clear()
      router.push('/login')
    }
  }

  function clear(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isAuth.value = false
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    setToken,
    setUser,
    isAuthenticated,
    fullName,
    clear,
    setIsAuth,
    isAuth,
  }
})
