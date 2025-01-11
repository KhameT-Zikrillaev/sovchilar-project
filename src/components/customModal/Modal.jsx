import React from 'react';
import { useTranslation } from 'react-i18next';
const Modal = ({ isOpen, onClose }) => {
    const { t } = useTranslation(); 
    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 bg-opacity-70  flex justify-center items-center">
            <div className="bg-white mx-2  p-4  sm:p-10 rounded-xl shadow-2xl relative sm:w-4/5 max-h-[73vh]  sm:max-h-[80vh] md:max-h-[85vh] overflow-y-auto border-4 border-red-600">
                <button
                    className="fixed top-4 right-4 sm:right-8 text-4xl font-bold text-white hover:text-red-600 transition-transform transform hover:scale-110 focus:outline-none"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-4xl font-extrabold mb-6 text-red-700 border-b-2 border-gray-300 pb-2">
                    {t('rules.title')}
                </h2>
                <div className="text-lg text-gray-800 space-y-8 leading-loose">
                    <p>{t('rules.siteUsageRules')}</p>
                    <p>
                        <strong>{t('rules.terms')}</strong><br />
                        <strong>{t('rules.administration')}</strong> – {t('rules.siteStaff')}<br />
                        <strong>{t('rules.services')}</strong> – {t('rules.softwareCollection')}<br />
                        <strong>{t('rules.user')}</strong> – {t('rules.personOver18')}<br />
                        <strong>{t('rules.login')}</strong> – {t('rules.chosenLogin')}<br />
                        <strong>{t('rules.password')}</strong> – {t('rules.chosenPassword')}
                    </p>
                    <p>
                        <strong>{t('rules.generalRules')}</strong><br />
                        {t('rules.rulesExplanation')}
                    </p>
                    <p>
                        <strong>{t('rules.confidentialInfo')}</strong><br />
                        {t('rules.confidentialDefinition')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
