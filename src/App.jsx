import React, { useEffect } from "react";
import { Navbar, Router } from "./components/Imports";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate("");
  useEffect(() => {
    if (
      window.localStorage.getItem("user") == "false" &&
      window.location.href !== "/" &&
      window.location.href !== "/information"
    ) {
      navigate("/");
    }
  }, [window.localStorage.getItem("user")]);

  return (
    <section className="h-screen w-full overflow-auto bg-[#F7F7F7] p-0 md:px-[30px]">
      <Navbar />
      <Router />
    </section>
  );
}
