import React, { useEffect, useState, useRef } from "react";
import { Button, TextField } from "@mui/material";
import { BsTelegram } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../api/Axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordRef = useRef(null);

  const navigate = useNavigate();

  const warningEmpty = () =>
    toast.warning("Barcha qatorlarni to'ldirishingiz talab qilinadi!");
  const warningError = () => toast.warning("Foydalanuvchi topilmadi!");
  const success = () => toast.success("Kirish tastiqlandi.");

  useEffect(() => {
    // Check if the token is stored in the browser
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // If a token is found, redirect to the home page
      navigate("/information");
    }
  }, []);

  const handleShowPassword = () => {
    if (showPassword) {
      showPasswordRef.current.type = "password";
      setShowPassword(false);
    } else {
      showPasswordRef.current.type = "text";
      setShowPassword(true);
    }
  };

  const handleSubmit = async () => {
    if (username && password) {
      setIsLoading(true);

      try {
        const response = await Axios.post(
          "get_token/",
          {
            username: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        localStorage.setItem("jwtToken", JSON.stringify(response?.data));

        setUsername("");
        setPassword("");
        success();
        navigate("/information");
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        warningError();
        setUsername("");
        setPassword("");
      }
    } else {
      warningEmpty();
    }
  };

  return (
    <>
      <div className="login mt-12 flex min-h-[500px] flex-col items-center justify-center gap-5 bg-[#F7F7F7]">
        <div className="z-10 mt-6 flex w-[400px] flex-col items-start justify-center gap-5 rounded-[20px] bg-[#ffffffe0] p-10">
          <h1 className="text-start text-2xl font-bold">Tizimga kirish</h1>
          <div className="relative flex w-full flex-col">
            <labal for="login" className="pb-1 text-black/80">
              Login
            </labal>
            <input
              type="login"
              id="login"
              className="w-full rounded-t-md bg-gray-200/90 p-3 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative flex w-full flex-col">
            <labal for="password" className="pb-1 text-black/80">
              Password
            </labal>
            <input
              type="password"
              id="password"
              className="w-full rounded-t-md bg-gray-200/90 p-3 outline-none"
              value={password}
              ref={showPasswordRef}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-2 top-[40px] cursor-pointer text-xl text-black/80"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <Button
            className="w-full"
            size="large"
            variant="outlined"
            onClick={handleSubmit}
          >
            {isLoading ? <span>Loading...</span> : <span>Davom etish</span>}
          </Button>
        </div>
        <a href="https://t.me/najah_arab_tili" className="z-10" target="_blank">
          <Button
            size="large"
            className={"flex gap-3 p-2"}
            style={{ backgroundColor: "white" }}
          >
            <BsTelegram color="#118FCE" size={20} />
            <span className={"text-base text-[#118FCE]"}>
              Telegram kanalimiz
            </span>
          </Button>
        </a>
      </div>
      <footer></footer>
      <ToastContainer />
    </>
  );
}
