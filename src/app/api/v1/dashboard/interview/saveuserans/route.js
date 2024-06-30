import { NextResponse, NextRequest } from "next/server";
import dbConnection from "@/utils/dbConnection";
import UserAnswer from "@/models/userAnswer";
import { chatSession } from "@/utils/GeminiAIModel";

// save user answer
export async function POST(request) {
  const { question, userAnswer, mockId, correctAns, user } =
    await request.json();

  if (!userAnswer) {
    return NextResponse.json(
      { success: false, message: "Please provide user answer" },
      { status: 400 }
    );
  }

  if (!question || !mockId || !correctAns || !user) {
    return NextResponse.json(
      { success: false, message: "Please provide all required fields" },
      { status: 400 }
    );
  }

  const feedbackPrompt =
    "Question: " +
    question +
    "User Answer: " +
    userAnswer +
    "Depends on question and user answer for give interview please give us rating and feedback for this question in just 3 to 5 lines in JSON format with rating field rating should be between 1 to 5.";

  try {
    await dbConnection();

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    // Save user answer to database
    const JsonFeedbackRes = JSON.parse(mockJsonResp);

    const res = await UserAnswer.create({
      mockId,
      question,
      correctAns,
      userAns: userAnswer,
      feedback: JsonFeedbackRes?.feedback,
      rating: JsonFeedbackRes?.rating,
      user,
    });

    if (!res) {
      return NextResponse.json(
        { success: false, message: "Error while saving user answer" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User answer saved successfully",
        data: res,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while record user's answer" },
      { status: 500 }
    );
  }
}
