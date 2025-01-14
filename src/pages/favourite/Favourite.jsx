import { useTranslation } from "react-i18next";
import UserCard from "../../components/userCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../../store/favoritesStore";

const Favourite = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavoritesStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleFavorite = (card) => {
    removeFavorite(card.id);
  };

  return (
    <>
      <div className="py-32 container mx-auto px-4">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium flex-grow flex-basic-0 flex-shrink-[200px] flex items-center justify-center gap-2 mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 transform rotate-[-180deg]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          <span>{t("Profile.form.home")}</span>
        </button>
        <div
          id="anketa"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {favorites.length > 0 ? (
            favorites.map((user, index) => (
              <UserCard
                key={`${user.id}-${index}`}
                user={user}
                gender={user.gender}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-lg text-gray-500">
              {t("home.SecondHomePageSearch.noLikesUser")}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favourite;
