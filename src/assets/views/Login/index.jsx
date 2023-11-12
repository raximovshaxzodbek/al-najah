import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { BsTelegram } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const warningEmpty = () => toast.warning("!أنت لم تملأ");
  const warningError = () => toast.warning("هنالك خطأ");
  const success = () => toast.success("!ناجح");

  const handleSubmit = () => {
    if (login && password) {
      if (login === "web" && password === "123") {
        success();
        window.location.href = "/information";
        setLogin("");
        setPassword("");
      } else {
        warningError();
      }
    } else {
      warningEmpty();
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-150px)] flex-col items-center justify-center gap-10 bg-[#F7F7F7]">
        <div className="flex w-[400px]  flex-col items-start justify-center gap-5 rounded-[20px] bg-[#fff] p-10">
          <h1 className="text-start text-3xl font-bold">Tizimga kirish</h1>
          <TextField
            id="filled-multiline-flexible"
            label="Login"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            id="filled-multiline-flexible"
            label="Parol"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full"
            size="large"
            variant="outlined"
            onClick={handleSubmit}
          >
            Davom etish
          </Button>
        </div>
        <a href="https://t.me/najah_arab_tili" target="_blank">
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
