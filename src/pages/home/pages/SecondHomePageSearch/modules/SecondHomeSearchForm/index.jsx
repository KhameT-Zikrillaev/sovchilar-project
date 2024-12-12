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

const SecondHomeSearchForm = forwardRef(({ onSearch }, ref) => {
  const { t } = useTranslation();

  const [gender, setGender] = useState('female')
  const [minAge, setMinAge] = useState(18)
  const [maxAge, setMaxAge] = useState(40)
  const [location, setLocation] = useState('all')
  const [maritalStatus, setMaritalStatus] = useState('all')

  const cities = [
    { value: 'all', label: t('home.SecondHomePageSearch.form.city.options.all') },
    { value: 'Tashkent', label: t('home.SecondHomePageSearch.form.city.options.Tashkent') },
    { value: 'Andijan', label: t('home.SecondHomePageSearch.form.city.options.Andijan') },
    { value: 'Bukhara', label: t('home.SecondHomePageSearch.form.city.options.Bukhara') },
    { value: 'Fergana', label: t('home.SecondHomePageSearch.form.city.options.Fergana') },
    { value: 'Jizzakh', label: t('home.SecondHomePageSearch.form.city.options.Jizzakh') },
    { value: 'Xorazm', label: t('home.SecondHomePageSearch.form.city.options.Xorazm') },
    { value: 'Namangan', label: t('home.SecondHomePageSearch.form.city.options.Namangan') },
    { value: 'Navoiy', label: t('home.SecondHomePageSearch.form.city.options.Navoiy') },
    { value: 'Qashqadaryo', label: t('home.SecondHomePageSearch.form.city.options.Qashqadaryo') },
    { value: 'Samarkand', label: t('home.SecondHomePageSearch.form.city.options.Samarkand') },
    { value: 'Sirdaryo', label: t('home.SecondHomePageSearch.form.city.options.Sirdaryo') },
    { value: 'Surxondaryo', label: t('home.SecondHomePageSearch.form.city.options.Surxondaryo') },
    { value: 'Karakalpakstan', label: t('home.SecondHomePageSearch.form.city.options.Karakalpakstan') }
  ];

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
      alert(t('home.SecondHomePageSearch.form.ageError'));
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

  const maleMaritalStatuses = [
    { value: 'all', label: t('home.SecondHomePageSearch.form.maritalStatus.male.all') },
    { value: 'single', label: t('home.SecondHomePageSearch.form.maritalStatus.male.single') },
    { value: 'divorced', label: t('home.SecondHomePageSearch.form.maritalStatus.male.divorced') },
    { value: 'widowed', label: t('home.SecondHomePageSearch.form.maritalStatus.male.widowed') },
    { value: 'married_second', label: t('home.SecondHomePageSearch.form.maritalStatus.male.married_second') }
  ];
  
  const femaleMaritalStatuses = [
    { value: 'all', label: t('home.SecondHomePageSearch.form.maritalStatus.female.all') },
    { value: 'single', label: t('home.SecondHomePageSearch.form.maritalStatus.female.single') },
    { value: 'divorced', label: t('home.SecondHomePageSearch.form.maritalStatus.female.divorced') },
    { value: 'widowed', label: t('home.SecondHomePageSearch.form.maritalStatus.female.widowed') }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Selection */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
          {t('home.SecondHomePageSearch.form.gender.label')}
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
              {t('home.SecondHomePageSearch.form.gender.male')}
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
             {t('home.SecondHomePageSearch.form.gender.female')}
            </button>
          </div>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
          {t('home.SecondHomePageSearch.form.age.label')}
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
          {t('home.SecondHomePageSearch.form.city.label')}
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
          {t('home.SecondHomePageSearch.form.maritalStatus.label')}
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
          <span>{t('home.SecondHomePageSearch.form.search')}</span>
        </button>
      </div>
    </div>
  )
})

export default SecondHomeSearchForm
