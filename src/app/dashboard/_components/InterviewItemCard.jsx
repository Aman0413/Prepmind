import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function InterviewItemCard({ interview }) {
  console.log("interview", interview);
  return (
    <div className="border shadow-md rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Year of Experience
      </h2>
      <h2 className="text-sm text-gray-400">
        Created At: {interview.createdAt}
      </h2>
      <div className="flex justify-between mt-4 w-full">
        <Link href={`/dashboard/interview/${interview?._id}/feedback`}>
          <Button size="sm" variant="outline">
            Feedback
          </Button>
        </Link>
        <Link href={`/dashboard/interview/${interview?._id}`}>
          <Button size="sm" classNamew="w-full">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewItemCard;
