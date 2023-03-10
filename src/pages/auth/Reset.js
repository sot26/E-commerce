import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgot from "../../assets/forgot.png";
import { auth } from "../../firebase/config";

const Reset = () => {
  const [email, setEmail] = useState("");

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div>
          <div className="w-full h-full">
            <div className="w-full flex items-center justify-center px-10 h-[100vh]">
              <div className="hidden md:flex h-[600px]">
                <img src={forgot} alt="forgot" className="" />
              </div>
              <div className=" shadow-xl rounded-xl w-auto">
                <div className="px-4">
                  <p className="text-5xl font-semibold text-orange-600 text-center py-4">
                    Reset Password
                  </p>
                  <form
                    onSubmit={resetPassword}
                    className="flex flex-col min-w-[300px] sm:w-[400px] text-2xl"
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      className="p-2 border-2 h-[45px] my-3 rounded-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 h-[40px] text-white text-xl font-semibold rounded-lg my-2"
                    >
                      Reset Password
                    </button>
                  </form>
                  <div className="text-xl flex justify-between pt-3 pb-8">
                    <Link to="/login">-Login</Link>
                    <Link to="/register">-Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
