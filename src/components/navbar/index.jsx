import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavbarLogo from "./NavbarLogo";
import flaguz from "../../assets/images/flag-uzb.jpg";
import flagru from "../../assets/images/flag-rus.png";
import { useStore } from "../../store/store";
// Анимированная иконка сердца
const AnimatedHeart = () => (
  <div className="relative w-8 h-8 flex items-center justify-center">
    <svg
      className="absolute w-8 h-8 text-rose-500 transform transition-transform duration-500 hover:scale-110"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-2 h-2 bg-rose-300 rounded-full animate-ping"></div>
    </div>
  </div>
);

// Компонент выбора языка
const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => i18n.changeLanguage("ru")}
        className={`w-8 h-8 rounded-full overflow-hidden border-2 ${
          i18n.language === "ru" ? "border-rose-500" : "border-transparent"
        }`}
      >
        <img src={flagru} alt="RU" className="w-full h-full object-cover" />
      </button>
      <button
        onClick={() => i18n.changeLanguage("uz")}
        className={`w-8 h-8 rounded-full overflow-hidden border-2 ${
          i18n.language === "uz" ? "border-rose-500" : "border-transparent"
        }`}
      >
        <img src={flaguz} alt="UZ" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useStore();

  const handleScrollTo = (id) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      // Даем время на переход на главную
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // плавная прокрутка
    });
    setIsOpen(false);
  }

  return (
    <nav className="bg-white shadow-md fixed w-full top-[35px] z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <NavbarLogo />

          {/* Основная навигация */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleScrollTo("search")}
              className="px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all flex items-center gap-2"
            >
              <span>{t("navbar.search")}</span>
              <AnimatedHeart />
            </button>
            <button
              onClick={() => handleScrollTo("ankets")}
              className="px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
            >
              {t("navbar.profiles")}
            </button>
            <a
              href="https://t.me/sovchilarnet_admin"
              className="px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
            >
              {t("navbar.contact")}
            </a>
            <Link
              to={user ? "/profile" : "/login"}
              className="px-6 py-1 sm:py-1 lg:py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors duration-300 flex items-center gap-2"
            >
              <span>{user ? user.firstName : "Kirish"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
            <LanguageSelector />
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-rose-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleScrollTo("search")}
                className="px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg flex items-center gap-2"
              >
                <span>{t("navbar.search")}</span>
                <AnimatedHeart />
              </button>
              <button
                onClick={() => handleScrollTo("ankets")}
                className="px-4 text-left py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
              >
                {t("navbar.profiles")}
              </button>
              <a
                href="https://t.me/sovchilarnet_admin"
                onClick={() => setIsOpen(false)}
                className="px-4 text-left py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
              >
                {t("navbar.contactmobile")}
              </a>
              <Link
                onClick={scrollToTop}
                to="/auth"
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors duration-300 flex items-center gap-2"
              >
                <span>{t("navbar.createProfile")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Link>
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
