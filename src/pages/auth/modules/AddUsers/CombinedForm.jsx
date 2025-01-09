import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { IoMdCloudUpload } from "react-icons/io";
import { FiCamera } from "react-icons/fi";
import { FiBook } from "react-icons/fi";

const CombinedForm = ({ formData, onInputChange, onSubmit }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: formData,
  });
  const [previewImage, setPreviewImage] = useState(formData?.avatar || null);
  const [showRules, setShowRules] = useState(false);
  const [acceptRules, setAcceptRules] = useState(false);

  const handleNameInput = (e) => {
    const value = e.target.value.replace(/[^A-Za-zА-Яа-яЁёҲҳҚқҒғЎўЪъ\s-]/g, '');
    e.target.value = value;
    onInputChange(e);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      onInputChange({ target: { name: 'avatar', value: file } });
    }
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm";
  const selectClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 appearance-none bg-white text-sm";
  const labelClasses = "block text-xs font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            {...register('avatar', { required: "Rasm tanlanishi shart" })}
            onChange={handleImageChange}
          />
          <label
            htmlFor="avatar"
            className="cursor-pointer block"
          >
            <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-50 border-4 border-rose-100 shadow-lg transition-all duration-300 hover:border-rose-200 group">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-rose-300">
                  <IoMdCloudUpload size={48} />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <FiCamera className="text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300" size={32} />
              </div>
            </div>
            <div className="camera-icon absolute bottom-0 right-0 bg-rose-500 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-rose-600 transition-colors duration-300">
              <FiCamera size={20} />
            </div>
          </label>
        </div>
        {errors.avatar && (
          <p className="text-rose-500 text-sm">{errors.avatar.message}</p>
        )}
      </div>

      <div className="bg-gray-50 rounded-2xl space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className={labelClasses}>
            {t('auth.FormOne.firstNameLabel')}
            </label>
            <input
              type="text"
              id="firstName"
              {...register('firstName', { required: "Ism kiritish majburiy" })}
              onChange={handleNameInput}
              className={inputClasses}
              placeholder="Ismingizni kiriting"
            />
            {errors.firstName && <p className="mt-1 text-sm text-rose-500">{errors.firstName.message}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className={labelClasses}>
            {t('auth.FormOne.lastNameLabel')}
            </label>
            <input
              type="text"
              id="lastName"
              {...register('lastName', { required: "Familiya kiritish majburiy" })}
              onChange={handleNameInput}
              className={inputClasses}
              placeholder="Familiyangizni kiriting"
            />
            {errors.lastName && <p className="mt-1 text-sm text-rose-500">{errors.lastName.message}</p>}
          </div>

          <div>
            <label htmlFor="telegram" className={labelClasses}>
            {t('auth.FormOne.telegramLabel')}
            </label>
            <input
              type="text"
              id="telegram"
              {...register('telegram', { required: "Telegram username kiritish majburiy" })}
              className={inputClasses}
              placeholder="@username"
            />
            {errors.telegram && <p className="mt-1 text-sm text-rose-500">{errors.telegram.message}</p>}
          </div>

          <div>
            <label htmlFor="age" className={labelClasses}>
            {t('auth.FormOne.ageLabel')}
            </label>
            <input
              type="number"
              id="age"
              {...register('age', { 
                required: "Yoshni kiritish majburiy",
                min: { value: 18, message: "Yosh 18 dan katta bo'lishi kerak" },
                max: { value: 100, message: "Yosh 100 dan kichik bo'lishi kerak" }
              })}
              className={inputClasses}
              placeholder={t('auth.FormOne.agePlaceholder')}
            />
            {errors.age && <p className="mt-1 text-sm text-rose-500">{errors.age.message}</p>}
          </div>

          <div>
            <label htmlFor="gender" className={labelClasses}>
            {t('auth.FormOne.genderLabel')}
            </label>
            <select
              id="gender"
              {...register('gender', { required: "Jinsini tanlash majburiy" })}
              className={selectClasses}
            >
              <option value="">Tanlang</option>
              <option value="MALE">Erkak</option>
              <option value="FEMALE">Ayol</option>
            </select>
            {errors.gender && <p className="mt-1 text-sm text-rose-500">{errors.gender.message}</p>}
          </div>

          <div>
            <label htmlFor="city" className={labelClasses}>
             {t('auth.FormOne.addressRequired')}
            </label>
            <select
              id="city"
              {...register('address', { required: "Shaharni tanlash majburiy" })}
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
            {errors.address && <p className="mt-1 text-sm text-rose-500">{errors.address.message}</p>}
          </div>

          <div>
            <label htmlFor="qualification" className={labelClasses}>
            {t('auth.FormTwo.education')}
            </label>
            <select
              id="qualification"
              {...register('qualification', { required: "Ta'limni tanlash majburiy" })}
              className={selectClasses}
            >
              <option value="">{t('auth.FormTwo.selectEducation')}</option>
                <option value="middle">{t('auth.FormTwo.qualification.middle')}</option>
                <option value="specialized">{t('auth.FormTwo.qualification.specialized')}</option>
                <option value="higher">{t('auth.FormTwo.qualification.higher')}</option>
                <option value="master">{t('auth.FormTwo.qualification.master')}</option>
                <option value="doctorate">{t('auth.FormTwo.qualification.doctorate')}</option>
            </select>
            {errors.qualification && <p className="mt-1 text-sm text-rose-500">{errors.qualification.message}</p>}
          </div>

          <div>
            <label htmlFor="maritalStatus" className={labelClasses}>
            {t('auth.FormTwo.maritalStatus.label')}
            </label>
            <select
              id="maritalStatus"
              {...register('maritalStatus', { required: "Oilaviy holatni tanlash majburiy" })}
              className={selectClasses}
            >
              <option value="">{t('auth.FormTwo.maritalStatus.default')}</option>
                {watch('gender') === 'MALE' ? (
                  <>
                    <option value="single">{t('auth.FormTwo.maritalStatus.male.single')}</option>
                    <option value="divorced">{t('auth.FormTwo.maritalStatus.male.divorced')}</option> 
                    <option value="married_second">{t('auth.FormTwo.maritalStatus.male.married_second')}</option>
                  </>
                ) : watch('gender') === 'FEMALE' ? (
                  <>
                    <option value="single">{t('auth.FormTwo.maritalStatus.female.single')}</option>
                    <option value="divorced">{t('auth.FormTwo.maritalStatus.female.divorced')}</option>
                  </>
                ) : null}
            </select>
            {errors.maritalStatus && <p className="mt-1 text-sm text-rose-500">{errors.maritalStatus.message}</p>}
          </div>

          <div>
            <label htmlFor="job" className={labelClasses}>
            {t('auth.FormTwo.jobTitle')}
            </label>
            <input
              type="text"
              id="job"
              {...register('job', { required: "Kasbni kiritish majburiy" })}
              className={inputClasses}
              placeholder="Kasbingizni kiriting"
            />
            {errors.job && <p className="mt-1 text-sm text-rose-500">{errors.job.message}</p>}
          </div>

          <div>
            <label htmlFor="nationality" className={labelClasses}>
            {t('auth.FormTwo.nationality')}
            </label>
            <select
              id="nationality"
              {...register('nationality', { required: "Millatni tanlash majburiy" })}
              className={selectClasses}
            >
              <option value="">{t('auth.FormTwo.selectNationality.select')}</option>
              <option value="Uzbek">{t('auth.FormTwo.selectNationality.Uzbek')}</option>
              <option value="Russian">{t('auth.FormTwo.selectNationality.Russian')}</option>
              <option value="Kazakh">{t('auth.FormTwo.selectNationality.Kazakh')}</option>
              <option value="Kyrgyz">{t('auth.FormTwo.selectNationality.Kyrgyz')}</option>
              <option value="Tajik">{t('auth.FormTwo.selectNationality.Tajik')}</option>
              <option value="Turkmen">{t('auth.FormTwo.selectNationality.Turkmen')}</option>
              <option value="Tatar">{t('auth.FormTwo.selectNationality.Tatar')}</option>
              <option value="Karakalpak">Qoraqalpoq</option>
              <option value="Other">{t('auth.FormTwo.selectNationality.Other')}</option>
              
            </select>
            {errors.nationality && <p className="mt-1 text-sm text-rose-500">{errors.nationality.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClasses}>
          {t('auth.FormTwo.aboutYourself')}
          </label>
          <textarea
            id="description"
            {...register('description', { 
              required: "Talablarni kiritish majburiy",
              minLength: { value: 50, message: "Talablar kamida 50 ta belgidan iborat bo'lishi kerak" }
            })}
            rows="4"
            className={inputClasses}
            placeholder="O'zingiz haqingizda va qanday turmush o'rtog'i izlayotganingiz haqida yozing..."
          />
          {errors.description && <p className="mt-1 text-sm text-rose-500">{errors.description.message}</p>}
        </div>

        {/* Rules Checkbox and Button */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="acceptRules"
              checked={acceptRules}
              onChange={(e) => setAcceptRules(e.target.checked)}
              className="w-4 h-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
            />
            <label htmlFor="acceptRules" className="text-sm text-gray-700">
            {t('auth.FormTwo.terms.label')}
            </label>
          </div>
          
          <button
            type="button"
            onClick={() => setShowRules(true)}
            className="flex items-center space-x-2 text-rose-500 hover:text-rose-600 transition-colors duration-300"
          >
            <FiBook size={20} />
            <span>{t('auth.FormTwo.terms.button.text')}</span>
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!acceptRules}
          className={`px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            acceptRules 
              ? 'bg-rose-500 text-white hover:bg-rose-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('auth.FormTwo.createProfile')}
        </button>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl max-w-2xl w-full m-4 space-y-4">
            <h3 className="text-xl font-semibold">Qoidalar</h3>
            <div className="prose">
              {/* Add your rules content here */}
              <p>1. Barcha ma'lumotlar to'g'ri va aniq bo'lishi shart.</p>
              <p>2. Noto'g'ri ma'lumot berganlik uchun javobgarlik foydalanuvchining zimmasida.</p>
              <p>3. Platforma faqat jiddiy munosabatlar uchun mo'ljallangan.</p>
              {/* Add more rules as needed */}
            </div>
            <button
              onClick={() => setShowRules(false)}
              className="w-full px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors duration-300"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CombinedForm;
