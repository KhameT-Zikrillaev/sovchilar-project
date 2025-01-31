import { useState } from 'react';
import UserStatic from '../services/userStatic';
import { toast } from 'react-toastify';

export const useRecent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getRecent = async (status) => {
    setIsLoading(true);
    try {
      const response = await UserStatic.getSingle(status);
      return response; 
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    } finally {
      setIsLoading(false);
    }
  };


  return {
    getRecent,
    isLoading,
  };
};
