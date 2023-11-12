import React, { useState, useEffect } from "react";
import VoiceRecorder from "../../../components/VoiceRecorder";
import TaskVoiceRecorder from "./TaskVoiceRecorder";

export default function TaskTwo() {
  const [second, setSecond] = useState(10);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if (timer) {
      if (second > 0) {
        const intervalId = setInterval(() => {
          setSecond((prevSecond) => prevSecond - 1);
        }, 1000);

        return () => clearInterval(intervalId);
      } else {
        window.location.href = "/tasks/2";
      }
    }
  }, [second]);
  return (
    <div
      className={
        "mb-[60px] mt-[60px] flex w-full flex-col justify-center gap-[40px] rounded-[20px] bg-white p-10"
      }
    >
      <div className="mx-auto inline-flex items-center gap-[12px]">
        <div className="flex items-center gap-2">
          <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#2A2D33]">
            <h3 className={"text-sm font-semibold text-[#E5E7EA]"}>١</h3>
          </div>
          <h3 className={"arabic-text text-sm font-semibold text-[#2A2D33]"}>
            الجزء الأول
          </h3>
        </div>
        <div className="line h-[1px] w-[32px] bg-[#E5E7EA]"></div>
        <div className="flex items-center gap-2">
          <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full">
            <h3 className="text-sm font-semibold text-[#118FCE]">٢</h3>
          </div>
          <h3 className="arabic-text text-sm font-semibold text-[#118FCE]">
            الجزء الثاني
          </h3>
        </div>
        <div className="line h-[1px] w-[32px] bg-[#E5E7EA]"></div>
        <div className="flex items-center gap-2">
          <div className="circle flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#F7F7F7]">
            <h3 className="text-sm font-semibold text-[#ADAEB1]">٣</h3>
          </div>
          <h3 className="arabic-text text-sm font-semibold text-[#ADAEB1]">
            الجزء الثالث
          </h3>
        </div>
      </div>
      <div className="flex w-full flex-col items-end gap-[40px] py-4">
        <h1 className="arabic-text text-[40px] font-normal text-[#2A2D33]">
          عقد اللواء محمود شعراوى وزير التنمية المحلية إجتماعاًمع منجستاب هايلي
        </h1>
        <div className="flex flex-col gap-5">
          <h2 className="arabic-text text-4xl text-[40px] font-normal">
            ١ عقد اللواء محمود شعراوى وزير التنمية المحلية إجتماعاًمع منجستاب
            هايلي
          </h2>
          <h2 className="arabic-text text-4xl text-[40px] font-normal">
            ٢ عقد اللواء محمود شعراوى وزير التنمية المحلية إجتماعاًمع منجستاب
            هايلي
          </h2>
          <h2 className="arabic-text text-4xl text-[40px] font-normal">
            ٣ عقد اللواء محمود شعراوى وزير التنمية المحلية إجتماعاًمع منجستاب
            هايلي
          </h2>
          <h2 className="arabic-text text-4xl text-[40px] font-normal">
            ٤ عقد اللواء محمود شعراوى وزير التنمية المحلية إجتماعاًمع منجستاب
            هايلي
          </h2>
          <h2 className="arabic-text text-4xl text-[40px] font-normal">
            ٥ عقد اللواء محمود شعراوى وزير التنمية المحلية إجتماعاًمع منجستاب
            هايلي
          </h2>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button onClick={() => setTimer(true)}>
          <TaskVoiceRecorder downloadOnSavePress={false} />
        </button>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="h-[80px] w-[80px] rounded-full border border-[#118FCE]">
          <div className="flex items-center justify-center pt-2 text-[40px] font-bold text-[#118FCE]">
            <h1>{second}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
