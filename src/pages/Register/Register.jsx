import React, { useState } from "react";
import { usePostData } from "./hooks/usePostData";

import { toast } from "react-toastify";
import { useGetPhone } from "./hooks/useGetPhone";
import { useEditUser } from "./hooks/useEditUser";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: Telefon kiritish, 2: SMS tasdiqlash, 3:Ism familiya parol kiritish
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [smsCode, setSmsCode] = useState("");
  const [userID, setUserID] = useState(null);
  // const [isPassword, setIsPassword]= useState("")
  const [isCode, setIsCode] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [oldUser, setOldUser] = useState(null);
  const { postItem, isLoading } = usePostData();
  const { getPhone } = useGetPhone();
  const { EditUser } = useEditUser();

  const handlePhoneChange = (e) => {
    let input = e.target.value;

    // +998 oldindan mavjud ekanligiga ishonch hosil qilish
    if (!input.startsWith("+998 ")) {
      input = "+998 ";
    }

    // Raqam va " " yoki "-" ni saqlash
    input = input.replace(/[^+0-9- ]/g, "");

    // Formatni saqlash (91-555-55-55)
    if (input.length > 5) {
      input = input.slice(0, 5) + input.slice(5);
    }
    if (input.length > 6 && input[7] !== "-") {
      input = input.slice(0, 7) + "-" + input.slice(7);
    }
    if (input.length > 10 && input[11] !== "-") {
      input = input.slice(0, 11) + "-" + input.slice(11);
    }
    if (input.length > 13 && input[14] !== "-") {
      input = input.slice(0, 14) + "-" + input.slice(14);
    }

    // Maksimal uzunlikni cheklash
    if (input.length <= 17) {
      setPhoneNumber(input);
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
        toast.success("Muvaffaqiyatli");
        setIsCode(true);
      } else {
        setIsCode(false);
        toast.error("Sms kod xato");
      }
    } else if (step === 3) {
      if (!oldUser) {
        const res = await postItem("/users-uz", {
          phone: phoneNumber.replace(/[\s-]/g, ""),
          firstName: firstName,
          password: password,
        });
        if (res.statusCode === 201) {
          localStorage.setItem("accessToken", res.data.tokens.accessToken);
          localStorage.setItem("refreshToken", res.data.tokens.refeshToken);
          localStorage.setItem("firstName", res.data.user.firstName);
          console.log(res);
          toast.success("Muvaffaqiyatli");
        } else {
          toast.error("Bunday raqamli foydalanuvchi bor");
        }
      } else {
        const res = await EditUser("/users-uz/register/" + oldUser.id, {
          phone: phoneNumber.replace(/[\s-]/g, ""),
          firstName: firstName,
          password: password,
        });
        if (res.statusCode === 200) {
          console.log(res);
          localStorage.setItem("accessToken", res.data.tokens.accessToken);
          localStorage.setItem("refreshToken", res.data.tokens.refeshToken);
          localStorage.setItem("firstName", res.data.user.firstName);
          toast.success("Muvaffaqiyatli");
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
                (step === 3 && !oldUser && "Ro'yxatdan o'ting") ||
                "Parol qo'ying"}
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
                placeholder="Tasdiqlash kodi"
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
                  placeholder="Ismingizni kiriting"
                  value={firstName}
                  minLength={3}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <input
                  type="password"
                  placeholder="Password yarating"
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
                  (isLoading ? "Tasdiqlanmoqda..." : "Tasdiqlash")) ||
                (step === 3 &&
                  !oldUser &&
                  (isLoading
                    ? "Ro'yxatdan o'tilmoqda..."
                    : "Ro'yxatdan o'tish")) ||
                (isLoading ? "Parol qo'yilmoqda" : "Parol qo'yish")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
