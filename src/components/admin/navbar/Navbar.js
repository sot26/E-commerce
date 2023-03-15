import React, { useEffect } from "react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectEmail, selectUserName } from "../../../redux/slice/authSlice";

const Navbar = () => {
  const [admin, setAdmin] = useState("");
  const adminEmail = useSelector(selectEmail);
  const adminDisplayName = useSelector(selectUserName);
  useEffect(() => {
    if (adminDisplayName === null) {
      const firstLetter = adminEmail.substring(0, adminEmail.indexOf("@"));
      const remLetters =
        firstLetter.charAt(0).toUpperCase() + firstLetter.slice(1);
      setAdmin(remLetters);
    } else {
      return adminDisplayName;
    }
  }, []);

  const activeLink = ({ isActive }) =>
    isActive ? "border-r-[5px] border-orange-600 flex" : "";

  return (
    <div>
      <div>
        <div className="w-full h-[150px] flex flex-col items-center justify-center bg-blue-400">
          <FaUserCircle size={50} />
          <p className="font-bold text-4xl ">{admin}</p>
        </div>
        <div>
          <NavLink to="/admin/home" className={activeLink}>
            <p className="p-4 border-b-[4px] w-full">Home</p>
          </NavLink>
          <NavLink to="/admin/add-product" className={activeLink}>
            <p className="p-4 border-b-[4px] w-full">Add Product</p>
          </NavLink>
          <NavLink to="/admin/view-products" className={activeLink}>
            <p className="p-4 border-b-[4px] w-full">View Product</p>
          </NavLink>
          <NavLink to="/admin/orders" className={activeLink}>
            <p className="p-4 border-b-[4px] w-full">Orders</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
