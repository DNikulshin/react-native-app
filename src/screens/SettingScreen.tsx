import Colors from '@/constants/Colors'
import Paths from '@/constants/Paths'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SettingScreen</Text>
      <Link href={Paths.login} style={styles.link}>
        To Login
      </Link>
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
    rowGap: 8,
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
})
