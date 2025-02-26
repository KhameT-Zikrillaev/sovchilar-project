import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavbarLogo from "./NavbarLogo";
import flaguz from "../../assets/images/flag-uzb.jpg";
import flagru from "../../assets/images/flag-rus.png";
import { useStore } from "../../store/store";
import { useFavoritesStore } from "../../store/favoritesStore";
import Modal from "../../components/videoModal";
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
    <div className="flex items-center gap-2 mx-2">
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
  const favorites = useFavoritesStore((state) => state.favorites);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <div className="flex items-center gap-12">
            <NavbarLogo />
            {!user && (
              <button
                onClick={handleOpenModal}
                className="px-2  hidden lg:block py-1 bg-rose-500 text-white rounded-lg shadow hover:bg-red-700"
              >
                {t("navbar.instruction")}
              </button>
            )}
          </div>

          {/* Основная навигация */}
          {user && (
            <Link
              to="/"
              className="hidden lg:flex md:px-2 lg:px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all relative"
            >
              {t("navbar.home")}
            </Link>
          )}
          <div className="hidden lg:flex  items-center space-x-2">
            {user && (
              <>
                <button
                  onClick={() => handleScrollTo("search")}
                  className="md:px-2 lg:px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all flex items-center gap-2"
                >
                  <a href="#search">{t("navbar.search")}</a>
                  <AnimatedHeart />
                </button>
                <a
                  href="#anketa"
                  onClick={() => handleScrollTo("ankets")}
                  className="md:px-2 lg:px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                >
                  {t("navbar.profiles")}
                </a>
              </>
            )}
            {/* Aloqa qismi o'chirildi */}
            {/* <a
              href="https://t.me/sovchilarnet_admin"
              className="md:px-2 lg:px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
            >
              {t("navbar.contact")}
            </a> */}
            {user && (
              <Link
                to="/favourite"
                className="md:px-2 lg:px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all relative"
              >
                {t("navbar.favourite")}
                {favorites.length > 0 && (
                  <span className="text-red-500 absolute top-0 right-0 border rounded-[5px] px-1 flex items-center border-red-500">
                    {favorites?.length}
                  </span>
                )}
              </Link>
            )}

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~login~~~~~~~~~~~~~~~~~~~ */}
            {!user && (
              <Link
                to="/login"
                className="px-6 py-1 sm:py-1 lg:py-2 text-rose-500 rounded-full border-2 hover:text-white border-rose-500 hover:bg-rose-500 transition-colors duration-300 flex items-center gap-2"
              >
                {t("navbar.signIn")}
              </Link>
            )}

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~profile-register~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Link
              to={user ? "/profile" : "/register"}
              className="px-6 py-1 sm:py-1 lg:py-2 bg-rose-500 text-white rounded-full border-2 border-rose-500 hover:bg-rose-600 transition-colors duration-300 flex items-center gap-2"
            >
              <span>{user ? user.firstName : t("navbar.signUp")}</span>
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
                  d={
                    user
                      ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  }
                />
              </svg>
            </Link>
          </div>

          {/* Language Selector - теперь виден всегда */}
          <LanguageSelector />

          {/* Мобильное меню */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 mt-2 hover:text-rose-500 focus:outline-none"
            >
              <svg
                className="h-8 w-8"
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
          <div className="lg:hidden py-4">
            <div className="flex flex-col space-y-2">
              {user && (
                <>
                  <Link
                    to="/"
                    onClick={scrollToTop}
                    className="px-4 text-left py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
                  >
                    {t("navbar.home")}
                  </Link>
                  <button
                    onClick={() => handleScrollTo("search")}
                    className="px-4 py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                  >
                    <span>{t("navbar.search")}</span>
                    <AnimatedHeart />
                  </button>
                  <a
                    href="#anketa"
                    onClick={() => handleScrollTo("ankets")}
                    className="px-4 text-left py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
                  >
                    {t("navbar.profiles")}
                  </a>
                  <Link
                    to="/favourite"
                    onClick={scrollToTop}
                    className="px-4 text-left py-2 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg relative "
                  >
                    {t("navbar.favourite")}
                    {favorites.length > 0 && (
                      <span className="text-red-500 absolute top-0 left-[90px] border rounded-[5px] px-1 flex items-center border-red-500">
                        {favorites?.length}
                      </span>
                    )}
                  </Link>
                </>
              )}
              {!user && (
                <button
                  onClick={() => {
                    handleOpenModal();
                    setIsOpen(false);
                  }}
                  className="px-2 w-[120px] py-1 bg-rose-500 text-white rounded-lg shadow hover:bg-red-700"
                >
                  {t("navbar.instruction")}
                </button>
              )}
              {!user && (
                <Link
                  to="/login"
                  onClick={scrollToTop}
                  className="px-2 w-[120px] text-center text-rose-500 py-1 border-2 border-rose-500 hover:text-white  rounded-lg shadow hover:bg-red-700"
                >
                  {t("navbar.signIn")}
                </Link>
              )}
              <Link
                onClick={scrollToTop}
                to={user ? "/profile" : "/register"}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors duration-300 flex items-center gap-2"
              >
                <span>{user ? user.firstName : t("navbar.signUp")}</span>
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
                    d={
                      user
                        ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    }
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ" // Замените на ваше видео
      />
    </nav>
  );
}
