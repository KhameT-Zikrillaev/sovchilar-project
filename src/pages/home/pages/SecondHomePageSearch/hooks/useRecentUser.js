import { useCallback } from 'react';
import axios from 'axios';

export const useRecentUser = () => {
  const getRecentUser = useCallback(async (
    gender = '',
    ageFrom = 18,
    ageTo = 100,
    address = '',
    maritalStatus = '',
    page = 1,
    limit = 12
  ) => {
    try {
      const params = new URLSearchParams();
      if (gender) params.append('gender', gender);
      if (ageFrom) params.append('ageFrom', ageFrom.toString());
      if (ageTo) params.append('ageTo', ageTo.toString());
      if (address) params.append('address', address);
      if (maritalStatus) params.append('maritalStatus', maritalStatus);
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      params.append('status', 'ACTIVE'); // Always add status=ACTIVE

      const response = await axios.get(`https://back.sovchilar.net/api/users-uz/filter?${params.toString()}`);
      console.log('API Response:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Error fetching recent users:', error);
      throw error;
    }
  }, []);

  return { getRecentUser };
};
