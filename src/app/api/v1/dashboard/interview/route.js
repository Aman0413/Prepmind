import { NextResponse, NextRequest } from "next/server";
import dbConnection from "@/utils/dbConnection";
import { chatSession } from "@/utils/GeminiAIModel";
import mockInterview from "@/models/mockInterview";

// add new mock interview
export async function POST(request) {
  try {
    if (
      !jobRole ||
      !jobDescription ||
      !yearsOfExperience ||
      !userId ||
      !DifficultyLevel
    ) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const inputPrompt = `Job Role: ${jobRole}
  Job Description: ${jobDescription},
  Years of Experience: ${yearsOfExperience},
  DifficultyLevel: ${DifficultyLevel},
  Resume Text: ${resumeText ? resumeText : "Not provided"},
  Based on the provided Job Role, Job Description,Years of Experience and Resume Text then generate ${
    process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT
  } interview questions along with answers in JSON format. Please provide the Question and Answer fields in JSON.`;

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
      const res = await mockInterview.create({
        user: userId,
        jobPosition: jobRole,
        jobDesc: jobDescription,
        jobExperience: yearsOfExperience,
        jsonMockResp: mockJsonRes,
        difficultyLevel: DifficultyLevel,
      });

      if (res) {
        return NextResponse.json(
          {
            success: true,
            message: "Mock interview created successfully",
            data: res,
          },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Error while creating mock interview" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while creating mock interview " },
      { status: 500 }
    );
  }
}
