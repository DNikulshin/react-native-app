import Colors from '@/constants/Colors'
import Paths from '@/constants/Paths'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const RootLayoutNav = () => {
  useProtectedRoute()
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.bg.primary,
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.bg.primary,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={Paths.tabs} />
        </Stack>
      </View>
    </SafeAreaView>
  )
}
