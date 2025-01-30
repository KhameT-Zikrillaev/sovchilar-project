import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "../../../../store/store";
import Modal from "../../../../components/customModal/Modal";
import leftbg from "../../../../assets/images/left-bg.jpg";
import rightbg from "../../../../assets/images/right-bg.jpg";
import centerbg from "../../../../assets/images/center-bg.jpeg";
import movie from "../../../../../public/movie.mp4";

export default function FirstHomePageIntro() {
  const [activeTab, setActiveTab] = useState("men");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const accessToken = useStore((state) => state.accessToken);
  const user = useStore((state) => state.user);

  // Функция для открытия видео в полноэкранном режиме
  const handleVideoClick = (event) => {
    const video = event.target;
    if (window.innerWidth < 640) { // Только для мобильных устройств
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) { // Safari
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { // IE11
        video.msRequestFullscreen();
      }
    }
  };

  const stats = [
    {
      number: "507",
      label: t("home.FirstIntroPage.stats.weddings"),
      icon: "👰",
    },
    {
      number: "10823",
      label: t("home.FirstIntroPage.stats.profiles"),
      icon: "📋",
    },
    {
      number: "100%",
      label: t("home.FirstIntroPage.stats.serviceQuality"),
      icon: "😊",
    },
  ];

  const features = [
    {
      icon: "💍",
      title: t("home.FirstIntroPage.features.serious.title"),
      description: t("home.FirstIntroPage.features.serious.description"),
    },
    {
      icon: "🔍",
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

      <div className="container mx-auto px-4 py-20 m relative z-10">
        <div className="flex flex-col lg:flex-row items-center mt-8 justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="backdrop-blur-md rounded-[40px] px-4 sm:px-14 py-10 bg-gradient-to-br from-black/80 to-black/60">
              <div className="mb-12">
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
              </div>

              <div
                className="flex items-center gap-4 mb-12"
                data-aos="fade-right"
                data-aos-offset="50"
              >
                <Link
                  to={accessToken ? "/profile" : `/register`}
                  className="flex-1 text-lg text-center bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-medium transition duration-200 flex items-center justify-center gap-2"
                >
                  <span>
                    {accessToken
                      ? `${t("home.FirstIntroPage.signIn")} (${user?.firstName})`
                      : t("home.FirstIntroPage.createProfile")}
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
                <button
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition duration-200"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>

              {!accessToken && (
                <div
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="bg-white/10 block mx-auto lg:hidden backdrop-blur-lg p-2 rounded-full mb-10 flex items-center"
                >
                  <Link
                    to="/login"
                    className="flex-1 px-6 text-center py-3 rounded-full text-xl font-medium transition duration-200 bg-rose-500 text-white hover:bg-rose-600"
                  >
                    {t("navbar.signIn")}
                  </Link>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    data-aos="zoom-in"
                    data-aos-delay="500"
                    key={index}
                    className="text-center px-4 py-6 rounded-2xl bg-white/10 hover:bg-white/20 transition duration-200"
                  >
                    <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-base text-gray-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/2" data-aos="fade-right" data-aos-offset="50">
                <video 
                  src={movie} 
                  autoPlay 
                  loop 
                  muted 
                  onClick={handleVideoClick}
                  className="w-full h-[500px] lg:h-[700px] object-cover rounded-2xl shadow-xl hover-scale cursor-pointer sm:cursor-default"
                  style={{ aspectRatio: '9/16' }}
                />
              </div>

              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <div data-aos="fade-left" data-aos-offset="50">
                  <img
                    src={leftbg}
                    alt="Muslim Family"
                    className="w-full h-[350px] object-cover rounded-2xl shadow-xl hover-scale"
                  />
                </div>
                <div data-aos="fade-left" data-aos-delay="500" data-aos-offset="50">
                  <img
                    src={rightbg}
                    alt="Happy Family"
                    className="w-full h-[350px] object-cover rounded-2xl shadow-xl hover-scale"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
