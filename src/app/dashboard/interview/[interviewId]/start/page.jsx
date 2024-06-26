"use client";
import { MockInterview } from "@/models/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Questions */}
      <QuestionsSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
      />

      {/* Video/Audio Recording */}
      <RecordAnswerSection />
    </div>
  );
}

export default StartInterview;
