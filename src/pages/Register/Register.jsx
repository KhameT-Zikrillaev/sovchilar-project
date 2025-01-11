import React, { useEffect, useState } from "react";
import { usePostData } from "./hooks/usePostData";

import { toast } from "react-toastify";
import { useGetPhone } from "./hooks/useGetPhone";
import { useEditUser } from "./hooks/useEditUser";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store/store";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: Telefon kiritish, 2: SMS tasdiqlash, 3:Ism familiya parol kiritish
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [smsCode, setSmsCode] = useState("");
  // const [isPassword, setIsPassword]= useState("")
  const [isCode, setIsCode] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [oldUser, setOldUser] = useState(null);
  const { postItem, isLoading } = usePostData();
  const { getPhone } = useGetPhone();
  const { EditUser } = useEditUser();
  const { setUser } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handlePhoneChange = (e) => {
    let input = e.target.value;

    // +998 oldindan mavjud ekanligiga ishonch hosil qilish
    if (!input.startsWith("+998 ")) {
      input = "+998 ";
    }

    // Raqam va " " yoki "-" ni saqlash
    input = input.replace(/[^+0-9- ]/g, "");

    const numbers = input.slice(5).replace(/-/g, ""); // +998 ni olib tashlab, faqat raqamlarni olish
    let formatted = "+998 ";

    // Formatni saqlash (91-555-55-55)
    if (numbers.length > 2) {
      formatted += numbers.slice(0, 2) + "-";
    } else {
      formatted += numbers;
    }
    if (numbers.length > 5) {
      formatted += numbers.slice(2, 5) + "-";
    } else if (numbers.length > 2) {
      formatted += numbers.slice(2);
    }
    if (numbers.length > 7) {
      formatted += numbers.slice(5, 7) + "-";
    } else if (numbers.length > 5) {
      formatted += numbers.slice(5);
    }
    if (numbers.length > 9) {
      formatted += numbers.slice(7, 9);
    } else if (numbers.length > 7) {
      formatted += numbers.slice(7);
    }

    // Maksimal uzunlikni cheklash
    if (formatted.length <= 17) {
      setPhoneNumber(formatted);
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      const response = await postItem("/auth/send-sms", {
        phone: phoneNumber.replace(/[\s-]/g, ""),
      });
      if (response.statusCode === 200) {
        setStep(2);
      }
    } else if (step === 2) {
      const response = await postItem("/auth/verify-code", {
        code: smsCode,
        phone: phoneNumber.replace(/[\s-]/g, ""),
      });

      const res = await getPhone(
        "/users-uz/phone/" + phoneNumber.replace(/[\s-]/g, "")
      );
      setOldUser(res.data);
      if (response.statusCode === 200) {
        setStep(3);
        toast.success(t("register.toasts.success"));
        setIsCode(true);
      } else {
        setIsCode(false);
        toast.error(t("register.toasts.smsError"));
      }
    } else if (step === 3) {
      if (!oldUser) {
        const res = await postItem("/users-uz", {
          phone: phoneNumber.replace(/[\s-]/g, ""),
          firstName: firstName,
          password: password,
        });
        if (res.statusCode === 201) {
          setUser(res.data);
          navigate("/profile");
          toast.success(t("register.toasts.success"));
        } else {
          // toast.error("Bunday raqamli foydalanuvchi bor");
        }
      } else {
        const res = await EditUser("/users-uz/register/" + oldUser.id, {
          phone: phoneNumber.replace(/[\s-]/g, ""),
          firstName: firstName,
          password: password,
        });
        if (res.statusCode === 200) {
          setUser(res.data);
          navigate("/profile");
          toast.success(t("register.toasts.success"));
        } else {
          // toast.error("Bunday raqamli foydalanuvchi bor");
        }
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handlePhoneSubmit}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {(step === 1 && t("register.title.number")) ||
                (step === 2 && t("register.title.smsCode")) ||
                (step === 3 && !oldUser && t("register.title.signup")) ||
                t("register.title.password")}
            </h2>
            {step === 1 && (
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                minLength={17}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            )}
            {step === 2 && (
              <input
                type="text"
                placeholder={t("register.placeholders.codeText")}
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                minLength={6}
                maxLength={6}
                required
                className={
                  "w-full p-3 mb-4 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 " +
                  (!isCode ? "border-red-900" : "border-gray-300")
                }
              />
            )}

            {step === 3 && (
              <>
                <input
                  type="text"
                  placeholder={t("register.placeholders.firstName")}
                  value={firstName}
                  minLength={3}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <input
                  type="password"
                  placeholder={t("register.placeholders.password")}
                  value={password}
                  minLength={5}
                  autoComplete="on"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {/* <input
                  type="password"
                  placeholder="Passwordni tasdiqlang"
                  minLength={5}
                  autoComplete="on"
                    value={isPassword}
                    onChange={(e) => setIsPassword(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> */}
              </>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg text-white font-semibold ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {(step === 1 &&
                (isLoading
                  ? t("register.button.loading.number")
                  : t("register.button.number"))) ||
                (step === 2 &&
                  (isLoading
                    ? t("register.button.loading.confirmation")
                    : t("register.button.confirmation"))) ||
                (step === 3 &&
                  !oldUser &&
                  (isLoading
                    ? t("register.button.loading.signup")
                    : t("register.button.signup"))) ||
                (isLoading
                  ? t("register.button.loading.password")
                  : t("register.button.password"))}
            </button>
          </form>
          <div className="text-center mt-5">
            {t("register.link.text")}{" "}
            <NavLink
              to="/login"
              className="text-red-500 hover:text-red-600 transition-all  duration-200 text-center"
            >
              {t("register.link.link")}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
