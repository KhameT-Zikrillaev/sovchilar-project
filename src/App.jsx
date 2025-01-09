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

import { CardProvider } from "./context/CardContext";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // once: true - анимация срабатывает только один раз
  }, []);
  return (
    <>
      <CardProvider>
        {loading ? (
          <SiteLoading />
        ) : (
          <div className="wrapper">
            <Reklama />
            <HeaderLayout />
            <MainLayout />
            <FooterLayout />
          </div>
        )}
      </CardProvider>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
