import { chatSession } from "@/utils/GeminiAIModel";
import { NextResponse } from "next/server";

// This is the route for chatbot
export async function POST(request) {
  try {
    const { question } = await request.json();

    const feed = `Prepmind is developed by Aman Verma. LinkedIn profile: https://www.linkedin.com/in/aman-verma-1a459020b/. Prepmind is an AI mock interview platform designed to help users practice interviews based on their experience, role, and job description. It allows users to upload their resumes, generates interview questions tailored to their profile, provides real-time feedback during the interview process, and generates a comprehensive report with feedback and correct answers at the end of the session. You can visit the platform at https://prepmind.vercel.app to learn more and start using it for mock interviews.`;

    if (!question || question === "") {
      return NextResponse.json(
        { success: false, message: "Question is required" },
        { status: 400 }
      );
    }

    // Check if the question is about Prepmind
    const isQuestionAboutPrepmind = question.toLowerCase().includes("prepmind");

    let prompt;
    if (isQuestionAboutPrepmind) {
      prompt = `chat: ${feed} \nresponse: in just normal text `;
    } else {
      prompt = `chat: ${question} \nresponse: in just normal text `;
    }

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
