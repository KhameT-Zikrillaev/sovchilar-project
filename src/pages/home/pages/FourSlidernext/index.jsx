import React from 'react'
import Marquee from "react-fast-marquee";
import photo1 from "./../../../../assets/images/slide-1-sovchilar.png"
import photo2 from "./../../../../assets/images/slide-2-sovchilar.png"
import photo3 from "./../../../../assets/images/slide-3-sovchilar.png"
import photo4 from "./../../../../assets/images/slide-4-sovchilar.png"
import photo5 from "./../../../../assets/images/slide-5-sovchilar.png"
import photo6 from "./../../../../assets/images/slide-6-sovchilar.png"
import photo7 from "./../../../../assets/images/slide-7-sovchilar.png"
export default function index() {
  return (
    <>
    <div className=''>
    <Marquee className=''>
 
 <img className='w-[200px] mr-20' src={photo1} alt="" />
  <img  className='w-[200px] mr-20' src={photo2} alt="" />
  <img  className='w-[200px] mr-20' src={photo3} alt="" />
  <img  className='w-[200px] mr-20' src={photo4} alt="" />
  <img  className='w-[200px] mr-20' src={photo5} alt="" />
  <img  className='w-[200px] mr-20' src={photo6} alt="" />
  <img  className='w-[200px] mr-20' src={photo7} alt="" />
  <img className='w-[200px] mr-20' src={photo1} alt="" />
  <img  className='w-[200px] mr-20' src={photo2} alt="" />
  <img  className='w-[200px] mr-20' src={photo3} alt="" />
  <img  className='w-[200px] mr-20' src={photo4} alt="" />
  <img  className='w-[200px] mr-20' src={photo5} alt="" />
  <img  className='w-[200px] mr-20' src={photo6} alt="" />
  <img  className='w-[200px] mr-20' src={photo7} alt="" />

</Marquee>
      </div>
      </>
  )
}
