import React, { useEffect } from "react";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_ORDERS,
  selectOrderHistory,
} from "../../../redux/slice/orderSlice";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrderHistory);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };
  return (
    <div className="w-full min-h-[100vh] md:px-[20px] px-0  py-[20px] ">
      <div>
        <p className="text-3xl font-semibold">All Orders</p>
        <p className="text-xl my-6">
          Open an order to<b> Change Order Status</b>
        </p>
        {isLoading && (
          <div className="w-full min-h-[100vh] flex justify-center items-center  md:ml-[-250px]">
            <RotatingLines
              strokeColor="orange"
              strokeWidth="5"
              animationDuration="0.75"
              width="150"
              visible={true}
              className="flex justify-center items-center"
            />
          </div>
        )}
        {orders.length === 0 ? (
          <p className="text-xl my-6">No order found</p>
        ) : (
          <table className="w-full ">
            <thead>
              <tr className="sm:text-xl text-[8px] xxs:text-[13px] md:text-2xl font-bold border-[3px] border-blue-300  ">
                <td className="border-r-2 border-blue-300">s/n</td>
                <td className="border-r-2 border-blue-300">Date</td>
                <td className="border-r-2 border-blue-300">Order ID</td>
                <td className="border-r-2 border-blue-300">Order Amount</td>
                <td className="border-r-2 border-blue-300">Order Status</td>
              </tr>
            </thead>
            {orders.map((order, index) => {
              const { id, orderDate, orderTime, orderAmount, orderStatus } =
                order;
              return (
                <tbody key={id} className="cursor-pointer">
                  <tr
                    className="text-[13px] md:text-[20px]  shadow-md border-[2px] border-black mt-2"
                    key={id}
                    onClick={() => handleClick(id)}
                  >
                    <td className=" border-r-2 border-black text-[10px] sm:text-xl md:text-base">
                      {index + 1}
                    </td>
                    <td className="border-r-2 border-black text-[10px] sm:text-xl md:text-base">
                      {orderDate} at {orderTime}
                    </td>
                    <td className=" border-r-2 border-black text-[10px] sm:text-xl md:text-base">
                      {id}
                    </td>
                    <td className=" border-r-2 border-black text-[10px] sm:text-xl md:text-base">
                      ${orderAmount}
                    </td>
                    <td className=" border-r-2 border-black text-[10px] sm:text-xl md:text-base">
                      <p
                        className={
                          orderStatus !== "Delivered"
                            ? "text-red-400"
                            : "text-green-500"
                        }
                      >
                        {orderStatus}
                      </p>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
