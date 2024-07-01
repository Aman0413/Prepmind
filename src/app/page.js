import AboutUs from "@/components/page_components/AboutUs";
import FAQ from "@/components/page_components/FAQ";
import FeatureSection from "@/components/page_components/FeatureSection";
import Footer from "@/components/page_components/Footer";
import HowItWorks from "@/components/page_components/HowItWorks";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="my-gradient py-2 flex  flex-col justify-center items-center gap-2 ">
        <div className=" flex flex-col justify-center items-center gap-5  mt-20">
          <div className="w-full flex flex-col justify-center items-center gap-3 p-2 ">
            <h1 className="text-4xl text-black font-extrabold mx-auto md:text-6xl lg:text-5xl text-center">
              Ace Your Next Interview with AI-Powered Precision
            </h1>
            <h2 className="text-gray-500 text-center">
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
          <Button size="lg" className="bg-[#db2877] hover:bg-[#dd2474]">
            Get Started Today
          </Button>
        </div>

        <Footer />
      </div>
    </>
  );
}
