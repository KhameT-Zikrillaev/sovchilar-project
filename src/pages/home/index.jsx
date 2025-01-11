import React from "react";
import FirstHomePageIntro from "./pages/FirstHomePageIntro";
import SecondHomePageSearch from "./pages/SecondHomePageSearch";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 mt-[30px]">
      <FirstHomePageIntro />
      {/* <Comments /> */}
      <SecondHomePageSearch />
    </div>
  );
}
