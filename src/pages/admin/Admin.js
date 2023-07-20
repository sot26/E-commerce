import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import Home from "../../components/admin/home/Home";
import Navbar from "../../components/admin/navbar/Navbar";
import Orders from "../../components/admin/orders/Orders";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import OrderDetails from "../../components/admin/orderDetails/OrderDetails";

const Admin = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row min-h-[100vh]">
      <div className="lg:w-[25%] w-full h-full">
        <Navbar />
      </div>
      <div className="lg:w-[75%] w-full px-3 lg:px-0 h-full">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
