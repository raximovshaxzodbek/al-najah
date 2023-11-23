import React, {useEffect} from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const VoiceRecorder = ({ downloadOnSavePress }) => {
  const recorderControls = useAudioRecorder();

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.getElementById("audio");
    audio.src = url;
    audio.controls = true;
  };

  setTimeout(() => {
    recorderControls.stopRecording();
  }, 6000);

  return (
    <div className="mt-2 flex w-full flex-col items-center justify-center gap-4">
      <div className="">
        <audio src="" id="audio"></audio>
      </div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        showVisualizer={true}
        downloadOnSavePress={downloadOnSavePress}
        downloadFileExtension={"webm"}
        recorderControls={recorderControls}
      />
    </div>
  );
};

export default VoiceRecorder;
