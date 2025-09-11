import { FAKE_USER } from '@/shared/api'
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'

interface IAuthContext {
  user: typeof FAKE_USER | null
  signIn: () => void
  signOut: () => void
  isLoading: boolean
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<typeof FAKE_USER | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const value = {
    user,
    isLoading,
    signIn: () => {
      setUser(FAKE_USER)
    },
    signOut: () => {
      setUser(null)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
