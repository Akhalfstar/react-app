import React from "react";
import { useParams, NavLink } from "react-router";

function User() {
  let { Id } = useParams();
  return (
    <>
      <div className=" w-screen h-100 bg-gray-700 flex justify-center items-center flex-col">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl  text-white mt-4">Oops! Page not found</p>
        <p className="text-orange-300 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <NavLink
          to="/"
          className="mt-6 px-6 py-3 bg-orange-400 text-white rounded-lg text-lg shadow-md hover:bg-orange-600 transition-all"
        >
          Go Home
        </NavLink>
      </div>
    </>
  );
}

export default User;
