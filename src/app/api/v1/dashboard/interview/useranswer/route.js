import { NextResponse, NextRequest } from "next/server";
import dbConnection from "@/utils/dbConnection";
import mockInterview from "@/models/mockInterview";
import { chatSession } from "@/utils/GeminiAIModel";

// get correct answer by gemini ai
export async function POST(request) {
  const { question, userAnswer } = await request.json();
  console.log(question, userAnswer);

  if (!question || !userAnswer) {
    return NextResponse.json(
      { success: false, message: "Question and user answer is required" },
      { status: 400 }
    );
  }

  const feedbackPrompt =
    "Question: " +
    question +
    "User Answer: " +
    userAnswer +
    "Depends on question and user answer for give interview please give us rating and feedback for this question in just 3 to 5 lines in JSON format with rating field";

  try {
    await dbConnection();

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    if (!mockJsonResp) {
      return NextResponse.json(
        { success: false, message: "Mock interview not found" },
        { status: 404 }
      );
    }

    const mockRes = JSON.parse(mockJsonResp);

    return NextResponse.json(
      {
        success: true,
        message: "Mock interview fetched successfully",
        mockRes,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error" },
      { status: 500 }
    );
  }
}
