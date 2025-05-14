import { useQuery } from '@tanstack/react-query'
import { IData_SnippetNews } from './types'

const API_URL = 'https://api.example.com/news/sample' 

// Функция запроса данных
async function fetchNews(): Promise<IData_SnippetNews> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Ошибка при загрузке новости')
  }
  return response.json()
}

// Кастомный хук для использования в компонентах
export function useNews() {
  return useQuery<IData_SnippetNews, Error>({
    queryKey: ['news'],
    queryFn: fetchNews,
  })
}
