import React, { useState, useEffect, useRef } from 'react'
import { userData } from '../../../../services/userData'
import UserCard from '../../../../components/userCard'
import Loading from '../../../../components/Loading'
import SecondHomeSearchForm from './modules/SecondHomeSearchForm'
import { handleSearch } from './helpers/searchHelpers'
import { loadMore } from './helpers/loadMoreHelper'
import { useTranslation } from 'react-i18next'
export default function SecondHomePageSearch() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [allUsers, setAllUsers] = useState([])
  const [displayedUsers, setDisplayedUsers] = useState([])
  const [visibleCount, setVisibleCount] = useState(8)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const formRef = useRef()
  const { t } = useTranslation();
  useEffect(() => {
    // При первой загрузке показываем всех пользователей
    setAllUsers(userData)
    setDisplayedUsers(userData.slice(0, visibleCount))
  }, [])

  // Обработчик поиска через форму
  const onSearch = (searchParams) => {
    // Устанавливаем isSearchActive только если это не фильтрация
    if (!searchParams.activeFilter) {
      setIsSearchActive(true)
    }
    
    handleSearch({
      activeFilter: searchParams.activeFilter,
      searchParams,
      setIsLoading,
      setAllUsers,
      setDisplayedUsers,
      setVisibleCount
    })
    if (searchParams.activeFilter) {
      setActiveFilter(searchParams.activeFilter)
    }
  }

  // Обработчик сброса
  const handleReset = () => {
    setIsSearchActive(false)
    setActiveFilter('all')
    setAllUsers(userData)
    setDisplayedUsers(userData.slice(0, 8))
    setVisibleCount(8)
    if (formRef.current && formRef.current.resetForm) {
      formRef.current.resetForm()
    }
  }

  // Обработчик загрузки дополнительных анкет
  const onLoadMore = () => {
    loadMore({
      visibleCount,
      allUsers,
      setVisibleCount,
      setDisplayedUsers
    })
  }

  return (
    <section className="py-16 px-4 bg-gray-50" id="search">
      {isLoading && <Loading type="default" size="large" color="rose" overlay />}
      <div className="container mx-auto py-[64px]">
        <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('home.SecondHomePageSearch.title')}</h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl">
          {t('home.SecondHomePageSearch.description')}  
          </p>
        </div>

        {/* Форма поиска */}
        <SecondHomeSearchForm ref={formRef} onSearch={onSearch} />

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 pt-[64px]" id="ankets">
          {!isSearchActive ? (
            <>
              <button
                onClick={() => onSearch({ activeFilter: 'all' })}
                className={`px-6 py-2 rounded-full ${
                  activeFilter === 'all'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors duration-300`}
              >
               {t('home.SecondHomePageSearch.filters.all')}
              </button>
              <button
                onClick={() => onSearch({ activeFilter: 'men' })}
                className={`px-6 py-2 rounded-full ${
                  activeFilter === 'men'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors duration-300`}
              >
                {t('home.SecondHomePageSearch.filters.men')}
              </button>
              <button
                onClick={() => onSearch({ activeFilter: 'women' })}
                className={`px-6 py-2 rounded-full ${
                  activeFilter === 'women'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors duration-300`}
              >
                {t('home.SecondHomePageSearch.filters.women')}
              </button>
            </>
          ) : (
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-300"
            > 
            {t('home.SecondHomePageSearch.resetButton')}
            </button>
          )}
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {/* Load More Button */}
        {allUsers.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={onLoadMore}
              className="px-8 py-3 bg-white text-rose-500 border-2 border-rose-500 rounded-full hover:bg-rose-50 transition-all flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Показать еще {Math.min(4, allUsers.length - visibleCount)} анкет
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
