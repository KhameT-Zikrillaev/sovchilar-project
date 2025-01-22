import { useState, useEffect } from "react";
import HeaderLayout from "./layout/HeaderLayout";
import MainLayout from "./layout/MainLayout";
import FooterLayout from "./layout/FooterLayout";
import SiteLoading from "./components/SiteLoading/SiteLoading";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Reklama from "./components/Reklama2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CardProvider } from "./context/CardContext";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./services/api";
import { useStore } from "./store/store";

function App() {
  const [loading, setLoading] = useState(true);
  const { accessToken, clearUser, setUserSingleReload } = useStore();
  const navigate = useNavigate();
  const location = useLocation()

  const token = async (token) => {
    try {
      const response = await api.post("/auth/verify", {
        accessToken: token,
      });

      if (!response?.data) {
        navigate("/");
        clearUser();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (accessToken) {
      token(accessToken);
    } else {
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    AOS.init({ durationsetUserSingleReload: 1000, once: true }); // once: true - анимация срабатывает только один раз
    setUserSingleReload();
  }, []);
  return (
    <>
      <CardProvider>
        {loading ? (
          <SiteLoading />
        ) : (
          <div className="wrapper overflow-x-hidden w-full overflow-y-hidden">
            <Reklama />
            <HeaderLayout />
            <MainLayout />
            {location?.pathname !== "/chat" && <FooterLayout />} 
          </div>
        )}
      </CardProvider>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
