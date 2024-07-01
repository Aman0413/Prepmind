import React from "react";

function FAQ() {
  return (
    <div className="py-4 bg-white w-full " id="question">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h3>
        </div>

        <div className="mt-10 ">
          <ul>
            <li className="text-left mb-10 ">
              <div className="flex flex-row items-start mb-5 ">
                <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold ">
                  {/* Replace with your SVG icon component */}
                  {/* <IconName /> */}
                </div>
                <div className="bg-gray-100 p-5 px-10 w-full flex items-center rounded-lg">
                  <h4 className="text-md leading-6 font-medium text-gray-900">
                    How does the AI generate questions?
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <div className="bg-indigo-100 p-5 px-10 w-full flex items-center rounded-lg">
                  <p className="text-gray-500 text-sm">
                    Our AI analyzes job roles and experience levels to create
                    tailored questions, ensuring you practice with relevant and
                    challenging scenarios.
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                  {/* Replace with your SVG icon component */}
                  {/* <IconName /> */}
                </div>
              </div>
            </li>
            <li className="text-left mb-10">
              <div className="flex flex-row items-start mb-5">
                <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                  {/* Replace with your SVG icon component */}
                  {/* <IconName /> */}
                </div>
                <div className="bg-gray-100 p-5 px-10 w-full flex items-center rounded-lg">
                  <h4 className="text-md leading-6 font-medium text-gray-900">
                    How can I improve my interview skills using this platform?
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <div className="bg-indigo-100 p-5 px-10 w-full flex items-center  rounded-lg">
                  <p className="text-gray-500 text-sm">
                    By practicing with our AI-generated questions, receiving
                    real-time feedback, and reviewing detailed reports, you can
                    identify and work on your strengths and weaknesses.
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                  {/* Replace with your SVG icon component */}
                  {/* <IconName /> */}
                </div>
              </div>
            </li>
            <li className="text-left mb-10">
              <div className="flex flex-row items-start mb-5">
                <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                  {/* Replace with your SVG icon component */}
                  {/* <IconName /> */}
                </div>
                <div className="bg-gray-100 p-5 px-10 w-full flex items-center  rounded-lg">
                  <h4 className="text-md leading-6 font-medium text-gray-900">
                    Is there a free trial available?
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <div className="bg-indigo-100 p-5 px-10 w-full flex items-center  rounded-lg">
                  <p className="text-gray-500 text-sm ">
                    Yes, we offer a free trial for new users to experience our
                    platform before committing to a plan.
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold ">
                  {/* Replace with your SVG icon component */}
                  {/* <IconName /> */}
                </div>
              </div>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
