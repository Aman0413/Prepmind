"use client";
import AboutUs from "@/components/page_components/AboutUs";
import ChatBot from "@/components/page_components/ChatBot";
import FAQ from "@/components/page_components/FAQ";
import FeatureSection from "@/components/page_components/FeatureSection";
import Footer from "@/components/page_components/Footer";
import HowItWorks from "@/components/page_components/HowItWorks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="my-gradient p-2 md:p-4 flex  flex-col justify-center items-center gap-2  bg-red-300 ">
      <div className=" flex flex-col justify-center items-center gap-5  mt-20">
        <div
          className="w-full flex flex-col justify-center items-center gap-3 p-2 
          h-60 md:h-fit
          "
        >
          <h1
            id="typewriter"
            className="text-4xl text-black font-extrabold mx-auto md:text-6xl lg:text-5xl text-center"
          >
            <Typewriter
              options={{
                strings: ["Ace Your Next Interview with AI-Powered Precision"],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 50,
                pauseFor: 4000,
              }}
            />
          </h1>
          <h2 className="text-gray-500 text-center mt-5">
            Simulate real interviews, get instant feedback, and track your
            progress with our AI-powered platform.
          </h2>
        </div>
        <div className="flex items-center gap-4 mt-16">
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

      <div className="mt-10 flex flex-col gap-4 items-center justify-center">
        <FeatureSection />
        <HowItWorks />
        <AboutUs />
        <FAQ />
      </div>

      <div className="my-10 p-4">
        <Link href={"/dashboard"}>
          <Button size="lg" className="bg-[#db2877] hover:bg-[#dd2474]">
            Get Started Today
          </Button>
        </Link>
      </div>
      {/* chat bot */}
      <ChatBot />

      <Footer />
    </div>
  );
}
