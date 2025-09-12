import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'

const USER_STORAGE_KEY = '@user_session'

interface StoredUser {
  email: string
  hashedPassword: string
  salt: string
}

interface IAuthContext {
  user: { email: string } | null
  register: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>
  signOut: () => void
  isLoading: boolean
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

const hashPassword = async (password: string, salt: string) => {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + salt
  )
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedSession = await AsyncStorage.getItem(USER_STORAGE_KEY)
        if (storedSession) {
          // При старте мы просто знаем, что пользователь вошел.
          // Не храним пароль или хеш в состоянии.
          const sessionData = JSON.parse(storedSession)
          setUser({ email: sessionData.email })
        }
      } catch (e) {
        console.error('Failed to load user session', e)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserFromStorage()
  }, [])

  const register = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // 1. Проверяем, не занят ли email (в реальном приложении - запрос к API)
      const existingUser = await AsyncStorage.getItem(USER_STORAGE_KEY)
      if (existingUser && JSON.parse(existingUser).email === email) {
        return {
          success: false,
          message: 'Пользователь с таким email уже существует.',
        }
      }

      // 2. Создаем соль
      const salt = Math.random().toString(36).substring(2)

      // 3. Хешируем пароль + соль
      const hashedPassword = await hashPassword(password, salt)

      // 4. Сохраняем email, хеш и соль
      const userData: StoredUser = { email, hashedPassword, salt }
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))

      setUser({ email })
      return { success: true, message: 'Регистрация успешна!' }
    } catch (e) {
      console.error(e)
      return { success: false, message: 'Ошибка при регистрации.' }
    }
  }

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // 1. Находим пользователя по email
      const storedData = await AsyncStorage.getItem(USER_STORAGE_KEY)
      if (!storedData) {
        return { success: false, message: 'Пользователь не найден.' }
      }

      const userData: StoredUser = JSON.parse(storedData)

      if (userData.email !== email) {
        return { success: false, message: 'Пользователь не найден.' }
      }

      // 2. Хешируем введенный пароль с сохраненной солью
      const inputHashedPassword = await hashPassword(password, userData.salt)

      // 3. Сравниваем хеши
      if (inputHashedPassword === userData.hashedPassword) {
        setUser({ email: userData.email })
        return { success: true, message: 'Вход выполнен успешно!' }
      } else {
        return { success: false, message: 'Неверный пароль.' }
      }
    } catch (e) {
      console.error(e)
      return { success: false, message: 'Ошибка при входе.' }
    }
  }

  const signOut = async () => {
    setUser(null)
    await AsyncStorage.removeItem(USER_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, register, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
