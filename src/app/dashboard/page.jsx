"use client";

import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import OverallRatingChart from "./_components/OverallRatingChart";
import { useUser } from "@clerk/nextjs";

function Dashboard() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl">Dashboard Page</h1>
      <h2 className="text-gray-500 mt-5">
        Create and start your AI Mockup Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 my-5  items-center gap-8">
        <AddNewInterview />
        <OverallRatingChart userId={user.id} />
      </div>

      {/* Previoud interview questions*/}
      <InterviewList />
    </div>
  );
}

export default Dashboard;
