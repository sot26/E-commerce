import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Home from "../../components/admin/home/Home";
import Orders from "../../components/admin/orders/Orders";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";

const Admin = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-[25%] h-full bg-black/20">navbar</div>
      <div className="w-[75%] h-full">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="add-products" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
