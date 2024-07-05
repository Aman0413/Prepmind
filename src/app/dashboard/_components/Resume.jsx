import React from "react";

function Resume() {
  return (
    <div className="a4Div">
      <header className="flex flex-col justify-center items-center">
        <h1 className="uppercase text-3xl">Aman Verma</h1>
        <div className="text-xs mt-2">
          <ul className="flex items-center justify-center space-x-3">
            <li>7225090867</li>
            <li>amanv7404@gmail.com</li>
            <li>Linkedin</li>
            <li>Github</li>
            <li>Leetcode</li>
          </ul>
        </div>
      </header>

      {/* Education  */}
      <section className="bg-red-100">
        <h2 className="uppercase">Education</h2>
        <div className="w-full h-[1px] bg-black"></div>
      </section>
    </div>
  );
}

export default Resume;
