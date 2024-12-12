import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteLoading from '../SiteLoading/SiteLoading';
import logo from '../../assets/images/logo.png';
const NavbarLogo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <>
      {loading && <SiteLoading />}
      <a 
        href="/" 
        onClick={handleClick}
        className="text-4xl flex items-center gap-2 group"
      >
        <span className="flex items-center transform transition-all duration-300 group-hover:scale-110">
         <img className="w-16  h-16" src={logo} alt="" />
          <span className="animate-pulse text-yellow-500">✨</span>
        </span>
        <span className="font-['Tangerine'] bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-transparent bg-clip-text transform transition-all duration-300 group-hover:from-yellow-400 group-hover:via-pink-400 group-hover:to-purple-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          Sovchilar.net
        </span>
      </a>
    </>
  );
};

export default NavbarLogo;
