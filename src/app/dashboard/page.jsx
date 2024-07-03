import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl">Dashboard Page</h1>
      <h2 className="text-gray-500 mt-5">
        Create and start your AI Mockup Interview
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      {/* Previoud interview questions*/}
      <InterviewList />
    </div>
  );
}

export default Dashboard;
