import React, { useState, useEffect, useContext } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Axios from "../../../api/Axios";
import { AuthContext } from "../../../hooks/Context/AuthContext";
import Must2 from "../../../assets/audio/musts/must2.aac";

export default function TaskTwo() {
  const { UID, URL, part2_question_time, part2_waiting_time } =
    useContext(AuthContext);

  const [second, setSecond] = useState(part2_question_time);
  const [warningSecond, setWarningSecond] = useState(part2_waiting_time);
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [oneAudio, setOneAudio] = useState(false);
  const [twoAudio, setTwoAudio] = useState(false);

  const recorderControls = useAudioRecorder();

  const navigate = useNavigate();

  const addAudioToDatabase = async (blob, fileName) => {
    const formData = new FormData();
    formData.append("id_code", UID);
    formData.append("audio", blob, fileName);
    formData.append("status", "False");

    try {
      Axios.post("audio/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwtToken")).access
          }`,
        },
      });
    } catch (error) {
      console.error(error);
      window.location.href = "/";
    }
  };

  const handleRecordingComplete = async (audioData) => {
    // Convert the audioData to a Blob
    const blob = new Blob([audioData], { type: "video/webm" });

    // Extract the file name from the original audioData
    const fileName = `2_${task.topic}.webm`; // Use the actual file name if available in audioData

    // Send the audio data to the server
    addAudioToDatabase(blob, fileName);
  };

  useEffect(() => {
    try {
      const getTask = async () => {
        const { data } = await Axios.get("part2/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jwtToken")).access
            }`,
          },
        });
        setTask(data);
        setIsLoading(true);
      };
      getTask();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, []);

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
          1000 * (part2_question_time - 1),
        );
        if (second > 0) {
          const intervalId = setInterval(() => {
            setSecond((prevSecond) => prevSecond - 1);
          }, 1000);

          return () => clearInterval(intervalId);
        } else {
          navigate("/task_id=3/question=1");
        }
      }
    }
  }, [warningSecond, second, oneAudio, twoAudio]);

  const playlist = [Must2, URL + task.audio];

  const handleEndedOneAudio = () => {
    setOneAudio(true);
  };

  const handleEndedTwoAudio = () => {
    setTwoAudio(true);
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
          "mt-[20px] flex w-full flex-col justify-center gap-[30px] rounded-[20px] bg-white p-5"
        }
      >
        <div className="mx-auto inline-flex items-center gap-[12px]">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#2A2D33]">
              <h3 className={"text-sm font-semibold text-[#E5E7EA]"}>١</h3>
            </div>
            <h3 className={"arabic-text text-sm font-semibold text-[#2A2D33]"}>
              الجزء الأول
            </h3>
          </div>
          <div className="line bg-[#E5E7EA] md:h-[1px] md:w-[32px]"></div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full">
              <h3 className="text-sm font-semibold text-[#118FCE]">٢</h3>
            </div>
            <h3 className="arabic-text text-sm font-semibold text-[#118FCE]">
              الجزء الثاني
            </h3>
          </div>
          <div className="line bg-[#E5E7EA] md:h-[1px] md:w-[32px]"></div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#F7F7F7]">
              <h3 className="text-sm font-semibold text-[#ADAEB1]">٣</h3>
            </div>
            <h3 className="arabic-text text-sm font-semibold text-[#ADAEB1]">
              الجزء الثالث
            </h3>
          </div>
        </div>
        <div className="flex w-full flex-col gap-[20px]">
          <h1 className="arabic-text text-center text-2xl font-normal text-[#118FCE] md:text-2xl">
            أنت في الجزء الثاني
          </h1>
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <h2 className="arabic-text text-xl font-normal md:text-4xl">
                <span className="number">١</span> {task.question1}
              </h2>
              <h2 className="arabic-text text-xl font-normal md:text-4xl">
                <span className="number">٢</span> {task.question2}
              </h2>
              <h2 className="arabic-text text-xl font-normal md:text-4xl">
                <span className="number">٣</span> {task.question3}
              </h2>
              <h2 className="arabic-text text-xl font-normal md:text-4xl">
                <span className="number">٤</span> {task.question4}
              </h2>
              <h2 className="arabic-text text-xl font-normal md:text-4xl">
                <span className="number">٥</span> {task.question5}
              </h2>
            </div>
          ) : (
            <Loading />
          )}
        </div>
        {warningSecond === 0 && second !== 0 && (
          <div className="flex w-full justify-center">
            <div className="flex w-full flex-col items-center justify-center">
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
        <div className="flex w-full items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#118FCE] md:h-[50px] md:w-[50px]">
            <h1 className="text-xl font-bold text-[#118FCE] md:text-[25px]">
              {oneAudio && twoAudio ? (
                <span>{warningSecond > 0 ? warningSecond : second}</span>
              ) : (
                <span>{part2_waiting_time}</span>
              )}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
