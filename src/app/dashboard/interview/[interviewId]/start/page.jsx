"use client";
import { MockInterview } from "@/models/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewDetails, setInterviewDetails] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const getInterviewDetails = async () => {
    // getting interview details by mockId from database
    const res = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockRes = JSON.parse(res[0].jsonMockResp);
    console.log(jsonMockRes);
    setMockInterviewQuestion(jsonMockRes);
    setInterviewDetails(res[0]);
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewDetails={interviewDetails}
        />
      </div>
      <div className="flex justify-end items-center  gap-6 mt-6">
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
          <Link
            href={`/dashboard/interview/${interviewDetails?.mockId}/feedback`}
          >
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
