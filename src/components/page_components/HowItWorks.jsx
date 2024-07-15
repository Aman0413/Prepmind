import React from "react";

function HowItWorks() {
  return (
    <div>
      <section
        id="howitworks"
        className="relative  bg-white  py-10 sm:py-16 lg:py-24 rounded-lg"
      >
        <div className=" p-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl text-black font-extrabold mx-auto md:text-6xl lg:text-5xl">
              How does it work?
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-base text-gray-500 leading-relaxed md:text-lg">
              Our AI solution will help you from start to finish
            </p>
          </div>
          <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
              <img
                alt=""
                loading="lazy"
                width="1000"
                height="500"
                decoding="async"
                data-nimg="1"
                className="w-full"
                // style="color:transparent"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              />
            </div>
            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#4745d2] border-2 border-black rounded-full shadow">
                  <span className="text-xl font-semibold text-white">1</span>
                </div>
                <h3 className="mt-6 text-xl  text-black font-semibold leading-tight md:mt-10">
                  Sign Up and Input Job Details
                </h3>
                <p className="mt-4 text-base text-gray-500 md:text-lg">
                  Create an account and provide details about the job role you
                  &apos;re preparing for and your experience level.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#4745d2] border-2 border-black rounded-full shadow">
                  <span className="text-xl font-semibold  text-white">2</span>
                </div>
                <h3 className="mt-6 text-xl text-black font-semibold leading-tight md:mt-10">
                  Practice with Customized Questions
                </h3>
                <p className="mt-4 text-base text-gray-500 md:text-lg">
                  Our AI generates questions tailored to your specific job role
                  and experience. Receive real-time feedback as you practice.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#4745d2] border-2 border-black rounded-full shadow">
                  <span className="text-xl font-semibold  text-white">3</span>
                </div>
                <h3 className="mt-6 text-xl text-black font-semibold leading-tight md:mt-10">
                  Review Detailed Feedback Report
                </h3>
                <p className="mt-4 text-base text-gray-500 md:text-lg">
                  After your session, review a detailed report with insights on
                  your performance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          //   style="background:radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)"
        ></div>
      </section>
    </div>
  );
}

export default HowItWorks;
