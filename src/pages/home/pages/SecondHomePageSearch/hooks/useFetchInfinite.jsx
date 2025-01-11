import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";

async function fetchData(url, page, limit) {
  const params = {
    page,
    limit
  };

  const response = await axios.get(url, { params });

  return response?.data?.items;
}

function useFetchInfinite(url, limit) {
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetching, refetch, remove  } = useInfiniteQuery(
    [url, limit], // Cache key (url va limit bo'yicha kesh qilish)
    ({ pageParam = 1 }) => fetchData(url, pageParam, limit), // Parametrlar bilan fetch qilish
    {
      getNextPageParam: (lastPage, allPages) => {
        // Keyingi sahifa uchun `page`ni hisoblash
        return lastPage?.length === limit ? allPages.length + 1 : undefined;
      },
      enabled: !!url, // URL mavjud bo'lsa, faqat fetch qilinadi
    }
  );

  useEffect(() => {
    if (url) {
      remove(); // Keshni olib tashlash
      refetch({ pageParam: 1 }); // Sahifani 1 ga qaytarish
    }
  }, [url, remove, refetch]);


  return {
    data: data?.pages?.flat() || [],
    error,
    loading: isLoading, // `loading` faqat birinchi yuklanishda `true`
    fetchNextPage,
    hasNextPage,
    isFetching: isFetching && !isLoading 
  };
}

export { useFetchInfinite };