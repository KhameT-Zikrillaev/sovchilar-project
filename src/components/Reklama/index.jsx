import React from "react";
import "./Reklama.css"; // Подключим отдельный CSS файл для анимации

export default function Reklama() {
  return (
    <>
      <div className="reklama h-[35px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-center fixed w-full top-0 z-50 text-white font-bold flex items-center justify-center animate-slide">
      <div className="text-[12px] md:text-sm flex items-center">
          <span>Haqiqiy sevgingizni toping va baxtli oila quring!</span>
          <span className="hidden md:inline ml-2">Sevgi va oila topish imkoniyati – bu yerda.</span>
        </div>
      </div>
    </>
  );
}
