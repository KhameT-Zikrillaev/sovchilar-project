import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAddImages from '../../../hooks/useImageUser';
import Loading from '../../../../../components/Loading/index';

const ImageUploadForm = ({ onImageChange, preview }) => {
  const { t } = useTranslation();
  const { addImages, isLoading } = useAddImages();
  const [localPreview, setLocalPreview] = useState(preview);

  const handleImageChange = async (event) => {
    const file = event.target?.files?.[0];
    if (file) {
      console.log(file);

      const previewUrl = URL.createObjectURL(file);
      setLocalPreview(previewUrl);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await addImages(formData);
        console.log(response?.data?.path);

        if (response?.data?.path) {
          onImageChange(response.data.path);
        }
      } catch (error) {
        console.error('Ошибка при отправке изображения:', error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      {isLoading && <Loading />}
      <label className="block text-sm font-medium text-gray-700">
        {t('auth.FormTwo.profilePicture')}
      </label>
      <div className="flex flex-col items-center">
        {localPreview ? (
          <div className="relative w-32 h-32 mb-4">
            <img
              src={localPreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full border-4 border-rose-200"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <label className="cursor-pointer text-white text-sm">
                <span>Изменить</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:border-rose-500 transition-all duration-300 group">
              <div className="space-y-2 text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 group-hover:text-rose-500 transition-colors duration-300"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none">
                    <span>{t('auth.FormTwo.uploadPhoto')}</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isLoading}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 text-center">
        {t('auth.FormTwo.photoNotice')}
      </p>
    </div>
  );
};

export default ImageUploadForm;
