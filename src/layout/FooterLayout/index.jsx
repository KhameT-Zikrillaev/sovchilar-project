import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/logo.png';
import Modal from '../../components/customModal/Modal';
import ModalSertified from '../../components/sertficatedmodal';
export default function FooterLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSetifiedOpen, setIsModalSetifiedOpen] = useState(false);
  const handleScrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        {/* Основной градиент */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-950 via-black to-rose-950"></div>
        
        {/* Анимированная сетка */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(#ff2d55 1px, transparent 1px),
                             linear-gradient(to right, #ff2d55 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center 200%'
          }}>
        </div>

        {/* Светящиеся линии */}
        <div className="absolute inset-0">
          <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-pulse"></div>
          <div className="absolute left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-rose-500 to-transparent animate-pulse"></div>
          <div className="absolute right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-rose-500 to-transparent animate-pulse"></div>
        </div>

        {/* Диагональные блики */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-rose-500/10 via-transparent to-transparent transform -skew-x-12"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-rose-500/10 via-transparent to-transparent transform skew-x-12"></div>
        </div>
      </div>
      
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-80"></div>
      </div>

      <div className="relative">
        {/* Верхняя декоративная полоса */}
        <div className="h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Основной контент */}
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-12 mb-16">
            {/* Лого и описание */}
            <div  className="col-span-1 md:col-span-5 backdrop-blur-sm bg-black/20 p-8 rounded-3xl">
              <Link to="/" data-aos="zoom-out-up" data-aos-offset="50" className="flex items-center gap-3 text-4xl mb-6 group">
                <span  className="flex items-center text-3xl transform transition-all duration-300 group-hover:scale-110">
                 <img className='w-16 h-16' src={logo} alt="" />
                  <span className="text-yellow-500 -ml-1 animate-pulse">✨</span>
                </span>
                <span className="font-['Tangerine'] bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-transparent bg-clip-text transform transition-all duration-300 group-hover:from-yellow-400 group-hover:via-pink-400 group-hover:to-purple-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  Sovchilar.net
                </span>
              </Link>
              <p data-aos="fade-right" data-aos-offset="50" className="text-lg text-gray-200 mb-8 leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex gap-6">
                <a href="#" data-aos="flip-up" data-aos-offset="50" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-rose-500/20 text-white/80 hover:text-rose-400 transition-all duration-300 backdrop-blur-sm hover:scale-110">
                  <span className="text-2xl" title={t('footer.social.telegram')}>📱</span>
                </a>
                <a href="tel:+998507193333" data-aos="flip-up" data-aos-offset="50" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-rose-500/20 text-white/80 hover:text-rose-400 transition-all duration-300 backdrop-blur-sm hover:scale-110">
                  <span className="text-2xl" title={t('footer.social.phone')}>📞</span>
                </a>
                <a href="#" data-aos="flip-up" data-aos-offset="50" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-rose-500/20 text-white/80 hover:text-rose-400 transition-all duration-300 backdrop-blur-sm hover:scale-110">
                  <span className="text-2xl" title={t('footer.social.email')}>✉️</span>
                </a>
              </div>
            </div>

            {/* Разделитель */}
            <div className="hidden md:block md:col-span-1">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-rose-500/20 to-transparent"></div>
            </div>

            {/* Навигация */}
            <div className="col-span-1 text-center md:text-left md:col-span-3 backdrop-blur-sm bg-black/20 p-8 rounded-3xl">
              <h3 data-aos="fade-right" data-aos-offset="50" className="text-xl font-bold mb-6 text-white">{t('footer.navigation.title')}</h3>
              <ul className="space-y-4">
                <li  data-aos="fade-right" data-aos-offset="50">
                  <button 
                    onClick={() => handleScrollTo('search')}
                    className="text-gray-200  hover:text-rose-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 mr-3"></span>
                    {t('footer.navigation.search')}
                  </button>
                </li>
                <li data-aos="fade-right" data-aos-offset="50">
                  <button 
                    onClick={() => handleScrollTo('ankets')}
                    className="text-gray-200 hover:text-rose-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 mr-3"></span>
                    {t('footer.navigation.profiles')}
                  </button>
                </li>
                <li>
               
                </li>
              </ul>
            </div>

            {/* Для пользователей */}
            <div className="col-span-1 text-center md:text-left md:col-span-3 backdrop-blur-sm bg-black/20 p-8 rounded-3xl">
              <h3 data-aos="fade-left" data-aos-offset="50" className="text-xl font-bold mb-6 text-white">{t('footer.forUsers.title')}</h3>
              <ul className="space-y-4 ">
                <li data-aos="fade-left" data-aos-offset="50">
                  <Link to="/auth" className="text-gray-200   hover:text-rose-400 transition-all duration-300 flex items-center group">
                    <span className="w-2   h-2 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 mr-3"></span>
                    {t('footer.forUsers.createProfile')}
                  </Link>
                </li>
                <li data-aos="fade-left" data-aos-offset="50">
                  <button onClick={() => setIsModalSetifiedOpen(true)} to="/faq" className="text-gray-200 hover:text-rose-400 transition-all duration-300 flex items-center group">
                    <span className="w-2  h-2 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 mr-3"></span>
                    {t('footer.forUsers.sertified')}
                  </button>
                </li>
                <li data-aos="fade-left" data-aos-offset="50">
                  <button onClick={() => setIsModalOpen(true)} className="text-gray-200 text-center md:text-left  hover:text-rose-400 transition-all duration-300 flex items-center group">
                    <span className="w-2 h-2 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 mr-3"></span>
                    {t('footer.forUsers.rules')}
                  </button>
                </li>
                <li data-aos="fade-left" data-aos-offset="50">
                  <a href='tel:+998507193333'  className="text-gray-200 hover:text-rose-400 transition-all duration-300  flex items-center  group">
                    <span className="w-2 h-2  bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 mr-3"></span>
                    {t('footer.forUsers.contact')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Нижняя часть */}
          <div className="border-t border-white/10 pt-8 backdrop-blur-sm bg-black/20 rounded-3xl p-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-300 text-center md:text-left" data-aos="fade-up" data-aos-offset="50">
                &copy; 2024 Sovchilar.net. {t('footer.copyright')}
                <span className="block md:inline md:ml-2">
                  {t('footer.love')}
                  <span className="inline-block animate-pulse ml-1">💝</span>
                </span>
              </p>
              <div className="flex gap-8">
                <button  data-aos="fade-up" data-aos-offset="50" className="text-gray-300 hover:text-rose-400 transition-all duration-300">
                  {t('footer.privacy')}
                </button>
          
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя декоративная полоса */}
        <div className="h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
      />
       <ModalSertified
        isOpen={isModalSetifiedOpen}
        onClose={() => setIsModalSetifiedOpen(false)} 
      />
    </footer>
  );
}
