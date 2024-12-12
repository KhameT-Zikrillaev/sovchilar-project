import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userData } from '../../services/userData';

function UserDetails() {
  const { id } = useParams();
  const user = userData.find(u => u.id === parseInt(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-[64px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Пользователь не найден</h2>
          <Link to="/" className="mt-4 inline-block text-blue-500 hover:text-blue-600">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-[64px]">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center mb-8 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Назад
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Верхняя секция с фото и основной информацией */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative flex items-center justify-center">
              <div className="w-[400px] h-[400px] overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">{user.name}, {user.age}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{user.location}</span>
                </div>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                <span className="text-gray-700">{user.nationality}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">{user.bio}</p>
            </div>
          </div>

          {/* Основная информация */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-gray-50">
            <div className="lg:col-span-2 space-y-8">
              {/* О себе */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">О себе</h2>
                <p className="text-gray-600 leading-relaxed">{user.bio}</p>
              </section>

              {/* Основная информация */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Основная информация</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Возраст</h3>
                        <p className="text-lg font-semibold text-gray-800">{user.age} лет</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg">
                        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Местоположение</h3>
                        <p className="text-lg font-semibold text-gray-800">{user.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Языки</h3>
                        <p className="text-lg font-semibold text-gray-800">{user.languages.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-rose-100 rounded-lg">
                        <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Образование</h3>
                        <p className="text-lg font-semibold text-gray-800">{user.education}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Хобби и интересы */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Хобби и интересы</h2>
                <div className="flex flex-wrap gap-2">
                  {user.hobbies.map((hobby, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Боковая панель */}
            <div className="lg:col-span-1 space-y-6">
              {/* Семейные ценности */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Семейные ценности</h3>
                <ul className="space-y-3">
                  {user.familyValues.map((value, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Дополнительная информация */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Дополнительно</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500">Религиозность:</span>
                    <p className="font-medium text-gray-800">{user.religiousLevel}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Намаз:</span>
                    <p className="font-medium text-gray-800">{user.prayer}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Курение:</span>
                    <p className="font-medium text-gray-800">{user.smoking}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Доход:</span>
                    <p className="font-medium text-gray-800">{user.income}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Проживание:</span>
                    <p className="font-medium text-gray-800">{user.livingArrangement}</p>
                  </div>
                </div>
              </div>

              {/* Предпочтения */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Предпочтения</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Готов к переезду</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.willingToRelocate ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.willingToRelocate ? 'Да' : 'Нет'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Есть дети</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.hasChildren ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.hasChildren ? 'Да' : 'Нет'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Хочет детей</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.wantsChildren ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.wantsChildren ? 'Да' : 'Нет'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;