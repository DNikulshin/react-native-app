// Файл: src/types/env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    // Здесь мы объявляем наши переменные окружения и их типы
    EXPO_PUBLIC_API_URL: string

    // Пример другой переменной
    // EXPO_PUBLIC_STRIPE_KEY: string;
  }
}
