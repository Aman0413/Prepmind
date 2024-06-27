"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import WebCam from "react-webcam";
import webcamImg from "../../../../../../../public/webcam.png";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserAnswer } from "@/models/schema";

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

    const feedbackPrompt =
      "Question: " +
      mockInterviewQuestion[activeQuestionIndex]?.Question +
      "User Answer: " +
      userAnswer +
      "Depends on question and user answer for give interview please give us rating and feedback for this question in just 3 to 5 lines in JSON format with rating field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    const JsonFeedbackRes = JSON.parse(mockJsonResp);

    // Save user answer to database
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewDetails?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.Question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
      userAns: userAnswer,
      feedback: JsonFeedbackRes?.feedback,
      rating: JsonFeedbackRes?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYY"),
    });

    if (resp) {
      toast("Answer saved successfully");
      setUserAnswer("");
      setResults([]);
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
    if (!isRecording && userAnswer.length > 10) {
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
            <Mic /> Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
