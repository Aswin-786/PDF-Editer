import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selector/userDetails";

const Home = () => {
  const userName = useRecoilValue(userEmailState);
  let direct = "/login";
  if (userName) {
    direct = "/upload";
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-5 w-full p-8 gap-5 ">
        <h1 className="text-xl sm:text-3xl font-bold"> PDF Edit...</h1>
        <p className="text-justify w-full md:w-[50%] ">
          Welcome to our PDF Editor! Our platform empowers you to effortlessly
          modify and personalize your PDF documents. Seamlessly upload your PDF
          files to access a suite of editing tools, enabling you to annotate,
          highlight, add text, and more. Whether it's tweaking content,
          highlighting key points, or adding your personal touch, our intuitive
          interface simplifies the editing process. Simply upload your PDF, and
          begin enhancing your documents with ease. Elevate your PDF experience
          today!
        </p>
        <button className=" my-2 text-center border-2  bg-black px-3 py-2 rounded-sm text-white hover:bg-white hover:text-black transition-all hover:border-2 hover:border-black">
          <Link to={direct}>PDF Upload</Link>
        </button>
      </div>
    </>
  );
};

export default Home;
