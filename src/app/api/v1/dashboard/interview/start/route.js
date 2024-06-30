import { NextResponse, NextRequest } from "next/server";
import dbConnection from "@/utils/dbConnection";
import mockInterview from "@/models/mockInterview";

// get mock interview by id
export async function POST(request) {
  const { mockid } = await request.json();

  try {
    // search in database
    await dbConnection();
    const res = await mockInterview.findById(mockid);

    if (!res) {
      return NextResponse.json(
        { success: false, message: "Mock interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mock interview fetched successfully",
        data: res,
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
