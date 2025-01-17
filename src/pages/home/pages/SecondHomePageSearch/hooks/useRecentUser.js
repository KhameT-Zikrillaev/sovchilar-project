import { useCallback } from "react";
import axios from "axios";
import { useStore } from "../../../../../store/store";

export const useRecentUser = () => {
  const getRecentUser = useCallback(
    async (
      gender = "",
      ageFrom = 18,
      ageTo = 100,
      address = "",
      maritalStatus = "",
      page = 1,
      limit = 12
    ) => {
      try {
        const params = new URLSearchParams();
        if (gender) params.append("gender", gender);
        if (ageFrom) params.append("ageFrom", ageFrom.toString());
        if (ageTo) params.append("ageTo", ageTo.toString());
        if (address) params.append("address", address);
        if (maritalStatus) params.append("maritalStatus", maritalStatus);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        params.append("status", "ACTIVE"); // Always add status=ACTIVE

        const response = await axios.get(
          `https://back.sovchilar.net/api/users-uz/filter?${params.toString()}`
        );
        return response?.data?.data?.items.filter(
          (user) => user.gender === gender
        );
      } catch (error) {
        throw error;
      }
    },
    []
  );

  return { getRecentUser };
};
