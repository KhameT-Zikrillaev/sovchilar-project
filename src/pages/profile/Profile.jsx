import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import FormModal from '../../components/customModal/FormModal';
import CombinedForm from '../auth/modules/AddUsers/CombinedForm';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {clearUser} = useStore();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusDone = async (id) => {
    const newStatus = "DONE";
    try {
      await axios.put(`https://back.sovchilar.net/api/users-uz/${id}`, { status: newStatus });
    } catch (error) {
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="max-w-4xl mx-auto pt-32">
        <div className="flex flex-col items-center p-6">
          {/* Buttons */}
          <div className="flex  w-full gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium"
            >
              Anketa to'ldirish
            </button>
            <button 
              className="w-full border border-rose-500 text-rose-500 px-6 py-3 rounded-lg hover:bg-rose-50 transition font-medium"
              onClick={() => setIsModalOpen(true)}
              
            >
              
              Baxtimni toptim
            </button>
            <button 
              onClick={() => {
                clearUser()
                navigate("/")}}
              className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium"
            >
              Profildan chiqish
            </button>
            
          </div>
        </div>
      </div>
      <UserProfile/>

      {/* Form Modal */}
      <FormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={"Anketa to'ldirish"}
      >
        <div className="pb-4">
          <div className="max-w-3xl mx-auto">
            <CombinedForm handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default Profile;
