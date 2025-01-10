import { useState } from "react";
import UserServices from '../../../services/userServices';
import { toast } from "react-toastify";

function useUser() {
  const [isLoading, setIsLoading] = useState(false);

  const addNewUsers = async (data) => {
    setIsLoading(true);
    try {
      const response = await UserServices.add(data);
      toast.success("User added successfully");
      return response;
    } catch (err) {
      // console.error(err);
      toast.error(err.response?.data?.message || "Error adding user");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addNewUsers,
    isLoading,
  };
}

export default useUser;
