import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
export const useGetPhone = () => {
  const { t } = useTranslation();
  const getPhone = async (url) => {
    try {
      const response = await UserServices.getPhone(url);
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || t("register.toasts.error"));
    } finally {
    }
  };
  return {
    getPhone,
  };
};
