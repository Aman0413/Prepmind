import { NextResponse, NextRequest } from "next/server";
import dbConnection from "@/utils/dbConnection";

import MockInterview from "@/models/mockInterview";
import UserAnswer from "@/models/userAnswer";

// This is the route for deleting an interview
export async function POST(request) {
  try {
    const { mockId } = await request.json();

    if (!mockId) {
      return NextResponse.json(
        { success: false, message: "Mock Id is required" },
        { status: 400 }
      );
    }

    await dbConnection();

    const interview = await MockInterview.findByIdAndDelete(mockId);
    if (!interview) {
      return NextResponse.json(
        { success: false, message: "Interview not found" },
        { status: 404 }
      );
    }

    // Delete all the user answers related to this interview
    const userAnswers = await UserAnswer.deleteMany({ mockId });
    if (!userAnswers) {
      return NextResponse.json(
        { success: false, message: "Error while deleting user answers" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Interview deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error while deleting interview" },
      { status: 500 }
    );
  }
}
