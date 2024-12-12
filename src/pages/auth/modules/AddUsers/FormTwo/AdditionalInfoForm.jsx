import React from 'react';
import ImageUploadForm from './ImageUploadForm';

const AdditionalInfoForm = ({ formData, onInputChange, onImageChange, onPrevStep, onSubmit }) => {
 
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Образование
          </label>
          <div className="relative">
            <select
              name="qualification"
              value={formData.qualification}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
            >
              <option value="">Выберите образование</option>
              <option value="Среднее">Среднее</option>
              <option value="Среднее специальное">Среднее специальное</option>
              <option value="Неоконченное высшее">Неоконченное высшее</option>
              <option value="Высшее">Высшее</option>
              <option value="Магистратура">Магистратура</option>
              <option value="Докторантура">Докторантура</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
              <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Семейное положение
          </label>
          <div className="relative">
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={onInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
            >
              {formData.gender === 'male' ? (
                <>
                  <option value="single">Не женат</option>
                  <option value="divorced">В разводе</option>
                  <option value="widowed">Вдовец</option>
                  <option value="married_second">Ищет вторую жену</option>
                </>
              ) : (
                <>
                  <option value="single">Не замужем</option>
                  <option value="divorced">В разводе</option>
                  <option value="widowed">Вдова</option>
                </>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
              <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Профессия */}
        <div className="mb-4">
          <label htmlFor="JobTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Профессия
          </label>
          <input
            type="text"
            id="JobTitle"
            name="JobTitle"
            value={formData.JobTitle}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            required
          />
        </div>

        {/* Национальность */}
        <div className="mb-4">
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
            Национальность
          </label>
          <select
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            required
          >
            <option value="">Выберите национальность</option>
            <option value="uzbek">Узбек</option>
            <option value="russian">Русский</option>
            <option value="kazakh">Казах</option>
            <option value="kyrgyz">Киргиз</option>
            <option value="tajik">Таджик</option>
            <option value="turkmen">Туркмен</option>
            <option value="tatar">Татар</option>
            <option value="other">Другое</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
          Образование
        </label>
        <select
          id="qualification"
          name="qualification"
          value={formData.qualification}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
          required
        >
          <option value="">Выберите образование</option>
          <option value="Среднее">Среднее</option>
          <option value="Среднее специальное">Среднее специальное</option>
          <option value="Неоконченное высшее">Неоконченное высшее</option>
          <option value="Высшее">Высшее</option>
          <option value="Магистратура">Магистратура</option>
          <option value="Докторантура">Докторантура</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          О себе
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          required
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
          placeholder="Расскажите немного о себе..."
        />
      </div>

      <ImageUploadForm onImageChange={onImageChange} preview={formData.image} />

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onPrevStep}
          className="flex-1 border-2 border-rose-500 text-rose-500 px-6 py-2 rounded-xl hover:bg-rose-50 transition-colors duration-300 flex items-center justify-center gap-2 group"
        >
          <svg 
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          <span>Назад</span>
        </button>
        <button
          type="submit"
          className="flex-1 bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-2 group"
        >
          <span>Создать анкету</span>
          <svg 
            className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default AdditionalInfoForm;
