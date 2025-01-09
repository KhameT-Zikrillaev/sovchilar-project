import { useState } from "react";
import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoginUser = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.loginUser(url, data);
      //   console.log(response);
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    LoginUser,
    isLoading,
  };
};
