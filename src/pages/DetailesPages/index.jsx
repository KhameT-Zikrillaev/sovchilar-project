import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { useTranslation } from "react-i18next";
import { useSingleUser } from "./hooks/useSingleuser";
import Loading from "../../components/Loading/index";
import { useChatStore } from "../../store/chatStore";

function UserDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const { getSingleUser, isLoading } = useSingleUser();
  const [isImg, setIsImg] = useState(false);
  const { addUserChat } = useChatStore();
  const navigate = useNavigate();
  const [defaultImage, setDefaultImage] = useState(null);

  useEffect(() => {
    // Получаем сохраненное дефолтное изображение при монтировании компонента
    const savedImage = localStorage.getItem("defaultUserImage");
    if (savedImage) {
      setDefaultImage(savedImage);
    }
  }, []);

  const fetchUser = async () => {
    const user = await getSingleUser(id);
    setUserData(user?.data);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-[64px]">
        <Loading />
        {/* <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{t('UserDetails.userNotFound')}</h2>
          <Link to="/" className="mt-4 inline-block text-blue-500 hover:text-blue-600">
            {t('UserDetails.returnHome')}
          </Link>
        </div> */}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-[99px]">
        <div className="max-w-7xl mx-auto">
          <div
            onClick={() => {
              // Сохраняем флаг, что нужно прокрутить к карточке после возврата
              localStorage.setItem("scrollToCard", "true");
              navigate(-1);
            }}
            className="inline-flex items-center mb-8 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("UserDetails.back")}
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Верхняя секция с фото и основной информацией */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2 sm:p-8">
              <div className="relative flex items-center justify-center">
                <div className="w-[300px] h-[300px] overflow-hidden rounded-xl shadow-lg">
                  <img
                    onClick={() => {
                      userData.imageUrl ? setIsImg(true) : setIsImg(false);
                    }}
                    src={userData?.imageUrl || defaultImage}
                    alt={userData?.lastName}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-4">
                  {userData?.firstName} {userData?.lastName}
                </h1>
                <div className="flex items-center space-x-4 mb-6">
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
                      {t(`UserDetails.City.${userData?.address}`, {
                        defaultValue: userData?.address,
                      })}
                    </span>
                  </div>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-700">
                    {t(
                      `UserDetails.selectNationality.${userData?.nationality}`
                    )}
                  </span>
                </div>
                {/* ~~~~~~~~~~~~~~~~~~~~~chat~~~~~~~~~~~~~~~~~~~~~~~~ */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addUserChat(userData);
                    navigate(`/chat`);
                  }}
                  className="w-[60%] flex justify-center gap-2  px-8 py-2 bg-rose-500 text-white rounded-lg shadow hover:bg-red-700"
                >
                  {t("userCard.chat")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                  >
                    <path d="M12 2C6.48 2 2 5.92 2 10.5c0 2.14 1.02 4.11 2.7 5.59-.13.78-.49 2.2-1.42 3.28-.3.34-.09.83.4.83 1.48 0 3.27-.56 4.47-1.2 1.23.4 2.58.62 3.85.62 5.52 0 10-3.92 10-8.5S17.52 2 12 2zm0 15c-1.1 0-2.17-.16-3.2-.48L8.11 16l-1.4.75c-.7.36-1.46.66-2.22.87.26-.39.57-.91.83-1.51l.63-1.43-.5-.43C4.1 13.92 3 12.26 3 10.5 3 6.91 7.03 4 12 4s9 2.91 9 6.5-4.03 6.5-9 6.5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Основная информация */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-1 sm:p-6 bg-gray-50">
              <div className="lg:col-span-2 space-y-8">
                {/* О себе */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 p-2 mb-1">
                    {t("UserDetails.aboutMe")}
                  </h2>
                  <p className="text-gray-600 p-2 leading-relaxed">
                    {userData?.description}
                  </p>
                </section>

                {/* Основная информация */}
                <section>
                  <h2 className="text-2xl ml-4 font-bold text-gray-800 mb-4">
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
                            {userData?.age} {t("UserDetails.years")}
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
                            {t(`UserDetails.City.${userData?.address}`, {
                              defaultValue: userData?.address,
                            })}
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
                            {t(
                              `UserDetails.qualification.${userData?.qualification}`,
                              { defaultValue: userData?.qualification }
                            )}
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
                            {userData?.jobTitle}
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
                          {t(
                            `UserDetails.selectNationality.${userData?.nationality}`
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Телефон*/}
                    {userData?.phone && userData?.numerIsVisible && (
                      <a href={`tel:${userData?.phone}`} className="block">
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-md hover:scale-[1.02]">
                          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                            <svg
                              className="w-6 h-6 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" />
                              <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.862-2.17c.37-.43.319-1.07-.085-1.391l-2.263-1.86z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">
                              {t("UserDetails.phone")}
                            </h3>
                            <p className="text-sm sm:text-lg font-semibold text-gray-800">
                              {userData?.phone}
                            </p>
                          </div>
                        </div>
                      </a>
                    )}

                    {/* Telegram */}
                    {userData?.telegram && (
                      <a
                        href={`https://${userData?.telegram?.replace("@", "")}`}
                        className="block"
                      >
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:scale-[1.02]">
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
                              {userData?.telegram.replace("@", "")}
                            </p>
                          </div>
                        </div>
                      </a>
                    )}

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
                          {userData?.status === "ACTIVE"
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
              src={userData?.imageUrl}
              alt={userData?.firstName}
              className="h-full rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetails;
