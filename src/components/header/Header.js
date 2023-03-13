import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaBars, FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const dispath = useDispatch();

  function navClick() {
    setNav(!nav);
  }

  const activeLink = ({ isActive }) =>
    isActive ? "border-b-4 text-orange-600" : "";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const firstLetter = user.email.substring(0, user.email.indexOf("@"));
          const remLetters =
            firstLetter.charAt(0).toUpperCase() + firstLetter.slice(1);
          setUserName(remLetters);
        } else {
          setUserName(user.displayName);
        }
        dispath(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : setUserName,
            userID: user.uid,
          })
        );
      } else {
        setUserName("");
        dispath(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispath, userName]);

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
              <ShowOnLogout>
                <NavLink className={activeLink} to="/login">
                  <p className="px-2 hover:text-orange-600">Login</p>
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <div className="flex text-orange-600 px-2 items-center justify-center">
                  <FaUserCircle />
                  <p>Hi, {userName}</p>
                </div>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink className={activeLink} to="/order">
                  <p className="px-2 hover:text-orange-600">My Orders</p>
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink onClick={logoutUser}>
                  <p className="px-2 hover:text-orange-600">Logout</p>
                </NavLink>
              </ShowOnLogin>
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
                  <Link
                    onClick={navClick}
                    to="./"
                    className="cursor-pointer text-orange-600"
                  >
                    SOTshop
                  </Link>
                </li>
                <hr />
                <li className="py-3 text-lg">
                  <Link
                    onClick={navClick}
                    to="./"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Home
                  </Link>
                </li>
                <hr />
                <li className="py-3 text-lg">
                  <Link
                    onClick={navClick}
                    to="./contact"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Contact Us
                  </Link>
                </li>
                <hr />
                <li className="py-3 text-lg">
                  <Link
                    onClick={navClick}
                    to="./login"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Login
                  </Link>
                </li>
                <hr />
                <li className="py-3 text-lg">
                  <Link
                    onClick={navClick}
                    to="./register"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Register
                  </Link>
                </li>
                <hr />
                <hr />
                <li className="py-3 text-lg">
                  <Link
                    onClick={navClick}
                    to="/orders"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    My Orders
                  </Link>
                </li>
                <hr />
                <li className="py-3">
                  <Link
                    onClick={navClick}
                    to="/cart"
                    className="flex items-center pr-4 relative hover:text-orange-600 "
                  >
                    <FaShoppingCart size={20} />
                    <p className="absolute top-[-15px] left-[20px] text-[15px]">
                      1
                    </p>
                  </Link>
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
