import React from "react";
import { ImCancelCircle } from "react-icons/im";

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
      onClick={handleModalClick}
    >
      {/* Кнопка закрытия */}
      <ImCancelCircle
            onClick={onClose}
              className="text-white text-[40px] absolute top-8 right-4 cursor-pointer"
      />
            
      <div className="rounded-2xl shadow-lg px-2 bg-black w-[500px] mx-auto">
        {/* Видео */}
        <div>
          <div className="relative ">
            <iframe 
              className="w-full  aspect-[10/16] rounded-2xl" 
              src="https://www.youtube.com/embed/yzfajJZsGG4" 
              title="Sovchilar.net" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
