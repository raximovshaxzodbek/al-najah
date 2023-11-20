import React, { useState, useEffect, useContext } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useNavigate } from "react-router-dom";
import Axios from "../../../api/Axios";
import { AuthContext } from "../../../hooks/Context/AuthContext";
import taskQuestionAudio from "../../../assets/audio/task1/question5.aac";
import { Button } from "@mui/material";

export default function TaskThreeQuestion5() {
  const { UID, URL, part3_question_time, part3_waiting_time } =
    useContext(AuthContext);

  const [task, setTask] = useState({});
  const [warningSecond, setWarningSecond] = useState(part3_waiting_time);
  const [second, setSecond] = useState(part3_question_time);
  const [uploading, setUploading] = useState(false);

  const [oneAudio, setOneAudio] = useState(false);
  const [twoAudio, setTwoAudio] = useState(false);

  const recorderControls = useAudioRecorder();

  const navigate = useNavigate();

  const addAudioToDatabase = async (blob, fileName) => {
    const formData = new FormData();
    formData.append("id_code", UID);
    formData.append("audio", blob, fileName);
    formData.append("status", "True");

    try {
      Axios.post("audio/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwtToken")).access
          }`,
        },
      });
      setUploading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecordingComplete = async (audioData) => {
    // Convert the audioData to a Blob
    const blob = new Blob([audioData], { type: "video/webm" });

    // Extract the file name from the original audioData
    const fileName = `3.5.${task.id}.webm`;

    // Use the actual file name if available in audioData

    // Send the audio data to the server
    addAudioToDatabase(blob, fileName);
  };

  useEffect(() => {
    const getTask = async () => {
      const { data } = await Axios.get("part3/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwtToken")).access
          }`,
        },
      });
      setTask(data);
    };
    getTask();

    localStorage.getItem("user") ?? navigate("/");
  }, [localStorage.getItem("user")]);

  useEffect(() => {
    if (oneAudio && twoAudio) {
      if (warningSecond > 0) {
        const intervalId = setInterval(() => {
          setWarningSecond((prevSecond) => prevSecond - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      } else {
        recorderControls.startRecording();
        setTimeout(
          () => {
            recorderControls.stopRecording();
          },
          1000 * (part3_question_time - 1),
        );
        if (second > 0) {
          const intervalId = setInterval(() => {
            setSecond((prevSecond) => prevSecond - 1);
          }, 1000);

          return () => clearInterval(intervalId);
        }
      }
    }
  }, [warningSecond, second, oneAudio, twoAudio]);

  const playlist = [taskQuestionAudio, URL + task.audio5];

  const handleEndedOneAudio = () => {
    setOneAudio(true);
  };

  const handleEndedTwoAudio = () => {
    setTwoAudio(true);
  };

  const handleSubmit = () => {
    window.location.href = "/";
    localStorage.removeItem("user");
  };

  return (
    <>
      <audio onEnded={handleEndedOneAudio} autoPlay>
        <source src={playlist[0]} />
        {/* Replace with the actual source of your audio file */}
      </audio>

      {oneAudio && (
        <audio onEnded={handleEndedTwoAudio} autoPlay>
          <source src={playlist[1]} />
          {/* Replace with the actual source of your audio file */}
        </audio>
      )}
      <div
        className={
          "mb-[60px] mt-[60px] flex w-full flex-col justify-center gap-[40px] rounded-[20px] bg-white p-10"
        }
      >
        <div className="mx-auto inline-flex items-center gap-[12px]">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#2A2D33]">
              <h3 className={"text-sm font-semibold text-[#E5E7EA]"}>١</h3>
            </div>
            <h3 className={"text-sm font-semibold text-[#2A2D33]"}>
              الجزء الأول
            </h3>
          </div>
          <div className="line bg-[#E5E7EA] md:h-[1px] md:w-[32px]"></div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#2A2D33]">
              <h3 className="text-sm font-semibold text-[#E5E7EA]">٢</h3>
            </div>
            <h3 className="text-sm font-semibold text-[#2A2D33]">
              الجزء الثاني
            </h3>
          </div>
          <div className="line bg-[#E5E7EA] md:h-[1px] md:w-[32px]"></div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full">
              <h3 className="text-sm font-semibold text-[#118FCE]">٣</h3>
            </div>
            <h3 className="text-sm font-semibold text-[#118FCE]">
              الجزء الثالث
            </h3>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[20px] py-4">
          <h1 className="arabic-text text-center text-2xl font-normal text-[#118FCE] md:text-2xl">
            أنت في الجزء الأول
          </h1>
          <div className="flex flex-col items-center gap-3">
            <h2 className="arabic-text text-xl font-normal md:text-4xl">
              ٥ {task.question5}
            </h2>
          </div>
        </div>
        {warningSecond === 0 && second !== 0 && (
          <div className="flex w-full justify-center">
            <div className="mt-2 flex w-full flex-col items-center justify-center gap-4">
              <AudioRecorder
                onRecordingComplete={handleRecordingComplete}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                showVisualizer={true}
                recorderControls={recorderControls}
              />
            </div>
          </div>
        )}
        {second > 0 && (
          <div className="flex w-full items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#118FCE] md:h-[50px] md:w-[50px]">
              <h1 className="text-xl font-bold text-[#118FCE] md:text-[25px]">
                {oneAudio && twoAudio ? (
                  <span>{warningSecond > 0 ? warningSecond : second}</span>
                ) : (
                  <span>{part3_waiting_time}</span>
                )}
              </h1>
            </div>
          </div>
        )}
        {second === 0 && uploading && (
          <div className="flex justify-center">
            <a href={`${URL}/download/${UID}/`}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                color="warning"
              >
                Tugatishni tasdiqlayman
              </Button>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
