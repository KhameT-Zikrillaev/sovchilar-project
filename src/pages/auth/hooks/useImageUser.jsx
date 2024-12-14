import { useState } from "react";
import UserServices from '../../../services/userServices';
import { toast } from "react-toastify";

function useAddImages() {
  const [isLoading, setIsLoading] = useState(false);

  const addImages = async (data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.addimages(data);
      toast.success("User added successfully");
      return response;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding user");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addImages,
    isLoading,
  };
}

export default useAddImages
