import React, { Component, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImCancelCircle } from "react-icons/im";
import Slider from "react-slick";

function Comments() {
  const [isImg, setIsImg] = useState(false);
  const [id, setId] = useState(null);
  const fikr = [
    "/images/sovchilar1.jpg",
    "/images/sovchilar2.jpg",
    "/images/sovchilar3.jpg",
    "/images/sovchilar4.jpg",
    "/images/sovchilar5.jpg",
  ];

  const { t } = useTranslation();

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    Comments: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-16">
      <div className="mb-5 text-center font-bold text-[40px]">
        {t("opinions")}
      </div>
      <div className=" slider-container container overflow-hidden">
        <Slider {...settings}>
          {fikr.map((item, index) => (
            <div
              key={index}
              className="flex justify-center gap-0 md:gap-8 items-center p-1 "
            >
              <img
                onClick={() => {
                  setIsImg(true);
                  setId(index);
                }}
                className="w-[400px] h-[300px] object-cover rounded cursor-pointer "
                src={item}
                alt="123"
              />
            </div>
          ))}
        </Slider>
      </div>

      {isImg && (
        <div className="block">
          <div className=" bg-black z-50 p-10 fixed top-0 left-0 bg-opacity-80 w-[100vw] h-[100vh] flex justify-center items-center">
            <ImCancelCircle
              onClick={() => setIsImg(false)}
              className="text-white text-[40px] absolute top-8 right-8 cursor-pointer"
            />
            <img src={fikr[id]} alt={"image"} className="h-full rounded" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
