import Colors from '@/constants/Colors'
import { useAuth } from '@/hooks/useAuth'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, введите email и пароль.')
      return
    }

    const result = await register(email, password)
    if (result.success) {
      // Навигация произойдет автоматически благодаря useProtectedRoute
    } else {
      Alert.alert('Ошибка регистрации', result.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.button}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <Link href="/login" style={styles.link}>
          Уже есть аккаунт? Войти
        </Link>
      </View>
    </View>
  )
}

export default RegisterScreen

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
