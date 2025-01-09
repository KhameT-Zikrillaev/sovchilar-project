import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";

export const useGetPhone = () => {
  const getPhone = async (url) => {
    try {
      const response = await UserServices.getPhone(url);
      return response;
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    } finally {
    }
  };
  return {
    getPhone,
  };
};
