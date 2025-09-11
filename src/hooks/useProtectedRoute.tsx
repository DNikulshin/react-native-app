import Paths from '@/constants/Paths'
import { useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

export const useProtectedRoute = () => {
  const { user, isLoading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    const inAuthGroup = segments[0] === Paths.auth

    if (!user && !inAuthGroup) {
      router.replace(Paths.login)
    } else if (user && inAuthGroup) {
      router.replace(Paths.home)
    }
  }, [user, segments, isLoading, router])
}
