import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import VoiceRecorder from "../../../components/VoiceRecorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Information() {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [fatherName, setFatherName] = useState("");

  const warning = () => toast.warning("!أنت لم تملأ");
  const success = () => toast.success("!ناجح");

  const handleSubmit = () => {
    if (name && surName && fatherName) {
      success();
      window.location.href = "/tasks/1";
      setName("");
      setSurName("");
      setFatherName("");
    } else {
      warning();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#F7F7F7] pb-8 pt-[80px]">
      <div className="flex w-[400px]  flex-col items-start justify-center gap-12 rounded-[20px] bg-[#fff] p-10">
        <div className="flex w-full flex-col gap-5">
          <h1 className="text-start text-3xl font-bold">
            Ma’lumotlaringizni kiritnig
          </h1>
          <TextField
            id="filled-multiline-flexible"
            label="Ism"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-multiline-flexible"
            label="Familiya"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
          />
          <TextField
            id="filled-multiline-flexible"
            label="Otasining ismi"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
        <div>
          <h1 className="text-start text-3xl font-bold">
            Mikrofoningizni tekshirib oling
          </h1>
          <VoiceRecorder downloadOnSavePress={false} />
        </div>
        <Button
          className="w-full"
          size="large"
          variant="outlined"
          onClick={handleSubmit}
        >
          Boshlash
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
