import { useState } from "react";
import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";

export const useEditUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const EditUser = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.editUser(url, data);
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    EditUser,
    isLoading,
  };
};
