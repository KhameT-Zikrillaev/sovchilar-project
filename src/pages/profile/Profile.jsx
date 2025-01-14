import React, { useState } from "react";
import UserProfile from "./components/UserProfile";
import FormModal from "../../components/customModal/FormModal";
import CombinedForm from "../auth/modules/AddUsers/CombinedForm";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clearUser, user, accessToken, setUserSingle } = useStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusDone = async (id) => {
    const newStatus = "DONE";
    try {
      const response = await axios.put(
        `https://back.sovchilar.net/api/users-uz/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserSingle(response?.data?.data);
      closeModal();
      toast.success(t("Profile.UserProfile.deleteprofilesuccess"));
    } catch (error) {}
  };

  return (
    <div className="container mx-auto px-4 ">
      <div className="max-w-4xl mx-auto pt-32">
        <div className="flex flex-col items-center p-6">
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium flex-grow flex-basic-0 flex-shrink-[200px] flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 transform rotate-[-180deg]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              <span>{t("Profile.form.home")}</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className=" bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium flex-grow flex-basic-0 flex-shrink-[200px]"
            >
              {user?.status === "PENDING"
                ? t("Profile.btn.add")
                : t("Profile.btn.edit")}
            </button>
            <button
              className={`border border-rose-500 text-rose-500 px-6 py-3 rounded-lg hover:bg-rose-50 transition font-medium flex-grow flex-basic-0 flex-shrink-[200px] disabled:border-amber-800 disabled:text-amber-800 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
              onClick={openModal}
              disabled={user?.status !== "ACTIVE" ? true : false}
            >
              {t("Profile.btn.success")}
            </button>
            <button
              onClick={() => {
                clearUser();
                navigate("/");
              }}
              className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium flex-grow flex-basic-0 flex-shrink-[200px] flex items-center justify-center gap-2"
            >
              <span>{t("Profile.btn.logout")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <UserProfile />

      {/* Form Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          user?.status === "PENDING"
            ? t("Profile.form.fill_out_form")
            : t("Profile.btn.edit")
        }
      >
        <div className="pb-4">
          <div className="max-w-3xl mx-auto">
            <CombinedForm handleCloseModal={handleCloseModal} />
          </div>
        </div>
      </FormModal>
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg max-w-[400px]  border-[2px] border-rose-500"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("Profile.modal.happiness_title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("Profile.modal.happiness_message")}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="w-full border border-rose-500 text-rose-500 px-6 py-3 rounded-lg hover:bg-rose-50 transition font-medium"
              >
                {t("Profile.form.cancel")}
              </button>
              <button
                onClick={() => {
                  handleStatusDone(user.id);
                }}
                className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium"
              >
                {t("Profile.form.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
