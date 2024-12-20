import React from "react";
import { FaHeart } from "react-icons/fa"; // Импортируем иконку сердца
import "./Reklama.css";
import Male from "../../assets/images/MaleWedding.png";
import Female from "../../assets/images/FemaleWedding.png";
import Rings from "../../assets/images/Rings.png";
import insta from "../../assets/images/insta.png";
import instatext from "../../assets/images/insta-text.png";
export default function Reklama() {
  return (
    <>
    <a href="">
      <div className="reklama h-[35px] bg-white text-center fixed w-full top-0 z-50 flex items-center justify-center">
        <img  className="animatepulseicon mx-2 h-[20px]" src={Male} alt="" />
        <div className="animate-text-bged   text-[12px] md:text-sm flex items-center">
          <span>Haqiqiy sevgingizni toping va baxtli oila quring!</span>
          <img className="h-[15px] hidden md:inline ml-2" src={Rings} alt="" />
          <span className="hidden md:inline ml-2hidden md:inline ml-2">Sevgi va oila topish imkoniyati – bu yerda.</span>
        </div>
        <img  className="animatepulseicon mx-2 h-[20px]" src={Female} alt="" />
          <img className="w-10 overflow-hidden animate-pulse" src={insta} alt="Instagram Icon" />
          <img  className="w-20 animate-pulse"  src={instatext} alt="Instagram Text" />
      </div>
      </a>
    </>
  );
}
