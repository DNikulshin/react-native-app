import { AuthProvider } from '@/context/AuthContext'
import { RootLayoutNav } from '@/navigation/RootLayoutNav'

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}
