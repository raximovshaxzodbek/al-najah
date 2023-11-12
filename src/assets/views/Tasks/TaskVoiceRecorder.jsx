import React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const TaskVoiceRecorder = ({ downloadOnSavePress }) => {
  const recorderControls = useAudioRecorder();

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
  };

  return (
    <div className="mt-2 flex w-full flex-col items-center justify-center gap-4">
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

export default TaskVoiceRecorder;
