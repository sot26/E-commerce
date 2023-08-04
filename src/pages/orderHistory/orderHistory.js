import React, { useEffect } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrder = orders.filter((order) => order.userID === userID);

  return (
    <div className="w-full min-h-[100vh] px-[20px] lg:px-[100px] py-[20px] lg:py-[100px]">
      <div>
        <p className="text-3xl font-semibold">Order History</p>
        <p className="text-xl my-6">
          Open an order to leave <b>Product Review</b>
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
        {filteredOrder.length === 0 ? (
          <p className="text-xl my-6">No order found</p>
        ) : (
          <table className="w-full ">
            <thead>
              <tr className="text-[13px] md:text-2xl font-bold border-[3px] border-blue-300  ">
                <td className="border-r-2 border-blue-300">s/n</td>
                <td className="border-r-2 border-blue-300">Date</td>
                <td className="border-r-2 border-blue-300">Order ID</td>
                <td className="border-r-2 border-blue-300">Order Amount</td>
                <td className="border-r-2 border-blue-300">Order Status</td>
              </tr>
            </thead>
            {filteredOrder.map((order, index) => {
              const { id, orderDate, orderTime, orderAmount, orderStatus } =
                order;
              return (
                <tbody key={id} className="cursor-pointer">
                  <tr
                    className="text-[12px] sm:text-xl md:text-[20px]  shadow-md border-[2px] border-black"
                    key={id}
                    onClick={() => handleClick(id)}
                  >
                    <td className=" border-r-2 border-black">{index + 1}</td>
                    <td className="border-r-2">
                      {orderDate} at {orderTime}
                    </td>
                    <td className=" border-r-2 border-black">{id}</td>
                    <td className=" border-r-2 border-black">${orderAmount}</td>
                    <td className=" border-r-2 border-black">{orderStatus}</td>
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

export default OrderHistory;
