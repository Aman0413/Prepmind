import { chatSession } from "@/utils/GeminiAIModel";
import { NextResponse } from "next/server";

// This is the route for chatbot
export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || question === "") {
      return NextResponse.json(
        { success: false, message: "Question is required" },
        { status: 400 }
      );
    }

    const prompt = `chat: ${question} \nresponse: in just normal text `;

    const res = await chatSession.sendMessage(prompt);

    if (!res) {
      return NextResponse.json(
        { success: false, message: "Error in chat-bot interview" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Chat-bot interview completed successfully",
        data: res.response.text(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error in chat-bot interview" },
      { status: 500 }
    );
  }
}
