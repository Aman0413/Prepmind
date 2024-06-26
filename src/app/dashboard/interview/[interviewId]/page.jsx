"use client";

import { Button } from "@/components/ui/button";
import { MockInterview } from "@/models/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewDetails, setInterviewDetails] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const getInterviewDetails = async () => {
    // getting interview details by mockId from database
    const res = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewDetails(res[0]);
    console.log(res);
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);
  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Lets Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col gap-5 p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewDetails?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description:</strong> {interviewDetails?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>{" "}
              {interviewDetails?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className=" flex gap-2 items-center text-yellow-500">
              {" "}
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-700">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
          <Button type="button">
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
              Start Interview
            </Link>
          </Button>
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                width: 300,
                height: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
            </>
          )}
          {webCamEnabled ? (
            <Button onClick={() => setWebCamEnabled(false)}>
              Diseable Web Cam and Microphone
            </Button>
          ) : (
            <Button onClick={() => setWebCamEnabled(true)}>
              Enable Web Cam and Microphone
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
