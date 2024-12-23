import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

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
);

const SecondHomeSearchForm = forwardRef(({ onSearch, setIsSearchActive, isSubmitted, setIsSubmitted, isSubmittedAge, setIsSubmittedAge }, ref) => {
  const { t } = useTranslation();
  const [gender, setGender] = useState(() => {
    return localStorage.getItem('searchFormGender') || '';
  });
  const [minAge, setMinAge] = useState(() => {
    return parseInt(localStorage.getItem('searchFormMinAge')) || 18;
  });
  const [maxAge, setMaxAge] = useState(() => {
    return parseInt(localStorage.getItem('searchFormMaxAge')) || 90;
  });
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('searchFormLocation') || '';
  });
  const [maritalStatus, setMaritalStatus] = useState(() => {
    return localStorage.getItem('searchFormMaritalStatus') || '';
  });

  // Очищаем localStorage только при закрытии вкладки/сайта
  useEffect(() => {
    const handleUnload = () => {
      // Проверяем, что это действительно закрытие, а не обновление
      if (!window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
        localStorage.removeItem('searchFormGender');
        localStorage.removeItem('searchFormMinAge');
        localStorage.removeItem('searchFormMaxAge');
        localStorage.removeItem('searchFormLocation');
        localStorage.removeItem('searchFormMaritalStatus');
      }
    };

    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setGender('');
      setMinAge(18);
      setMaxAge(90);
      setLocation('');
      setMaritalStatus('');
      // Очищаем localStorage при сбросе
      localStorage.removeItem('searchFormGender');
      localStorage.removeItem('searchFormMinAge');
      localStorage.removeItem('searchFormMaxAge');
      localStorage.removeItem('searchFormLocation');
      localStorage.removeItem('searchFormMaritalStatus');
    },
  }));

  // Сохраняем значения в localStorage при изменении
  const handleGenderChange = (newGender) => {
    setGender(newGender);
    localStorage.setItem('searchFormGender', newGender);
  };

  const handleMinAgeChange = (value) => {
    setMinAge(value);
    localStorage.setItem('searchFormMinAge', value);
  };

  const handleMaxAgeChange = (value) => {
    setMaxAge(value);
    localStorage.setItem('searchFormMaxAge', value);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    localStorage.setItem('searchFormLocation', value);
  };

  const handleMaritalStatusChange = (value) => {
    setMaritalStatus(value);
    localStorage.setItem('searchFormMaritalStatus', value);
  };

  const cities = [
    { value: '', label: t('home.SecondHomePageSearch.form.city.options.all') },
    { value: '&address=TOSHKENT', label: t('home.SecondHomePageSearch.form.city.options.Tashkent') },
    { value: '&address=ANDIJON', label: t('home.SecondHomePageSearch.form.city.options.Andijan') },
    { value: '&address=BUXORO', label: t('home.SecondHomePageSearch.form.city.options.Bukhara') },
    { value: '&address=FARGONA', label: t('home.SecondHomePageSearch.form.city.options.Fergana') },
    { value: '&address=JIZZAX', label: t('home.SecondHomePageSearch.form.city.options.Jizzakh') },
    { value: '&address=XORAZM', label: t('home.SecondHomePageSearch.form.city.options.Xorazm') },
    { value: '&address=NAMANGAN', label: t('home.SecondHomePageSearch.form.city.options.Namangan') },
    { value: '&address=NAVOIY', label: t('home.SecondHomePageSearch.form.city.options.Navoiy') },
    { value: '&address=QASHQADARYO', label: t('home.SecondHomePageSearch.form.city.options.Qashqadaryo') },
    { value: '&address=SAMARQAND', label: t('home.SecondHomePageSearch.form.city.options.Samarkand') },
    { value: '&address=SIRDARYO', label: t('home.SecondHomePageSearch.form.city.options.Sirdaryo') },
    { value: '&address=SURXONDARYO', label: t('home.SecondHomePageSearch.form.city.options.Surxondaryo') },
    { value: '&address=QORAQALPOGISTON', label: t('home.SecondHomePageSearch.form.city.options.Karakalpakstan') },
  ];

  const maleMaritalStatuses = [
    { value: '', label: t('home.SecondHomePageSearch.form.maritalStatus.male.all') },
    { value: '&maritalStatus=SINGLE', label: t('home.SecondHomePageSearch.form.maritalStatus.male.single') },
    { value: '&maritalStatus=DIVORCED', label: t('home.SecondHomePageSearch.form.maritalStatus.male.divorced') },
    { value: '&maritalStatus=MARRIED_SECOND', label: t('home.SecondHomePageSearch.form.maritalStatus.male.married_second') },
  ];

  const femaleMaritalStatuses = [
    { value: '', label: t('home.SecondHomePageSearch.form.maritalStatus.female.all') },
    { value: '&maritalStatus=SINGLE', label: t('home.SecondHomePageSearch.form.maritalStatus.female.single') },
    { value: '&maritalStatus=DIVORCED', label: t('home.SecondHomePageSearch.form.maritalStatus.female.divorced') },
  ];

  const getMaritalStatusOptions = () => (gender === 'gender=MALE' ? maleMaritalStatuses : femaleMaritalStatuses);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsSubmittedAge(true);
    
    // Проверяем, выбран ли пол
    if (!gender) {
      return;
    }

    if (!minAge || !maxAge || minAge > maxAge || minAge < 18 || maxAge > 90) {
      return;
    }
       
    // Вызываем функцию поиска, переданную из родителя
    onSearch(gender, minAge, maxAge, location, maritalStatus);
    setIsSearchActive(true);
  };

  return (
    <form data-aos="flip-up" data-aos-offset="50" onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Selection */}
        <div data-aos-delay="500" data-aos="fade-right" data-aos-offset="50">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t('home.SecondHomePageSearch.form.gender.label')} <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleGenderChange('gender=MALE')}
              className={`flex-1 py-2 px-4 rounded-full border ${
                gender === 'gender=MALE'
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-rose-500'
              } transition-colors duration-300`}
            >
              {t('home.SecondHomePageSearch.form.gender.male')}
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('gender=FEMALE')}
              className={`flex-1 py-2 px-4 rounded-full border ${
                gender === 'gender=FEMALE'
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-rose-500'
              } transition-colors duration-300`}
            >
              {t('home.SecondHomePageSearch.form.gender.female')}
            </button>
          </div>
          {isSubmitted && !gender && <p className="text-sm text-rose-500 text-center mt-2">{t('auth.FormOne.Validation.gender.required')}</p>}
        </div>

        {/* Age Range */}
        <div data-aos-delay="500" data-aos="fade-left" data-aos-offset="50">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t('home.SecondHomePageSearch.form.age.label')}
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min="18"
              max="90"
              value={minAge}
              maxLength={2}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => handleMinAgeChange(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <span>-</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min="18"
              max="90"
              maxLength={2}
              value={maxAge}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => handleMaxAgeChange(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {isSubmittedAge && (!minAge || !maxAge || minAge > maxAge || minAge < 18 || maxAge > 99) && (
            <p className="text-sm text-rose-500 text-center mt-2">{t('auth.FormOne.Validation.age.default')}</p>
          )}
        </div>
      </div>

      <div  className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Location */}
        <div data-aos-delay="500" data-aos="fade-right" data-aos-offset="50">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t('home.SecondHomePageSearch.form.city.label')}
          </label>
          <select
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Marital Status */}
        <div data-aos-delay="500" data-aos="fade-left" data-aos-offset="50">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t('home.SecondHomePageSearch.form.maritalStatus.label')}
          </label>
          <select
            value={maritalStatus}
            onChange={(e) => handleMaritalStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {getMaritalStatusOptions().map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 text-center" data-aos-delay="500" data-aos="flip-down" data-aos-offset="50">
        <button
          type="submit"
          className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <SearchIcon />
          <span>{t('home.SecondHomePageSearch.form.search')}</span>
        </button>
      </div>
    </form>
  );
});

export default SecondHomeSearchForm;
