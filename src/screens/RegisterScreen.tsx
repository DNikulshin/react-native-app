import Colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RegisterScreen</Text>
    </View>
  )
}

export default RegisterScreen

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
})
