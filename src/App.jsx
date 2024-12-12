import { useState, useEffect } from 'react'
import HeaderLayout from './layout/HeaderLayout'
import MainLayout from './layout/MainLayout'
import FooterLayout from './layout/FooterLayout'
import SiteLoading from './components/SiteLoading/SiteLoading';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <SiteLoading />
      ) : (
        <div className="wrapper">
          <HeaderLayout />
          <MainLayout />
          <FooterLayout />
        </div>
      )}
    </>
  );
}

export default App;
