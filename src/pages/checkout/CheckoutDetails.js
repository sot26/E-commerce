import React, { useEffect, useState } from "react";
import {
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";

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

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shippingAddress);
    console.log(billingAddress);
  };
  return (
    <div className="w-full">
      <div className="w-full px-20 py-12">
        <p className="text-4xl font-semibold pb-4">Checkout Details</p>
        <div className="md:flex">
          <div className="w-[55%] shadow-2xl p-3">
            <div className="">
              <p className="text-3xl ">Shipping Address</p>
              <form onSubmit={handleSubmit}>
                <div>
                  <p className="text-lg font-bold my-2">Recipient Name:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Recipient name"
                    value={shippingAddress.name}
                    name="name"
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Address line 1:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Address line 1"
                    value={shippingAddress.line1}
                    name="line1"
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Address line 2:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Address line 2"
                    value={shippingAddress.line2}
                    name="line2"
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">City:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    name="city"
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">State:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    name="state"
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Postal Code:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Postal Code"
                    value={shippingAddress.postal_code}
                    name="postal_code"
                    onChange={(e) => handleShipping(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Country:</p>
                  <CountryDropdown
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    valueType="short"
                    value={shippingAddress.country}
                    onChange={(val) =>
                      handleShipping({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Phone:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Phone"
                    value={shippingAddress.phone}
                    name="phone"
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
              </form>
            </div>

            {/* Billing address */}
            <div className=" mt-12">
              <p className="text-3xl ">Billing Address</p>
              <form onSubmit={handleBilling}>
                <div>
                  <p className="text-lg font-bold my-2">Recipient Name:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Recipient name"
                    value={billingAddress.name}
                    name="name"
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Address line 1:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Address line 1"
                    value={billingAddress.line1}
                    name="line1"
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Address line 2:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Address line 2"
                    value={billingAddress.line2}
                    name="line2"
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">City:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="City"
                    value={billingAddress.city}
                    name="city"
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">State:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="State"
                    value={billingAddress.state}
                    name="state"
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Postal Code:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Postal Code"
                    value={billingAddress.postal_code}
                    name="postal_code"
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Country:</p>
                  <CountryDropdown
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    valueType="short"
                    value={billingAddress.country}
                    onChange={(val) =>
                      handleBilling({
                        target: {
                          name: "country",
                          value: val,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <p className="text-lg font-bold my-2">Phone:</p>
                  <input
                    className="border-[1.5px] border-black p-2 rounded-md w-full"
                    type="text"
                    placeholder="Phone"
                    value={billingAddress.phone}
                    name="phone"
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                  <button
                    type="submit"
                    className="p-2 mt-3 text-white text-md md:text-lg bg-blue-600 rounded-lg"
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-[45%]">
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
