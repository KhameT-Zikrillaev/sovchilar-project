import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PersonalInfoForm from './modules/AddUsers/FormOne/PersonalInfoForm'
import AdditionalInfoForm from './modules/AddUsers/FormTwo/AdditionalInfoForm'
import SuccessModal from './modules/SuccessModal'
import SiteLoading from '../../components/SiteLoading/SiteLoading'
import { useTranslation } from 'react-i18next'
const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-8">
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        currentStep === 1 ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-500'
      }`}>
        1
      </div>
      <div className={`w-16 h-1 ${
        currentStep === 2 ? 'bg-rose-500' : 'bg-rose-100'
      }`} />
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        currentStep === 2 ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-500'
      }`}>
        2
      </div>
    </div>
  </div>
)

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation();
  // Получаем параметр gender из URL
  const searchParams = new URLSearchParams(location.search)
  const genderFromUrl = searchParams.get('gender')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    gender: genderFromUrl || '', 
    address: '',
    qualification: '',
    JobTitle: '',
    nationality: '', 
    maritalStatus: '',
    description: '',
    imageUrL: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        imageUrL: URL.createObjectURL(e.target.files[0])
      }))
    }
  }

  const handleNextStep = () => {
    setStep(2)
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    navigate('/')
  }

  return (
    <>
      {loading ? (
        <SiteLoading />
      ) : (
        <div className="min-h-screen bg-white  px-4 sm:px-6 lg:px-8 mt-[64px]">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{t('auth.FormOne.formTitle')}</h2>
                <p className="text-lg text-gray-600">
                {step === 1 ? t('auth.FormOne.formDescription') : t('auth.FormTwo.formTitle')}
                </p>
              </div>

              <StepIndicator currentStep={step} />

              {step === 1 ? (
                <PersonalInfoForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleNextStep}
                />
              ) : (
                <AdditionalInfoForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onImageChange={handleImageChange}
                  onPrevStep={handlePrevStep}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
          <SuccessModal isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
      )}
    </>
  )
}
