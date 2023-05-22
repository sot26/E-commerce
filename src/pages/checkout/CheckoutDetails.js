import React, { useEffect, useState } from "react";
import {
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems);

  const handleShipping = () => {};
  const handleBilling = () => {};
  return (
    <div className="w-full">
      <div className="w-full px-20">
        <p className="text-4xl font-semibold">Checkout Details</p>
        <div className="flex">
          <div className="w-[65%]">
            <p>Shipping Address</p>
            <form>
              <div>
                <p className="text-xl font-semibold">Recipient Name:</p>
                <input
                  className="border-[2px] border-black p-2 "
                  type="text"
                  placeholder=""
                  required
                />
              </div>
            </form>
          </div>
          <div className="w-[35%]">
            {cartItems.length === 0 ? (
              <div>
                <p className="text-2xl">No item in your cart</p>
                <Link to="/#products" className="text-2xl font-medium py-2">
                  &larr; Continue shopping
                </Link>
              </div>
            ) : (
              <div className="flex ">
                <div className="w-full p-4 shadow-2xl rounded-2xl">
                  <p className="text-lg md:text-3xl font-semibold">
                    Checkout Summary
                  </p>
                  <p className="text-lg md:text-xl font-semibold my-2">{`Cart item(s): ${cartTotalQuantity}`}</p>
                  <div className="flex justify-between ">
                    <p className="text-2xl md:text-2xl font-semibold">
                      Subtotal
                    </p>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
