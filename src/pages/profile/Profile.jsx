import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import FormModal from '../../components/customModal/FormModal';
import CombinedForm from '../auth/modules/AddUsers/CombinedForm';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {clearUser, user, accessToken} = useStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 

  const handleStatusDone = async (id) => {
    const newStatus = "DONE";
    try {
      await axios.put(`https://back.sovchilar.net/api/users-uz/${id}`, { status: newStatus }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      closeModal();
      toast.success(t('Profile.UserProfile.deleteprofilesuccess'))
    } catch (error) {
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="max-w-4xl mx-auto pt-32">
        <div className="flex flex-col items-center p-6">
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className=" bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium flex-grow flex-basic-0 flex-shrink-[200px]"
            >
              {t('Profile.btn.add')}
            </button>
            <button 
              className={`border border-rose-500 text-rose-500 px-6 py-3 rounded-lg hover:bg-rose-50 transition font-medium flex-grow flex-basic-0 flex-shrink-[200px] disabled:border-amber-800 disabled:text-amber-800 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
              onClick={openModal}
              disabled={user?.status === "ACTIVE"}
            >
              
              {t('Profile.btn.success')}
            </button>
            <button 
              onClick={() => {
                clearUser()
                navigate("/")}}
              className=" bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium flex-grow flex-basic-0 flex-shrink-[200px]"
            >
             {t('Profile.btn.logout')}
            </button>
            
          </div>
        </div>
      </div>
      <UserProfile/>

      {/* Form Modal */}
      <FormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={t('Profile.form.fill_out_form')}
      >
        <div className="pb-4">
          <div className="max-w-3xl mx-auto">
            <CombinedForm handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      </FormModal>
      {isOpen && (
        <div onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg max-w-[400px]  border-[2px] border-rose-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t('Profile.modal.happiness_title')}
            </h2>
            <p className="text-gray-600 mb-6">
           {t('Profile.modal.happiness_message')}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="w-full border border-rose-500 text-rose-500 px-6 py-3 rounded-lg hover:bg-rose-50 transition font-medium"
              >
                {t('Profile.form.cancel')}
              </button>
              <button
                onClick={() => {
                  handleStatusDone(user.id)
                }}
                className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium"
              >
               {t('Profile.form.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}             
    </div>
  );
};

export default Profile;
