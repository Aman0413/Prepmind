"use client";

import { MockInterview } from "@/models/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

export default function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const getInterviewList = async () => {
    const res = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
    setInterviewList(res);
    console.log(res);
  };

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  return (
    <div>
      <h2 className="font-medium text-lg">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4">
        {interviewList &&
          interviewList.map((item, index) => {
            return <InterviewItemCard interview={item} key={index} />;
          })}
      </div>
    </div>
  );
}
