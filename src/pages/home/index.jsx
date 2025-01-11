import React from "react";
import FirstHomePageIntro from "./pages/FirstHomePageIntro";
import SecondHomePageSearch from "./pages/SecondHomePageSearch";
import Comments from "./pages/Comments/Comments";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 mt-[30px]">
      <FirstHomePageIntro />
      <SecondHomePageSearch />
      <Comments />
    </div>
  );
}
