import Colors from '@/constants/Colors'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SettingScreen = () => {
  const { signOut } = useAuth()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SettingScreen</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.button}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bg.primary,
    rowGap: 20,
  },
  title: {
    color: Colors.text.primary,
    fontSize: 32,
  },
  link: {
    color: Colors.link.primary,
    padding: 15,
    backgroundColor: Colors.bg.secondary,
    textDecorationLine: 'underline',
    fontSize: 24,
  },
  button: {
    color: Colors.text.secondary,
    backgroundColor: Colors.bg.btn,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    fontSize: 16,
    textAlign: 'center',
  },
})
