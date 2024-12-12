// Функция для загрузки дополнительных анкет
export const loadMore = ({ visibleCount, allUsers, setVisibleCount, setDisplayedUsers }) => {
  const newCount = visibleCount + 4
  setVisibleCount(newCount)
  setDisplayedUsers(allUsers.slice(0, newCount))
}
