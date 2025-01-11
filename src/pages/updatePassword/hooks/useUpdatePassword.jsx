import { useState } from "react";
import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";

export const useUpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const UpdatePassword = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.updatePassword(url, data);
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    UpdatePassword,
    isLoading,
  };
};
