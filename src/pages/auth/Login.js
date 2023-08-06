import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import login from "../../assets/login.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { selectPreviosURL } from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const previousURL = useSelector(selectPreviosURL);

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successful");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Logged In Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <div className="w-full h-full">
        <div className="w-full flex items-center justify-center px-[2px] xxs:px-2 md:px-10 min-h-[100vh]">
          <div className="hidden md:flex h-[600px]">
            <img src={login} alt="login" className="" />
          </div>
          <div className=" shadow-xl rounded-xl w-auto">
            <div className="px-4">
              <p className="text-2xl md:text-5xl font-semibold text-orange-600 text-center py-4">
                Login
              </p>
              <form
                onSubmit={handleLogin}
                className="flex flex-col w-full sm:w-[400px] text-lg md:text-2xl"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 border-2 h-[30px]  md:h-[45px] my-3 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-2 border-2 h-[30px]  md:h-[45px] my-3 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 h-[40px] text-white text-xl font-semibold rounded-lg my-2"
                >
                  Login
                </button>
              </form>
              <Link to="/reset">
                <p className="text-xl py-3">Forget Password</p>
              </Link>
              <p className="text-center text-xl">--or--</p>
              <button
                onClick={loginWithGoogle}
                className="flex bg-orange-600 h-[40px] text-white w-full items-center justify-center text-xl font-semibold mt-3 mb-6 rounded-lg"
              >
                <FaGoogle size={30} className="px-2" />
                Login With Google
              </button>
              <p className="text-lg md:text-xl pt-3 pb-6">
                Don't have an account,{" "}
                <Link to="/register" className="font-bold">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
