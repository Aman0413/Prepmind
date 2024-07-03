import { NextResponse, NextRequest } from "next/server";
import dbConnection from "@/utils/dbConnection";
import UserAnswer from "@/models/userAnswer";

export async function POST(request) {
  const { interviewId } = await request.json();

  if (!interviewId) {
    return NextResponse.json(
      { success: false, message: "Please provide all required fields" },
      { status: 400 }
    );
  }

  // Connect to database
  await dbConnection();

  try {
    const res = await UserAnswer.find({ mockId: interviewId }).sort({
      _id: -1,
    });

    // Check if any user answers were found
    if (!res.length) {
      return NextResponse.json(
        { success: false, message: "No user's answer found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User answer(s) retrieved successfully",
        data: res,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while retrieving user answers:", error);

    return NextResponse.json(
      { success: false, message: "Error while record user's answer" },
      { status: 500 }
    );
  }
}
