"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import WebCam from "react-webcam";
import webcamImg from "../../../../../../../public/webcam.png";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewDetails,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);

    try {
      if (mockInterviewQuestion) {
        const resp = await axios.post(
          "/api/v1/dashboard/interview/saveuserans",
          {
            question: mockInterviewQuestion[activeQuestionIndex]?.Question,
            userAnswer,
            mockId: interviewDetails?._id,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
            user: user.id,
          }
        );

        if (resp.data.success) {
          toast.success("Answer saved successfully");
          setUserAnswer("");
          setResults([]);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Error while saving answer");
      console.log(error);
      setLoading(false);
    }

    // Reset the state
    setResults([]);
    setLoading(false);
  };

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 5) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  return (
    <div className="flex justify-center items-center flex-col flex-1">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 my-20 bg-black">
        <Image
          src={webcamImg}
          alt="webcam-logo"
          width={200}
          height={200}
          className="absolute"
        />
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
        onClick={startStopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Recording....
          </h2>
        ) : (
          "Record Answer"
        )}

        {loading && " Saving Answer..."}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
