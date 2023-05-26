import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CALCULATE_SUBTOTAL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const CheckoutSummary = () => {
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
  }, [dispatch]);
  return (
    <div className="flex ">
      <div className="w-full p-4 shadow-2xl rounded-2xl ">
        <p className="text-lg md:text-3xl font-semibold">Checkout Summary</p>
        <p className="text-lg md:text-xl font-semibold my-2">{`Cart item(s): ${cartTotalQuantity}`}</p>
        <div className="flex justify-between ">
          <p className="text-2xl md:text-2xl font-semibold">Subtotal</p>
          <p className="text-2xl text-orange-500 md:text-3xl font-semibold">{`$${cartTotalAmount.toFixed(
            2
          )}`}</p>
        </div>
        <div className="">
          {cartItems.map((cart, index) => {
            const { name, price, cartQuantity } = cart;

            return (
              <div
                className="border-[3px] border-blue-500 rounded-md mb-2"
                key={index}
              >
                <div className="p-2">
                  <p className="text-lg font-semibold">
                    Product: <p className="font-medium">{name}</p>
                  </p>
                  <p>Quantity: {cartQuantity} </p>
                  <p>Unit Price: {price * cartQuantity}</p>
                  <p>Set Price: {price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
