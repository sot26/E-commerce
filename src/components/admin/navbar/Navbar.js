import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";

const Navbar = () => {
  const userName = useSelector(selectUserName);
  const activeLink = ({ isActive }) =>
    isActive ? "border-r-[5px] border-orange-600 flex" : "";

  return (
    <div className="h-full">
      <div className="border-r-2">
        <div className="w-full h-[150px] flex flex-col items-center justify-center bg-blue-400">
          <FaUserCircle size={50} />
          <p className="font-semibold md:font-bold text-[13px] md:text-[20px] ">
            {userName}
          </p>
        </div>
        <div className="text-md md:text-lg">
          <NavLink to="/admin/home" className={activeLink}>
            <p className="p-2 md:p-4 border-b-[4px] w-full">Home</p>
          </NavLink>
          <NavLink to="/admin/add-product/ADD" className={activeLink}>
            <p className="p-2 md:p-4 border-b-[4px] w-full">Add Product</p>
          </NavLink>
          <NavLink to="/admin/view-products" className={activeLink}>
            <p className="p-2 md:p-4 border-b-[4px] w-full">View Product</p>
          </NavLink>
          <NavLink to="/admin/orders" className={activeLink}>
            <p className="p-2 md:p-4 border-b-[4px] w-full">Orders</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
