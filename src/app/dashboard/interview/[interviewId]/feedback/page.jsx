"use client";

import { Button } from "@/components/ui/button";
import { UserAnswer } from "@/models/schema";
import { db } from "@/utils/db";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { eq } from "drizzle-orm";
import { ChevronsUpDownIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Feedback({ params }) {
  const [feedback, setFeedback] = useState([]);
  const router = useRouter();

  const getFeedback = async () => {
    const res = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedback(res);

    console.log(res);
  };

  useEffect(() => {
    getFeedback();
  }, []);
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
      <h2 className="font-bold text-2xl">Here is your Interview Feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Your overall Interview rating: <strong>7/10 </strong>
      </h2>

      <h2 className="text-sm text-gray-500 ">
        Find below Interview question with correct answer,Your answer and
        feedback for improvement.
      </h2>

      {feedback &&
        feedback.map((item, index) => {
          return (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                {item.question}
                <ChevronsUpDownIcon className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-green-500 border rounded-lg">
                    <strong>Rating: </strong>
                    {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-red-900">
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-green-900">
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-primary">
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
}
