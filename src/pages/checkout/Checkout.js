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
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

const CheckOut = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const billingAddress = useSelector(selectBillingAddress);
  const shippingAddress = useSelector(selectShippingAddress);

  const description = `Eshop payment : email: ${customerEmail}, Amount: ${totalAmount}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://sotshop.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description: description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialise checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-[100vh]">
      <div>
        <div> {!clientSecret && <p>{message}</p>}</div>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default CheckOut;
