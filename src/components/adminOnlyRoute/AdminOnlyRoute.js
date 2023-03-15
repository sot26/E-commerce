import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "test@gmail.com") {
    return children;
  } else {
    return (
      <div className="w-full h-[85vh] px-10">
        <p className="text-4xl font-semibold py-6">Permission Denied</p>
        <p className="text-xl pb-6">
          This page can only be view by an admin user
        </p>
        <Link to="/">
          <button className="p-3 bg-gray-400 text-lg text-white rounded-2xl">
            &larr; Back to home
          </button>
        </Link>
      </div>
    );
  }
};
export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "test@gmail.com") {
    return children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
