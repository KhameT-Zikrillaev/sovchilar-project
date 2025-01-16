import { useState } from "react";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import userServices from "../../../../../services/userServices";
export const usePostFavorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const postFavoriteUsers = async (url, data, headers) => {
    setIsLoading(true);
    try {
      const response = await userServices.postFavorite(url, data, headers);
      return response;
    } catch (err) {
      //   toast.error(t("register.toasts.numberError"));
    } finally {
      setIsLoading(false);
    }
  };
  return {
    postFavoriteUsers,
    isLoading,
  };
};
