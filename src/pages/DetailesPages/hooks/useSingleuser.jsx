import { useState } from "react";
import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";

export const useSingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getSingleUser = async (id) => {
    setIsLoading(true);
    try {
      const response = await UserServices.getSingle(id);
      return response; // Возвращаем только студентов
    } catch (err) {
      // console.error(err);
      toast.error(
        err.response?.data?.message || "O'qituvchilarni olishda xato"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return {
    getSingleUser,
    isLoading,
  };
};
