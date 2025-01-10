import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PersonalInfoForm from "./modules/AddUsers/FormOne/PersonalInfoForm";
import AdditionalInfoForm from "./modules/AddUsers/FormTwo/AdditionalInfoForm";
import SuccessModal from "./modules/SuccessModal";
import SiteLoading from "../../components/SiteLoading/SiteLoading";
import { useTranslation } from "react-i18next";
import useAddUser from "./hooks/useAddUser";

const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-2">
    <div className="flex items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep === 1
            ? "bg-rose-500 text-white"
            : "bg-rose-100 text-rose-500"
        }`}
      >
        1
      </div>
      <div
        className={`w-16 h-1 ${
          currentStep === 2 ? "bg-rose-500" : "bg-rose-100"
        }`}
      />
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentStep === 2
            ? "bg-rose-500 text-white"
            : "bg-rose-100 text-rose-500"
        }`}
      >
        2
      </div>
    </div>
  </div>
);

export default function Auth() {
  const { addNewUsers, isLoading } = useAddUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  // Получаем параметр gender из URL
  const searchParams = new URLSearchParams(location.search);
  const genderFromUrl = searchParams.get("gender");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    gender: genderFromUrl || "",
    address: "",
    qualification: "",
    jobTitle: "",
    nationality: "",
    maritalStatus: "",
    description: "",
    telegram: "",
    // terms: null,
    imageUrL: "",
  });

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "age"
          ? isNaN(value)
            ? prev.age
            : Number(value)
          : type === "checkbox"
          ? checked
          : value, // Проверка на числовое значение для age
    }));
  };

  const handleImageChange = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      imageUrL: imageUrl, // Обновляем состояние с URL изображения
    }));
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    const capitalizeFirstLetter = (str) => {
      if (!str) return str;
      // Если первая буква уже заглавная, оставляем как есть
      if (str[0] === str[0].toUpperCase()) return str;
      // Иначе делаем первую букву заглавной
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const userData = {
      firstName: capitalizeFirstLetter(formData.firstName),
      lastName: capitalizeFirstLetter(formData.lastName),
      phone: formData.phone,
      age: formData.age,
      gender: formData.gender.toUpperCase(),
      address: formData.address.toUpperCase(),
      qualification: formData.qualification,
      jobTitle: formData.jobTitle,
      nationality: formData.nationality,
      status: "INACTIVE",
      telegram: formData.telegram
        ? formData.telegram.includes("t.me/")
          ? formData.telegram
          : `t.me/${formData.telegram}`
        : "",
      maritalStatus: formData.maritalStatus.toUpperCase(),
      description: formData.description,
      imageUrl: formData.imageUrL,
    };

    try {
      const response = await addNewUsers(userData);

      // console.log("Data sent:", userData);

      if (
        response?.statusCode === 201 &&
        response?.message === "User created successfully"
      ) {
        setIsError(false); // Успех
      } else if (
        response?.message === "User already exists with this phone number"
      ) {
        setIsError(true); // Неожиданная ошибка
      }
      setIsModalOpen(true);
    } catch (error) {
      // console.error("Error adding user:", error);
      setIsError(true); // Ошибка
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
    setIsError(false);
  };
  return (
    <>
      {loading ? (
        <SiteLoading />
      ) : (
        <div className="min-h-screen bg-white  px-4 sm:px-6 lg:px-8 mt-[99px]">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {t("auth.FormOne.formTitle")}
                </h2>
                <p className="text-lg text-gray-600">
                  {step === 1
                    ? t("auth.FormOne.formDescription")
                    : t("auth.FormTwo.formTitle")}
                </p>
                <span className="text-md mt-2 text-blue-600">
                  {t("auth.FormOne.formPravile")}
                </span>
              </div>

              <StepIndicator currentStep={step} />

              {step === 1 ? (
                <PersonalInfoForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleNextStep}
                />
              ) : (
                <AdditionalInfoForm
                  formData={formData}
                  gender={formData.gender}
                  onInputChange={handleInputChange}
                  onImageChange={handleImageChange}
                  onPrevStep={handlePrevStep}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
          <SuccessModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            isError={isError}
            errorMessage={errorMessage} // Добавьте это свойство
          />
        </div>
      )}
    </>
  );
}
