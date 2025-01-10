import { useState } from 'react';
import UserServices from '../../../../../services/userServices';
import { toast } from 'react-toastify';

export const useRecentUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getRecentUser = async (gender, ageFrom, ageTo, address, maritalStatus) => {
    setIsLoading(true);
    try {
      const response = await UserServices.getAll(gender, ageFrom, ageTo, address, maritalStatus);
      return response; // Возвращаем только студентов
    } catch (err) {
      // console.error(err);
      toast.error(err.response?.data?.message || "O'qituvchilarni olishda xato");
    } finally {
      setIsLoading(false);
    }
  };


  return {
    getRecentUser,
    isLoading,
  };
};
