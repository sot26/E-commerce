import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";

const Header = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  function navClick() {
    setNav(!nav);
  }

  const activeLink = ({ isActive }) =>
    isActive ? "border-b-4 NavLborder-orange-600" : "";

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.success("Logout Successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="h-[60px] sm:h-[80px] bg-black text-white ">
        <div className="flex justify-between px-6 sm:px-20 items-center h-full ">
          <div>
            <p className="text-[20px] sm:text-[20px] lg:text-[30px]  font-semibold">
              SOTshop
            </p>
          </div>
          <div className="lg:flex items-center text-[20px] hidden">
            <button className="p-2 bg-blue-700 rounded-lg">Admin</button>
            <NavLink className={activeLink} to="/">
              <div className="px-3 hover:text-orange-600">Home</div>
            </NavLink>
            <NavLink to="/contact" className={activeLink}>
              <div className="px-3 hover:text-orange-600">Contact Us</div>
            </NavLink>
          </div>
          <div className="lg:flex items-center text-[20px] hidden ">
            <span className="flex">
              <NavLink className={activeLink} to="/login">
                <p className="px-2 hover:text-orange-600">Login</p>
              </NavLink>
              <NavLink className={activeLink} to="/register">
                <p className="px-2 hover:text-orange-600">Register</p>
              </NavLink>
              <NavLink className={activeLink} to="/order">
                <p className="px-2 hover:text-orange-600">My Orders</p>
              </NavLink>
              <NavLink onClick={logoutUser}>
                <p className="px-2 hover:text-orange-600">Logout</p>
              </NavLink>
            </span>
            <span className="flex items-center px-2 relative hover:text-orange-600 ">
              <FaShoppingCart />
              <p className="absolute top-[-15px] right-[-5px] text-[18px]">1</p>
            </span>
          </div>

          {/* mobile menu */}
          <div className="flex lg:hidden">
            <span className="flex items-center pr-4 relative hover:text-orange-600 ">
              <FaShoppingCart size={20} />
              <p className="absolute top-[-15px] right-[5px] text-[18px]">1</p>
            </span>
            <div className=" z-20 px-2">
              <FaBars size={20} className="cursor-pointer" onClick={navClick} />
            </div>
          </div>
          <div
            className={
              !nav
                ? "hidden"
                : "absolute top-0 left-0 w-full h-[100vh] text-white  shadow-md font-bold shadow-[#354259] flex"
            }
          >
            <div className="bg-black w-[300px] h-[100vh] z-10 relative">
              <FaTimes
                size={25}
                className="cursor-pointer absolute top-[20px] right-0 pr-4"
                onClick={navClick}
              />
              <ul className="px-4">
                <li className="py-6 text-2xl">
                  <a href="./" className="cursor-pointer text-orange-600">
                    SOTshop
                  </a>
                </li>
                <hr />
                <li className="py-3 text-lg">
                  <a
                    href="./register"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Home
                  </a>
                </li>
                <hr />
                <li className="py-3 text-lg">
                  <a
                    href="./register"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Contact Us
                  </a>
                </li>
                <hr />
                <li className="py-3 text-lg">
                  <a
                    href="./register"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Login
                  </a>
                </li>
                <hr />
                <li className="py-3 text-lg">
                  <a
                    href="./register"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Register
                  </a>
                </li>
                <hr />
                <hr />
                <li className="py-3 text-lg">
                  <a
                    href="/login"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    My Orders
                  </a>
                </li>
                <hr />
                <li className="py-3">
                  <span className="flex items-center pr-4 relative hover:text-orange-600 ">
                    <FaShoppingCart size={20} />
                    <p className="absolute top-[-15px] left-[20px] text-[15px]">
                      1
                    </p>
                  </span>
                </li>
              </ul>
            </div>
            <div
              onClick={navClick}
              className="w-full h-[100vh] bg-black opacity-50 "
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
