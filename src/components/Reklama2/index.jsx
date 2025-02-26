import React from "react"; // Импортируем иконку сердца
import "./Reklama.css";
import Male from "../../assets/images/MaleWedding.png";
import Female from "../../assets/images/FemaleWedding.png";
import Rings from "../../assets/images/Rings.png";
import insta from "../../assets/images/insta.png";
import instatext from "../../assets/images/insta-text.png";
import { useTranslation } from "react-i18next";
export default function Reklama() {
  const { t } = useTranslation();
  return (
    <>
      <a href="https://www.instagram.com/sovchilar.net_/">
        <div className="reklama h-[35px] bg-white text-center fixed w-full top-0 z-50 flex items-center justify-center">
          <img
            className="animatepulseicon hidden sm:inline mx-2 h-[20px]"
            src={Male}
            alt=""
          />
          <div className="animate-text-bged   text-[12px] md:text-sm flex items-center">
            <span className="hidden xl:inline">{t("reklama.text1")}</span>
            <img
              className="h-[15px] hidden md:inline ml-2"
              src={Rings}
              alt=""
            />
            <span className=" ml-2">{t("reklama.text2")}</span>
            <span>
              {" "}
              <strong>sovchilar.net</strong>
            </span>
          </div>
          <img
            className="animatepulseicon hidden sm:inline mx-2 h-[20px]"
            src={Female}
            alt=""
          />
          <img
            className="w-10 overflow-hidden animate-pulse"
            src={insta}
            alt="Instagram Icon"
          />
          <img
            className="w-20 animate-pulse"
            src={instatext}
            alt="Instagram Text"
          />
        </div>
      </a>
    </>
  );
}
