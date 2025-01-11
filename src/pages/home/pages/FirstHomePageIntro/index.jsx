import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "../../../../store/store";
import Modal from "../../../../components/customModal/Modal";
import leftbg from "../../../../assets/images/left-bg.jpg";
import rightbg from "../../../../assets/images/right-bg.jpg";
import centerbg from "../../../../assets/images/center-bg.jpeg";
export default function FirstHomePageIntro() {
  const [activeTab, setActiveTab] = useState("men");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const accessToken = useStore((state) => state.accessToken);
  const user = useStore((state) => state.user);

  const stats = [
    {
      number: "500+",
      label: t("home.FirstIntroPage.stats.weddings"),
      icon: "👰",
    },
    {
      number: "9500+",
      label: t("home.FirstIntroPage.stats.profiles"),
      icon: "📋",
    },
    { number: "100%", label: t("home.FirstIntroPage.stats.halal"), icon: "🕌" },
  ];

  const features = [
    {
      icon: "💑",
      title: t("home.FirstIntroPage.features.serious.title"),
      description: t("home.FirstIntroPage.features.serious.description"),
    },
    {
      icon: "👩‍👩‍👦",
      title: t("home.FirstIntroPage.features.matchmakers.title"),
      description: t("home.FirstIntroPage.features.matchmakers.description"),
    },
    {
      icon: "🤝",
      title: t("home.FirstIntroPage.features.islamic.title"),
      description: t("home.FirstIntroPage.features.islamic.description"),
    },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 bg-cover bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=3432')`,
          backgroundPosition: "100% 25%",
          backgroundSize: "110%",
          opacity: 0.9,
          filter: "blur(4px)",
        }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Главный контент */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="backdrop-blur-md rounded-[40px] px-4 sm:px-14 py-10 bg-gradient-to-br from-black/80 to-black/60">
              {/* Заголовок с подзаголовком */}
              <div className="mb-12">
                <div
                  data-aos="zoom-out-up"
                  data-aos-offset="50"
                  data-aos-delay="500"
                  className="inline-block px-6 py-2 rounded-full bg-rose-500/30 text-rose-200 text-sm font-medium mb-6"
                >
                  {t("home.FirstIntroPage.title")}
                </div>
                <h1
                  data-duration="1000"
                  data-aos="fade-right"
                  data-aos-offset="50"
                  data-aos-delay="500"
                  className="text-5xl lg:text-6xl font-bold leading-[1.2] mb-6"
                >
                  <span className="text-white">
                    {t("home.FirstIntroPage.subtitle")}
                  </span>
                </h1>
                <p
                  data-duration="1000"
                  data-aos="fade-left"
                  data-aos-offset="50"
                  data-aos-delay="500"
                  className="text-xl text-gray-200 leading-relaxed"
                >
                  {t("home.FirstIntroPage.description")}
                </p>
              </div>

              {/* Кнопки */}
              <div className="flex items-center gap-4 mb-12" data-aos="fade-right" data-aos-offset="50">
                <Link 
                  to={accessToken ? '/profile' : `/register`}
                  className="flex-1 text-lg text-center bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-base font-medium transition duration-200 flex items-center justify-center gap-2"
                >
                  <span>
                    {accessToken ? `${t('home.FirstIntroPage.signIn')} (${user?.firstName})` : t('home.FirstIntroPage.createProfile')}
                  </span>
                  {!accessToken && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  )}
                </Link>
                <button className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition duration-200"  onClick={() => setIsModalOpen(true)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              {/* Поиск */}
              {!accessToken && (
                <div
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="bg-white/10 backdrop-blur-lg p-2 rounded-full mb-10 flex items-center"
                >
                  <button
                    className={
                      "flex-1 px-6  py-3 rounded-full text-base font-medium transition duration-200 " +
                      (activeTab === "men"
                        ? "bg-rose-500 text-white"
                        : "text-gray-200 hover:text-white hover:bg-white/10")
                    }
                    onClick={() => {
                      setActiveTab("men");
                    }}
                  >
                    {t("home.FirstIntroPage.search.men")}
                  </button>
                  <button
                    className={
                      "flex-1 px-6 py-3 rounded-full text-base font-medium transition duration-200 " +
                      (activeTab === "women"
                        ? "bg-rose-500 text-white"
                        : "text-gray-200 hover:text-white hover:bg-white/10")
                    }
                    onClick={() => {
                      setActiveTab("women");
                    }}
                  >
                    {t("home.FirstIntroPage.search.women")}
                  </button>
                </div>
              )}
              {/* Кнопки */}
              

              {/* Статистика */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    data-aos="zoom-in"
                    data-aos-delay="500"
                    key={index}
                    className="text-center px-4 py-6 rounded-2xl bg-white/10 hover:bg-white/20 transition duration-200"
                  >
                    <div className=" text-2xl  sm:text-3xl mb-2">
                      {stat.icon}
                    </div>
                    <div className=" text-xl  sm:text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-base text-gray-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая часть с фотографиями */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div
                className="col-span-2"
                data-aos="fade-down"
                data-aos-offset="50"
              >
                <img
                  src={centerbg}
                  alt="Islamic Wedding"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl hover-scale"
                />
              </div>
              <div
                className="relative"
                data-aos="fade-right"
                data-aos-offset="50"
              >
                <img
                  src={leftbg}
                  alt="Muslim Family"
                  className="w-full h-48 object-cover rounded-2xl shadow-xl hover-scale"
                />
              </div>
              <div
                className="relative"
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-offset="50"
              >
                <img
                  src={rightbg}
                  alt="Happy Family"
                  className="w-full h-48 object-cover rounded-2xl shadow-xl hover-scale"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Секция преимуществ */}
        <div className="mt-24">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                data-aos="flip-up"
                data-aos-offset="50"
                key={index}
                className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md p-8 rounded-3xl hover:transform hover:scale-105 transition duration-300"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Призыв к действию */}
          <div
            data-aos="flip-up"
            data-aos-offset="50"
            className="max-w-3xl mx-auto text-center bg-gradient-to-r from-rose-500/20 to-black/60 backdrop-blur-md p-12 rounded-[2.5rem]"
          >
            <h2
              data-aos="fade-right"
              data-aos-offset="50"
              data-duration="1000"
              className="text-3xl font-bold text-white mb-4"
            >
              {t("home.FirstIntroPage.callToAction.title")}
            </h2>
            <p
              data-aos="fade-left"
              data-aos-offset="50"
              data-duration="1000"
              className="text-xl text-gray-200 mb-8 leading-relaxed"
            >
              {t("home.FirstIntroPage.callToAction.description")}
            </p>
            {/* <button  className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-5 rounded-full text-xl font-semibold transition duration-300 transform hover:scale-105 group flex items-center mx-auto">
              {t('home.FirstIntroPage.callToAction.button')}
              <span className="ml-2 transform transition-all duration-300 group-hover:translate-x-2">🚀</span>
            </button> */}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
