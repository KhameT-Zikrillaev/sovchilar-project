import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { scheme } from './scheme'; // Схема валидации с использованием Zod

const PersonalInfoForm = ({ formData, onInputChange, onSubmit }) => {
  const { t } = useTranslation();

  // Используем useForm с интеграцией Zod
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: async (data) => {
      try {
        const parsedData = await scheme.parseAsync(data);
        return { values: parsedData, errors: {} };
      } catch (err) {
        return { values: {}, errors: err.errors.reduce((acc, curr) => ({ ...acc, [curr.path[0]]: { message: curr.message } }), {}) };
      }
    },
    defaultValues: formData,
  });

  const handleTelegramChange = (e) => {
    onInputChange(e);
  };

  const handleNameInput = (e) => {
    // Заменяем все цифры и специальные символы на пустую строку
    const value = e.target.value.replace(/[^A-Za-zА-Яа-яЁёҲҳҚқҒғЎўЪъ\s-]/g, '');
    e.target.value = value;
    onInputChange(e);
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300";
  const selectClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 appearance-none bg-white";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-white py-2 px-1 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-1 sm:p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.FormOne.firstNameLabel')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                {...register('firstName')}
                onChange={handleNameInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.FormOne.lastNameLabel')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                {...register('lastName')}
                onChange={handleNameInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.FormOne.phoneLabel')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  {...register('phone')}
                  placeholder="+998 __ ___ __ __"
                  onChange={onInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                <p className="mt-1 text-sm text-gray-500">{t('auth.FormOne.formatPhone')}</p>
              </div>

              <div>
                <label htmlFor="telegram" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.FormOne.telegramLabel')}
                </label>
                <input
                  type="text"
                  id="telegram"
                  name="telegram"
                  {...register('telegram')}
                  onChange={handleTelegramChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                {errors.telegram && <p className="text-red-500 text-sm">{errors.telegram.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>{t('auth.FormOne.ageLabel')}</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  {...register('age')}
                  onChange={onInputChange} // Оставляем onInputChange
                  className={inputClasses}
                  placeholder={t('auth.FormOne.agePlaceholder')}
                />
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
              </div>

              <div>
                <label className={labelClasses}>{t('auth.FormOne.genderLabel')}</label>
                <select
                  name="gender"
                  {...register('gender')}
                  onChange={onInputChange} // Оставляем onInputChange
                  className={selectClasses}
                >
                  <option value="">{t('auth.FormOne.genderRequired')}</option>
                  <option value="male">{t('auth.FormOne.genderMale')}</option>
                  <option value="female">{t('auth.FormOne.genderFemale')}</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClasses}>{t('auth.FormOne.addressRequired')}</label>
              <select
                name="address"
                {...register('address')}
                onChange={onInputChange} // Оставляем onInputChange
                className={selectClasses}
              >
                <option value="">{t('auth.FormOne.selectCity.select')}</option>
                <option value="Toshkent">{t('auth.FormOne.selectCity.Toshkent')}</option>
                <option value="Andijon">{t('auth.FormOne.selectCity.Andijon')}</option>
                <option value="Buxoro">{t('auth.FormOne.selectCity.Buxoro')}</option>
                <option value="Fargona">{t('auth.FormOne.selectCity.Fargona')}</option>
                <option value="Jizzax">{t('auth.FormOne.selectCity.Jizzax')}</option>
                <option value="Xorazm">{t('auth.FormOne.selectCity.Xorazm')}</option>
                <option value="Namangan">{t('auth.FormOne.selectCity.Namangan')}</option>
                <option value="Navoiy">{t('auth.FormOne.selectCity.Navoiy')}</option>
                <option value="Qashqadaryo">{t('auth.FormOne.selectCity.Qashqadaryo')}</option>
                <option value="Samarqand">{t('auth.FormOne.selectCity.Samarqand')}</option>
                <option value="Sirdaryo">{t('auth.FormOne.selectCity.Sirdaryo')}</option>
                <option value="Surxondaryo">{t('auth.FormOne.selectCity.Surxondaryo')}</option>
                <option value="Qoraqalpogiston">{t('auth.FormOne.selectCity.Qoraqalpogiston')}</option>
              </select>
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
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
