import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import { Circles } from "react-loader-spinner";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);
  console.log(order);
  return (
    <div className="w-full min-h-[100vh] px-2 ">
      <div>
        <p className="text-3xl md:text-4xl mt-3 ">All Orders</p>
        <Link to="/admin/orders">
          <p className="text-lg my-4 md:text-2xl w-auto">
            &larr; Back to Order(s)
          </p>
        </Link>
      </div>
      {order === null ? (
        <Circles
          height="80"
          width="80"
          color="#ffa500"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div>
          <p className="font-bold flex">
            Order ID : <p className="font-normal">{order.id}</p>
          </p>
          <p className="font-bold flex">
            Order Amount : $<p className="font-normal">{order.orderAmount}</p>
          </p>
          <p className="font-bold flex">
            Order Status : <p className="font-normal">{order.orderStatus}</p>
          </p>
          <p className="font-bold flex">
            Shipping Address :{" "}
            <p className="font-normal">{order.shippingAddress.line1}</p>
          </p>

          <table className="w-full">
            <thead>
              <tr className="text-[10px] md:text-2xl font-bold border-t-[3px] border-b-[3px] border-blue-300">
                <td className="border-r-2">s/n</td>
                <td className="border-r-2">Product</td>
                <td className="border-r-2">Price</td>
                <td className="border-r-2">Quantity</td>
                <td className="border-r-2">Total</td>
                <td className="border-r-2">Actions</td>
              </tr>
            </thead>
            <tbody key={id}>
              {order.cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;
                return (
                  <tr
                    key={id}
                    className="text-md sm:text-xl md:text-[20px] font-medium shadow-md"
                  >
                    <td className=" border-r-2">{index + 1}</td>
                    <td className="border-r-2">
                      <p>{name}</p>
                      <img
                        className="w-[80px] md:w-[100px] my-2"
                        src={imageURL}
                        alt={name}
                      />
                    </td>
                    <td className=" border-r-2">${price}</td>
                    <td className=" border-r-2">{cartQuantity}</td>
                    <td className=" border-r-2">
                      ${(price * cartQuantity).toFixed(2)}
                    </td>
                    <td className=" border-r-2">
                      <Link to={`/review-product/${id}`}>
                        <button className="py-2 px-3 font-semibold text-white bg-blue-600 text-sm rounded-xl">
                          Review Product
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
