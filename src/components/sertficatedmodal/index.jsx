import React from 'react';
import { useTranslation } from 'react-i18next';
import photo from '../../assets/images/sertificed.jpg';
const index = ({ isOpen, onClose }) => {
    const { t } = useTranslation(); 
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 bg-opacity-70 flex justify-center items-center">
            <div className="p-10 md:w-[50%]  rounded-xl shadow-2xl relative md:w-4/5 md:max-h-[85vh] overflow-y-auto border-4">
                <button
                    className="absolute top-4 right-4 text-3xl font-bold text-gray-200 hover:text-red-600 transition-transform transform hover:scale-110 focus:outline-none"
                    onClick={onClose}
                >
                    &times;
                </button>
            <img className=' md:max-w-[500px] h-full w-full mx-auto' src={photo} alt="" /> 
            </div>
        </div>
    );
};

export default index;
