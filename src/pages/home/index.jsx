import React from "react";
import FirstHomePageIntro from "./pages/FirstHomePageIntro";
import SecondHomePageSearch from "./pages/SecondHomePageSearch";
import Comments from "./pages/Comments/Comments";
import Faq from "./pages/ThreeFaqPage";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 mt-[30px]">
      <FirstHomePageIntro />
      <SecondHomePageSearch />
      {/* <p className="text-[20px] px-3 md:text-[30px] text-center text-red-600 mt-10">
        Web saytda texnik ishlar olib borilayotganligi sababli hozircha
        anketalar ko'rinmay turadi. Biroz vaqtdan so'ng odatiy holda anketalarni
        ko'rishda davom etasiz!
      </p> */}
      <Comments />
      <Faq />
    </div>
  );
}
