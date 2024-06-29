import { NextResponse, NextRequest } from "next/server";
import dbConnection from "@/utils/dbConnection";
import { chatSession } from "@/utils/GeminiAIModel";

import mockInterview from "@/models/mockInterview";

// add new mock interview
export async function POST(request) {
  const { jobRole, jobDescription, yearsOfExperience } = await request.json();

  const inputPrompt = `Job Role: ${jobRole} ,\n Job Description: ${jobDescription} ,\n Years of Experience: ${yearsOfExperience} ,\n Depends on Job Role and Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview Questions along with Answers in JSON format , Give us Question and Answer field in JSON`;

  try {
    // send input prompt to gemini api
    const res = await chatSession.sendMessage(inputPrompt);

    // get response from gemini api
    const mockJsonRes = res.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    if (mockJsonRes) {
      // save mock interview to database
      await dbConnection();
      const res = mockInterview.create({
        jobPosition: jobRole,
        jobDesc: jobDescription,
        jobExperience: yearsOfExperience,
        jsonMockResp: mockJsonRes,
      });

      if (res) {
        return NextResponse.json(
          { success: true, message: "Mock interview created successfully" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: false, message: "Error while creating mock interview" },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Error while creating mock interview" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error" },
      { status: 500 }
    );
  }
}

// get mock interview by id
export async function GET(request) {
    
}
