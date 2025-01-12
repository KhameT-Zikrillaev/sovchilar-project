import { useState } from "react";
import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export const useEditUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const EditUser = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.editUser(url, data);
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || t("register.toasts.error"));
    } finally {
      setIsLoading(false);
    }
  };
  return {
    EditUser,
    isLoading,
  };
};
