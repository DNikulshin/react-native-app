import Colors from '@/constants/Colors'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()
  // const router = useRouter()

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, введите email и пароль.')
      return
    }
    const result = await signIn(email, password)
    if (!result.success) {
      Alert.alert('Ошибка входа', result.message)
    }
    // Автоматическая навигация при успехе
  }

  console.log(process.env.EXPO_PUBLIC_API_URL)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.text.primary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          placeholderTextColor={Colors.text.primary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.button}>Войти</Text>
        </TouchableOpacity>
        <Link href="/register" style={styles.link}>
          Нет аккаунта? Зарегистрироваться
        </Link>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.bg.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.text.primary,
  },
  form: {
    rowGap: 12,
  },
  input: {
    paddingVertical: 10,
    borderColor: Colors.border.secondary,
    borderWidth: 0.5,
    paddingHorizontal: 8,
    color: Colors.text.primary,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.bg.btn,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 18,
    color: Colors.text.primary,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: Colors.link.secondary,
  },
})
