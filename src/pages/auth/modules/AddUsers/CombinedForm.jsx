import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { IoMdCloudUpload } from "react-icons/io";
import { FiCamera } from "react-icons/fi";
import { FiBook } from "react-icons/fi";
import { useStore } from '../../../../store/store';
import api from '../../../../services/api';
import { toast } from 'react-toastify';
import axios from 'axios';
const CombinedForm = ({handleCloseModal}) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset} = useForm();
  const [previewImage, setPreviewImage] = useState( null);
  // const [showRules, setShowRules] = useState(false);
  const {user, accessToken, setUserSingle} = useStore()
  const [acceptRules, setAcceptRules] = useState(user?.status !== "PENDING" ? true : false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleStatusInactive = async (id) => {
    const newStatus = "INACTIVE";
    try {
      const response = await axios.put(`https://back.sovchilar.net/api/users-uz/${id}`, { status: newStatus }, {headers: {
        'Authorization': `Bearer ${accessToken}`
      }});
      setUserSingle(response?.data?.data);
    } catch (error) {

    }
  };
  console.log(user);
  
  
  
  const handleNameInput = (e) => {
    const value = e.target.value.replace(/[^A-Za-zА-Яа-яЁёҲҳҚқҒғЎўЪъ\s-]/g, '');
    e.target.value = value;
  };

  useEffect(()=>{
    const telegramValue = user.telegram ? user.telegram.replace('t.me/', '') : "";
  //   const telegramValue = user.telegram 
  // ? (user.telegram.startsWith("@") 
  //     ? user.telegram.slice(1) // Убираем @, если он есть
  //     : user.telegram
  //   ).replace(/^t\.me\//, "") // Убираем t.me/, если он есть
  // : "";
    reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      telegram: telegramValue,
      age: user.age || "",
      gender: user.gender || "",
      address: user.address || "",
      qualification: user.qualification || "",
      maritalStatus: user.maritalStatus || "",
      jobTitle: user.jobTitle || "",
      description: user.description || "",
      imageUrl: user.imageUrl || "",
      nationality: user.nationality || "",
    });
    if (user.imageUrl) {
      setPreviewImage(user.imageUrl); // agar imageUrl mavjud bo'lsa, previewImage'ni o'rnatish
    }
  }, [user])


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Fayl yuborish uchun content type
      },
    });
    if(response.status > 199 && response.status < 300){
      setValue("imageUrl", response?.data?.data?.path)
    }else{
      setValue("imageUrl", "")
    }


    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = async (data) => {
    try {
      // Проверяем и модифицируем telegram поле
      if (data.telegram && !data.telegram.startsWith('t.me/')) {
        data.telegram = `t.me/${data.telegram}`;
      }
      
      const response = await axios.put(`https://back.sovchilar.net/api/users-uz/${user?.id}`, data, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if(response.status === 200 || response.status === 201){
        setUserSingle(response.data.data)
        toast.success(t('auth.CombinedForm.toastMessages.profileCreatedSuccess'))
        handleCloseModal()
        if(user?.status === "PENDING"){
          handleStatusInactive(user?.id)
        }
      }else{
        toast.error(t('auth.CombinedForm.toastMessages.profileCreationError'))
      }
    } catch (error) {
      toast.error(t('auth.CombinedForm.toastMessages.profileCreationError'))
    }
  };


  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm";
  const selectClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 appearance-none bg-white text-sm";
  const labelClasses = "block text-xs font-medium text-gray-700 mb-1";

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
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
              {...register('firstName', { required: t('auth.CombinedForm.firstNameRequired') })}
              onChange={handleNameInput}
              className={inputClasses}
              placeholder={t('auth.CombinedForm.firstNamePlaceholder')}
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
              {...register('lastName', { required: t('auth.CombinedForm.lastNameRequired') })}
              onChange={handleNameInput}
              className={inputClasses}
              placeholder={t('auth.CombinedForm.lastNamePlaceholder')}
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
              {...register('telegram', { required: t('auth.CombinedForm.telegramUsernameRequired') })}
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
                required: t('auth.CombinedForm.ageRequired'),
                valueAsNumber: true,
                min: { value: 18, message: t('auth.CombinedForm.ageMin')},
                max: { value: 100, message: t('auth.CombinedForm.ageMax') }
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
              {...register('gender', { required: t('auth.CombinedForm.genderRequired') })}
              className={selectClasses}
            >
              <option value="">{t('auth.CombinedForm.genderSelect')}</option>
              <option value="MALE">{t('auth.CombinedForm.genderMale')}</option>
              <option value="FEMALE">{t('auth.CombinedForm.genderFemale')}</option>
            </select>
            {errors.gender && <p className="mt-1 text-sm text-rose-500">{errors.gender.message}</p>}
          </div>

          <div>
            <label htmlFor="city" className={labelClasses}>
             {t('auth.FormOne.addressRequired')}
            </label>
            <select
              id="city"
              {...register('address', { required: t('auth.CombinedForm.cityRequired')})}
              className={selectClasses}
            >
              <option value="">{t('auth.FormOne.selectCity.select')}</option>
                <option value="TOSHKENT">{t('auth.FormOne.selectCity.Toshkent')}</option>
                <option value="ANDIJON">{t('auth.FormOne.selectCity.Andijon')}</option>
                <option value="BUXORO">{t('auth.FormOne.selectCity.Buxoro')}</option>
                <option value="FARGONA">{t('auth.FormOne.selectCity.Fargona')}</option>
                <option value="JIZZAX">{t('auth.FormOne.selectCity.Jizzax')}</option>
                <option value="XORAZM">{t('auth.FormOne.selectCity.Xorazm')}</option>
                <option value="NAMANGAN">{t('auth.FormOne.selectCity.Namangan')}</option>
                <option value="NAVOIY">{t('auth.FormOne.selectCity.Navoiy')}</option>
                <option value="QASHQADARYO">{t('auth.FormOne.selectCity.Qashqadaryo')}</option>
                <option value="SAMARQAND">{t('auth.FormOne.selectCity.Samarqand')}</option>
                <option value="SIRDARYO">{t('auth.FormOne.selectCity.Sirdaryo')}</option>
                <option value="SURXONDARYO">{t('auth.FormOne.selectCity.Surxondaryo')}</option>
                <option value="QORAQALPOGISTON">{t('auth.FormOne.selectCity.Qoraqalpogiston')}</option>
            </select>
            {errors.address && <p className="mt-1 text-sm text-rose-500">{errors.address.message}</p>}
          </div>

          <div>
            <label htmlFor="qualification" className={labelClasses}>
            {t('auth.FormTwo.education')}
            </label>
            <select
              id="qualification"
              {...register('qualification', { required: t('auth.CombinedForm.educationRequired') })}
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
              {...register('maritalStatus', { required: t('auth.CombinedForm.maritalStatusRequired')})}
              className={selectClasses}
            >
              <option value="">{t('auth.FormTwo.maritalStatus.default')}</option>
                {watch('gender') === 'MALE' ? (
                  <>
                    <option value="SINGLE">{t('auth.FormTwo.maritalStatus.male.single')}</option>
                    <option value="DIVORCED">{t('auth.FormTwo.maritalStatus.male.divorced')}</option> 
                    <option value="MARRIED_SECOND">{t('auth.FormTwo.maritalStatus.male.married_second')}</option>
                  </>
                ) : watch('gender') === 'FEMALE' ? (
                  <>
                    <option value="SINGLE">{t('auth.FormTwo.maritalStatus.female.single')}</option>
                    <option value="DIVORCED">{t('auth.FormTwo.maritalStatus.female.divorced')}</option>
                  </>
                ) : null}
            </select>
            {errors.maritalStatus && <p className="mt-1 text-sm text-rose-500">{errors.maritalStatus.message}</p>}
          </div>

          <div>
            <label htmlFor="jobTitle" className={labelClasses}>
            {t('auth.FormTwo.jobTitle')}
            </label>
            <input
              type="text"
              id="jobTitle"
              {...register('jobTitle', { required: t('auth.CombinedForm.occupationRequired')  })}
              className={inputClasses}
              placeholder={t('auth.CombinedForm.occupationPlaceholder')}
            />
            {errors.job && <p className="mt-1 text-sm text-rose-500">{errors.job.message}</p>}
          </div>

          <div>
            <label htmlFor="nationality" className={labelClasses}>
            {t('auth.FormTwo.nationality')}
            </label>
            <select
              id="nationality"
              {...register('nationality', { required: t('auth.CombinedForm.ethnicityRequired')})}
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
              <option value="Karakalpak">{t('auth.FormTwo.selectNationality.Karakalpak')}</option>
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
              required:t('auth.CombinedForm.requirementsRequired') ,
              minLength: { value: 10, message: t('auth.CombinedForm.requirementsMinLength') }
            })}
            rows="4"
            className={inputClasses}
            placeholder={t('auth.CombinedForm.requirementsPlaceholder')}
          />
          {errors.description && <p className="mt-1 text-sm text-rose-500">{errors.description.message}</p>}
        </div>

        {/* Rules Checkbox and Button */}
        {
          user?.status === 'PENDING' && (<div className="space-y-4">
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
              onClick={() => {
                setIsModalOpen(true);
                setTimeout(() => {
                  document.querySelector('form').scrollIntoView({ block: 'start', behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center space-x-2 text-rose-500 hover:text-rose-600 transition-colors duration-300"
            >
              <FiBook size={20} />
              <span>{t('auth.FormTwo.terms.button.text')}</span>
            </button>
          </div>)
        }
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
    </form>

    {isModalOpen && (
      <div className="fixed inset-0 z-[60] bg-black bg-opacity-75 flex items-center justify-center">
        <div className="bg-white w-full h-full overflow-y-auto p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t('rules.title')}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose max-w-none">
              <p>{t('rules.siteUsageRules')}</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">{t('rules.terms')}</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>{t('rules.administration')}</strong> – {t('rules.siteStaff')}</li>
                  <li><strong>{t('rules.services')}</strong> – {t('rules.softwareCollection')}</li>
                  <li><strong>{t('rules.user')}</strong> – {t('rules.personOver18')}</li>
                  <li><strong>{t('rules.login')}</strong> – {t('rules.chosenLogin')}</li>
                  <li><strong>{t('rules.password')}</strong> – {t('rules.chosenPassword')}</li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">{t('rules.generalRules')}</h3>
                <p>{t('rules.rulesExplanation')}</p>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">{t('rules.confidentialInfo')}</h3>
                <p>{t('rules.confidentialDefinition')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default CombinedForm;
