import React, { useState, useEffect, useRef } from "react";
import UserCard from "../../../../components/userCard";
import Loading from "../../../../components/Loading";
import SecondHomeSearchForm from "./modules/SecondHomeSearchForm";
import { useTranslation } from "react-i18next";
import { useRecentUser } from "./hooks/useRecentUser";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useFavoritesStore } from "../../../../store/favoritesStore";
import { useStore } from "../../../../store/store";
import { usePostFavorite } from "./hooks/usePostFavorite";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";

export default function SecondHomePageSearch() {
  const { t } = useTranslation();
  const { getRecentUser } = useRecentUser();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState(() => {
    return localStorage.getItem("activeFilter") || "";
  });
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { user, accessToken } = useStore();

  const fetchFavoriteUsers = async () => {
    if (user) {
      const { data } = await api.get(`/user-favourite/user/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Tokenni header'ga qo'shish
          "Content-Type": "application/json", // JSON formatini belgilash
        },
      }); // Sevimli foydalanuvchilar API'si
      return data;
    }
  };

  const { data: users } = useQuery({
    queryKey: ["favoriteUsers"],
    queryFn: fetchFavoriteUsers,
  });
  if (users) {
    localStorage.setItem("favoriteLength", users.data.length);
  }

  const { postFavoriteUsers } = usePostFavorite();

  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedAge, setIsSubmittedAge] = useState(false);
  const formRef = useRef();
  const [searchParams, setSearchParams] = useState({
    gender: user && (user.gender === "FEMALE" ? "MALE" : "FEMALE"),
    ageFrom: 18,
    ageTo: 100,
    address: "",
    maritalStatus: "",
    status: "ACTIVE"
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  }, []);

  const fetchUserPage = async ({ pageParam = 1 }) => {
    try {
      // Remove the '&' prefix from address and maritalStatus if they exist
      const address = searchParams.address.startsWith("&")
        ? searchParams.address.substring(1)
        : searchParams.address;

      const maritalStatus = searchParams.maritalStatus.startsWith("&")
        ? searchParams.maritalStatus.substring(1)
        : searchParams.maritalStatus;

      // Remove the 'gender=' prefix if it exists

      const gender =
        (user && (user.gender === "FEMALE" ? "MALE" : "FEMALE")) ||
        (searchParams.gender && searchParams.gender.startsWith("gender=")
          ? searchParams.gender.substring(7)
          : searchParams.gender);

      const response = await getRecentUser(
        gender,
        searchParams.ageFrom,
        searchParams.ageTo,
        address,
        maritalStatus,
        pageParam,
        12
      );
      const users = response || [];
      return {
        users,
        nextPage: pageParam + 1,
        hasMore: users.length === 12,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["users", searchParams],
    queryFn: fetchUserPage,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  const handleSearch = async (
    gender,
    ageFrom,
    ageTo,
    address,
    maritalStatus
  ) => {
    setSearchParams({
      gender,
      ageFrom,
      ageTo,
      address,
      maritalStatus,
    });
    setIsSearchActive(true);
    // Force refetch when search parameters change
    await refetch();
  };

  useEffect(() => {
    const savedParams = localStorage.getItem("searchParams");

    if (savedParams) {
      const params = JSON.parse(savedParams);
      handleSearch(
        params.gender,
        params.ageFrom,
        params.ageTo,
        params.address,
        params.maritalStatus
      );
    }
  }, []);

  //Sevimlilar

  const toggleFavorite = async (card) => {
    if (favorites.some((fav) => fav.id === card.id)) {
      removeFavorite(card.id);
    } else {
      addFavorite(card);
    }
    const response = await postFavoriteUsers(
      "/user-favourite",
      {
        user: user?.id,
        favourite: card.id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Tokenni header'ga qo'shish
          "Content-Type": "application/json", // JSON formatini belgilash
        },
      }
    );
    queryClient.invalidateQueries(["favoriteUsers"]);
  };

  useEffect(() => {
    const shouldScrollToCard = localStorage.getItem("scrollToCard");
    const lastViewedCardId = localStorage.getItem("lastViewedCardId");

    if (shouldScrollToCard === "true" && lastViewedCardId && !isLoading) {
      const cardElement = document.getElementById(
        `user-card-${lastViewedCardId}`
      );
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
        // Очищаем флаги после прокрутки
        localStorage.removeItem("scrollToCard");
        localStorage.removeItem("lastViewedCardId");
      }
    }
  }, [isLoading, data]);

  const allUsers = data?.pages?.flatMap((page) => page.users) || [];

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-10">
      {user && (
        <SecondHomeSearchForm
          ref={formRef}
          onSearch={handleSearch}
          setIsSearchActive={setIsSearchActive}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          setIsSubmittedAge={setIsSubmittedAge}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loading />
        </div>
      ) : (
        <>
          <div
            id="anketa"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {user && allUsers.length > 0 ? (
              allUsers.map((user, index) => (
                <UserCard
                  key={`${user?.id}-${index}`}
                  user={user}
                  gender={user.gender}
                  toggleFavorite={toggleFavorite}
                  favorites={users?.data}
                />
              ))
            ) : (
              <div
                className={
                  "col-span-full text-center text-lg " +
                  (user ? "text-gray-500" : "text-red-500")
                }
              >
                <button
                  onClick={() => navigate("/register")}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg"
                >
                  {user
                    ? t("home.SecondHomePageSearch.noUsersMessage")
                    : t("home.SecondHomePageSearch.noAnketa")}
                </button>
              </div>
            )}
          </div>

          {user && hasNextPage && (
            <div className="text-center mt-4 mb-8">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
              >
                {isFetchingNextPage
                  ? t("home.SecondHomePageSearch.loading")
                  : t("home.SecondHomePageSearch.ShowMore")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
