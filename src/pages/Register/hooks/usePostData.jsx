import { useState } from "react";
import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export const usePostData = () => {
  const [isLoading, setIsLoading] = useState(false);
 const { t } = useTranslation();
  const postItem = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.postItem(data, url);
      //   console.log(response);
      return response;
    } catch (err) {
      toast.error(t("register.toasts.numberError"));
    } finally {
      setIsLoading(false);
    }
  };
  return {
    postItem,
    isLoading,
  };
};
