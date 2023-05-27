import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import {
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import {
  selectBillingAddress,
  selectsSippingAddress,
} from "../../redux/slice/checkoutSlice";

const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY);

const CheckOut = () => {
  const [message, setMessage] = useState("Initializing checkout");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const billingAddress = useSelector(selectBillingAddress);
  const shippingAddress = useSelector(selectsSippingAddress);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div>CheckOut</div>;
};

export default CheckOut;
