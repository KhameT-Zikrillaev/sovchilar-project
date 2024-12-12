import { userData, getMenData, getWomenData } from '../../../../../services/userData'

// Функция для поиска и фильтрации пользователей
export const handleSearch = async ({ activeFilter, searchParams, setIsLoading, setAllUsers, setDisplayedUsers, setVisibleCount }) => {
  setIsLoading(true)
  
  // Имитация загрузки данных
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  let filteredUsers = []
  
  // Если пришел activeFilter, используем его
  if (activeFilter) {
    if (activeFilter === 'all') {
      filteredUsers = userData
    } else if (activeFilter === 'men') {
      filteredUsers = getMenData()
    } else {
      filteredUsers = getWomenData()
    }
  } 
  // Иначе фильтруем по параметрам поиска
  else {
    if (searchParams.gender === 'female') {
      filteredUsers = getWomenData() // Если ищем женщин - показываем женщин
    } else if (searchParams.gender === 'male') {
      filteredUsers = getMenData() // Если ищем мужчин - показываем мужчин
    } else {
      filteredUsers = userData
    }

    // Применяем дополнительные фильтры
    filteredUsers = filteredUsers.filter(user => {
      // Фильтр по возрасту
      const age = user.age
      if (age < searchParams.minAge || age > searchParams.maxAge) return false

      // Фильтр по городу
      if (searchParams.location !== 'all' && user.location !== searchParams.location) return false

      // Фильтр по семейному положению
      if (searchParams.maritalStatus !== 'all' && user.maritalStatus !== searchParams.maritalStatus) return false

      return true
    })
  }
  
  setAllUsers(filteredUsers)
  setDisplayedUsers(filteredUsers.slice(0, 8))
  setVisibleCount(8) // Сбрасываем счетчик при смене фильтра
  setIsLoading(false)
}
