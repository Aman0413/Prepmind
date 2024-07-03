import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if (!text) return;
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text to speech");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
          {mockInterviewQuestion.map((ques, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-center text-xs md:text-sm cursor-pointer ${
                activeQuestionIndex === index
                  ? "bg-primary text-white"
                  : "bg-secondary text-black"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>

        {/* This is the button that triggers the text to speech */}
        <Volume2
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
          }
          className="cursor-pointer"
          aria-label="Read question aloud"
        />

        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <p className="text-sm text-primary my-2">
            {process.env.NEXT_PUBLIC_QUESTION_INFORMATION}
          </p>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
