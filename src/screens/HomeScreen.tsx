import Colors from '@/constants/Colors'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {
  const { user, isLoading } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>User: {user?.email}</Text>
      )}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bg.primary,
  },
  title: {
    color: Colors.text.primary,
    fontSize: 32,
  },
  text: {
    color: Colors.text.secondary,
    fontSize: 24,
  },
})
