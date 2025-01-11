import React, { useState, useEffect, useRef } from "react";
import UserCard from "../../../../components/userCard";
import Loading from "../../../../components/Loading";
import SecondHomeSearchForm from "./modules/SecondHomeSearchForm";
import { useTranslation } from "react-i18next";
import { useRecentUser } from "./hooks/useRecentUser";
import { useCardContext } from "../../../../context/CardContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function SecondHomePageSearch() {
  const { t } = useTranslation();
  const { getRecentUser } = useRecentUser();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { visibleCardCount, updateVisibleCardCount } = useCardContext();
  const [activeFilter, setActiveFilter] = useState(() => {
    return localStorage.getItem("activeFilter") || "";
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedAge, setIsSubmittedAge] = useState(false);
  const formRef = useRef();
  const [searchParams, setSearchParams] = useState({
    gender: "",
    ageFrom: 18,
    ageTo: 100,
    address: "",
    maritalStatus: "",
  });

  const fetchUserPage = async ({ pageParam = 1 }) => {
    try {
      console.log('Fetching page:', pageParam, 'with params:', searchParams);
      
      // Remove the '&' prefix from address and maritalStatus if they exist
      const address = searchParams.address.startsWith('&') 
        ? searchParams.address.substring(1) 
        : searchParams.address;
        
      const maritalStatus = searchParams.maritalStatus.startsWith('&') 
        ? searchParams.maritalStatus.substring(1) 
        : searchParams.maritalStatus;

      // Remove the 'gender=' prefix if it exists
      const gender = searchParams.gender.startsWith('gender=') 
        ? searchParams.gender.substring(7) 
        : searchParams.gender;

      const response = await getRecentUser(
        gender,
        searchParams.ageFrom,
        searchParams.ageTo,
        address,
        maritalStatus,
        pageParam,
        12
      );
      
      console.log('Page response:', response);
      
      const users = response?.data?.data?.items || [];
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
    refetch
  } = useInfiniteQuery({
    queryKey: ['users', searchParams],
    queryFn: fetchUserPage,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  const handleSearch = async (gender, ageFrom, ageTo, address, maritalStatus) => {
    console.log('Search params:', { gender, ageFrom, ageTo, address, maritalStatus });
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

  const allUsers = data?.pages?.flatMap(page => page.users) || [];
  console.log('Rendered users:', allUsers);

  if (isError) {
    console.error('Query error:', error);
    return <div className="text-center text-red-500">Error loading users: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-10">
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

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allUsers.length > 0 ? (
              allUsers.map((user, index) => (
                <UserCard 
                  key={`${user.id}-${index}`} 
                  user={user}
                  gender={user.gender}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-lg text-gray-500">
                {t("home.SecondHomePageSearch.noUsersMessage")}
              </div>
            )}
          </div>

          {hasNextPage && (
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
