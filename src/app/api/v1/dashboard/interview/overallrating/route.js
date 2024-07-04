import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnection";
import UserAnswer from "@/models/userAnswer";
import MockInterview from "@/models/mockInterview";

// /api/v1/dashboard/interview/overallrating

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User id is required",
        },
        {
          status: 400,
        }
      );
    }

    await dbConnection();

    // find all mockinterviews based on this userId
    const mockInterviews = await MockInterview.find({ user: userId });

    if (!mockInterviews.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No interviews found",
        },
        {
          status: 404,
        }
      );
    }

    // find all user answers based on these mockInterviews
    const userAnswers = await UserAnswer.find({
      mockId: { $in: mockInterviews.map((interview) => interview._id) },
    });

    if (!userAnswers.length) {
      return NextResponse.json(
        {
          success: false,
          message: "No user answers found",
        },
        {
          status: 404,
        }
      );
    }

    const totalRating = userAnswers.reduce((acc, curr) => acc + curr.rating, 0);
    const totalAnswers = userAnswers.length;
    const averageRating = totalRating / totalAnswers;

    return NextResponse.json({
      success: true,
      message: "Interview list fetched successfully",
      data: {
        totalAnswers,
        totalRating,
        averageRating,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching interview list",
      },
      {
        status: 500,
      }
    );
  }
}
