import { useState } from "react";
import UserServices from "../../../services/userServices";
import { toast } from "react-toastify";

export const usePostData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postItem = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.postItem(data, url);
      //   console.log(response);
      return response;
    } catch (err) {
      toast.error("Raqam kiritishda xatolik");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    postItem,
    isLoading,
  };
};
