import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="bg-white">
        <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div className="p-5">
            <h3 className="font-bold text-xl text-indigo-600">PrepMind</h3>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Resources
            </div>
            <a className="my-3 block text-gray-500" href="/#">
              Documentation <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block text-gray-500" href="/#">
              Tutorials <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block text-gray-500" href="/#">
              Support <span className="text-teal-600 text-xs p-1">New</span>
            </a>
          </div>
          <div className="p-5  ">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Support
            </div>
            <a className="my-3 block text-gray-500" href="/#">
              Help Center <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block text-gray-500" href="/#">
              Privacy Policy <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block text-gray-500" href="/#">
              Conditions <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Contact us
            </div>

            <a
              className="my-3 block text-gray-500"
              href="mailto:amanv7404@gmail.com"
            >
              amanv7404@gmail.com
              <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white pt-2">
        <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            {/* Social media icons */}
            <a
              href="https://x.com/AmanVer95261110?t=FuHmf7fLqdJ6jVwkSPXXRg&s=09"
              className="w-6 mx-1"
            >
              <svg
                className="fill-current cursor-pointer text-gray-500 hover:text-indigo-600"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12c0 6.627-5.373 12-12 12-6.627 0-12-5.373-12-12 0-6.627 5.373-12 12-12 6.627 0 12 5.373 12 12zm-6.465-3.192c-.379.168-.786.281-1.213.333.436-.262.771-.676.929-1.169-.408.242-.86.418-1.341.513-.385-.411-.934-.667-1.541-.667-1.167 0-2.112.945-2.112 2.111 0 .166.018.327.054.482-1.754-.088-3.31-.929-4.352-2.206-.181.311-.286.674-.286 1.061 0 .733.373 1.379.94 1.757-.346-.01-.672-.106-.956-.264-.001.009-.001.018-.001.027 0 1.023.728 1.877 1.694 2.07-.177.049-.364.075-.556.075-.137 0-.269-.014-.397-.038.268.838 1.048 1.449 1.972 1.466-.723.566-1.633.904-2.622.904-.171 0-.339-.01-.504-.03.934.599 2.044.949 3.237.949 3.883 0 6.007-3.217 6.007-6.008 0-.091-.002-.183-.006-.273.413-.298.771-.67 1.054-1.093z" />
              </svg>
            </a>

            {/* Add other social media icons similarly */}
          </div>
          <div className="my-5">© Copyright 2020. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
