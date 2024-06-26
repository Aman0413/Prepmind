"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import WebCam from "react-webcam";
import webcamImg from "../../../../../../../public/webcam.png";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);
  return (
    <div className="flex justify-center items-center flex-col flex-1">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 my-20 bg-black">
        <Image src={webcamImg} width={200} height={200} className="absolute" />
        <WebCam
          style={{
            width: 500,
            height: 400,
            zIndex: 10,
          }}
          mirrored={true}
        />
      </div>

      <Button
        variant="outline"
        classNamem="my-10"
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show user answer</Button>
    </div>
  );
}

export default RecordAnswerSection;
