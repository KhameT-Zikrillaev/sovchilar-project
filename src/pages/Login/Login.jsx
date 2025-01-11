import { useEffect, useState } from "react";
import { useLogin } from "./hooks/useLogin";
import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [password, setPassword] = useState("");
  const { setUser } = useStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { LoginUser, isLoading } = useLogin();

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

  const login = async (e) => {
    e.preventDefault();
    const res = await LoginUser("/auth/login", {
      phone: phoneNumber.replace(/[\s-]/g, ""),
      password: password,
    });
    if (res?.statusCode === 200) {
      setUser(res.data);
      navigate("/profile");
      toast.success(t("register.toasts.success"));
    } else {
      toast.error(t("register.toasts.notUser"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={login}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t("login.title")}
          </h2>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            required
            minLength={17}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            placeholder={t("login.placeholders.password")}
            autoComplete="on"
            value={password}
            minLength={5}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 rounded-lg text-white font-semibold ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isLoading
              ? t("login.button.loading.text")
              : t("login.button.text")}
          </button>
        </form>

        <div className="text-center mt-5">
          {t("login.links.text")}{" "}
          <NavLink
            to="/register"
            className="text-red-500 hover:text-red-600 transition-all  duration-200 text-center"
          >
            {t("login.links.link")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
