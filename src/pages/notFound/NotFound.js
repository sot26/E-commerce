import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full, min-h-[100vh]">
      <div className="flex justify-center items-center w-full min-h-[100vh] flex-col">
        <p className="text-7xl md:text-9xl">404</p>
        <p className="text-lg mb-2">Opppppss, Page not found</p>
        <Link to="/">
          <button className="p-2 mt-2 rounded-lg bg-gray-200 text-black">
            &larr; Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
