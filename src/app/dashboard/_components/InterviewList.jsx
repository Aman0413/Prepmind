"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";

export default function InterviewList() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const getInterviewList = async () => {
    if (!user) {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/v1/dashboard/interview/getallinterview",
        {
          userId: user?.id,
        }
      );

      if (res.data.success) {
        setInterviewList(res.data.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error while fetching interview list"
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  return (
    <div>
      <h2 className="font-medium text-lg">Previous Mock Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4 ">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          interviewList.length > 0 &&
          interviewList.map((item, index) => {
            return <InterviewItemCard interview={item} key={index} />;
          })
        )}

        {!loading && !interviewList.length > 0 && (
          <h2 className="text-gray-500 text-lg">No previous interview found</h2>
        )}
      </div>
    </div>
  );
}
