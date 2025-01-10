import { useState } from "react";
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

  const login = async (e) => {
    e.preventDefault();
    const res = await LoginUser("/auth/login", {
      phone: phoneNumber.replace(/[\s-]/g, ""),
      password: password,
    });
    if (res?.statusCode === 200) {
      setUser(res.data);
      navigate("/");
      toast.success("Muvaffaqiyatli");
    } else {
      // toast.error("Bunday raqamli foydalanuvchi bor");
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
            minLength={17}
            required
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
            {isLoading ? t() : t("login.button.loading.text")}
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
