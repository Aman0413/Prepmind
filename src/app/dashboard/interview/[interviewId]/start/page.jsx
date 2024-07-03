"use client";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";

function StartInterview({ params }) {
  const [interviewDetails, setInterviewDetails] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getInterviewDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/dashboard/interview/start", {
        mockid: params.interviewId,
      });

      if (res.data.success) {
        setInterviewDetails(res.data.data);
        const jsonMockRes = JSON.parse(res.data.data.jsonMockResp);
        setMockInterviewQuestion(jsonMockRes);
      }

      setLoading(false);
    } catch (error) {
      toast.error("Error fetching interview details");
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <QuestionsSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}
          />
        )}

        {/* Video/Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewDetails={interviewDetails}
        />
      </div>
      <div className="flex justify-end items-center  gap-6 my-7">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}

        {
          /* Next Question */
          activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </Button>
          )
        }

        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewDetails?._id}/feedback`}>
            <Button className="bg-red-500 hover:bg-red-600">
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
