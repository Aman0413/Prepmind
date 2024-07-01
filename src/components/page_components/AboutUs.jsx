import React from "react";

function AboutUs() {
  return (
    <div className="sm:flex items-center max-w-screen-xl ">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <img src="https://i.imgur.com/WbQnbas.png" />
        </div>
      </div>
      <div className="sm:w-1/2 p-10">
        <div className="text">
          <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
            About <span className="text-indigo-600">Our Mission</span>
          </h2>
          <p className="text-base font-medium text-gray-500 leading-9  ">
            At <span className="text-primary font-semibold">PrepMind</span>, we
            are committed to transforming the interview preparation experience
            for job seekers worldwide. Our mission is to leverage cutting-edge
            AI technology to provide personalized, effective, and accessible
            tools that empower individuals to excel in their interviews. We
            believe in bridging the gap between preparation and performance,
            equipping our users with the skills, confidence, and insights needed
            to succeed in their career aspirations. Through innovation and
            dedication to user-centric design, we strive to make interview
            preparation smarter, more efficient, and ultimately, more rewarding
            for every user
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
