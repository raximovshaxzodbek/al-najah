import React, { useState, useEffect, useContext } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import Axios from "../../../api/Axios";
import { AuthContext } from "../../../hooks/Context/AuthContext";
import taskQuestionAudio from "../../../assets/audio/task1/question5.aac";
import { Button } from "@mui/material";
import ReactLoading from "react-loading";

export default function TaskThreeQuestion5() {
  const { UID, URL, part3_question_time, part3_waiting_time, partThreeData } =
    useContext(AuthContext);

  const [warningSecond, setWarningSecond] = useState(part3_waiting_time);
  const [second, setSecond] = useState(part3_question_time);
  const [uploading, setUploading] = useState(false);

  const [oneAudio, setOneAudio] = useState(false);
  const [twoAudio, setTwoAudio] = useState(false);

  const recorderControls = useAudioRecorder();

  const addAudioToDatabase = async (blob, fileName) => {
    const formData = new FormData();
    formData.append("id_code", UID);
    formData.append("audio", blob, fileName);
    formData.append("status", "True");

    try {
      const data = Axios.post("audio/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwtToken")).access
          }`,
        },
      });
      console.log(data);
      setTimeout(() => {
        setUploading(true);
      }, 5000);
    } catch (error) {
      console.error(error);
      window.location.href = "/";
    }
  };

  const handleRecordingComplete = async (audioData) => {
    const blob = new Blob([audioData], { type: "video/webm" });
    const fileName = `3_${partThreeData.question5}.webm`;
    addAudioToDatabase(blob, fileName);
  };

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

  const playlist = [taskQuestionAudio, URL + partThreeData.audio5];

  const handleEndedOneAudio = () => {
    setOneAudio(true);
  };

  const handleEndedTwoAudio = () => {
    setTwoAudio(true);
  };

  const handleSubmit = () => {
    window.location.href = "/";
    localStorage.setItem("user", false);
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
            أنت في الجزء الثالث
          </h1>
          <div className="flex flex-col items-center gap-3">
            {oneAudio ? (
              <h2 className="arabic-text text-xl font-normal md:text-4xl">
                <span className="number">٥</span> {partThreeData.question5}
              </h2>
            ) : null}
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
        {second > 0 ? null : (
          <div className="flex w-full justify-center">
            {uploading ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <a href={`${URL}/download/${UID}/`}>
                  <Button variant="contained" color="success">
                    Audiolarni yuklab olish
                  </Button>
                </a>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleSubmit}
                >
                  Tugatishni tasdiqlayman
                </Button>
              </div>
            ) : (
              <ReactLoading
                type="spinningBubbles"
                color={"#000"}
                width={50}
                height={50}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
