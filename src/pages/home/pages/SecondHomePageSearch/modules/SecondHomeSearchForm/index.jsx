import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
// Иконка поиска
const SearchIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={2} 
    stroke="currentColor" 
    className="w-5 h-5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
    />
  </svg>
)

// Список городов
export const cities = [
  { value: 'all', label: 'Все города' },
  { value: 'Tashkent', label: 'Ташкент' },
  { value: 'Andijan', label: 'Андижан' },
  { value: 'Bukhara', label: 'Бухара' },
  { value: 'Fergana', label: 'Фергана' },
  { value: 'Jizzakh', label: 'Джизак' },
  { value: 'Xorazm', label: 'Хорезм' },
  { value: 'Namangan', label: 'Наманган' },
  { value: 'Navoiy', label: 'Навои' },
  { value: 'Qashqadaryo', label: 'Кашкадарья' },
  { value: 'Samarkand', label: 'Самарканд' },
  { value: 'Sirdaryo', label: 'Сырдарья' },
  { value: 'Surxondaryo', label: 'Сурхандарья' },
  { value: 'Karakalpakstan', label: 'Каракалпакстан' }
]

// Список семейных положений для мужчин
const maleMaritalStatuses = [
  { value: 'all', label: 'Все' },
  { value: 'single', label: 'Не женат' },
  { value: 'divorced', label: 'В разводе' },
  { value: 'widowed', label: 'Вдовец' },
  { value: 'married_second', label: 'Ищет вторую жену' }
]

// Список семейных положений для женщин
const femaleMaritalStatuses = [
  { value: 'all', label: 'Все' },
  { value: 'single', label: 'Не замужем' },
  { value: 'divorced', label: 'В разводе' },
  { value: 'widowed', label: 'Вдова' }
]

const SecondHomeSearchForm = forwardRef(({ onSearch }, ref) => {
  const [gender, setGender] = useState('female')
  const [minAge, setMinAge] = useState(18)
  const [maxAge, setMaxAge] = useState(40)
  const [location, setLocation] = useState('all')
  const [maritalStatus, setMaritalStatus] = useState('all')
  const { t } = useTranslation();
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setGender('female')
      setMinAge(18)
      setMaxAge(40)
      setLocation('all')
      setMaritalStatus('all')
    }
  }))

  const getMaritalStatusOptions = () => {
    return gender === 'male' ? maleMaritalStatuses : femaleMaritalStatuses
  }

  const handleGenderChange = (newGender) => {
    setGender(newGender)
    setMaritalStatus('all')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!minAge || !maxAge || minAge > maxAge) {
      alert('Пожалуйста, укажите корректный диапазон возраста')
      return
    }
    onSearch({
      gender,
      minAge,
      maxAge,
      location,
      maritalStatus
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Selection */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Пол
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleGenderChange('male')}
              className={`flex-1 py-2 px-4 rounded-full border ${
                gender === 'male'
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-rose-500'
              } transition-colors duration-300`}
            >
              Мужской
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('female')}
              className={`flex-1 py-2 px-4 rounded-full border ${
                gender === 'female'
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-rose-500'
              } transition-colors duration-300`}
            >
              Женский
            </button>
          </div>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Возраст
          </label>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <input
                type="number"
                min="18"
                max="100"
                value={minAge}
                onChange={(e) => setMinAge(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-rose-500"
                placeholder="От"
              />
            </div>
            <span className="text-gray-500">-</span>
            <div className="flex-1">
              <input
                type="number"
                min="18"
                max="100"
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-rose-500"
                placeholder="До"
              />
            </div>
          </div>
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Город
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Семейное положение
          </label>
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            {getMaritalStatusOptions().map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <SearchIcon />
          <span>Поиск</span>
        </button>
      </div>
    </div>
  )
})

export default SecondHomeSearchForm
