import React, { useState, useEffect, useRef } from 'react';
import UserCard from '../../../../components/userCard';
import Loading from '../../../../components/Loading';
import SecondHomeSearchForm from './modules/SecondHomeSearchForm';
import { useTranslation } from 'react-i18next';
import { useRecentUser } from '../SecondHomePageSearch/hooks/useRecentUser';
import { useCardContext } from '../../../../context/CardContext';

export default function SecondHomePageSearch() {
  const { t } = useTranslation();
  const { getRecentUser } = useRecentUser();
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [allUsers, setAllUsers] = useState([]); // Все пользователи
  const { visibleCardCount, updateVisibleCardCount } = useCardContext();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(''); // Фильтр по умолчанию

  // Функция для выполнения API-запроса
  const fetchUser = async (gender, ageFrom, ageTo, address, maritalStatus) => {
    console.log(gender, ageFrom, ageTo, address, maritalStatus);  
    setIsLoading(true); // Показываем индикатор загрузки
    try {
      const user = await getRecentUser(gender, ageFrom, ageTo, address, maritalStatus);
      console.log('Fetched user:', user?.data?.items);
      setAllUsers(user?.data?.items || []); // Устанавливаем пользователей
      if (isSearchActive) {
        updateVisibleCardCount(8);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false); // Скрываем индикатор загрузки
    }
  };

  useEffect(() => {
    // При загрузке страницы выполняем запрос с фильтром "all"
    fetchUser('', 18, 100, '', '');
  }, []);

  // Обработчик клика на кнопки фильтров
  const onFilterClick = (filter) => {
    setActiveFilter(filter);
    fetchUser(filter, 18, 100, '', ''); // передаем выбранный фильтр в запрос
  };

  // Функция для загрузки дополнительных пользователей
  const onLoadMore = () => {
    updateVisibleCardCount(visibleCardCount + 4);
  };

  const formRef = useRef();

  const handleReset = () => {
    setIsSearchActive(false);
    setActiveFilter('');
    fetchUser('', 18, 100, '', ''); // Сбрасываем фильтр и выполняем запрос на API
    updateVisibleCardCount(8); // Сбрасываем количество отображаемых пользователей
    if (formRef.current) {
      formRef.current.resetForm(); // Сбрасываем форму через реф
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 overflow-hidden" id="search">
      {isLoading && <Loading type="default" size="large" color="rose" overlay />}
      <div className="container mx-auto py-[64px]">
        <div className="flex flex-col items-center mb-12">
          <h1 data-aos="fade-down" data-aos-offset="50" className="text-4xl font-bold text-gray-900 mb-4">{t('home.SecondHomePageSearch.title')}</h1>
          <p data-aos="fade-up" data-aos-offset="50" className="text-xl text-gray-600 text-center max-w-2xl">
            {t('home.SecondHomePageSearch.description')}
          </p>
        </div>

        <SecondHomeSearchForm onSearch={fetchUser} ref={formRef} setIsSearchActive={setIsSearchActive} />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 pt-[64px]" id="ankets">
          {!isSearchActive && (
            <>
              <button
                onClick={() => onFilterClick('')}
                className={`px-6 py-2 rounded-full ${
                  activeFilter === ''
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors duration-300`}
              >
                {t('home.SecondHomePageSearch.filters.all')}
              </button>
              <button
                onClick={() => onFilterClick('gender=MALE')}
                className={`px-6 py-2 rounded-full ${
                  activeFilter === 'gender=MALE'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors duration-300`}
              >
                {t('home.SecondHomePageSearch.filters.men')}
              </button>
              <button
                onClick={() => onFilterClick('gender=FEMALE')}
                className={`px-6 py-2 rounded-full ${
                  activeFilter === 'gender=FEMALE'
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors duration-300`}
              >
                {t('home.SecondHomePageSearch.filters.women')}
              </button>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allUsers.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-500">
              {t('home.SecondHomePageSearch.noUsersMessage')}
            </div>
          ) : (
            allUsers.slice(0, visibleCardCount).map((user) => (
              <UserCard key={user.id} user={user} gender={user.gender} />
            ))
          )}
        </div>

        {allUsers.length > visibleCardCount && (
          <div className="mt-12 text-center">
            <button
              onClick={onLoadMore}
              className="px-8 py-3 bg-white text-rose-500 border-2 border-rose-500 rounded-full hover:bg-rose-50 transition-all flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {t('home.SecondHomePageSearch.ShowMore')} {Math.min(4, allUsers.length - visibleCardCount)} {t('home.SecondHomePageSearch.Anketa')}
            </button>
          </div>
        )}

        {isSearchActive && allUsers?.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
            >
              {t('home.SecondHomePageSearch.resetSearch')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
