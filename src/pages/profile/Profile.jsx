import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import FormModal from '../../components/customModal/FormModal';
import CombinedForm from '../auth/modules/AddUsers/CombinedForm';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (data) => {
    // Create FormData instance for file upload
    const formDataToSend = new FormData();
    
    // Append all form fields
    Object.keys(data).forEach(key => {
      if (key === 'avatar' && data[key] instanceof File) {
        formDataToSend.append('avatar', data[key]);
      } else {
        formDataToSend.append(key, data[key]);
      }
    });

    try {
      // Handle form submission with file upload
      console.log('Form submitted:', formDataToSend);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto pt-32">
        <div className="flex flex-col items-center p-6">
          {/* Buttons */}
          <div className="flex flex-col w-full gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition"
            >
              Anketa to'ldirish
            </button>
            <button 
              className="w-full border border-rose-500 text-rose-500 px-6 py-3 rounded-lg hover:bg-rose-50 transition"
            >
              Anketa tahrirlash
            </button>
          </div>
        </div>
      </div>
      <UserProfile/>

      {/* Form Modal */}
      <FormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={t('form.fillProfile')}
      >
        <div className="py-4">
          <div className="max-w-3xl mx-auto">
            <CombinedForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default Profile;
