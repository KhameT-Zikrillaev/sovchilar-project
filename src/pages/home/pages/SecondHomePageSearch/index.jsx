import React, { useState, useEffect, useRef } from 'react';
import UserCard from '../../../../components/userCard';
import Loading from '../../../../components/Loading';
import SecondHomeSearchForm from './modules/SecondHomeSearchForm';
import { useTranslation } from 'react-i18next';
import { useRecentUser } from '../SecondHomePageSearch/hooks/useRecentUser';
import { useCardContext } from '../../../../context/CardContext';
import { useLocation } from 'react-router-dom';

export default function SecondHomePageSearch() {
  const { t } = useTranslation();
  const { getRecentUser } = useRecentUser();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [allUsers, setAllUsers] = useState(() => {
    // Пытаемся получить сохраненных пользователей из localStorage
    const savedUsers = localStorage.getItem('searchUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [dublickAllUsers, setDublickAllUsers] = useState([]);
  const { visibleCardCount, updateVisibleCardCount } = useCardContext();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(() => {
    return localStorage.getItem('activeFilter') || '';
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedAge, setIsSubmittedAge] = useState(false);
  const formRef = useRef();

  // Функция для выполнения API-запроса
  const fetchUser = async (gender, ageFrom, ageTo, address, maritalStatus) => {
    console.log(gender, ageFrom, ageTo, address, maritalStatus);  
    setIsLoading(true);
    try {
      const user = await getRecentUser(gender, ageFrom, ageTo, address, maritalStatus);
      console.log('Fetched user:', user?.data?.items);
      const newUsers = user?.data?.items || [];
      setAllUsers(newUsers);
      // Сохраняем результаты поиска и параметры только если это поиск из формы
      if (ageFrom !== 18 || ageTo !== 100 || address || maritalStatus) {
        localStorage.setItem('searchUsers', JSON.stringify(newUsers));
        localStorage.setItem('isSearchActive', 'true');
        setIsSearchActive(true);
      } else {
        localStorage.removeItem('isSearchActive');
        setIsSearchActive(false);
      }
      localStorage.setItem('activeFilter', gender || '');
      localStorage.setItem('searchParams', JSON.stringify({
        gender,
        ageFrom,
        ageTo,
        address,
        maritalStatus
      }));
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Проверяем, есть ли сохраненные параметры поиска
    const savedParams = localStorage.getItem('searchParams');
    const activeFilterValue = localStorage.getItem('activeFilter');

    if (savedParams && activeFilterValue) {
      // Если есть активный фильтр, восстанавливаем параметры поиска
      const params = JSON.parse(savedParams);
      fetchUser(params.gender, params.ageFrom, params.ageTo, params.address, params.maritalStatus).then(() => {
        scrollToLastViewedCard();
      });
    } else {
      // Если нет активного фильтра, сбрасываем форму и делаем начальный запрос
      if (formRef.current) {
        formRef.current.resetForm();
      }
      fetchUser('', 18, 100, '', '').then(() => {
        scrollToLastViewedCard();
      });
    }
  }, []);

  // Функция для прокрутки к последней просмотренной карточке
  const scrollToLastViewedCard = () => {
    const lastViewedCardId = localStorage.getItem('lastViewedCardId');
    if (lastViewedCardId) {
      setTimeout(() => {
        const cardElement = document.getElementById(`user-card-${lastViewedCardId}`);
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Добавляем временное выделение карточки
          cardElement.style.transition = 'all 0.5s ease';
          cardElement.style.boxShadow = '0 0 20px rgba(8, 112, 184, 0.7)';
          setTimeout(() => {
            cardElement.style.boxShadow = '';
          }, 2000);
        }
        // Очищаем сохраненный id
        localStorage.removeItem('lastViewedCardId');
      }, 100); // Небольшая задержка для уверенности, что контент загрузился
    }
  };

  // Функция для загрузки дополнительных пользователей
  const onLoadMore = () => {
    const newCount = visibleCardCount + 12;
    updateVisibleCardCount(newCount);
    // После загрузки дополнительных карточек проверяем, нужно ли прокрутить к определенной
    scrollToLastViewedCard();
  };

  // Очищаем localStorage и сбрасываем форму при закрытии/обновлении страницы
  
  
  
  
  
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('visibleCardCount');
      localStorage.removeItem('searchUsers');
      localStorage.removeItem('isSearchActive');
      localStorage.removeItem('activeFilter');
      localStorage.removeItem('searchParams');
      
      // Сбрасываем состояния
      setIsSearchActive(false);
      setActiveFilter('');
      setIsSubmitted(false);
      setIsSubmittedAge(false);
      updateVisibleCardCount(12);
      
      // Сбрасываем форму
      if (formRef.current) {
        formRef.current.reset();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Восстанавливаем позицию скролла
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition),
          behavior: 'smooth'
        });
        // Очищаем сохраненную позицию
        localStorage.removeItem('scrollPosition');
      }, 100); // Небольшая задержка для уверенности, что контент загрузился
    }
  }, []);

  // Функция для сброса поиска
  const resetSearch = () => {
    localStorage.removeItem('searchUsers');
    localStorage.removeItem('isSearchActive');
    localStorage.removeItem('activeFilter');
    localStorage.removeItem('searchParams');
    localStorage.removeItem('searchFormGender');
    localStorage.removeItem('searchFormMinAge');
    localStorage.removeItem('searchFormMaxAge');
    localStorage.removeItem('searchFormLocation');
    localStorage.removeItem('searchFormMaritalStatus');
    setIsSearchActive(false);
    setActiveFilter('');
    if (formRef.current) {
      formRef.current.resetForm();
    }
    updateVisibleCardCount(12);
    fetchUser('', 18, 100, '', '');
  };

  const handleReset = () => {
    resetSearch();
    setIsSubmitted(false);
    setIsSubmittedAge(false);
    if (formRef.current) {
      formRef.current.resetForm(); // Сбрасываем форму через реф
    }
  };

  // Обработчик клика на кнопки фильтров
  const onFilterClick = (filter) => {
    setActiveFilter(filter);
    fetchUser(filter, 18, 100, '', ''); // передаем выбранный фильтр в запрос
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

        <SecondHomeSearchForm 
          onSearch={fetchUser} 
          ref={formRef} 
          setIsSearchActive={setIsSearchActive}
          isSubmitted={isSubmitted}
          isSubmittedAge={isSubmittedAge}
          setIsSubmitted={setIsSubmitted}
          setIsSubmittedAge={setIsSubmittedAge}
        />

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
           {isSearchActive && allUsers?.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
            >
              {t('home.SecondHomePageSearch.resetButton')}
            </button>
          </div>
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
              {t('home.SecondHomePageSearch.ShowMore')} {Math.min(12, allUsers.length - visibleCardCount)} {t('home.SecondHomePageSearch.Anketa')}
            </button>
          </div>
        )}

       
      </div>
    </section>
  );
}
