import React from 'react';
import { useTranslation } from 'react-i18next';

const SuccessModal = ({ isOpen, onClose, isError }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const modalStyle = isError
    ? 'bg-red-100 text-red-500'
    : 'bg-green-100 text-green-500';

  const iconPath = isError
    ? 'M6 18L18 6M6 6l12 12' // Иконка "крестик"
    : 'M5 13l4 4L19 7'; // Иконка "галочка"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <div className="text-center">
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${modalStyle} mb-4`}>
            <svg 
              className={`h-8 w-8 ${isError ? 'text-red-500' : 'text-green-500'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={iconPath}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {isError ? t('auth.ErrorModal.title') : t('auth.SuccessModal.title')}
          </h3>
          <p className="text-gray-600 mb-6">
            {isError ? t('auth.ErrorModal.message') : t('auth.SuccessModal.message')}
          </p>
          <button
            onClick={onClose}
            className={`w-full ${
              isError ? 'bg-red-500 hover:bg-red-600' : 'bg-rose-500 hover:bg-rose-600'
            } text-white px-6 py-3 rounded-xl transition-colors duration-300`}
          >
            {t('auth.SuccessModal.buttonText')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
