import { NextResponse, NextRequest } from "next/server";
import dbConnection from "@/utils/dbConnection";

export async function GET(request) {
  await dbConnection();

  try {
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error" },
      { status: 500 }
    );
  }
}
