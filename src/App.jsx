import { useState, useEffect } from 'react'
import HeaderLayout from './layout/HeaderLayout'
import MainLayout from './layout/MainLayout'
import FooterLayout from './layout/FooterLayout'
import SiteLoading from './components/SiteLoading/SiteLoading';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Reklama from './components/Reklama2';
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
    </>
  );
}

export default App;
