import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="p-10 text-center flex flex-col gap-3">
        <h1 className="text-4xl">404</h1>
        <p className="text-2xl">Page not found</p>
        <p>
          Please Go
          <Link to="/" className="font-bold text-blue-700 ms-2">
            Back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
