import React from "react";
import Logo from "../assets/images/logo.png";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center py-5 md:flex-row flex-col md:gap-0 gap-4">
      <div className="w-1/5">
        <img src={Logo} alt="Najah" />
      </div>
      <div className="w-4/5 text-center">
        <div className="w-[882px] max-w-full">
          <h1 className="md:text-3xl text-xl font-semibold text-[#118FCE]">
            “AN-NAJAH CENTER” oʻquv markazining CEFR imtihon tizimining ogʻzaki
            imtihon topshirish dasturiga xush kelibsiz.
          </h1>
        </div>
      </div>
    </nav>
  );
}
