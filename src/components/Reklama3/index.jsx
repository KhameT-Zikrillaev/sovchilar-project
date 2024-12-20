import React from "react";
import "./Reklama.css"; // Подключим отдельный CSS файл для анимации

export default function Reklama() {
  return (
    <>
      <div className="reklama h-[35px] fixed w-full top-0 z-50 font-bold">
        <div className="scrolling-text">
          <span>Hayotingizdagi haqiqiy sevgini toping va baxtli oila qurish yo'lida birinchi qadamingizni tashlang! Hoziroq bizning saytimizda yoki platformamizda anketa to'ldiring va mustahkam oila qurish uchun ideal imkoniyatlardan foydalaning. O'zaro ishonch, mehr-muhabbat va samimiylikka asoslangan munosabatlar yaratishda biz sizning yoningizdamiz!</span>
        </div>
      </div>
    </>
  );
}
