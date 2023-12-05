import React, { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import VoiceRecorder from "../../components/VoiceRecorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Axios from "../../api/Axios";
import { AuthContext } from "../../hooks/Context/AuthContext";
import { v4 as uuidv4 } from "uuid";

export default function Information() {
  const {
    UID,
    SETUID,
    setPart1_question_time,
    setPart1_waiting_time,
    setPart2_question_time,
    setPart2_waiting_time,
    setPart3_question_time,
    setPart3_waiting_time,
  } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uid = uuidv4();

  const warning = () =>
    toast.warning("Barcha qatorlarni to'ldirishingiz talab qilinadi!");
  const warningError = () => toast.warning("Ro'yxatdan o'tmaganmisiz!");
  const success = () => toast.success("Ma'lumotlaringiz saqlandi.");

  const warningStatus = () => toast.warning("A'zolik mudati tugagan!");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name && surname && fatherName) {
      setIsLoading(true);
      try {
        await Axios.post(
          "user/",
          {
            id_code: UID,
            name: name,
            surname: surname,
            middle_name: fatherName,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jwtToken")).access
              }`,
            },
          },
        );

        success();
        setName("");
        setSurname("");
        setFatherName("");
        localStorage.setItem("user", true);
        navigate("/task_id=1/question=1");
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        warningError();
      }
    } else {
      warning();
    }
  };

  useEffect(() => {
    SETUID(uid);

    try {
      if (localStorage.getItem("jwtToken")) {
        const getStatus = async () => {
          const { data } = await Axios.get("status/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jwtToken")).access
              }`,
            },
          });
          if (data.status === "False") {
            warningStatus();
            localStorage.removeItem("jwtToken");
            window.location.href = "/";
          }
        };
        getStatus();

        const getSettings = async () => {
          const { data } = await Axios.get("settings/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("jwtToken")).access
              }`,
            },
          });
          setPart1_question_time(data.part1_question_time);
          setPart1_waiting_time(data.part1_waiting_time);
          setPart2_question_time(data.part2_question_time);
          setPart2_waiting_time(data.part2_waiting_time);
          setPart3_question_time(data.part3_question_time);
          setPart3_waiting_time(data.part3_waiting_time);
        };
        getSettings();
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="mt-8 flex min-h-[400px] flex-col items-center justify-center gap-3 bg-[#F7F7F7]">
      <div className="flex w-[400px]  flex-col items-start justify-center gap-3 rounded-[20px] bg-[#fff] p-8">
        <div className="flex w-full flex-col gap-5">
          <h1 className="text-start text-xl font-bold">
            Ma’lumotlaringizni kiriting
          </h1>
          <TextField
            id="name"
            label="Ism"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="surname"
            label="Familiya"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            id="father-name"
            label="Otasining ismi"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <h1 className="text-start text-xl font-bold">
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
          {!isLoading ? <span>Boshlash</span> : <span>Loading...</span>}
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
