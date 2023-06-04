import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();

    try {
      addDoc(collection(db, "orders"), {});
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successfull");
            saveOrder();
            navigate("/checkout-success");
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full ">
        <form
          onClick={handleSubmit}
          className=" w-full min-h-[100vh] md:flex justify-center items-center"
        >
          <div className="mr-6 min-w-[400px]">
            <p className="text-4xl mb-7">Checkout</p>
            <CheckoutSummary />
          </div>
          <div>
            <p className="text-xl">Stripe Checkout</p>
            <PaymentElement id="payment-element" />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="bg-blue-600 text-white w-full rounded-lg font-medium mt-3"
            >
              <span id="button-text w-full">
                {isLoading ? (
                  <div className="">
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="30"
                      visible={true}
                      className="w-full flex justify-center items-center"
                    />
                  </div>
                ) : (
                  <p className="p-2">Pay now</p>
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
