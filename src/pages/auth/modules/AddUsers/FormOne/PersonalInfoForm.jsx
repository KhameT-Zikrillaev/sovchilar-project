import React from 'react';
import { useTranslation } from 'react-i18next'
const PersonalInfoForm = ({ formData, onInputChange, onSubmit }) => {
  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
  const selectClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2"
  const { t } = useTranslation();
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // плавная прокрутка
    });
  
  }
  return (
    <div className="min-h-screen bg-white py-4 px-1 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-1 sm:p-8 md:p-12">
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }} className="space-y-8">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.FormOne.firstNameLabel')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.FormOne.lastNameLabel')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.FormOne.phoneLabel')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={onInputChange}
                placeholder="+998 __ ___ __ __"
                pattern="^\+998[0-9]{9}$"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">{t('auth.FormOne.formatPhone')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                {t('auth.FormOne.ageLabel')}
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={onInputChange}
                  required
                  min="18"
                  max="100"
                  className={inputClasses}
                  placeholder="Ваш возраст"
                />
              </div>

              <div>
                <label className={labelClasses}>
                  {t('auth.FormOne.genderLabel')}
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={onInputChange}
                    required
                    className={selectClasses}
                  >
                    <option value="">{t('auth.FormOne.genderRequired')}</option>
                    <option value="male">{t('auth.FormOne.genderMale')}</option>
                    <option value="female">{t('auth.FormOne.genderFemale')}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                    <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>
                {t('auth.FormOne.addressRequired')}
              </label>
              <div className="relative">
                <select
                  name="address"
                  value={formData.address}
                  onChange={onInputChange}
                  required
                  className={selectClasses}
                >
                  <option value="">{t('auth.FormOne.selectCity.select')}</option>
                  <option value="Toshkent">{t('auth.FormOne.selectCity.Tashkent')}</option>
                  <option value="Andijan">{t('auth.FormOne.selectCity.Andijan')}</option>
                  <option value="Bukhara">{t('auth.FormOne.selectCity.Bukhara')}</option>
                  <option value="Fergana">{t('auth.FormOne.selectCity.Fergana')}</option>
                  <option value="Jizzakh">{t('auth.FormOne.selectCity.Jizzakh')}</option>
                  <option value="Xorazm">{t('auth.FormOne.selectCity.Xorazm')}</option>
                  <option value="Namangan">{t('auth.FormOne.selectCity.Namangan')}</option>
                  <option value="Navoiy">{t('auth.FormOne.selectCity.Navoiy')}</option>
                  <option value="Qashqadaryo">{t('auth.FormOne.selectCity.Qashqadaryo')}</option>
                  <option value="Samarkand">{t('auth.FormOne.selectCity.Samarkand')}</option>
                  <option value="Sirdaryo">{t('auth.FormOne.selectCity.Sirdaryo')}</option>
                  <option value="Surxondaryo">{t('auth.FormOne.selectCity.Surxondaryo')}</option>
                  <option value="Karakalpakstan">{t('auth.FormOne.selectCity.Karakalpakstan')}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
              onClick={scrollToTop}
                type="submit"
                className="w-full bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                <span>{t('auth.FormOne.submit')}</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
