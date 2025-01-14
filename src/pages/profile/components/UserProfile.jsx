import React, { useEffect, useState } from "react";
import { Navigate} from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import FormModal from '../../../components/customModal/FormModal';
import CombinedForm from '../../auth/modules/AddUsers/CombinedForm';

import { useTranslation } from "react-i18next";
// import Loading from "../../components/Loading/index";
import Female from "../../../assets/images/Female.jpeg";
import Male from "../../../assets/images/Male.jpg";
import { useStore } from "../../../store/store";
function UserProfile() {
  const { t } = useTranslation();
  const [isImg, setIsImg] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useStore();


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <>
        <div className="min-h-screen bg-gradient-to-b  pb-8 px-4 sm:px-6 lg:px-8 mt-[30px]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Верхняя секция с фото и основной информацией */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2 sm:p-8">
                <div className="relative flex items-center justify-center">
                  <div className="w-[300px] h-[300px] overflow-hidden rounded-xl shadow-lg">
                    {!user?.gender ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-center p-4">
                        {t('Profile.UserProfile.setPhoto')}
                      </div>
                    ) : (
                      <img
                        onClick={() => {
                          user.imageUrl ? setIsImg(true) : setIsImg(false);
                        }}
                        src={
                          user?.imageUrl || 
                          (user?.gender === "MALE" 
                            ? Male 
                            : user?.gender === "FEMALE" 
                              ? Female 
                              : null)
                        }
                        alt={user?.lastName}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h1 className="text-4xl font-bold mb-4">
                    {user
                      ? `${user?.firstName} ${
                          user?.lastName ? user?.lastName : ""
                        }`
                      : t('Profile.UserProfile.fullName')}
                  </h1>
                  <div className="flex flex-col mb-6">
                    <div className="flex items-center mb-5 gap-2">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">
                          {user?.address
                            ? t(`UserDetails.City.${user?.address}`, {
                                defaultValue: user?.address,
                              })
                            : t('Profile.UserProfile.city')}
                        </span>
                      </div>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span className="text-gray-700">
                        {user?.nationality
                          ? t(
                              `UserDetails.selectNationality.${user?.nationality}`
                            )
                          : t('Profile.UserProfile.nationality')}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {t("UserDetails.aboutMe")}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {user?.description
                          ? user?.description
                          : t('Profile.UserProfile.comment')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Основная информация */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-1 sm:p-6 bg-gray-50">
                <div className="lg:col-span-2 space-y-8">
                  {/* О себе */}

                  {/* Основная информация */}
                  <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {t("UserDetails.mainInfo")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {/* ~~~~~~~~~~~~~~~~~~~~~~ возвраст */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                            <svg
                              className="w-6 h-6 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </div>

                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("UserDetails.age")}
                            </h3>
                            <p className="text-lg font-semibold text-gray-800">
                              {user?.age
                                ? `${user.age} ${t("UserDetails.years")}`
                                : t('Profile.UserProfile.age')}
                            </p>
                          </div>
                        </div>
                        {/* ~~~~~~~~~~~~~~~~~~~~~~Местоположение */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg">
                            <svg
                              className="w-6 h-6 text-purple-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("UserDetails.location")}
                            </h3>
                            <p className="text-lg font-semibold text-gray-800">
                              {user?.address
                                ? t(`UserDetails.City.${user?.address}`, {
                                    defaultValue: user?.address,
                                  })
                                : t('Profile.UserProfile.address')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* ~~~~~~~~~~~~~~~~~~Образование */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-rose-100 rounded-lg">
                            <svg
                              className="w-6 h-6 text-rose-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("UserDetails.education")}
                            </h3>
                            <p className="text-lg font-semibold text-gray-800">
                              {user?.qualification
                                ? t(
                                    `UserDetails.qualification.${user?.qualification}`,
                                    {
                                      defaultValue: user?.qualification,
                                    }
                                  )
                                : t('Profile.UserProfile.education')}
                            </p>
                          </div>
                        </div>

                        {/* ~~~~~~~~~~~~~~~~~~Работа */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg">
                            <svg
                              className="w-6 h-6 text-purple-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 2l4 4h13v12h-8l-4 4-4-4H3z"
                              />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("UserDetails.work")}
                            </h3>
                            <p className="text-lg font-semibold text-gray-800">
                              {user?.jobTitle
                                ? user?.jobTitle
                                : t('Profile.UserProfile.occupation')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Боковая панель */}
                <div className="lg:col-span-1 space-y-6 p-4 bg-white rounded-lg shadow-md">
                  <div className="lg:col-span-1 space-y-6 p-4 bg-white rounded-lg shadow-md">
                    <div className="space-y-4">
                      {/* Национальность */}
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-lg">
                          <svg
                            className="w-6 h-6 text-yellow-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v12M6 12h12"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-500">
                            {t("UserDetails.nationality")}
                          </h3>
                          <p className="text-lg font-semibold text-gray-800">
                            {user?.nationality
                              ? t(
                                  `UserDetails.selectNationality.${user?.nationality}`
                                )
                              : t('Profile.UserProfile.ethnicity')}
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div 
                        className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:scale-[1.02] cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          if (user?.phone) {
                            window.location.href = `tel:${user.phone}`;
                          } else {
                            setIsModalOpen(true);
                          }
                        }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-500">
                            {t("UserDetails.phone")}
                          </h3>
                          <p className="text-sm sm:text-lg font-semibold text-gray-800">
                            {user?.phone || t('Profile.UserProfile.phone')}
                          </p>
                        </div>
                      </div>

                      {/* Telegram */}
                      <div 
                        className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:scale-[1.02] cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          if (user?.telegram) {
                            window.open(`https://${user.telegram}`, '_blank');
                          } else {
                            setIsModalOpen(true);
                          }
                        }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-orange-100 rounded-lg">
                          <svg
                            className="w-6 h-6 text-orange-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-500">
                            {t("UserDetails.telegram")}
                          </h3>
                          <p className="text-sm sm:text-lg font-semibold text-gray-800">
                            {!user?.telegram ? (
                              <span 
                                className="cursor-pointer hover:text-rose-500"
                                onClick={() => setIsModalOpen(true)}
                              >
                                {t('Profile.UserProfile.telegram')}
                              </span>
                            ) : (
                              <span>{user?.telegram}</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Статус */}
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                          <svg
                            className="w-6 h-6 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 12h14m-7-7v14"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-500">
                            {t("UserDetails.status")}
                          </h3>
                          <p className="text-lg font-semibold text-gray-800">
                            {user?.status === "ACTIVE"
                              ? t("UserDetails.active")
                              : t("UserDetails.inactive")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isImg && (
          <div className="hidden lg:block">
            <div className=" bg-black z-50 p-10 fixed top-0 left-0 bg-opacity-80 w-[100vw] h-[100vh] flex justify-center items-center">
              <ImCancelCircle
                onClick={() => setIsImg(false)}
                className="text-white text-[40px] absolute top-8 right-8 cursor-pointer"
              />
              <img
                src={user?.imageUrl}
                alt={user?.firstName}
                className="h-full rounded"
              />
            </div>
          </div>
        )}

      </>
      <FormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={t('Profile.form.fill_out_form')}
      >
        <div className="pb-4">
          <div className="max-w-3xl mx-auto">
            <CombinedForm handleCloseModal={handleCloseModal} />
          </div>
        </div>
      </FormModal>
    </>
  );
}

export default UserProfile;
