"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

function InterviewItemCard({ interview }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      if (!interview?._id) {
        return;
      }
      setLoading(true);

      const res = await axios.post(
        "/api/v1/dashboard/interview/deleteinterview",
        {
          mockId: interview._id,
        }
      );
      if (res.data.success) {
        toast.success("Interview deleted successfully");
      } else {
        toast.error(res.data.message || "Error while deleting interview");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while deleting interview"
      );
      console.error("Error while deleting interview", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border shadow-md rounded-lg p-3">
      <div className=" flex justify-between items-center">
        <span className="font-bold text-primary">{interview?.jobPosition}</span>
        <Button size="sm" variant="outline" onClick={handleDelete}>
          {loading ? <Loader /> : <Trash />}
        </Button>
      </div>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Year of Experience
      </h2>
      <h2 className="text-sm text-gray-500">
        Difficulty Level : {interview?.difficultyLevel}
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
