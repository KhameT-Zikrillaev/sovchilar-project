import React, { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import Modal from '../../../../../components/customModal/Modal';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import {scheme} from './scheme';
const AdditionalInfoForm = ({ formData, onInputChange, onImageChange, onPrevStep, onSubmit }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);



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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Образование и маритальный статус */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.FormTwo.education')}
            </label>
            <div className="relative">
              <select
                name="qualification"
                {...register('qualification')}
                value={formData.qualification}
                onChange={onInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
              >
                <option value="">{t('auth.FormTwo.selectEducation')}</option>
                <option value="middle">{t('auth.FormTwo.qualification.middle')}</option>
                <option value="specialized">{t('auth.FormTwo.qualification.specialized')}</option>
                <option value="higher">{t('auth.FormTwo.qualification.higher')}</option>
                <option value="master">{t('auth.FormTwo.qualification.master')}</option>
                <option value="doctorate">{t('auth.FormTwo.qualification.doctorate')}</option>
              </select>
              {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('auth.FormTwo.maritalStatus.label')}
            </label>
            <div className="relative">
              <select
                name="maritalStatus"
                {...register('maritalStatus')}
                value={formData.maritalStatus}
                onChange={onInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
              >
                <option value="">{t('auth.FormTwo.maritalStatus.default')}</option>
                {formData.gender === 'male' ? (
                  <>
                    <option value="single">{t('auth.FormTwo.maritalStatus.male.single')}</option>
                    <option value="divorced">{t('auth.FormTwo.maritalStatus.male.divorced')}</option>
                    
                    <option value="married_second">{t('auth.FormTwo.maritalStatus.male.married_second')}</option>
                  </>
                ) : (
                  <>
                    <option value="single">{t('auth.FormTwo.maritalStatus.female.single')}</option>
                    <option value="divorced">{t('auth.FormTwo.maritalStatus.female.divorced')}</option>
                    <option value="widowed">{t('auth.FormTwo.maritalStatus.female.widowed')}</option>
                  </>
                )}
              </select>
              {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus.message}</p>}
            </div>
          </div>
        </div>

        {/* Профессия и Национальность */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.FormTwo.jobTitle')}
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              {...register('jobTitle')}
              value={formData.jobTitle}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.FormTwo.nationality')}
            </label>
            <select
              id="nationality"
              name="nationality"
              {...register('nationality')}
              value={formData.nationality}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              <option value="">{t('auth.FormTwo.selectNationality.select')}</option>
              <option value="uzbek">{t('auth.FormTwo.selectNationality.Uzbek')}</option>
              <option value="russian">{t('auth.FormTwo.selectNationality.Russian')}</option>
              <option value="kazakh">{t('auth.FormTwo.selectNationality.Kazakh')}</option>
              <option value="kyrgyz">{t('auth.FormTwo.selectNationality.Kyrgyz')}</option>
              <option value="tajik">{t('auth.FormTwo.selectNationality.Tajik')}</option>
              <option value="turkmen">{t('auth.FormTwo.selectNationality.Turkmen')}</option>
              <option value="tatar">{t('auth.FormTwo.selectNationality.Tatar')}</option>
              <option value="other">{t('auth.FormTwo.selectNationality.Other')}</option>
            </select>
            {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality.message}</p>}
          </div>
        </div>

        {/* Описание */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.FormTwo.aboutYourself')}
          </label>
          <textarea
            id="description"
            name="description"
            {...register('description')}
            value={formData.description}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
            placeholder={t('auth.FormTwo.aboutYourselfPlaceholder')}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <ImageUploadForm onImageChange={onImageChange} preview={formData.image} />

        {/* Чекбокс согласия */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              {...register('terms')}
              checked={formData.terms}
              onChange={onInputChange}
              className="h-5 w-5 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              {t('auth.FormTwo.terms.label')}
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
          <button
            type='button'
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-rose-500 underline hover:text-rose-600"
          >
            {t('auth.FormTwo.terms.button.text')}
          </button>
        </div>

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
            <span>{t('auth.FormTwo.back')}</span>
          </button>
          <button
            type="submit"
            className="flex-1 bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-2 group"
          >
            <span>{t('auth.FormTwo.createProfile')}</span>
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
      <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default AdditionalInfoForm;
