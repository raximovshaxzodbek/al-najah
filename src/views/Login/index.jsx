import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { BsTelegram } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../api/Axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="login flex min-h-[500px] flex-col items-center justify-center gap-5 mt-12 bg-[#F7F7F7]">
        <div className="flex w-[400px] mt-6 flex-col items-start justify-center z-10 gap-5 rounded-[20px] bg-[#ffffffe0] p-10">
          <h1 className="text-start text-2xl font-bold">Tizimga kirish</h1>
          <TextField
            id="login"
            label="Login"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
