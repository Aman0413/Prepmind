import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className="py-2 flex flex-col justify-center items-center gap-2 "
        id="home"
      >
        <div className=" flex flex-col justify-center items-center gap-5  mt-20">
          <div className="w-full flex flex-col justify-center items-center gap-3 p-2 ">
            <h1
              className="text-4xl font-extrabold text-center"
              style={{ fontFamily: "Francois One, sans-serif" }}
            >
              Ace Your Next Interview with AI-Powered Precision
            </h1>
            <h2 className="text-gray-500 text-center">
              Simulate real interviews, get instant feedback, and track your
              progress with our AI-powered platform.
            </h2>
          </div>
          <div className="flex items-center gap-4 my-4">
            <Link href={"/dashboard"}>
              <Button size="lg">Get Started</Button>{" "}
            </Link>
            <Link href={"#"}>
              <Button size="lg" variant="outline">
                Watch Video
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[90%]   p-4 flex flex-col items-center space-y-3">
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-bold text-3xl">How it Works?</h2>
            <p className="text-gray-500">
              Give mock interview in just 3 simple easy steps
            </p>
          </div>

          <div className="grid  grid-cols-1 md:grid-cols-3 gap-3  ">
            <div className="bg-white border p-5 rounded-lg shadow-xl h-32 text-gray-500 font-semibold text-center mt-10">
              <p className="">
                Enter your job role, description, and experience level. The
                system generates tailored interview questions based on your
                inputs.
              </p>
            </div>
            <div className="bg-white border p-5 rounded-lg shadow-xl h-32 text-gray-500 mt-10 font-semibold text-center">
              <p>
                Answer the questions as you would in a real interview.Receive
                immediate feedback on your responses.
              </p>
            </div>
            <div className="bg-white border p-5 rounded-lg shadow-xl h-32 text-gray-500 mt-10 font-semibold text-center">
              <p>
                Review a comprehensive feedback report to identify areas for
                improvement.{" "}
                <span className="text-primary font-bold">
                  All the best for your next interview!
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 p-4">
          <Button size="lg" className="bg-[#db2877] hover:bg-[#dd2474]">
            Get Started Today
          </Button>
        </div>
      </div>
    </>
  );
}
