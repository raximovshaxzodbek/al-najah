import React from "react";
import Logo from "../assets/images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const User = ({ logOut }) => {
  if (localStorage.getItem("jwtToken")) {
    return (
      <div className="user relative cursor-pointer">
        <FaUserCircle size={40} color="#118FCE" />
        <div
          className="logout absolute right-0 top-full h-[50px] w-[100px] items-center justify-center rounded-xl bg-white p-3 shadow-lg duration-300"
          onClick={logOut}
        >
          <IoLogOutOutline size={30} />
        </div>
      </div>
    );
  }
};

export default function Navbar() {

  const logOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.setItem("user", false);
    window.location.href = "/"
  };

  return (
    <nav className="flex flex-col items-center justify-center gap-4 pt-5 md:gap-0 md:flex-row">
      <div className="order-2 flex w-1/2 justify-center md:order-none md:block md:w-1/5">
        <img src={Logo} alt="Najah" />
      </div>
      <div className="order-3 w-3/5 text-center md:order-none">
        <div className="w-[882px] max-w-full">
          <h1 className="text-xl font-semibold text-[#118FCE] md:text-2xl">
            “AN-NAJAH CENTER” oʻquv markazining CEFR imtihon tizimining ogʻzaki
            imtihon topshirish dasturiga xush kelibsiz.
          </h1>
        </div>
      </div>
      <div className="order-1 flex w-1/2 items-center justify-center md:order-none md:w-1/5 md:justify-end">
        <User logOut={logOut} />
      </div>
    </nav>
  );
}
