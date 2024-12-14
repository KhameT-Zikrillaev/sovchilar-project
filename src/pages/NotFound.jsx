import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-cover bg-center p-2" 
         style={{
           backgroundImage: `url('https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=3432')`,
           backgroundPosition: '100% 25%',
           backgroundRepeat: 'no-repeat',
           backgroundSize: 'cover',  // Обновлено на cover
           opacity: 0.9,
         }}>
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-auto">
        <h1 className="text-4xl font-semibold text-pink-500 mb-4">{t('notFound.title')}</h1>
        <p className="text-lg text-gray-700 mb-6">{t('notFound.message')}</p>
        <a href="/" className="text-xl text-blue-600 hover:text-blue-800 font-semibold">{t('notFound.link')}</a>
      </div>
    </div>
  );
}
