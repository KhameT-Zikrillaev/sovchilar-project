import React from "react";
import video from '../../assets/images/movieInstruction.mp4';

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Функция, которая закрывает модальное окно, если клик был на фоне
  const handleModalClick = (e) => {
    // Проверяем, был ли клик на фоне, а не внутри видео или кнопки
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleModalClick} // Обработчик нажатия на фон
    >
      <div className="rounded-2xl shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 max-h-[80vh] overflow-hidden">
        {/* Кнопка закрытия */}
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="text-white hover:text-red-600 text-3xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Видео */}
        <div>
          <div className="relative h-0 pt-[136.25%] sm:pt-[126.25%] md:pt-[76.25%]">
            {/* <video
              className="absolute top-0 left-0 right-0 mx-auto h-full rounded"
              controls
              src={video}
              type="video/mp4"
            >
              Ваш браузер не поддерживает воспроизведение видео.
            </video> */}
            <iframe className="absolute top-0 left-0 right-0 mx-auto w-full h-full rounded" src="https://www.youtube.com/embed/yzfajJZsGG4" title="Sovchilar.net" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
