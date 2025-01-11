import React, { Component } from "react";
import Slider from "react-slick";

function Comments() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container overflow-hidden">
      <Slider {...settings}>
        <div className="flex justify-center items-center p-1">
          <div className="flex gap-2">
            <img
              className="w-[40px] h-[40px] rounded-full border border-black"
              src="https://via.placeholder.com/1200x600"
              alt="alt"
            />
            <div>
              <p className="font-bold">Salima Sheraliyeva</p>
              <p>★★★★★</p>
            </div>
          </div>
          <img
            className="w-[400px] h-[300px]"
            src="https://via.placeholder.com/1200x600"
            alt="123"
          />
          <div className="slider-content">
            <p className="max-w-[400px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              sunt!"
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center p-1">
          <div className="flex gap-2">
            <img
              className="w-[40px] h-[40px] rounded-full border border-black"
              src="https://via.placeholder.com/1200x600"
              alt="alt"
            />
            <div>
              <p className="font-bold">Salima Sheraliyeva</p>
              <p>★★★★★</p>
            </div>
          </div>
          <img
            className="w-[400px] h-[300px]"
            src="https://via.placeholder.com/1200x600"
            alt="123"
          />
          <div className="slider-content">
            <p className="max-w-[400px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              sunt!"
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center p-1">
          <div className="flex gap-2">
            <img
              className="w-[40px] h-[40px] rounded-full border border-black"
              src="https://via.placeholder.com/1200x600"
              alt="alt"
            />
            <div>
              <p className="font-bold">Salima Sheraliyeva</p>
              <p>★★★★★</p>
            </div>
          </div>
          <img
            className="w-[400px] h-[300px]"
            src="https://via.placeholder.com/1200x600"
            alt="123"
          />
          <div className="slider-content">
            <p className="max-w-[400px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              sunt!"
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center p-1">
          <div className="flex gap-2">
            <img
              className="w-[40px] h-[40px] rounded-full border border-black"
              src="https://via.placeholder.com/1200x600"
              alt="alt"
            />
            <div>
              <p className="font-bold">Salima Sheraliyeva</p>
              <p>★★★★★</p>
            </div>
          </div>
          <img
            className="w-[400px] h-[300px]"
            src="https://via.placeholder.com/1200x600"
            alt="123"
          />
          <div className="slider-content">
            <p className="max-w-[400px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              sunt!"
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center p-1">
          <div className="flex gap-2">
            <img
              className="w-[40px] h-[40px] rounded-full border border-black"
              src="https://via.placeholder.com/1200x600"
              alt="alt"
            />
            <div>
              <p className="font-bold">Salima Sheraliyeva</p>
              <p>★★★★★</p>
            </div>
          </div>
          <img
            className="w-[400px] h-[300px]"
            src="https://via.placeholder.com/1200x600"
            alt="123"
          />
          <div className="slider-content">
            <p className="max-w-[400px]">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              sunt!"
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Comments;
