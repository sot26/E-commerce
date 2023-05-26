import React, { useEffect, useState } from "react";
import {
  CALCULATE_SUBTOTAL,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";
import { SAVE_BILLING_ADDRESS } from "../../redux/slice/checkoutSlice";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";

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

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    dispatch(SAVE_BILLING_ADDRESS(shippingAddress));
    navigate("/checkout");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full px-4 md:px-20 py-4 md:py-12">
        <p className="text-4xl font-semibold pb-4">Checkout Details</p>
        <div className="md:flex">
          <div className="w-ful md:w-[55%] shadow-2xl p-3">
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

              {/* Billing address */}
              <div className=" mt-12">
                <p className="text-3xl ">Billing Address</p>
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
              </div>
            </form>
          </div>
          <div className="w-ful md:w-[45%] mt-9 md:mt-0">
            {cartItems.length === 0 ? (
              <div>
                <p className="text-2xl">No item in your cart</p>
                <Link to="/#products" className="text-2xl font-medium py-2">
                  &larr; Continue shopping
                </Link>
              </div>
            ) : (
              <CheckoutSummary />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
