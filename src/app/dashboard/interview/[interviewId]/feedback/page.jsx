"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import axios from "axios";
import { ChevronsUpDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Feedback({ params }) {
  const [feedback, setFeedback] = useState([]);
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const getFeedback = async () => {
    try {
      const res = await axios.post(
        "/api/v1/dashboard/interview/getmockinterview",
        {
          interviewId: params.interviewId,
        }
      );

      if (res.data.success) {
        setFeedback(res.data.data);
        const overallRating = (
          res.data.data.reduce(
            (acc, item) => acc + parseFloat(item.rating || 0),
            0
          ) / res.data.data.length
        ).toFixed(1);
        setRating(overallRating);
      } else {
        toast.error(res.data.message || "Error fetching feedback");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching feedback");
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);
  return (
    <div className="p-10">
      {feedback?.length <= 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No interview Feedback{" "}
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your Interview Feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall Interview rating: <strong>{rating}/10 </strong>
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
        </>
      )}
    </div>
  );
}
