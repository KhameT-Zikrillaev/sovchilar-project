import React, { useEffect, useState } from "react";
import { usePostData } from "./hooks/usePostData";

import { toast } from "react-toastify";
import { useGetPhone } from "./hooks/useGetPhone";
import { useEditUser } from "./hooks/useEditUser";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store/store";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1); // 1: Telefon kiritish, 2: SMS tasdiqlash, 3:Ism familiya parol kiritish
  const [smsCode, setSmsCode] = useState("");
  const [isCode, setIsCode] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [oldUser, setOldUser] = useState(null);
  const [inputType, setInputType] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { postItem, isLoading } = usePostData();
  const { getPhone } = useGetPhone();
  const { EditUser } = useEditUser();
  const { setUser } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleInput = (e) => {
    const input = e.target;
    if (input.validity.valueMissing) {
      input.setCustomValidity(t("register.warning.empty"));
    } else if (input.validity.tooShort) {
      input.setCustomValidity(
        `${t("register.warning.first")} ${input.minLength} ${t(
          "register.warning.second"
        )} ${input.value.length} ${t("register.warning.third")}`
      );
    } else {
      input.setCustomValidity(""); // Validatsiya xabarini tozalash
    }
  };
 
  const handleEmailPhoneChange = (e) => {
    setPhoneNumber(e.target.value);

  };

  useEffect(() => {
    if (inputType === "phone") {
      setPhoneNumber("+998 ");
    }else{
      setPhoneNumber("");
    }
  }, [inputType]);

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
      if (inputType === "phone") {
        const response = await postItem("/auth/send-sms", {
          phone: phoneNumber.replace(/[\s-]/g, ""),
        });
        if (response.statusCode === 200) {
          setStep(2);
        }
      } else {
        const  response = await getPhone(`/users-uz/find-by-email/${email}`);
        
        if(response.statusCode !== 200){
          const response = await postItem("/auth/send-mail", {
            email: email,
          });
          if (response.statusCode === 200) {
            setStep(2);
          }
        }else{
          toast.error(t("register.toasts.haveEmail"));
        }
        
      }
    } else if (step === 2) {
      if (inputType === "phone") {
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
      } else {
        const response = await postItem("/auth/verify-email", {
          code: +smsCode,
          email: email,
        });
        // setOldUser(res.data);
        if (response.statusCode === 200) {
          setStep(3);
          toast.success(t("register.toasts.success"));
          setIsCode(true);
        } else {
          setIsCode(false);
          toast.error(t("register.toasts.smsError"));
        }
      }
    } else if (step === 3 && gender) {
      if (!oldUser) {
        if (inputType === "phone") {
          const res = await postItem("/users-uz", {
            phone: phoneNumber.replace(/[\s-]/g, ""),
            firstName: firstName,
            password: password,
            gender: gender,
          });
          if (res.statusCode === 201) {
            setUser(res.data);
            navigate("/profile");
            toast.success(t("register.toasts.success"));
          } else {
            // toast.error("Bunday raqamli foydalanuvchi bor");
          }
        } else {
          const res = await postItem("/users-uz", {
            email: email,
            firstName: firstName,
            password: password,
            gender: gender,
          });
          
          if (res.statusCode === 201) {
            setUser(res.data);
            navigate("/profile");
            toast.success(t("register.toasts.success"));
          } else {
            // toast.error("Bunday raqamli foydalanuvchi bor");
          }
        }
      } else {
        if (inputType === "phone") {
          const res = await EditUser("/users-uz/register/" + oldUser.id, {
            phone: phoneNumber.replace(/[\s-]/g, ""),
            firstName: firstName,
            password: password,
            gender: gender,
          });
          if (res.statusCode === 200) {
            setUser(res.data);
            navigate("/profile");
            toast.success(t("register.toasts.success"));
          } else {
            // toast.error("Bunday raqamli foydalanuvchi bor");
          }
        } else {
          const res = await EditUser("/users-uz/register/" + oldUser.id, {
            email: email,
            firstName: firstName,
            password: password,
            gender: gender,
            phone: phoneNumber.replace(/[\s-]/g, ""),
          });
          if(res.message === "User with this phone number already exists"){
            toast.error(t("register.toasts.haveNumber"));
          }
          if (res.statusCode === 200) {
            setUser(res.data);
            navigate("/profile");
            toast.success(t("register.toasts.success"));
          } else {
            // toast.error("Bunday raqamli foydalanuvchi bor");
          }
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <>
                {inputType === "phone" ? (
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    onInput={handleInput}
                    required
                    minLength={17}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <input
                    type="email"
                    placeholder={t("register.placeholders.email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                )}
              </>
            )}
            {step === 2 && (
              <input
                type="text"
                placeholder={t("register.placeholders.codeText")}
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                onInput={handleInput}
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
                  onInput={handleInput}
                  minLength={3}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />

                <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t("register.placeholders.password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onInput={handleInput}
                  minLength={5}
                  autoComplete="on"
                  required
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
                </div>
                <select
                  value={gender}
                  required
                  onChange={(e) => setGender(e.target.value)}
                  placeholder={t("register.select.gender")}
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">{t("register.select.gender")}</option>
                  <option value="MALE">{t("register.select.male")}</option>
                  <option value="FEMALE">{t("register.select.female")}</option>
                </select>
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
          {step == 1 && (
            <button
            type="button"
            onClick={() => setInputType(inputType === "email" ? "phone" : "email")}
            className="text-red-500 hover:text-red-600 transition-all  duration-200 text-center font-medium mb-1"
          >
            {inputType === "email" ? t("register.button.byNomer") : t("register.button.byEmail")}
          </button>)}
            <div>
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
      </div>
    </>
  );
};

export default Register;
