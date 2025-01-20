import { useState } from "react";
import UserServices from "../../../services/userServices";
// import { toast } from "react-toastify";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const LoginUser = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.loginUser(url, data);
      //   console.log(response);
      return response;
    } catch (err) {
      return err;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    LoginUser,
    isLoading,
  };
};
