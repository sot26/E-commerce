import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaBars, FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import {
  CART_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(CART_TOTAL_QUANTITY());
  }, []);

  const fixNavbar = () => {
    if (window.scrollY > 100) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  const dispatch = useDispatch();
  function navClick() {
    setNav(!nav);
  }

  const activeLink = ({ isActive }) =>
    isActive ? "border-b-4 text-orange-600" : "";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

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
      <div
        className={
          scrollPage
            ? `fixed top-0 h-[60px] sm:h-[80px] bg-black text-white w-full z-10`
            : "h-[60px] sm:h-[80px] bg-black text-white w-full z-10"
        }
      >
        <div className="flex justify-between px-6 sm:px-20 items-center h-full ">
          <div className="cursor-pointer">
            <Link to="/">
              <p className="text-[20px] sm:text-[20px] lg:text-[30px]  font-semibold">
                SOTshop
              </p>
            </Link>
          </div>
          <div className="lg:flex items-center text-[20px] hidden">
            <AdminOnlyLink>
              <Link to="/admin/home">
                <button className="p-2 bg-blue-700 rounded-lg">Admin</button>
              </Link>
            </AdminOnlyLink>
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
                  <p>Hi, {displayName}</p>
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
            <NavLink to="/cart">
              <span className="flex items-center px-2 relative hover:text-orange-600 ">
                <FaShoppingCart />
                <p className="absolute top-[-15px] right-[-9px] text-[18px]">
                  {cartTotalQuantity}
                </p>
              </span>
            </NavLink>
          </div>

          {/* mobile menu */}
          {!nav ? (
            <div className="flex lg:hidden">
              <NavLink to="/cart">
                <span className="flex items-center pr-4 relative hover:text-orange-600 ">
                  <FaShoppingCart size={20} />
                  <p className="absolute top-[-15px] right-[1px] text-[18px]">
                    {cartTotalQuantity}
                  </p>
                </span>
              </NavLink>
              <div className=" px-2">
                <FaBars
                  size={20}
                  className="cursor-pointer"
                  onClick={navClick}
                />
              </div>
            </div>
          ) : null}

          <div
            className={
              !nav
                ? "hidden"
                : "absolute  duration-500 ease-in-out top-0 left-0 w-full h-[80vh] text-white  shadow-md font-bold shadow-[#354259] flex"
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
                <li className="">
                  <AdminOnlyLink>
                    <Link to="/admin/home" onClick={navClick}>
                      <button className="p-2 mx-2 bg-blue-700 rounded-lg">
                        Admin
                      </button>
                    </Link>
                  </AdminOnlyLink>
                </li>
                <hr />
                <li className="py-2 px-2">
                  <Link
                    onClick={navClick}
                    to="./"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Home
                  </Link>
                </li>
                <hr />
                <li className="py-2 px-2">
                  <Link
                    onClick={navClick}
                    to="./contact"
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Contact Us
                  </Link>
                </li>
                <hr />
                <li>
                  <ShowOnLogin>
                    <div className="flex text-orange-600 px-2 py-2 items-center">
                      <FaUserCircle />
                      <p>Hi, {displayName}</p>
                    </div>
                  </ShowOnLogin>
                </li>
                <ShowOnLogout>
                  <li className="py-3 text-lg">
                    <Link
                      onClick={navClick}
                      to="./login"
                      className="cursor-pointer hover:text-orange-600"
                    >
                      Login
                    </Link>
                  </li>
                </ShowOnLogout>
                <hr />

                <ShowOnLogout>
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
                </ShowOnLogout>
                <ShowOnLogin>
                  <li className="py-3 px-2">
                    <Link
                      onClick={navClick}
                      to="/order"
                      className="cursor-pointer hover:text-orange-600"
                    >
                      My Orders
                    </Link>
                  </li>
                </ShowOnLogin>
                <hr />
                <li>
                  <ShowOnLogin>
                    <NavLink onClick={logoutUser}>
                      <p className="px-2 hover:text-orange-600 py-2">Logout</p>
                    </NavLink>
                  </ShowOnLogin>
                </li>
                <ShowOnLogin>
                  <hr />
                  <li className="py-2 mx-2">
                    <Link
                      onClick={navClick}
                      to="/cart"
                      className="flex items-center pr-4 relative hover:text-orange-600 "
                    >
                      <FaShoppingCart size={20} />
                      <p className="absolute top-[-15px] left-[20px] text-[15px]">
                        {cartTotalQuantity}
                      </p>
                    </Link>
                  </li>
                </ShowOnLogin>
              </ul>
            </div>
            <div
              onClick={navClick}
              className="relative w-full h-[100vh] bg-black opacity-50 z-10"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
