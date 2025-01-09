import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdClose } from "react-icons/io";

const FormModal = ({ isOpen, onClose, children, title }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div 
                    className="fixed inset-0 bg-gradient-to-br from-rose-500/20 to-gray-900/60 backdrop-blur-sm transition-opacity" 
                    onClick={onClose}
                />

                {/* Modal panel */}
                <div className="inline-block w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:align-middle">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-rose-500 to-rose-600 px-8 py-6 flex items-center justify-between">
                        <h3 className="text-2xl font-semibold text-white">
                            {title || t('form.fillProfile')}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 focus:outline-none transition-colors duration-200"
                        >
                            <IoMdClose size={28} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="bg-white px-8 py-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormModal;
